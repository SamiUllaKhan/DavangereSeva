import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set. Please set it in your environment variables.');
  process.exit(1);
}

// Define schemas inline for the seed script
const CategorySchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  icon: String,
  description: String,
  color: String,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: String,
  shortDescription: String,
  price: Number,
  priceUnit: { type: String, default: 'Starting from' },
  features: [String],
  whyChooseUs: [String],
  isActive: { type: Boolean, default: true },
  image: String,
}, { timestamps: true });

ServiceSchema.index({ name: 'text', description: 'text', shortDescription: 'text' });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const categoriesData = [
  { name: 'Cleaning', slug: 'cleaning', icon: 'Sparkles', description: 'Deep cleaning for homes and offices.', color: 'bg-blue-50' },
  { name: 'Plumbing', slug: 'plumbing', icon: 'Wrench', description: 'Expert solutions for all plumbing needs.', color: 'bg-indigo-50' },
  { name: 'Electrician', slug: 'electrician', icon: 'Plug', description: 'Certified electrical repairs and installs.', color: 'bg-amber-50' },
  { name: 'AC Repair', slug: 'ac-repair', icon: 'Wind', description: 'Maintenance and repair for all AC types.', color: 'bg-cyan-50' },
  { name: 'Painting', slug: 'painting', icon: 'Paintbrush', description: 'Professional interior and exterior painting.', color: 'bg-rose-50' },
  { name: 'Pest Control', slug: 'pest-control', icon: 'Bug', description: 'Safe and effective pest management.', color: 'bg-emerald-50' },
  { name: 'Appliance Repair', slug: 'appliance-repair', icon: 'Monitor', description: 'Repair for all major home appliances.', color: 'bg-purple-50' },
  { name: 'Packers & Movers', slug: 'packers-movers', icon: 'Truck', description: 'Reliable packing and moving services.', color: 'bg-orange-50' },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Upsert categories
    const categoryMap = {};
    for (const cat of categoriesData) {
      const result = await Category.findOneAndUpdate(
        { slug: cat.slug },
        { $set: cat },
        { upsert: true, new: true }
      );
      categoryMap[cat.slug] = result._id;
      console.log(`Category upserted: ${cat.name}`);
    }

    // Services data with category references
    const servicesData = [
      {
        name: 'Full Home Cleaning',
        slug: 'cleaning',
        category: categoryMap['cleaning'],
        description: 'Comprehensive deep cleaning service for your entire home. From kitchen degreasing to bathroom sanitization, we cover everything.',
        shortDescription: 'Complete home deep cleaning service',
        price: 1999,
        features: ['Floor Scrubbing & Polishing', 'Kitchen Deep Cleaning', 'Bathroom Sanitization', 'Window & Grill Cleaning', 'Dusting & Vacuuming'],
        whyChooseUs: ['Trained professionals', 'Eco-friendly products', 'Same-day service available'],
      },
      {
        name: 'Professional Plumbing',
        slug: 'plumbing',
        category: categoryMap['plumbing'],
        description: 'Expert plumbing solutions for leaks, pipe repairs, and new installations. Fast and reliable service across Davanagere.',
        shortDescription: 'Expert plumbing for leaks and repairs',
        price: 299,
        features: ['Leak Detection', 'Tap & Shower Repair', 'Pipe Blockage Clearing', 'Tank Cleaning', 'Sanitary Fitting'],
        whyChooseUs: ['Licensed plumbers', '24/7 emergency service', 'Genuine spare parts'],
      },
      {
        name: 'Expert Electrician',
        slug: 'electrician',
        category: categoryMap['electrician'],
        description: 'Certified electricians for all your wiring, switchboard fix, and electrical appliance installation needs.',
        shortDescription: 'Certified electrical repairs and installs',
        price: 199,
        features: ['Wiring & Rewiring', 'Switchboard Repair', 'Fan & Light Installation', 'Inverter Setup', 'Short Circuit Fix'],
        whyChooseUs: ['Certified electricians', 'Safety-first approach', 'Affordable rates'],
      },
      {
        name: 'AC Repair & Service',
        slug: 'ac-repair',
        category: categoryMap['ac-repair'],
        description: 'Professional AC repair and maintenance service in Davanagere. Our certified technicians handle all brands and models, ensuring efficient cooling and long life for your air conditioner.',
        shortDescription: 'AC repair and maintenance for all brands',
        price: 499,
        features: ['Deep Cleaning of Filters & Coils', 'Gas Charging & Leak Fix', 'Electrical Component Check', 'Drainage Pipe Cleaning', '30 Days Service Warranty'],
        whyChooseUs: ['All brands covered', 'Genuine spare parts', '30-day warranty'],
      },
      {
        name: 'Home Painting',
        slug: 'painting',
        category: categoryMap['painting'],
        description: 'Professional interior and exterior painting services with high-quality finish and expert color consultation.',
        shortDescription: 'Interior and exterior painting services',
        price: 5000,
        features: ['Wall Putty Application', 'Interior Emulsion', 'Exterior Weather-proof Paint', 'Texture Painting', 'Wood & Metal Polish'],
        whyChooseUs: ['Expert color consultation', 'Premium paints used', 'Clean and tidy work'],
      },
      {
        name: 'Pest Control',
        slug: 'pest-control',
        category: categoryMap['pest-control'],
        description: 'Effective and safe pest control services to keep your home free from termites, cockroaches, and bed bugs.',
        shortDescription: 'Safe pest control for all types',
        price: 899,
        features: ['Termite Treatment', 'Cockroach Gel', 'Bed Bug Heat Treatment', 'Rodent Control', 'Mosquito Fogging'],
        whyChooseUs: ['Government approved chemicals', 'Child and pet safe', '90-day warranty'],
      },
      {
        name: 'Appliance Repair',
        slug: 'appliance-repair',
        category: categoryMap['appliance-repair'],
        description: 'Repair services for washing machines, refrigerators, microwaves, and other major home appliances.',
        shortDescription: 'Repair for all major home appliances',
        price: 399,
        features: ['Washing Machine Setup', 'Fridge Gas Refilling', 'Oven Heating Issues', 'TV Wall Mount', 'Spare Parts Replacement'],
        whyChooseUs: ['Multi-brand expertise', 'Quick turnaround', 'Genuine parts only'],
      },
      {
        name: 'Packers & Movers',
        slug: 'packers-movers',
        category: categoryMap['packers-movers'],
        description: 'Safe and hassle-free relocation services within Davanagere or for inter-city shifting.',
        shortDescription: 'Reliable packing and moving services',
        price: 4500,
        features: ['Premium Packing', 'Loading & Unloading', 'Secure Transport', 'Furniture Disassembly', 'Insurance Coverage'],
        whyChooseUs: ['Insured transport', 'Professional packers', 'On-time delivery guarantee'],
      },
    ];

    for (const svc of servicesData) {
      await Service.findOneAndUpdate(
        { slug: svc.slug },
        { $set: svc },
        { upsert: true, new: true }
      );
      console.log(`Service upserted: ${svc.name}`);
    }

    console.log('\nSeed completed successfully!');
    console.log(`Categories: ${categoriesData.length}`);
    console.log(`Services: ${servicesData.length}`);

  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
