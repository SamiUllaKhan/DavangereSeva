import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String }, // Name of the Lucide icon
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'coming-soon'], default: 'active' },
}, { timestamps: true });

export default models.Category || model('Category', CategorySchema);
