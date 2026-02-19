'use server';

import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import Newsletter from '@/models/Newsletter';

export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return { success: false, error: 'All fields are required.' };
    }

    try {
        await dbConnect();
        await ContactMessage.create({
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() || '',
            subject: data.subject.trim(),
            message: data.message.trim(),
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: 'Failed to send message. Please try again.' };
    }
}

export async function subscribeNewsletter(email: string) {
    if (!email || !email.includes('@')) {
        return { success: false, error: 'Please enter a valid email.' };
    }

    try {
        await dbConnect();
        const existing = await Newsletter.findOne({ email: email.trim().toLowerCase() });
        if (existing) {
            return { success: false, error: 'You are already subscribed!' };
        }

        await Newsletter.create({ email: email.trim().toLowerCase() });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: 'Failed to subscribe. Please try again.' };
    }
}
