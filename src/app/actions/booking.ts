'use server';

import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import Service from '@/models/Service';
import { revalidatePath } from 'next/cache';
import { getUserSession } from './user';
import { sendBookingNotifications } from '@/lib/notifications';

export async function createBooking(formData: any) {
    try {
        await dbConnect();
        
        const session = await getUserSession();

        const newBookingDTO: any = {
            items: formData.items.map((item: any) => ({
                serviceId: item.id || item.serviceId,
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1
            })),
            totalAmount: formData.totalAmount,
            customerName: formData.customerName,
            customerPhone: formData.customerPhone,
            customerEmail: formData.customerEmail,
            customerAddress: formData.customerAddress,
            bookingDate: new Date(formData.bookingDate || Date.now()),
            notes: formData.notes,
        };

        if (session && session.id) {
            newBookingDTO.customerId = session.id;
        }

        const newBooking = new Booking(newBookingDTO);
        const savedBooking = await newBooking.save();

        // Send Email/SMS notifications asynchronously
        sendBookingNotifications({
            ...newBookingDTO,
            _id: savedBooking._id
        }).catch(err => console.error('Delayed Notification Error:', err));

        revalidatePath('/admin');
        return { success: true, bookingId: savedBooking._id };
    } catch (error: any) {
        console.error('Booking Creation Error:', error);
        return { success: false, error: error.message || 'Failed to create booking' };
    }
}

export async function getBookings() {
    try {
        await dbConnect();
        const bookings = await Booking.find({}).sort({ createdAt: -1 }).populate('items.serviceId').lean();
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

export async function submitRating(bookingId: string, rating: number, review: string) {
    try {
        await dbConnect();
        const booking = await Booking.findById(bookingId);
        if (!booking) return { success: false, error: 'Booking not found' };

        if (booking.status !== 'Completed') {
            return { success: false, error: 'Only completed services can be rated' };
        }

        booking.rating = rating;
        booking.review = review;
        booking.isReviewApproved = false; // Ensure it's false on submission
        await booking.save();

        revalidatePath('/bookings');
        revalidatePath('/admin');
        // If there's a specific service page, revalidate it.
        // revalidatePath(`/services/${booking.service.id}`);
        return { success: true };
    } catch (error: any) {
        console.error('Rating Error:', error);
        return { success: false, error: error.message };
    }
}

export async function addPartsToBooking(bookingId: string, parts: any[]) {
    try {
        await dbConnect();
        const booking = await Booking.findById(bookingId);
        if (!booking) return { success: false, error: 'Booking not found' };

        // Add parts to existing parts array or replace it
        // For simplicity, we'll replace the parts array with the new list
        booking.parts = parts.map(p => ({
            partId: p.partId || p._id,
            name: p.name,
            price: p.price,
            quantity: p.quantity || 1
        }));

        // Recalculate total amount: Sum of items + Sum of parts
        let itemsTotal = booking.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        const partsTotal = booking.parts.reduce((sum: number, part: any) => sum + (part.price * part.quantity), 0);
        
        // If the base service was 0 (Quote-based) but parts are now being added, 
        // add a mandatory 200 visit charge.
        if (itemsTotal === 0 && partsTotal > 0) {
            itemsTotal = 200;
        }
        
        booking.totalAmount = itemsTotal + partsTotal;
        await booking.save();

        revalidatePath('/partner-dashboard');
        revalidatePath('/admin');
        revalidatePath('/bookings');

        return { success: true, booking: JSON.parse(JSON.stringify(booking)) };
    } catch (error: any) {
        console.error('Add Parts Error:', error);
        return { success: false, error: error.message };
    }
}

