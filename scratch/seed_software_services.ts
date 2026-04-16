import dbConnect from '../src/lib/mongodb';
import Category from '../src/models/Category';
import Service from '../src/models/Service';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  await dbConnect();

  try {
    // 1. Create Software & Web Category
    let category = await Category.findOne({ slug: 'software-web-development' });
    if (!category) {
      category = await Category.create({
        name: 'App & Website Development',
        slug: 'software-web-development',
        icon: 'Code',
        description: 'Custom software, mobile apps, and professional websites for your business expansion.',
        status: 'active'
      });
      console.log('Category created: App & Website Development');
    } else {
      console.log('Category already exists: App & Website Development');
    }

    const services = [
      {
        name: 'Business Landing Page',
        slug: 'business-landing-page',
        category: category._id,
        description: 'Single page professional landing page for your business with contact forms and mobile responsiveness.',
        shortDescription: 'Professional one-page website.',
        price: 5000,
        priceUnit: 'Starting from',
        image: '/images/uploads/web-dev.png',
        features: ['Mobile responsive design', 'Contact form integration', 'Basic SEO setup', '1 year free hosting guidance'],
        whyChooseUs: ['Modern UI/UX', 'Fast loading speed', 'Clean code approach'],
        isActive: true
      },
      {
        name: 'E-commerce Website (Standard)',
        slug: 'ecommerce-website-standard',
        category: category._id,
        description: 'Full-featured online store with product catalog, cart, and payment gateway integration.',
        shortDescription: 'Sell your products online.',
        price: 15000,
        priceUnit: 'Starting from',
        image: '/images/uploads/web-dev.png',
        features: ['Product management dashboard', 'Order tracking system', 'Payment gateway (Razorpay/Stripe)', 'User accounts'],
        whyChooseUs: ['Scalable architecture', 'Secure transactions', 'Easy management'],
        isActive: true
      },
      {
        name: 'Android/iOS App Development',
        slug: 'mobile-app-development',
        category: category._id,
        description: 'Hybrid mobile application development for both Android and iOS platforms using Flutter or React Native.',
        shortDescription: 'Custom mobile apps for your business.',
        price: 35000,
        priceUnit: 'Quote based',
        image: '/images/uploads/app-dev.png',
        features: ['Cross-platform compatibility', 'Push notifications', 'Play Store/App Store publishing', 'Real-time database integration'],
        whyChooseUs: ['High performance', 'Native feel', 'Ongoing support'],
        isActive: true
      },
      {
        name: 'Custom Software Solution',
        slug: 'custom-software-solution',
        category: category._id,
        description: 'Bespoke software development tailored to your specific business processes (ERP, CRM, Inventory).',
        shortDescription: 'Solve business problems with software.',
        price: 25000,
        priceUnit: 'Starting from',
        image: '/images/uploads/app-dev.png',
        features: ['Requirement analysis', 'Modular architecture', 'User access control', 'Automated reporting'],
        whyChooseUs: ['Built for your needs', 'Data security', 'User-friendly interface'],
        isActive: true
      },
      {
        name: 'Website Maintenance & Speed Optimization',
        slug: 'web-maintenance-optimization',
        category: category._id,
        description: 'Monthly maintenance, security updates, and performance optimization for your existing website.',
        shortDescription: 'Keep your website fast and secure.',
        price: 2000,
        priceUnit: 'Per month',
        image: '/images/uploads/web-dev.png',
        features: ['Malware scanning', 'Database optimization', 'Cloudflare setup', 'Content updates'],
        whyChooseUs: ['Zero downtime', 'Improved SEO ranking', 'Expert technical support'],
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

    console.log('Software seeding completed successfully');
  } catch (error) {
    console.error('Error seeding software services:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
