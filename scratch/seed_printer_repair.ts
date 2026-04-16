import dbConnect from '../src/lib/mongodb';
import Category from '../src/models/Category';
import Service from '../src/models/Service';
import mongoose from 'mongoose';

async function seed() {
  await dbConnect();

  try {
    // 1. Create Printer Repair Category
    let category = await Category.findOne({ slug: 'printer-repair' });
    if (!category) {
      category = await Category.create({
        name: 'Printer Repair Service',
        slug: 'printer-repair',
        icon: 'Printer',
        description: 'Professional repair, servicing, and cartridge refilling for all types of printers.',
        status: 'active'
      });
      console.log('Category created: Printer Repair Service');
    } else {
      console.log('Category already exists: Printer Repair Service');
    }

    const services = [
      {
        name: 'Laser Printer General Service',
        slug: 'laser-printer-general-service',
        category: category._id,
        description: 'Deep cleaning and servicing of laser printers for optimal performance.',
        shortDescription: 'Professional laser printer maintenance.',
        price: 500,
        priceUnit: 'Base price',
        image: '/images/uploads/printer-service.png',
        features: ['Dust & debris removal', 'Paper path cleaning', 'Fuser unit inspection', 'Roller cleaning'],
        whyChooseUs: ['Expert handling', 'Genuine lubricants used', 'Reduces paper jams'],
        isActive: true
      },
      {
        name: 'InkTank/Inkjet Printer Servicing',
        slug: 'inktank-inkjet-printer-servicing',
        category: category._id,
        description: 'Specialized servicing for InkTank and Inkjet printers including head cleaning and ink path flush.',
        shortDescription: 'Inkjet & InkTank maintenance.',
        price: 600,
        priceUnit: 'Base price',
        image: '/images/uploads/printer-service.png',
        features: ['Print head cleaning', 'Ink tube flushing', 'Waster ink pad reset', 'Alignment check'],
        whyChooseUs: ['No ink leakage', 'Vibrant print quality', 'Authorized techniques'],
        isActive: true
      },
      {
        name: 'Laser Toner Cartridge Refilling',
        slug: 'laser-toner-cartridge-refilling',
        category: category._id,
        description: 'High-quality toner refilling for laser printers with drum cleaning.',
        shortDescription: 'Reliable laser toner refill.',
        price: 350,
        priceUnit: 'Starting from',
        image: '/images/uploads/printer-refill.png',
        features: ['High-yield toner powder', 'Drum cleaning', 'Waste toner disposal', 'Test print included'],
        whyChooseUs: ['Crisp black text', 'Economical', 'Quick service'],
        isActive: true
      },
      {
        name: 'Ink Cartridge Refilling (Black/Color)',
        slug: 'ink-cartridge-refilling',
        category: category._id,
        description: 'Manual refilling of inkjet cartridges with premium quality ink.',
        shortDescription: 'Cost-effective ink refill.',
        price: 200,
        priceUnit: 'Per cartridge',
        image: '/images/uploads/printer-refill.png',
        features: ['Anti-clogging ink', 'Vacuum filling', 'Chip reset (where possible)', 'Leakage test'],
        whyChooseUs: ['Budget friendly', 'High density ink', 'Extended cartridge life'],
        isActive: true
      },
      {
        name: 'Network & Wi-Fi Printer Setup',
        slug: 'network-wifi-printer-setup',
        category: category._id,
        description: 'Setting up your wireless or network printer for multi-device access.',
        shortDescription: 'Printer connectivity setup.',
        price: 400,
        priceUnit: 'Fixed',
        image: '/images/uploads/printer-setup.png',
        features: ['Wireless configuration', 'Network IP setup', 'Driver installation', 'Mobile print setup'],
        whyChooseUs: ['Seamless connectivity', 'Multi-device support', 'Expert configuration'],
        isActive: true
      },
      {
        name: 'Printer Spare Parts & Repairs',
        slug: 'printer-spare-parts-repairs',
        category: category._id,
        description: 'Replacement of Teflon, Pressure Roller, Pick-up Roller, or Logic Board. Formal quotation shared after inspection.',
        shortDescription: 'Component level repair.',
        price: 0,
        priceUnit: 'Quote based',
        image: '/images/uploads/printer-parts.png',
        features: ['Genuine rollers', 'Teflon sleeve replacement', 'Logic board repair', 'Pick-up roller fix'],
        whyChooseUs: ['Quality spares', 'Reliable repairs', 'Warranty on parts'],
        isActive: true
      }
    ];

    for (const serviceData of services) {
      const existing = await Service.findOne({ slug: serviceData.slug });
      if (existing) {
        await Service.updateOne({ slug: serviceData.slug }, serviceData);
        console.log(`Updated service: ${serviceData.name}`);
      } else {
        await Service.create(serviceData);
        console.log(`Created service: ${serviceData.name}`);
      }
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding printer services:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
