/**
 * WhatsApp Notification Service
 * This service handles sending WhatsApp messages to clients and admins.
 * For production, you can use the WhatsApp Cloud API, Twilio, or other providers like Interakt/Wati.
 */

const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_PHONE = process.env.ADMIN_WHATSAPP_NUMBER || '918904777090'; // Default admin number

export async function sendWhatsAppMessage(to: string, message: string) {
    // 1. Clean the phone number (ensure it has country code, e.g., 91 for India)
    let cleanNumber = to.replace(/\D/g, '');
    if (cleanNumber.length === 10) {
        cleanNumber = '91' + cleanNumber; // Default to India prefix if it's 10 digits
    }

    console.log(`[WHATSAPP] Sending to ${cleanNumber}: ${message}`);

    // If API credentials are not set, just log and return success (for development)
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
        console.warn('WhatsApp API credentials are not set in .env.local. Skipping actual delivery.');
        return { success: true, mocked: true };
    }

    try {
        // Example: WhatsApp Cloud API implementation
        const response = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: cleanNumber,
                type: "text",
                text: { 
                    preview_url: false,
                    body: message 
                }
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || 'WhatsApp API Error');
        }

        return { success: true, data };
    } catch (error) {
        console.error('WhatsApp Notification Error:', error);
        return { success: false, error };
    }
}

export async function sendBookingWhatsApp(booking: any) {
    const servicesList = booking.items.map((item: any) => `- ${item.name} (x${item.quantity})`).join('\n');
    
    // 1. Message for Customer
    const customerMessage = `🎉 *Booking Confirmed!*

Hello ${booking.customerName}, your booking with *Davanagere Seva* has been received successfully.

*Booked Services:*
${servicesList}

*Total Amount:* ₹${booking.totalAmount}
*Preferred Date:* ${new Date(booking.bookingDate).toLocaleDateString()}

Our expert will call you shortly to confirm the exact visit time.
Thank you for choosing us!`;

    // 2. Message for Admin
    const adminMessage = `🔔 *New Order Notification*

An order has been placed by *${booking.customerName}*.

*Details:*
${servicesList}
*Total:* ₹${booking.totalAmount}
*Phone:* ${booking.customerPhone}
*Address:* ${booking.customerAddress}
*Date:* ${new Date(booking.bookingDate).toLocaleDateString()}

Please check the Admin Dashboard to assign a partner.`;

    // Send to both asynchronously
    return Promise.allSettled([
        sendWhatsAppMessage(booking.customerPhone, customerMessage),
        sendWhatsAppMessage(ADMIN_PHONE, adminMessage)
    ]);
}
