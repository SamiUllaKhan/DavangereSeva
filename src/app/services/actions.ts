'use server';

import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import Category from '@/models/Category';

export async function getCategoriesAndServices() {
    try {
        await dbConnect();
        
        const categories = await Category.find({ status: { $ne: 'inactive' } })
            .sort({ name: 1 })
            .lean();
            
        const services = await Service.find({ isActive: true })
            .populate('category')
            .lean();
            
        return {
            categories: JSON.parse(JSON.stringify(categories)),
            services: JSON.parse(JSON.stringify(services))
        };
    } catch (error) {
        console.error('Error fetching categories and services:', error);
        return { categories: [], services: [] };
    }
}
