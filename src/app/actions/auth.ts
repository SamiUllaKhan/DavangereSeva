'use server';

import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'admin_session';

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        await dbConnect();

        // For demo purposes, we check against a hardcoded admin if the DB is empty
        // In a real app, you'd have a proper setup/seed process
        let admin = await Admin.findOne({ username });

        if (!admin && username === 'admin' && password === 'admin123') {
            // Create default admin if not exists
            admin = await Admin.create({
                username: 'admin',
                password: 'admin123', // In real app, hash this!
                name: 'System Admin'
            });
        }

        if (admin && admin.password === password) {
            const cookieStore = await cookies();
            cookieStore.set(SESSION_COOKIE_NAME, 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/'
            });
            return { success: true };
        }

        return { success: false, error: 'Invalid username or password' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Internal server error' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect('/');
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has(SESSION_COOKIE_NAME);
}
