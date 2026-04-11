'use client';

import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function FloatingCartBar() {
    const pathname = usePathname();
    const [cartData, setCartData] = useState({ count: 0, total: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const updateCart = () => {
        const savedCart = localStorage.getItem('davanagere_seva_cart');
        if (savedCart) {
            try {
                const cart = JSON.parse(savedCart);
                const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
                const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
                setCartData({ count, total });
                setIsVisible(count > 0);
            } catch (e) {
                setIsVisible(false);
            }
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        updateCart();
        window.addEventListener('cart-updated', updateCart);
        window.addEventListener('storage', updateCart);
        return () => {
            window.removeEventListener('cart-updated', updateCart);
            window.removeEventListener('storage', updateCart);
        };
    }, []);

    if (pathname === '/cart') return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-4 right-4 z-[90] md:hidden"
                >
                    <Link href="/cart" onClick={() => setIsLoading(true)}>
                        <div className="bg-primary text-white rounded-2xl p-2 shadow-[0_15px_40px_rgba(25,38,77,0.3)] flex items-center justify-between group active:scale-95 transition-transform">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                    <ShoppingBag size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 leading-none">Your Cart</p>
                                    <p className="font-black text-base leading-tight mt-1">{cartData.count} Items • ₹{cartData.total}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 font-black uppercase tracking-widest text-xs px-2">
                                {isLoading ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                        <ArrowRight size={16} />
                                    </motion.div>
                                ) : (
                                    <>
                                        View Cart
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
