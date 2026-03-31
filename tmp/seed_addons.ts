import dbConnect from '../src/lib/mongodb';
import Service from '../src/models/Service';
import mongoose from 'mongoose';

async function seedAddons() {
    try {
        await dbConnect();
        console.log('Connected to MongoDB');

        const acService = await Service.findOne({ name: { $in: [/AC Installation/i, /AC Service & Repair/i] } });
        
        if (acService) {
            acService.name = 'AC Service & Repair';
            acService.image = '/images/ac-repair.png';
            
            const addOns = [
                {
                    name: 'Deep Cleaning of Filters & Coils',
                    price: 299,
                    description: 'Professional cleaning of AC filters and indoor/outdoor coils',
                    icon: 'Layers',
                    image: '/images/ac-deep-cleaning.png'
                },
                {
                    name: 'Split AC Installation',
                    price: 1599,
                    description: 'Professional installation by verified Indian technicians',
                    icon: 'Settings',
                    image: '/images/ac-installation.png'
                },
                {
                    name: 'Gas Charging & Leak Fix',
                    price: 1499,
                    description: 'Refrigerant top-up and repair of minor leakages',
                    icon: 'Wind'
                },
                {
                    name: 'Electrical Component Check',
                    price: 199,
                    description: 'Full diagnostic check of all electrical parts and wiring',
                    icon: 'Zap'
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

            acService.addOns = addOns;
            acService.brandLogos = [
                'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg',
                'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/e/e0/Panasonic_logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/b/be/Daikin_logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/0/07/Whirlpool_Logo.svg'
            ];
            await acService.save();
            console.log('Successfully updated AC Service & Repair with image, Indian-themed add-ons and brand logos');
        } else {
            console.log('AC Service & Repair service not found');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding add-ons:', error);
        process.exit(1);
    }
}

seedAddons();
