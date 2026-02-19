'use server';

import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import { getUserSession } from './user';
import {
    sendSMS,
    bookingConfirmationMessage,
    bookingAssignedMessage,
    partnerAssignedMessage,
    bookingStatusMessage,
} from '@/lib/sms';

export async function createBooking(formData: any) {
    try {
        await dbConnect();

        const session = await getUserSession();

        const newBookingDTO: any = {
            service: {
                id: formData.serviceId,
                name: formData.serviceName
            },
            customerName: formData.customerName,
            customerPhone: formData.customerPhone,
            customerEmail: formData.customerEmail,
            customerAddress: formData.customerAddress,
            bookingDate: new Date(formData.bookingDate),
            notes: formData.notes,
        };

        if (session && session.id) {
            newBookingDTO.customerId = session.id;
        }

        const newBooking = new Booking(newBookingDTO);

        const savedBooking = await newBooking.save();

        // Send SMS notification to customer
        if (formData.customerPhone) {
            const dateStr = new Date(formData.bookingDate).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
            const smsMessage = bookingConfirmationMessage(
                formData.serviceName,
                dateStr,
                savedBooking._id.toString()
            );
            await sendSMS(formData.customerPhone, smsMessage);
        }

        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        console.error('Detailed Booking Error:', {
            message: error.message,
            stack: error.stack,
            formData: formData
        });
        return { success: false, error: error.message || 'Failed to create booking' };
    }
}

export async function getBookings() {
    try {
        await dbConnect();
        const bookings = await Booking.find({}).sort({ createdAt: -1 }).populate('service').lean();
        return JSON.parse(JSON.stringify(bookings));
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function getCustomerBookings(customerId: string) {
    try {
        await dbConnect();
        const bookings = await Booking.find({ customerId }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(bookings));
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function getPartnerBookings(partnerId: string) {
    try {
        await dbConnect();
        const bookings = await Booking.find({ assignedPartnerId: partnerId }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(bookings));
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function updateBooking(bookingId: string, data: { status?: string, assignedPartnerId?: string | null }) {
    try {
        await dbConnect();

        // Get booking before update for notification context
        const existingBooking = await Booking.findById(bookingId).lean() as any;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: data },
            { new: true }
        );

        if (updatedBooking && existingBooking) {
            // SMS: Partner assigned
            if (data.assignedPartnerId && data.assignedPartnerId !== existingBooking.assignedPartnerId?.toString()) {
                const partner = await User.findById(data.assignedPartnerId).lean() as any;
                if (partner) {
                    // Notify customer that a partner is assigned
                    if (existingBooking.customerPhone) {
                        await sendSMS(
                            existingBooking.customerPhone,
                            bookingAssignedMessage(existingBooking.service?.name || 'Service', partner.name)
                        );
                    }
                    // Notify partner about the new job
                    if (partner.phone) {
                        const dateStr = new Date(existingBooking.bookingDate).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        });
                        await sendSMS(
                            partner.phone,
                            partnerAssignedMessage(
                                existingBooking.customerName,
                                existingBooking.service?.name || 'Service',
                                existingBooking.customerAddress || 'Davanagere',
                                dateStr
                            )
                        );
                    }
                }
            }

            // SMS: Status changed
            if (data.status && data.status !== existingBooking.status) {
                if (existingBooking.customerPhone) {
                    await sendSMS(
                        existingBooking.customerPhone,
                        bookingStatusMessage(existingBooking.service?.name || 'Service', data.status)
                    );
                }
            }
        }

        revalidatePath('/admin');
        revalidatePath('/partner-dashboard');
        revalidatePath('/bookings');
        return { success: true, booking: JSON.parse(JSON.stringify(updatedBooking)) };
    } catch (error: any) {
        console.error('Update Error:', error);
        return { success: false, error: error.message };
    }
}

export async function getPartners() {
    try {
        await dbConnect();
        const partners = await User.find({ role: 'partner' }).select('name email serviceCategory').lean();
        return JSON.parse(JSON.stringify(partners));
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}
