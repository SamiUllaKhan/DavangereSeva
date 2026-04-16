import mongoose, { Schema, model, models } from 'mongoose';

const PartSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true }, // Laptop, Desktop, Printer, CCTV, etc.
    type: { type: String, required: true },     // RAM, SSD, Screen, Battery, Toner, etc.
    currentPrice: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

// In development, clear the model from mongoose cache to pick up schema changes
if (process.env.NODE_ENV === 'development') {
    delete models.Part;
}

export default models.Part || model('Part', PartSchema);
