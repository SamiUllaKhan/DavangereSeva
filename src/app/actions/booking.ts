'use server';

import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import { getUserSession } from './user';

export async function createBooking(formData: any) {
    try {
        await dbConnect();

        console.log('Attempting to create booking for service:', formData.serviceName);
        console.log('Customer Email to save:', formData.customerEmail);

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
        console.log('Booking saved successfully:', savedBooking._id);

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
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: data },
            { new: true }
        );
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
