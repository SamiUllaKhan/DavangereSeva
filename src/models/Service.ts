import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: 'Starting from' },
    features: [{ type: String }],
    whyChooseUs: [{ type: String }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Service || model('Service', ServiceSchema);
