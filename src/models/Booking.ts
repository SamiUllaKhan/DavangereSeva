import mongoose, { Schema, model, models } from 'mongoose';

const BookingSchema = new Schema({
    // Store array of services from the cart
    items: [{
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedPartnerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAddress: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    notes: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    isReviewApproved: { type: Boolean, default: false },
}, { timestamps: true });

// In development, clear the model from mongoose cache to pick up schema changes
if (process.env.NODE_ENV === 'development') {
    delete models.Booking;
}

export default models.Booking || model('Booking', BookingSchema);
