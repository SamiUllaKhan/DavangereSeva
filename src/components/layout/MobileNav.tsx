'use client';

import Link from 'next/link';
import { Home, Grid, Calendar, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Grid, label: 'Categories', href: '/categories' },
    { icon: Calendar, label: 'Bookings', href: '/bookings' },
    { icon: User, label: 'Account', href: '/profile' },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group transition-colors ${isActive ? 'text-primary' : 'text-gray-500'
                                }`}
                        >
                            <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
