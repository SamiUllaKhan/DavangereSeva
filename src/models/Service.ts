import mongoose, { Schema, model, models } from 'mongoose';

const AddOnSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    icon: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true }
});

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: 'Starting from' },
    image: { type: String },
    features: [{ type: String }],
    addOns: [AddOnSchema],
    whyChooseUs: [{ type: String }],
    brandLogos: [{ type: String }],
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Service || model('Service', ServiceSchema);
