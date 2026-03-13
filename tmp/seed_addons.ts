import dbConnect from '../src/lib/mongodb';
import Service from '../src/models/Service';
import mongoose from 'mongoose';

async function seedAddons() {
    try {
        await dbConnect();
        console.log('Connected to MongoDB');

        const acRepair = await Service.findOne({ name: /AC Repair/i });
        
        if (acRepair) {
            const addOns = [
                {
                    name: 'Deep Cleaning of Filters & Coils',
                    price: 299,
                    description: 'Professional cleaning of AC filters and indoor/outdoor coils',
                    icon: 'Layers'
                },
                {
                    name: 'Electrical Component Check',
                    price: 199,
                    description: 'Full diagnostic check of all electrical parts and wiring',
                    icon: 'Zap'
                },
                {
                    name: 'Gas Charging & Leak Fix',
                    price: 1499,
                    description: 'Refrigerant top-up and repair of minor leakages',
                    icon: 'Wind'
                },
                {
                    name: 'Drainage Pipe Cleaning',
                    price: 149,
                    description: 'Clearance of blockages in the drain pipe to prevent water leaks',
                    icon: 'Droplets'
                },
                {
                    name: 'Service Warranty (90 Days)',
                    price: 499,
                    description: 'Extended peace of mind with 90 days service guarantee',
                    icon: 'ShieldCheck'
                }
            ];

            acRepair.addOns = addOns;
            await acRepair.save();
            console.log('Successfully added add-ons to AC Repair service');
        } else {
            console.log('AC Repair service not found');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding add-ons:', error);
        process.exit(1);
    }
}

seedAddons();
