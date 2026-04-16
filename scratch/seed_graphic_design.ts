import dbConnect from '../src/lib/mongodb';
import Category from '../src/models/Category';
import Service from '../src/models/Service';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  await dbConnect();

  try {
    // 1. Create Graphic Design Category
    let category = await Category.findOne({ slug: 'graphic-design' });
    if (!category) {
      category = await Category.create({
        name: 'Graphic Design',
        slug: 'graphic-design',
        icon: 'Palette',
        description: 'Professional visual branding and creative design services for your business.',
        status: 'active'
      });
      console.log('Category created: Graphic Design');
    } else {
      console.log('Category already exists: Graphic Design');
    }

    const services = [
      {
        name: 'Professional Logo Design',
        slug: 'logo-design',
        category: category._id,
        description: 'Custom, high-quality logo design with 3 concepts and source files included (AI, PSD, PNG).',
        shortDescription: 'Brand identity starting with a logo.',
        price: 2500,
        priceUnit: 'Fixed',
        image: '/images/uploads/graphic-design.png',
        features: ['3 Unique concepts', 'Unlimited revisions', 'Vector source files', 'Brand style guide'],
        whyChooseUs: ['Creative excellence', 'Original designs', 'Fast delivery'],
        isActive: true
      },
      {
        name: 'Social Media Poster Design',
        slug: 'social-media-posters',
        category: category._id,
        description: 'Eye-catching posters for Instagram, Facebook, and LinkedIn to boost your online presence.',
        shortDescription: 'Daily posts & ads design.',
        price: 400,
        priceUnit: 'Per design',
        image: '/images/uploads/graphic-design.png',
        features: ['Optimized for all platforms', 'High-res exports', 'Consistent branding', 'Quick 24h turnaround'],
        whyChooseUs: ['Viral-ready designs', 'Engaging visuals', 'Affordable rates'],
        isActive: true
      },
      {
        name: 'Business Card & Letterhead',
        slug: 'business-stationery',
        category: category._id,
        description: 'Professional business card and corporate stationery design for networking.',
        shortDescription: 'Corporate identity design.',
        price: 800,
        priceUnit: 'Fixed',
        image: '/images/uploads/graphic-design.png',
        features: ['Double-sided designs', 'Print-ready files', 'Modern layouts', 'QR code integration'],
        whyChooseUs: ['Corporate look', 'Precise sizing', 'Professional finish'],
        isActive: true
      },
      {
        name: 'Marketing Brochure/Flyer',
        slug: 'brochure-flyer-design',
        category: category._id,
        description: 'Custom flyer or brochure design for offline marketing and events.',
        shortDescription: 'Marketing materials design.',
        price: 1500,
        priceUnit: 'Starting from',
        image: '/images/uploads/graphic-design.png',
        features: ['Tri-fold/Bi-fold options', 'Effective call-to-actions', 'Visual storytelling', 'Print-ready CMYK'],
        whyChooseUs: ['High impact', 'Clear communication', 'Quality visuals'],
        isActive: true
      },
      {
        name: 'UI/UX Prototype Design',
        slug: 'ui-ux-design',
        category: category._id,
        description: 'User interface and experience design for apps and websites using Figma or Adobe XD.',
        shortDescription: 'Modern app & web interfaces.',
        price: 10000,
        priceUnit: 'Starting from',
        image: '/images/uploads/graphic-design.png',
        features: ['Interactive prototyping', 'Wireframing', 'User flow design', 'Developer handoff files'],
        whyChooseUs: ['User-centric approach', 'State-of-the-art tools', 'Strategic design'],
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

    console.log('Graphic Design seeding completed successfully');
  } catch (error) {
    console.error('Error seeding graphic design services:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
