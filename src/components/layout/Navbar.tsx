'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, Phone, LogOut, X, Briefcase, Info, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/auth';
import { userLogout } from '@/app/actions/user';

export default function Navbar({ isAuth, userSession }: { isAuth: boolean, userSession?: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-black text-xl text-primary uppercase tracking-tighter">Davanagere Seva</span>
                    </Link>
                </div>

                {/* Desktop Menu - Hidden on tablets, shown on large desktops */}
                <div className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-widest">
                    <Link href="/services" className="transition-colors hover:text-primary text-gray-500 hover:scale-105 transform">All Services</Link>
                    <Link href="/how-it-works" className="transition-colors hover:text-primary text-gray-500 hover:scale-105 transform">How it works</Link>
                    <Link href="/about" className="transition-colors hover:text-primary text-gray-500 hover:scale-105 transform">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden xl:flex items-center gap-2 text-primary font-bold mr-4 text-sm bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
                        <Phone size={16} />
                        <span>+91 890 4777 090</span>
                    </div>

                    {/* Desktop Auth - Hidden on tablets/mobile */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isAuth ? (
                            <>
                                <Link href="/admin">
                                    <Button variant="outline" size="sm" className="rounded-xl border-primary text-primary font-bold uppercase tracking-widest text-[10px] px-6 h-10">Admin Control</Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold uppercase tracking-widest text-[10px] gap-2 h-10 px-4"
                                    onClick={async () => await logout()}
                                >
                                    <LogOut size={16} /> Logout
                                </Button>
                            </>
                        ) : userSession ? (
                            <>
                                <Link href={userSession.role === 'partner' ? '/partner-dashboard' : '/bookings'}>
                                    <Button variant="outline" size="sm" className="rounded-xl border-primary text-primary hover:bg-primary/5 font-bold uppercase tracking-widest text-[10px] px-6 h-10">
                                        {userSession.role === 'partner' ? 'Service Dashboard' : 'My Bookings'}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:text-rose-600 font-bold uppercase tracking-widest text-[10px] gap-2 h-10 px-4"
                                    onClick={async () => {
                                        await userLogout();
                                        window.location.reload();
                                    }}
                                >
                                    <LogOut size={16} /> Logout
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button className="rounded-xl bg-primary text-white hover:bg-primary/90 transition-all font-bold uppercase tracking-widest text-[10px] px-8 h-11 shadow-lg shadow-primary/20">Login / Join</Button>
                                </Link>
                                <Link href="/admin/login">
                                    <Button variant="ghost" className="text-[9px] uppercase font-black tracking-[0.2em] opacity-40 hover:opacity-100 h-11">Management</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile/Tablet Menu Button */}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="lg:hidden h-11 w-11 rounded-2xl bg-gray-50 hover:bg-gray-100 text-primary border border-gray-100"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Mobile/Tablet Drawer implementation */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[1000] lg:hidden">
                    {/* Darker backdrop for better contrast */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Drawer Content - Now using fixed and solid background */}
                    <div className="fixed right-0 top-0 h-full w-[300px] bg-white shadow-2xl flex flex-col items-stretch animate-in slide-in-from-right duration-300 border-l border-gray-100 ring-1 ring-black/5">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                            <span className="font-black text-primary uppercase text-xs tracking-[0.2em]">Main Menu</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(false)}
                                className="rounded-xl h-10 w-10 bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-gray-100"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="bg-white">
                            <div className="p-4 space-y-1">
                                <Link
                                    href="/services"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                                        <Briefcase size={18} />
                                    </div>
                                    <span className="font-black text-gray-700 uppercase text-[10px] tracking-[0.2em]">All Services</span>
                                </Link>
                                <Link
                                    href="/how-it-works"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shrink-0">
                                        <Info size={18} />
                                    </div>
                                    <span className="font-black text-gray-700 uppercase text-[10px] tracking-[0.2em]">How it works</span>
                                </Link>
                                <Link
                                    href="/about"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform shrink-0">
                                        <MessageSquare size={18} />
                                    </div>
                                    <span className="font-black text-gray-700 uppercase text-[10px] tracking-[0.2em]">About Us</span>
                                </Link>
                            </div>

                            <div className="px-4 mt-2 mb-6">
                                <div className="h-px bg-gray-50 w-full mb-6" />
                                <div className="space-y-3">
                                    <p className="text-[9px] font-black uppercase text-gray-300 tracking-[0.4em] mb-4 ml-4">Access Panel</p>

                                    {isAuth ? (
                                        <>
                                            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block">
                                                <Button className="w-full rounded-2xl bg-primary h-14 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">Go to Admin</Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-2xl h-14 border-rose-100 text-rose-500 font-black uppercase tracking-widest text-[10px] gap-2 hover:bg-rose-50"
                                                onClick={async () => {
                                                    await logout();
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <LogOut size={16} /> Logout
                                            </Button>
                                        </>
                                    ) : userSession ? (
                                        <>
                                            <Link href={userSession.role === 'partner' ? '/partner-dashboard' : '/bookings'} onClick={() => setIsMenuOpen(false)} className="block">
                                                <Button className="w-full rounded-2xl bg-primary h-14 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">Dashboard</Button>
                                            </Link>
                                            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block">
                                                <Button variant="ghost" className="w-full rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] text-gray-500">My Profile</Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-2xl h-14 border-rose-100 text-rose-500 font-black uppercase tracking-widest text-[10px] gap-2 hover:bg-rose-50"
                                                onClick={async () => {
                                                    await userLogout();
                                                    window.location.reload();
                                                }}
                                            >
                                                <LogOut size={16} /> Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block">
                                                <Button className="w-full rounded-2xl bg-primary h-14 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30">Login / Join Now</Button>
                                            </Link>
                                            <Link href="/admin/login" onClick={() => setIsMenuOpen(false)} className="block">
                                                <Button variant="ghost" className="w-full rounded-2xl h-14 text-gray-400 font-black uppercase tracking-widest text-[9px] opacity-60">Admin Management</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto p-6 bg-white border-t border-gray-100">
                            <div className="p-5 rounded-[25px] bg-gray-50 border border-gray-100 flex flex-col items-center">
                                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-2 px-3 py-1 bg-white rounded-full">Support Line</p>
                                <a href="tel:+918904777090" className="text-base font-black text-primary tracking-tight">+91 890 4777 090</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
