import dbConnect from '../src/lib/mongodb';
import Category from '../src/models/Category';
import Service from '../src/models/Service';
import mongoose from 'mongoose';

async function seed() {
  await dbConnect();

  try {
    // 1. Ensure Category exists
    let category = await Category.findOne({ slug: 'computer-repair' });
    if (!category) {
      category = await Category.create({
        name: 'Computer Repair Service',
        slug: 'computer-repair',
        icon: 'Monitor',
        description: 'Professional repair and maintenance for computers, laptops, and peripherals.',
        status: 'active'
      });
      console.log('Category created');
    } else {
      console.log('Category already exists');
    }

    const services = [
      {
        name: 'Standard Inspection (Within 5 km)',
        slug: 'standard-inspection-within-5km',
        category: category._id,
        description: 'On-site inspection and visiting fees for laptops and printers within 5 km range.',
        shortDescription: 'Basic inspection within 5 km.',
        price: 300,
        priceUnit: 'Fixed',
        image: '/images/uploads/computer-inspection.png',
        features: ['On-site visit', 'Laptop inspection', 'Printer inspection', 'Basic diagnostics'],
        whyChooseUs: ['Prompt response', 'Expert technicians', 'Transparent pricing'],
        isActive: true
      },
      {
        name: 'Extended Visit (Above 5 km)',
        slug: 'extended-visit-above-5km',
        category: category._id,
        description: 'On-site inspection and visiting fees for laptops and printers for locations beyond 5 km.',
        shortDescription: 'Extended visit beyond 5 km.',
        price: 450,
        priceUnit: 'Fixed',
        image: '/images/uploads/computer-inspection.png',
        features: ['Extended travel coverage', 'Laptop inspection', 'Printer inspection', 'Full diagnostics'],
        whyChooseUs: ['Wider reach', 'Professional service', 'Reliable support'],
        isActive: true
      },
      {
        name: 'General Computer Service',
        slug: 'general-computer-service',
        category: category._id,
        description: 'Complete general service and maintenance for your computer or laptop. Note: 18% GST extra.',
        shortDescription: 'General maintenance and cleanup.',
        price: 600,
        priceUnit: 'Base price',
        image: '/images/uploads/computer-inspection.png',
        features: ['Interior cleaning', 'Thermal paste replacement', 'Performance optimization', 'Dust removal'],
        whyChooseUs: ['Extended hardware life', 'Better performance', 'Verified professionals'],
        isActive: true
      },
      {
        name: 'OS & Essential Software Setup',
        slug: 'os-essential-software-setup',
        category: category._id,
        description: 'Full Operating System (OS) setup including essential utility apps. Note: 18% GST extra.',
        shortDescription: 'Complete OS and utilities installation.',
        price: 700,
        priceUnit: 'Base price',
        image: '/images/uploads/os-installation.png',
        features: ['Windows/Linux installation', 'Driver updates', 'Basic utility apps', 'System configuration'],
        whyChooseUs: ['Genuine setup', 'Optimized configuration', 'Quick turnaround'],
        isActive: true
      },
      {
        name: 'Individual Software Installation',
        slug: 'individual-software-installation',
        category: category._id,
        description: 'Installation of a specific software application as per customer requirement.',
        shortDescription: 'Per software installation.',
        price: 150,
        priceUnit: 'Per software',
        image: '/images/uploads/os-installation.png',
        features: ['Safe installation', 'Compatibility check', 'Basic configuration'],
        whyChooseUs: ['Expert handling', 'No malware risk', 'Instant setup'],
        isActive: true
      },
      {
        name: 'Hardware Repair & Parts Quotation',
        slug: 'hardware-repair-parts-quotation',
        category: category._id,
        description: 'Request a formal quotation for hardware components or spare parts required for repair. Repairs proceed only after your explicit approval.',
        shortDescription: 'Formal quote for spare parts.',
        price: 0,
        priceUnit: 'Quote based',
        image: '/images/uploads/hardware-parts.png',
        features: ['Detailed component analysis', 'Genuine spare parts source', 'Fixed price estimate', 'No hidden costs'],
        whyChooseUs: ['Honest estimates', 'Genuine parts', 'Approval-based repairs'],
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
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
