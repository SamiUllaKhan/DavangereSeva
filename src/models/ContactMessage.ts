import mongoose, { Schema, model, models } from 'mongoose';

const ContactMessageSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
    delete models.ContactMessage;
}

export default models.ContactMessage || model('ContactMessage', ContactMessageSchema);
