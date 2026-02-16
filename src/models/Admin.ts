import mongoose, { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

export default models.Admin || model('Admin', AdminSchema);
