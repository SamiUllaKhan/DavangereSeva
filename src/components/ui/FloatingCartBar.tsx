'use client';

import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCartBar() {
    const [cartData, setCartData] = useState({ count: 0, total: 0 });
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

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-4 right-4 z-[90] md:hidden"
                >
                    <Link href="/cart">
                        <div className="bg-primary text-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(25,38,77,0.3)] flex items-center justify-between group active:scale-95 transition-transform">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 leading-none">Your Cart</p>
                                    <p className="font-black text-lg leading-tight mt-0.5">{cartData.count} Items • ₹{cartData.total}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
                                View Cart
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
