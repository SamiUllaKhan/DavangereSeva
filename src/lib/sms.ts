/**
 * SMS Notification Service
 * 
 * Supports multiple providers. Set SMS_PROVIDER env variable to choose:
 *   - "twilio" (default) - Uses Twilio API
 *   - "msg91" - Uses MSG91 API (popular in India)
 *   - "console" - Logs to console (for development/testing)
 * 
 * Required env variables:
 * For Twilio: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
 * For MSG91: MSG91_AUTH_KEY, MSG91_SENDER_ID, MSG91_TEMPLATE_ID
 */

const SMS_PROVIDER = process.env.SMS_PROVIDER || 'console';

interface SMSResult {
    success: boolean;
    error?: string;
}

async function sendViaTwilio(to: string, message: string): Promise<SMSResult> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
        console.warn('[SMS] Twilio credentials not configured. Message:', message);
        return { success: false, error: 'Twilio credentials missing' };
    }

    try {
        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    To: to,
                    From: fromNumber,
                    Body: message,
                }),
            }
        );

        if (response.ok) {
            console.log(`[SMS] Twilio: Sent to ${to}`);
            return { success: true };
        } else {
            const err = await response.text();
            console.error('[SMS] Twilio error:', err);
            return { success: false, error: 'Twilio API error' };
        }
    } catch (error: any) {
        console.error('[SMS] Twilio exception:', error.message);
        return { success: false, error: error.message };
    }
}

async function sendViaMsg91(to: string, message: string): Promise<SMSResult> {
    const authKey = process.env.MSG91_AUTH_KEY;
    const senderId = process.env.MSG91_SENDER_ID || 'DVGSEV';

    if (!authKey) {
        console.warn('[SMS] MSG91 credentials not configured. Message:', message);
        return { success: false, error: 'MSG91 credentials missing' };
    }

    try {
        const response = await fetch('https://api.msg91.com/api/v5/flow/', {
            method: 'POST',
            headers: {
                'authkey': authKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: senderId,
                route: '4',
                country: '91',
                sms: [{ message, to: [to.replace('+91', '')] }],
            }),
        });

        if (response.ok) {
            console.log(`[SMS] MSG91: Sent to ${to}`);
            return { success: true };
        } else {
            const err = await response.text();
            console.error('[SMS] MSG91 error:', err);
            return { success: false, error: 'MSG91 API error' };
        }
    } catch (error: any) {
        console.error('[SMS] MSG91 exception:', error.message);
        return { success: false, error: error.message };
    }
}

function sendViaConsole(to: string, message: string): SMSResult {
    console.log(`\n========== SMS NOTIFICATION ==========`);
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    console.log(`======================================\n`);
    return { success: true };
}

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
    // Normalize phone number
    let phone = to.replace(/\s/g, '');
    if (!phone.startsWith('+')) {
        phone = '+91' + phone;
    }

    switch (SMS_PROVIDER) {
        case 'twilio':
            return sendViaTwilio(phone, message);
        case 'msg91':
            return sendViaMsg91(phone, message);
        case 'console':
        default:
            return sendViaConsole(phone, message);
    }
}

// Notification templates
export function bookingConfirmationMessage(serviceName: string, date: string, bookingId: string): string {
    return `Davanagere Seva: Your booking for ${serviceName} on ${date} is confirmed! Booking ID: ${bookingId.slice(-6).toUpperCase()}. We will assign an expert shortly.`;
}

export function bookingAssignedMessage(serviceName: string, partnerName: string): string {
    return `Davanagere Seva: ${partnerName} has been assigned for your ${serviceName} service. They will contact you shortly.`;
}

export function partnerAssignedMessage(customerName: string, serviceName: string, address: string, date: string): string {
    return `Davanagere Seva: New job! ${serviceName} for ${customerName} at ${address} on ${date}. Please confirm via your dashboard.`;
}

export function bookingStatusMessage(serviceName: string, status: string): string {
    const statusMap: Record<string, string> = {
        'confirmed': 'has been confirmed',
        'in-progress': 'is now in progress',
        'completed': 'has been completed. Thank you for choosing us!',
        'cancelled': 'has been cancelled',
    };
    return `Davanagere Seva: Your ${serviceName} booking ${statusMap[status] || `status updated to: ${status}`}.`;
}
