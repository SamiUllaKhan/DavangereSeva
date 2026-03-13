import * as dotenv from 'dotenv';
import mongoose, { Schema, model, models } from 'mongoose';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// Minimal Schema definitions to avoid import issues
const AddOnSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true }
});

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    addOns: [AddOnSchema],
}, { timestamps: true });

const Service = models.Service || model('Service', ServiceSchema);

async function seedAddons() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // Search for AC Installation service
        const acInstallation = await Service.findOne({ name: /AC Installation/i });
        
        if (acInstallation) {
            const addOns = [
                {
                    name: 'Copper Pipe (upto 3m)',
                    price: 899,
                    description: 'High quality copper piping for connection',
                    icon: 'Pipette'
                },
                {
                    name: 'Outdoor Stand (Powder Coated)',
                    price: 450,
                    description: 'Heavy duty rust-proof stand for outdoor unit',
                    icon: 'RectangleHorizontal'
                },
                {
                    name: 'Drainage Pipe Cleaning & Extension',
                    price: 149,
                    description: 'Clearance of blockages and length extension',
                    icon: 'Droplets'
                },
                {
                    name: 'Electrical Stabilizer (4KVA)',
                    price: 2499,
                    description: 'Voltage correction specifically for AC units',
                    icon: 'Zap'
                },
                {
                    name: '90 Day Installation Warranty',
                    price: 299,
                    description: 'Coverage for any installation related leaks or issues',
                    icon: 'ShieldCheck'
                }
            ];

            acInstallation.addOns = addOns;
            await acInstallation.save();
            console.log('Successfully added add-ons to AC Installation service');
        }

        const deepCleaning = await Service.findOne({ name: /Deep Cleaning/i });
        if (deepCleaning) {
            const addOns = [
                {
                    name: 'Kitchen Degreasing Upgrade',
                    price: 499,
                    description: 'Extensive removal of oil and grease from cabinets and tiles',
                    icon: 'Flame'
                },
                {
                    name: 'Bathroom Descaling',
                    price: 349,
                    description: 'Removal of hard water marks from fixtures and glass',
                    icon: 'Sparkles'
                },
                {
                    name: 'Upholstery Sanitization',
                    price: 599,
                    description: 'Steam cleaning and sanitization of sofas/curtains',
                    icon: 'Waves'
                }
            ];
            deepCleaning.addOns = addOns;
            await deepCleaning.save();
            console.log('Successfully added add-ons to Deep Cleaning service');
        } else {
            console.log('AC Repair service not found');
            console.log('Available services:', (await Service.find({}, 'name')).map(s => s.name));
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding add-ons:', error);
        process.exit(1);
    }
}

seedAddons();
