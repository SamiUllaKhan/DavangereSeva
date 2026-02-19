import mongoose, { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
    serviceSlug: { type: String, required: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// One review per booking
ReviewSchema.index({ bookingId: 1 }, { unique: true, sparse: true });

if (process.env.NODE_ENV === 'development') {
    delete models.Review;
}

export default models.Review || model('Review', ReviewSchema);
