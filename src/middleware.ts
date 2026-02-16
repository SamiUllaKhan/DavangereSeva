import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define the cookie name used for admin session
    const SESSION_COOKIE_NAME = 'admin_session';
    const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !hasSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Redirect from /admin/login to /admin if already logged in
    if (pathname === '/admin/login' && hasSession) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
