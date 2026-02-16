'use client';

import Link from 'next/link';
import { Search, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-primary uppercase tracking-wider">Davanagere Seva</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/services" className="transition-colors hover:text-primary">All Services</Link>
                    <Link href="/how-it-works" className="transition-colors hover:text-primary">How it works</Link>
                    <Link href="/about" className="transition-colors hover:text-primary">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-primary font-semibold">
                        <Phone size={18} />
                        <span>+91 98765 43210</span>
                    </div>
                    <Link href="/admin/login">
                        <Button variant="outline" className="hidden md:flex">Admin Login</Button>
                    </Link>
                    <Button size="icon" variant="ghost" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
