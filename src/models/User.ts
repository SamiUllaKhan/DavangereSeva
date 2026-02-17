import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['customer', 'partner'], required: true },
    // Partner specific fields
    serviceCategory: { type: String },
    experience: { type: String },
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// In development, clear the model from mongoose cache to pick up schema changes
if (process.env.NODE_ENV === 'development') {
    delete models.User;
}

export default models.User || model('User', UserSchema);
