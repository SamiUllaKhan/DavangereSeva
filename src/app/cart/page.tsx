'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);
    
    // User details state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedCart = localStorage.getItem('davanagere_seva_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('davanagere_seva_cart', JSON.stringify(newCart));
        setTimeout(() => window.dispatchEvent(new Event('cart-updated')), 0);
    };

    const updateQuantity = (id: string, delta: number) => {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        let nextCart;
        if (item.quantity + delta > 0) {
            nextCart = cart.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i);
        } else {
            nextCart = cart.filter(i => i.id !== id);
        }
        saveCart(nextCart);
    };

    const removeItem = (id: string) => {
        saveCart(cart.filter(i => i.id !== id));
    };

    const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        
        // This would connect to an API to actually place an order
        toast.success("Booking placed successfully!");
        setCart([]);
        localStorage.removeItem('davanagere_seva_cart');
        setTimeout(() => window.dispatchEvent(new Event('cart-updated')), 0);
        setSubmitted(true);
    };

    if (!mounted) return null;

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] py-16 flex flex-col items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Booking Confirmed!</h2>
                    <p className="text-slate-500 mb-8">Our expert will contact you shortly to confirm the scheduled time.</p>
                    <Link href="/">
                        <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold">
                            Return to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link href="/services" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-6">
                        <ArrowLeft size={16} className="mr-2" /> Back to Services
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Your Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        {cart.length === 0 ? (
                            <Card className="rounded-[32px] border-none shadow-sm bg-white p-12 text-center">
                                <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-300 border-2 border-dashed border-slate-200 mb-6">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Cart is empty</h3>
                                <p className="text-slate-500 mb-8">You haven't added any services yet.</p>
                                <Link href="/services">
                                    <Button className="h-12 px-8 rounded-2xl bg-primary text-white font-bold">
                                        Browse Services
                                    </Button>
                                </Link>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {cart.map((item) => (
                                        <motion.div 
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                        >
                                            <Card className="rounded-[24px] border border-slate-100 shadow-sm bg-white overflow-hidden group">
                                                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-lg text-slate-900 mb-1">{item.name}</h4>
                                                        <p className="text-primary font-black">₹{item.price}</p>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
                                                        <div className="flex items-center gap-4 bg-slate-50 px-2 py-1.5 rounded-2xl border border-slate-100">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary transition-colors bg-white rounded-xl shadow-sm"
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span className="font-black w-6 text-center text-slate-900">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary transition-colors bg-white rounded-xl shadow-sm"
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="font-black text-xl text-slate-900 w-20 text-right">
                                                                ₹{item.price * item.quantity}
                                                            </div>
                                                            <button 
                                                                onClick={() => removeItem(item.id)}
                                                                className="w-10 h-10 flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <Card className="rounded-[32px] border-none shadow-xl bg-white sticky top-24">
                            <CardHeader className="pb-4 border-b border-slate-50">
                                <CardTitle className="text-2xl font-black uppercase tracking-tight text-slate-900">Checkout Detail</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <form onSubmit={handleCheckout} id="checkout-form" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-500">Contact Person</Label>
                                        <Input 
                                            id="name" 
                                            required 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            placeholder="John Doe"
                                            className="h-12 rounded-xl border-slate-200 bg-slate-50/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-500">Phone Number</Label>
                                        <Input 
                                            id="phone" 
                                            required 
                                            type="tel"
                                            value={phone} 
                                            onChange={(e) => setPhone(e.target.value)} 
                                            placeholder="+91 98765 43210"
                                            className="h-12 rounded-xl border-slate-200 bg-slate-50/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-slate-500">Service Address</Label>
                                        <textarea
                                            id="address"
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="House/Flat No, Street, Landmark"
                                            className="w-full p-3 h-24 rounded-xl border border-slate-200 bg-slate-50/50 resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                                        />
                                    </div>
                                </form>

                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                                        <span>Taxes (Included)</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-900 pt-2 border-t border-slate-100">
                                        <span className="text-lg font-black uppercase tracking-tighter">Total Payable</span>
                                        <span className="text-3xl font-black text-primary">₹{cartTotal}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    type="submit" 
                                    form="checkout-form"
                                    disabled={cart.length === 0}
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    Confirm Booking
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
