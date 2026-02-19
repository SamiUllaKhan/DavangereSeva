import mongoose, { Schema, model, models } from 'mongoose';

const NewsletterSchema = new Schema({
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
    delete models.Newsletter;
}

export default models.Newsletter || model('Newsletter', NewsletterSchema);
