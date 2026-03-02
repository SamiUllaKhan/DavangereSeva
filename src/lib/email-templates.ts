export const getBookingAdminEmail = (booking: any) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background-color: #2563eb; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">New Booking Received</h1>
        </div>
        <div style="padding: 32px; color: #1e293b; line-height: 1.6;">
            <p>A new service booking has been placed on Davanagere Seva.</p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 24px 0;">
                <h3 style="margin-top: 0; color: #2563eb;">Booking Details:</h3>
                <p><strong>Service:</strong> ${booking.service.name}</p>
                <p><strong>Customer:</strong> ${booking.customerName}</p>
                <p><strong>Phone:</strong> ${booking.customerPhone}</p>
                <p><strong>Email:</strong> ${booking.customerEmail}</p>
                <p><strong>Address:</strong> ${booking.customerAddress}</p>
                <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
                ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>
            <p>Please log in to the admin dashboard to assign a partner.</p>
            <div style="text-align: center; margin-top: 32px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" 
                   style="background-color: #2563eb; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                   Open Admin Dashboard
                </a>
            </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; color: #64748b; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Davanagere Seva. Professional Home Services.
        </div>
    </div>
`;

export const getBookingCustomerEmail = (booking: any) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background-color: #2563eb; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Booking Confirmed</h1>
        </div>
        <div style="padding: 32px; color: #1e293b; line-height: 1.6;">
            <p>Hi ${booking.customerName},</p>
            <p>Thank you for choosing Davanagere Seva! Your booking for <strong>${booking.service.name}</strong> has been received and is being processed.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #2563eb;">
                <p><strong>Service:</strong> ${booking.service.name}</p>
                <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> Pending Confirmation</p>
            </div>
            
            <p>Our team will contact you shortly to confirm the timing and assign a service expert.</p>
            <p>If you have any questions, feel free to contact our support at <strong>+91 890 4777 090</strong>.</p>
            
            <div style="text-align: center; margin-top: 32px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/bookings" 
                   style="background-color: #2563eb; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                   View My Bookings
                </a>
            </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; color: #64748b; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Davanagere Seva. Professional Home Services.
        </div>
    </div>
`;

export const getPartnerWelcomeEmail = (partner: any) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background-color: #ea580c; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Welcome Partner!</h1>
        </div>
        <div style="padding: 32px; color: #1e293b; line-height: 1.6;">
            <p>Hi ${partner.name},</p>
            <p>Welcome to Davanagere Seva! We've received your application to join as an expert partner for <strong>${partner.serviceCategory}</strong>.</p>
            
            <p>Our verification team will review your profile and documents (ID proof and photo) within the next 24-48 hours. Once approved, you'll start receiving service bookings in your area.</p>
            
            <div style="text-align: center; margin-top: 32px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" 
                   style="background-color: #ea580c; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                   Log in to Dashboard
                </a>
            </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; color: #64748b; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Davanagere Seva. Partner Network.
        </div>
    </div>
`;
