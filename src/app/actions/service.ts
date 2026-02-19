'use server';

import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import Category from '@/models/Category';

export async function getCategories() {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
}

export async function getServices(categorySlug?: string) {
    await dbConnect();
    let filter: any = { isActive: true };

    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug }).lean();
        if (category) {
            filter.category = category._id;
        } else {
            return [];
        }
    }

    const services = await Service.find(filter).populate('category').sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
}

export async function getServiceBySlug(slug: string) {
    await dbConnect();
    const service = await Service.findOne({ slug, isActive: true }).populate('category').lean();
    if (!service) return null;
    return JSON.parse(JSON.stringify(service));
}

export async function searchServices(query: string) {
    await dbConnect();
    if (!query || query.trim().length < 2) return [];

    const regex = new RegExp(query.trim(), 'i');
    const services = await Service.find({
        isActive: true,
        $or: [
            { name: regex },
            { description: regex },
            { shortDescription: regex },
        ]
    }).populate('category').lean();

    return JSON.parse(JSON.stringify(services));
}

export async function getAllServicesForAdmin() {
    await dbConnect();
    const services = await Service.find({}).populate('category').sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(services));
}

export async function createService(data: {
    name: string;
    slug: string;
    categoryId: string;
    description: string;
    shortDescription?: string;
    price: number;
    priceUnit?: string;
    features?: string[];
    whyChooseUs?: string[];
}) {
    await dbConnect();
    const service = await Service.create({
        ...data,
        category: data.categoryId,
    });
    return JSON.parse(JSON.stringify(service));
}

export async function updateService(id: string, data: any) {
    await dbConnect();
    if (data.categoryId) {
        data.category = data.categoryId;
        delete data.categoryId;
    }
    const service = await Service.findByIdAndUpdate(id, data, { new: true }).populate('category').lean();
    return JSON.parse(JSON.stringify(service));
}

export async function toggleServiceActive(id: string) {
    await dbConnect();
    const service = await Service.findById(id);
    if (!service) return { success: false, error: 'Service not found' };
    service.isActive = !service.isActive;
    await service.save();
    return { success: true, isActive: service.isActive };
}
