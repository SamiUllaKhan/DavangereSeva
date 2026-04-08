'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Grid, Calendar, User, Headphones, MessageCircle, Phone, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav({ isAuth, userSession }: { isAuth: boolean, userSession?: any }) {
    const pathname = usePathname();
    const [showSupport, setShowSupport] = useState(false);

    const phoneNumber = "918904777090";
    const message = "Hi Davanagere Seva, I'm interested in booking a service.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Grid, label: 'Services', href: '/services' },
        { icon: Calendar, label: isAuth ? 'Admin' : (userSession?.role === 'partner' ? 'Orders' : (userSession ? 'My Bookings' : 'Bookings')), href: isAuth ? '/admin' : (userSession?.role === 'partner' ? '/partner-dashboard' : (userSession ? '/bookings' : '/register')) },
    ];

    return (
        <>
            {/* Support Floating Menu */}
            <AnimatePresence>
                {showSupport && (
                    <div className="fixed inset-0 z-[60] md:hidden pointer-events-none">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSupport(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" 
                        />
                        <div className="absolute bottom-20 right-4 flex flex-col items-end gap-3 pointer-events-auto">
                           {/* WhatsApp */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <Link
                                    href={whatsappUrl}
                                    target="_blank"
                                    onClick={() => setShowSupport(false)}
                                    className="flex items-center gap-3 group"
                                >
                                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-black uppercase tracking-widest text-[#25D366] border border-[#25D366]/20">WhatsApp Help</span>
                                    <div className="w-14 h-14 bg-[#25D366] text-white rounded-[20px] shadow-[0_10px_30px_rgb(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                                        <MessageCircle size={24} fill="white" />
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Call */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
                            >
                                <Link
                                    href={`tel:+${phoneNumber}`}
                                    onClick={() => setShowSupport(false)}
                                    className="flex items-center gap-3 group"
                                >
                                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">Call Support</span>
                                    <div className="w-14 h-14 bg-primary text-white rounded-[20px] shadow-[0_10px_30px_rgb(25,38,77,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                                        <Phone size={24} fill="white" />
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 z-[70] w-full h-16 bg-white border-t border-gray-200 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`inline-flex flex-col items-center justify-center group transition-all ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 mb-1 transition-transform group-active:scale-90 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                <span className={`text-[9px] font-black uppercase tracking-tighter truncate w-full text-center ${isActive ? 'text-primary' : 'text-gray-400'}`}>{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Support Toggle */}
                    <button
                        onClick={() => setShowSupport(!showSupport)}
                        className={`inline-flex flex-col items-center justify-center group transition-all ${showSupport ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={showSupport ? 'x' : 'headphones'}
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showSupport ? <X className="w-5 h-5 mb-1" /> : <Headphones className="w-5 h-5 mb-1" />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-tighter truncate w-full text-center ${showSupport ? 'text-primary' : 'text-gray-400'}`}>Support</span>
                    </button>

                    {/* Account */}
                    <Link
                        href={userSession ? '/bookings' : '/register'}
                        className={`inline-flex flex-col items-center justify-center group transition-all ${pathname === '/bookings' || pathname === '/register' ? 'text-primary' : 'text-gray-400'}`}
                    >
                        <User className={`w-5 h-5 mb-1 transition-transform group-active:scale-90 ${pathname === '/bookings' || pathname === '/register' ? 'text-primary' : 'text-gray-400'}`} />
                        <span className={`text-[9px] font-black uppercase tracking-tighter truncate w-full text-center ${pathname === '/bookings' || pathname === '/register' ? 'text-primary' : 'text-gray-400'}`}>
                            {userSession ? userSession.name.split(' ')[0] : 'Account'}
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
}
