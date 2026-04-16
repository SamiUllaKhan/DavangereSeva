import nodemailer from 'nodemailer';
import { getBookingAdminEmail, getBookingCustomerEmail, getPartnerWelcomeEmail } from './email-templates';
import { sendBookingWhatsApp } from './whatsapp';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendBookingNotifications(booking: any) {
    try {
        console.log('Sending booking notifications...');

        // Helper to get service name for subjects
        const primaryService = booking.service?.name || (booking.items && booking.items.length > 0 ? booking.items[0].name : 'Home Service');
        const secondaryInfo = booking.items && booking.items.length > 1 ? ` (+${booking.items.length - 1} more)` : '';
        const serviceDisplayName = `${primaryService}${secondaryInfo}`;

        // Add fallback booking.service if it doesn't exist for template compatibility
        if (!booking.service) booking.service = { name: serviceDisplayName };

        // 1. Send to Admin
        await transporter.sendMail({
            from: `"Davanagere Seva" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Booking: ${serviceDisplayName} - ${booking.customerName}`,
            html: getBookingAdminEmail(booking),
        });

        // 2. Send to Customer
        if (booking.customerEmail) {
            await transporter.sendMail({
                from: `"Davanagere Seva" <${process.env.GMAIL_USER}>`,
                to: booking.customerEmail,
                subject: `Booking Confirmed: ${serviceDisplayName}`,
                html: getBookingCustomerEmail(booking),
            });
        }

        // 3. Send WhatsApp Notifications
        await sendBookingWhatsApp(booking).catch(err => console.error('WhatsApp Notification Error:', err));

        // SMS Placeholder (You can integrate services like Twilio here)
        console.log(`[SMS Placeholder] To Admin: New booking ${booking.service.name} by ${booking.customerName}`);
        console.log(`[SMS Placeholder] To Customer: Your booking for ${booking.service.name} is confirmed.`);

        return { success: true };
    } catch (error) {
        console.error('Notification Error:', error);
        return { success: false, error };
    }
}

export async function sendPartnerRegistrationEmail(partner: any) {
    try {
        await transporter.sendMail({
            from: `"Davanagere Seva" <${process.env.GMAIL_USER}>`,
            to: partner.email,
            subject: 'Welcome to Davanagere Seva - Application Received',
            html: getPartnerWelcomeEmail(partner),
        });

        // Also notify admin about new partner
        await transporter.sendMail({
            from: `"Davanagere Seva" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Partner Application: ${partner.name}`,
            html: `<p>New partner application from <strong>${partner.name}</strong> for ${partner.serviceCategory}.</p><p>Check the admin panel to verify documents.</p>`,
        });

        return { success: true };
    } catch (error) {
        console.error('Partner Notification Error:', error);
        return { success: false, error };
    }
}
