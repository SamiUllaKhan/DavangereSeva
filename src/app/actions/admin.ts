'use server';

import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Service from '@/models/Service';
import Category from '@/models/Category';
import Booking from '@/models/Booking';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';

async function checkAdmin() {
    const cookieStore = await cookies();
    if (!cookieStore.has(SESSION_COOKIE_NAME)) {
        throw new Error('Not authorized');
    }
}

// Partner Verification
export async function getPendingPartners() {
    try {
        await checkAdmin();
        await dbConnect();
        const partners = await User.find({ role: 'partner', isVerified: false }).lean();
        return JSON.parse(JSON.stringify(partners));
    } catch (error) {
        console.error('Error fetching pending partners:', error);
        return [];
    }
}

export async function verifyPartner(partnerId: string, verify: boolean) {
    try {
        await checkAdmin();
        await dbConnect();
        if (verify) {
            await User.findByIdAndUpdate(partnerId, { isVerified: true });
        } else {
            // If rejected, we could either delete or mark as rejected. For now, let's just delete to keep it simple.
            await User.findByIdAndDelete(partnerId);
        }
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Service Management
export async function getServices() {
    try {
        await checkAdmin();
        await dbConnect();
        const services = await Service.find().populate('category').lean();
        return JSON.parse(JSON.stringify(services));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getCategories(all = false) {
    try {
        await dbConnect();
        const query = all ? {} : { status: { $ne: 'inactive' } };
        const categories = await Category.find(query).lean();
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function saveService(formData: FormData) {
    try {
        await checkAdmin();
        await dbConnect();

        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const categoryId = formData.get('category') as string;
        const description = formData.get('description') as string;
        const price = Number(formData.get('price'));
        const features = (formData.get('features') as string).split(',').map(f => f.trim());
        const whyChooseUs = (formData.get('whyChooseUs') as string).split(',').map(f => f.trim());

        const serviceData = {
            name,
            slug,
            category: categoryId,
            description,
            price,
            features,
            whyChooseUs
        };

        if (id) {
            await Service.findByIdAndUpdate(id, serviceData);
        } else {
            await Service.create(serviceData);
        }

        revalidatePath('/admin/dashboard');
        revalidatePath('/services');
        return { success: true };
    } catch (error: any) {
        console.error('Error saving service:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteService(id: string) {
    try {
        await checkAdmin();
        await dbConnect();
        await Service.findByIdAndDelete(id);
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
// Category Management
export async function saveCategory(formData: FormData) {
    try {
        await checkAdmin();
        await dbConnect();

        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const icon = formData.get('icon') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as string || 'active';

        const categoryData = {
            name,
            slug,
            icon,
            description,
            status
        };

        if (id) {
            await Category.findByIdAndUpdate(id, categoryData);
        } else {
            await Category.create(categoryData);
        }

        revalidatePath('/admin/dashboard');
        revalidatePath('/services');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('Error saving category:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteCategory(id: string) {
    try {
        await checkAdmin();
        await dbConnect();

        // Check if any services are using this category
        const serviceCount = await Service.countDocuments({ category: id });
        if (serviceCount > 0) {
            throw new Error(`Cannot delete category: ${serviceCount} services are using it.`);
        }

        await Category.findByIdAndDelete(id);
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
// Review Management
export async function getPendingReviews() {
    try {
        await checkAdmin();
        await dbConnect();
        const reviews = await Booking.find({
            rating: { $exists: true },
            isReviewApproved: false
        }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(reviews));
    } catch (error) {
        console.error('Error fetching pending reviews:', error);
        return [];
    }
}

export async function approveReview(bookingId: string) {
    try {
        await checkAdmin();
        await dbConnect();

        const booking = await Booking.findByIdAndUpdate(bookingId, { isReviewApproved: true }, { new: true });
        if (!booking) throw new Error('Booking not found');

        // Update Service average rating
        const serviceId = booking.service?.id;
        if (serviceId) {
            const allApprovedRatings = await Booking.find({
                'service.id': serviceId,
                rating: { $exists: true },
                isReviewApproved: true
            }).select('rating');

            const count = allApprovedRatings.length;
            const avg = count > 0 ? allApprovedRatings.reduce((sum: number, b: any) => sum + b.rating, 0) / count : 0;

            await Service.findByIdAndUpdate(serviceId, {
                rating: avg,
                reviewCount: count
            });
        }

        revalidatePath('/admin');
        revalidatePath('/services');
        return { success: true };
    } catch (error: any) {
        console.error('Error approving review:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteReview(bookingId: string) {
    try {
        await checkAdmin();
        await dbConnect();

        // Just clear the rating and review from the booking instead of deleting the booking
        const booking = await Booking.findByIdAndUpdate(bookingId, {
            $unset: { rating: "", review: "" },
            isReviewApproved: false
        });

        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting review:', error);
        return { success: false, error: error.message };
    }
}
