'use server';

import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import { getCurrentUser } from './user';

export async function getReviewsForService(serviceId: string) {
    await dbConnect();
    const reviews = await Review.find({ serviceId })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();
    return JSON.parse(JSON.stringify(reviews));
}

export async function getServiceRating(serviceId: string) {
    await dbConnect();
    const reviews = await Review.find({ serviceId }).lean();
    if (reviews.length === 0) return { average: 0, count: 0 };

    const total = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    return {
        average: Math.round((total / reviews.length) * 10) / 10,
        count: reviews.length,
    };
}

export async function createReview(data: {
    serviceId: string;
    rating: number;
    comment: string;
}) {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, error: 'You must be logged in to leave a review.' };
    }

    if (data.rating < 1 || data.rating > 5) {
        return { success: false, error: 'Rating must be between 1 and 5.' };
    }

    if (!data.comment || data.comment.trim().length < 5) {
        return { success: false, error: 'Review must be at least 5 characters.' };
    }

    await dbConnect();

    // Check if user already reviewed this service
    const existing = await Review.findOne({
        serviceId: data.serviceId,
        userId: user._id,
    });

    if (existing) {
        return { success: false, error: 'You have already reviewed this service.' };
    }

    const review = await Review.create({
        serviceId: data.serviceId,
        userId: user._id,
        userName: user.name,
        rating: data.rating,
        comment: data.comment.trim(),
    });

    return { success: true, review: JSON.parse(JSON.stringify(review)) };
}
