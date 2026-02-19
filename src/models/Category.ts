import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String }, // Name of the Lucide icon
    description: { type: String },
    color: { type: String, default: 'bg-blue-50' }, // Tailwind bg class for UI cards
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
    delete models.Category;
}

export default models.Category || model('Category', CategorySchema);
