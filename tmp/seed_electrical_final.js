const mongoose = require('mongoose');

// Schema definitions for the simplified model
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'coming-soon'], default: 'active' },
    brandLogos: [{ type: String }],
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    features: [{ type: String }],
    whyChooseUs: [{ type: String }],
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 45 },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function seedElectrical() {
    const MONGODB_URI = 'mongodb+srv://dvg_admin:Sami1504@cluster0.u8dri7r.mongodb.net/davanagere-seva?appName=Cluster0';

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB Cluster');

        // 1. Manage Electrical Category
        let electricalCategory = await Category.findOne({ slug: 'electrician' });

        const electricalBrands = [
            'https://logowik.com/content/uploads/images/havells9506.logowik.com.webp',
            'https://logowik.com/content/uploads/images/legrand-electric3588.jpg',
            'https://logowik.com/content/uploads/images/schneider-electric5430.jpg',
            'https://logowik.com/content/uploads/images/finolex6497.jpg',
            'https://logowik.com/content/uploads/images/polycab9716.jpg',
            'https://logowik.com/content/uploads/images/l-t-construction-logo-for-tcs809.jpg'
        ];

        if (!electricalCategory) {
            electricalCategory = await Category.create({
                name: 'Electrical Service',
                slug: 'electrician',
                icon: 'Zap',
                description: 'Expert electrical solutions for your home and office.',
                status: 'active',
                brandLogos: electricalBrands
            });
            console.log('Created Electrical Category');
        } else {
            electricalCategory.brandLogos = electricalBrands;
            await electricalCategory.save();
            console.log('Updated Electrical Category brands');
        }

        // 2. Clear existing services for this category ONLY
        await Service.deleteMany({ category: electricalCategory._id });
        console.log('Cleared existing electrical services');

        const electricalServicesData = [
            {
                name: 'Electrical Inspection / Diagnosis',
                slug: 'electrical-inspection',
                category: electricalCategory._id,
                description: 'Complete wiring check, identify faults, short circuits, and load issues with safety inspection.',
                price: 200,
                image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop',
                features: ['Complete wiring check', 'Identify faults/short circuits', 'Safety inspection', 'Load issue identification'],
                whyChooseUs: ['Expert Diagnostic Tools', '30-45 Mins Duration', 'Safety first approach'],
                isActive: true
            },
            {
                name: 'Fan Installation / Repair',
                slug: 'fan-work',
                category: electricalCategory._id,
                description: 'Ceiling/Exhaust fan installation and repair for noise, slow speed, or complete failure.',
                price: 250,
                image: 'https://images.unsplash.com/photo-1621905252472-943afaa20e20?q=80&w=2574&auto=format&fit=crop',
                features: ['Ceiling Fan Setup', 'Exhaust Fan Fitting', 'Noise fixing', 'Motor repair'],
                whyChooseUs: ['Prompt Service', 'Quality Spares', 'Performance Guarantee'],
                isActive: true
            },
            {
                name: 'Light Installation (LED / Tube / Chandelier)',
                slug: 'light-installation',
                category: electricalCategory._id,
                description: 'Professional installation of bulbs, LED lights, tube lights, and decorative chandeliers.',
                price: 150,
                image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2670&auto=format&fit=crop',
                features: ['Bulb/LED replacement', 'Tube light fitting', 'Decorative light setup', 'Chandelier installation'],
                whyChooseUs: ['Aesthetic focused', 'Secure mounting', 'Proper wiring'],
                isActive: true
            },
            {
                name: 'Switch & Socket Repair',
                slug: 'switch-socket-repair',
                category: electricalCategory._id,
                description: 'Replace faulty switches/sockets and fix loose connections for safety.',
                price: 100,
                image: 'https://images.unsplash.com/photo-1558211503-d2ad24db04ef?q=80&w=2670&auto=format&fit=crop',
                features: ['Switch replacement', 'Socket fixing', 'Loose connection repair'],
                whyChooseUs: ['Branded switches used', 'Burn-out prevention', 'Safety checked'],
                isActive: true
            },
            {
                name: 'Wiring Work (New / Repair)',
                slug: 'wiring-work',
                category: electricalCategory._id,
                description: 'Internal & external house rewiring, fault fixing and new point installation.',
                price: 500,
                image: 'https://images.unsplash.com/photo-1452445197022-774f32197e41?q=80&w=2670&auto=format&fit=crop',
                features: ['Full house rewiring', 'Internal wiring fixing', 'Fault detection', 'New point creation'],
                whyChooseUs: ['Experienced Electricians', 'High Quality wires', 'Fire-safety compliance'],
                isActive: true
            },
            {
                name: 'MCB / Fuse Repair',
                slug: 'mcb-fuse-repair',
                category: electricalCategory._id,
                description: 'MCB replacement, fuse fixing and distribution board work for electrical protection.',
                price: 300,
                image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2574&auto=format&fit=crop',
                features: ['MCB replacement', 'Fuse fixing', 'DB board work'],
                whyChooseUs: ['Short-circuit protection', 'Accurate load rating', 'Reliable spares'],
                isActive: true
            },
            {
                name: 'Power Plug Wiring',
                slug: 'heavy-appliance-wiring',
                category: electricalCategory._id,
                description: 'Installation of high-load wiring and power plugs for AC, Fridge, and Washing Machines.',
                price: 300,
                image: 'https://images.unsplash.com/photo-1581092921461-7023023e3f84?q=80&w=2670&auto=format&fit=crop',
                features: ['AC Power plug setup', 'Fridge load wiring', 'High-load sockets'],
                whyChooseUs: ['Voltage drop prevention', 'Heat-resistant wires', 'Heavy duty fittings'],
                isActive: true
            },
            {
                name: 'Inverter Installation & Repair',
                slug: 'inverter-work',
                category: electricalCategory._id,
                description: 'Professional Inverter setup, battery connection and fault diagnosis.',
                price: 500,
                image: 'https://images.unsplash.com/photo-1590432326792-5e6ca4187019?q=80&w=2574&auto=format&fit=crop',
                features: ['Battery connection', 'System configuration', 'Diagnosis & repair'],
                whyChooseUs: ['Back-up optimization', 'Safe battery handling', 'Expert setup'],
                isActive: true
            },
            {
                name: 'Earthing Installation',
                slug: 'earthing-installation',
                category: electricalCategory._id,
                description: 'Proper grounding setup to ensure appliance and human safety.',
                price: 1500,
                image: 'https://images.unsplash.com/photo-1621905252507-b354bcadc0d1?q=80&w=2669&auto=format&fit=crop',
                features: ['Ground rod planting', 'Wiring connection', 'Resistance testing'],
                whyChooseUs: ['Shock prevention', 'Appliance safety', 'Standard compliance'],
                isActive: true
            },
            {
                name: 'Doorbell Work',
                slug: 'doorbell-work',
                category: electricalCategory._id,
                description: 'Electronic/Mechanical doorbell setup and existing system repair.',
                price: 150,
                image: 'https://images.unsplash.com/photo-1581092334247-448a604d2621?q=80&w=2670&auto=format&fit=crop',
                features: ['New bell setup', 'Wiring repair', 'Volume adjustment'],
                whyChooseUs: ['Instant fix', 'Hidden wiring', 'Quality bells'],
                isActive: true
            },
            {
                name: 'Geyser Electrical Work',
                slug: 'geyser-electrical',
                category: electricalCategory._id,
                description: 'Electrical connection for geysers and heating element issue repair.',
                price: 400,
                image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=2574&auto=format&fit=crop',
                features: ['Electric connection', 'Thermostat fixing', 'Heating element replacement'],
                whyChooseUs: ['Water-safe wiring', 'Shock proof setup', 'Reliable heating'],
                isActive: true
            },
            {
                name: 'Circuit Breaker Panel Work',
                slug: 'panel-work',
                category: electricalCategory._id,
                description: 'Professional distribution board setup and load balancing.',
                price: 800,
                image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop',
                features: ['Panel board setup', 'Load balancing', 'Labeling of circuits'],
                whyChooseUs: ['Organized wiring', 'Master electric check', 'Long-term reliability'],
                isActive: true
            },
            {
                name: 'Short Circuit Repair',
                slug: 'short-circuit-fix',
                category: electricalCategory._id,
                description: 'Identify and fix short circuits, including replacement of damaged wiring.',
                price: 500,
                image: 'https://images.unsplash.com/photo-1540104217325-064887327ef2?q=80&w=2574&auto=format&fit=crop',
                features: ['Root cause identification', 'Damaged wire replacement', 'Short circuit prevention'],
                whyChooseUs: ['Emergency response', 'Fire safety experts', 'Full diagnosis'],
                isActive: true
            },
            {
                name: 'Electrical Maintenance (AMC)',
                slug: 'electrical-maintenance',
                category: electricalCategory._id,
                description: 'Regular monthly inspection and minor repairs included in annual maintenance.',
                price: 2000,
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop',
                features: ['Monthly checkup', 'Thermal scanning', 'Tightening connections'],
                whyChooseUs: ['Preventive care', '24/7 priority support', 'Lower long-term costs'],
                isActive: true
            },
            {
                name: 'Emergency Electrical Service',
                slug: 'emergency-electrician',
                category: electricalCategory._id,
                description: '24/7 Immediate support for power failures and urgent electrical repairs.',
                price: 500,
                image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop',
                features: ['24/7 Availability', 'Rapid fault detection', 'Immediate power restoration'],
                whyChooseUs: ['Arrive in 60 mins', 'Equipped for on-spot fix', 'Reliable night service'],
                isActive: true
            }
        ];

        await Service.insertMany(electricalServicesData);
        console.log('Successfully seeded 15 Electrical Services to Cluster0');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding electrical:', error);
        process.exit(1);
    }
}

seedElectrical();
