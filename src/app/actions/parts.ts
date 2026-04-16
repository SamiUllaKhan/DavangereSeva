'use server';

import dbConnect from '@/lib/mongodb';
import Part from '@/models/Part';
import { revalidatePath } from 'next/cache';

export async function getParts() {
    try {
        await dbConnect();
        const parts = await Part.find({}).sort({ updatedAt: -1 });
        return JSON.parse(JSON.stringify(parts));
    } catch (error) {
        console.error('Error fetching parts:', error);
        return [];
    }
}

export async function addPart(formData: any) {
    try {
        await dbConnect();
        const part = await Part.create(formData);
        revalidatePath('/admin');
        return { success: true, part: JSON.parse(JSON.stringify(part)) };
    } catch (error) {
        console.error('Error adding part:', error);
        return { success: false, error: 'Failed to add part' };
    }
}

export async function updatePartPrice(id: string, newPrice: number) {
    try {
        await dbConnect();
        const part = await Part.findByIdAndUpdate(
            id,
            { currentPrice: newPrice, lastUpdated: new Date() },
            { new: true }
        );
        revalidatePath('/admin');
        return { success: true, part: JSON.parse(JSON.stringify(part)) };
    } catch (error) {
        console.error('Error updating part price:', error);
        return { success: false, error: 'Failed to update price' };
    }
}

export async function deletePart(id: string) {
    try {
        await dbConnect();
        await Part.findByIdAndDelete(id);
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Error deleting part:', error);
        return { success: false, error: 'Failed to delete part' };
    }
}
