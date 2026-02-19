'use server';

import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'user_session';

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    // Partner specific
    const serviceCategory = formData.get('serviceCategory') as string;
    const experience = formData.get('experience') as string;

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        const userData: any = {
            name,
            email,
            phone,
            password,
            role,
        };

        if (role === 'partner') {
            userData.serviceCategory = serviceCategory;
            userData.experience = experience;
        }

        const user = await User.create(userData);

        if (user) {
            const cookieStore = await cookies();
            cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({
                id: user._id,
                role: user.role,
                name: user.name
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            });
            return { success: true, role: user.role };
        }

        return { success: false, error: 'Registration failed' };
    } catch (error: any) {
        console.error('Registration error:', error);
        return { success: false, error: error.message || 'Internal server error' };
    }
}

export async function userLogout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect('/');
}

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await dbConnect();
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            const cookieStore = await cookies();
            cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({
                id: user._id,
                role: user.role,
                name: user.name
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            });
            return { success: true, role: user.role };
        }

        return { success: false, error: 'Invalid email or password' };
    } catch (error: any) {
        console.error('Login error:', error);
        return { success: false, error: error.message || 'Authentication failed' };
    }
}

export async function getUserSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    if (!session) return null;
    try {
        return JSON.parse(session.value);
    } catch {
        return null;
    }
}

export async function getCurrentUser() {
    const session = await getUserSession();
    if (!session || !session.id) return null;

    try {
        await dbConnect();
        const user = await User.findById(session.id).select('name email phone role').lean();
        if (!user) return null;
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}
