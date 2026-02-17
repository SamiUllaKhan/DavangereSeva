export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({
            status: 'success',
            message: 'Database connection established successfully'
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect to database',
            error: error.message
        }, { status: 500 });
    }
}
