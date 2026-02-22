'use client';

import Link from 'next/link';
import { Search, Menu, Phone, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/auth';
import { userLogout } from '@/app/actions/user';

export default function Navbar({ isAuth, userSession }: { isAuth: boolean, userSession?: any }) {
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
                    <div className="hidden lg:flex items-center gap-2 text-primary font-semibold mr-4">
                        <Phone size={18} />
                        <span>+91 890 4777 090</span>
                    </div>

                    {isAuth ? (
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/admin">
                                <Button variant="outline" size="sm">Admin</Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 gap-2"
                                onClick={async () => await logout()}
                            >
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    ) : userSession ? (
                        <div className="hidden md:flex items-center gap-3">
                            <Link href={userSession.role === 'partner' ? '/partner-dashboard' : '/bookings'}>
                                <Button variant="outline" size="sm" className="rounded-xl border-primary text-primary hover:bg-primary/5">
                                    {userSession.role === 'partner' ? 'Service Dashboard' : 'My Bookings'}
                                </Button>
                            </Link>
                            <Link href="/profile">
                                <Button variant="ghost" size="sm" className="text-gray-600 gap-2">
                                    Profile
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-rose-600 gap-2"
                                onClick={async () => {
                                    await userLogout();
                                    window.location.reload();
                                }}
                            >
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/login">
                                <Button className="rounded-xl bg-primary text-white hover:bg-primary/90 transition-all font-bold px-6">Login / Join</Button>
                            </Link>
                            <Link href="/admin/login">
                                <Button variant="ghost" className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40 hover:opacity-100">Management</Button>
                            </Link>
                        </div>
                    )}

                    <Button size="icon" variant="ghost" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
