'use server';

import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { revalidatePath } from 'next/cache';

export async function createBooking(formData: any) {
    try {
        await dbConnect();

        console.log('Attempting to create booking for service:', formData.serviceId);

        const newBooking = new Booking({
            service: formData.serviceId,
            customerName: formData.customerName,
            customerPhone: formData.customerPhone,
            customerEmail: formData.customerEmail,
            customerAddress: formData.customerAddress,
            bookingDate: new Date(formData.bookingDate),
            notes: formData.notes,
        });

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
