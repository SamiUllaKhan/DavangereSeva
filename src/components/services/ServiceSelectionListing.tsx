'use client';

import { useState, useMemo, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toast } from 'sonner';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export function ServiceSelectionListing({
    categories,
    services,
    initialCategoryId,
    highlightedServiceId
}: {
    categories: any[],
    services: any[],
    initialCategoryId?: string,
    highlightedServiceId?: string | null
}) {
    const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId || categories[0]?._id || '');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Auto-scroll to highlighted service if provided
        if (highlightedServiceId) {
            setTimeout(() => {
                const element = document.getElementById(`service-${highlightedServiceId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }, [highlightedServiceId]);

    const activeCategory = useMemo(() =>
        categories.find(c => c._id === activeCategoryId) || categories[0],
        [activeCategoryId, categories]);

    const activeServices = useMemo(() =>
        services.filter(s => (s.category?._id || s.category) === activeCategoryId),
        [activeCategoryId, services]);

    const addToCart = (service: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === service._id);
            if (existing) {
                return prev.map(item =>
                    item.id === service._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id: service._id, name: service.name, price: service.price, quantity: 1 }];
        });
    };

    const removeFromCart = (serviceId: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === serviceId);
            if (existing && existing.quantity > 1) {
                return prev.map(item =>
                    item.id === serviceId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prev.filter(item => item.id !== serviceId);
        });
    };

    const cartTotal = useMemo(() =>
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        [cart]);

    const cartCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]);

    const freeVisitationThreshold = 499;
    const remainingForFreeVisitation = Math.max(0, freeVisitationThreshold - cartTotal);

    if (!mounted) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar: Categories */}
            <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24">
                <Card className="rounded-[32px] border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-100">
                    <CardContent className="p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">Select a service</p>
                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                            {categories.map((cat) => {
                                const IconComponent = (Icons as any)[cat.icon] || Icons.Wrench;
                                const isActive = activeCategoryId === cat._id;
                                return (
                                    <button
                                        key={cat._id}
                                        onClick={() => setActiveCategoryId(cat._id)}
                                        className={`flex flex-col lg:flex-row items-center gap-3 p-4 rounded-2xl transition-all duration-300 text-center lg:text-left group ${isActive
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                                            : 'hover:bg-gray-50 text-gray-500'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white transition-colors shadow-sm'}`}>
                                            <IconComponent size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
                                        </div>
                                        <span className="text-[11px] lg:text-sm font-black uppercase tracking-tight leading-tight">{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </aside>

            {/* Middle Content: Service Items */}
            <main className="flex-1 space-y-12 min-w-0">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">{activeCategory?.name}</h2>
                    <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-bold uppercase tracking-widest px-4 py-1">
                        {activeServices.length} Options
                    </Badge>
                </div>

                <div className="space-y-8">
                    {activeServices.map((service) => {
                        const cartItem = cart.find(item => item.id === service._id);
                        const isHighlighted = highlightedServiceId === service._id;
                        return (
                            <div
                                key={service._id}
                                id={`service-${service._id}`}
                                className={`flex gap-6 pb-8 border-b border-gray-100 last:border-0 group transition-all duration-500 rounded-2xl p-4 -mx-4 ${isHighlighted ? 'bg-primary/5 border-primary/20 shadow-xl shadow-primary/5 ring-1 ring-primary/20' : ''}`}
                            >
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{service.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg flex items-center gap-1 text-xs font-black">
                                            <Icons.Star size={12} className="fill-current" />
                                            {service.rating?.toFixed(1) || '4.8'}
                                        </div>
                                        <span className="text-xs font-bold text-gray-400">({(service.reviewCount || 120).toLocaleString()} reviews)</span>
                                    </div>
                                    <p className="text-lg font-black text-gray-900">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mr-2">{service.priceUnit || 'Starts at'}</span>
                                        ₹{service.price}
                                    </p>
                                    <button className="text-primary font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-1 group/link">
                                        View details <Icons.ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                <div className="w-32 md:w-48 shrink-0 relative">
                                    <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-sm shadow-gray-200 border border-white group-hover:shadow-xl transition-all duration-500">
                                        <img
                                            src={service.image || '/images/placeholder-service.jpg'}
                                            alt={service.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%]">
                                        {cartItem ? (
                                            <div className="flex items-center justify-between h-10 px-2 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden">
                                                <button
                                                    onClick={() => removeFromCart(service._id)}
                                                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                >
                                                    <Icons.Minus size={16} />
                                                </button>
                                                <span className="font-black text-primary text-sm">{cartItem.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(service)}
                                                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                >
                                                    <Icons.Plus size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <Button
                                                onClick={() => addToCart(service)}
                                                className="w-full h-10 rounded-xl font-black uppercase tracking-widest shadow-xl border border-white shadow-primary/20"
                                            >
                                                Add
                                            </Button>
                                        )}
                                        <p className="text-[9px] font-black uppercase tracking-tight text-center mt-6 text-gray-400">4 options</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Right Sidebar: Cart & Info */}
            <aside className="w-full lg:w-80 lg:sticky lg:top-24 space-y-6">
                <Card className="rounded-[32px] border-none shadow-2xl shadow-primary/5 overflow-hidden border border-gray-100">
                    <CardHeader className="p-6 pb-2 border-b border-gray-50 bg-white">
                        <h4 className="text-xl font-black uppercase tracking-tight">Cart</h4>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6 bg-white">
                        {cart.length > 0 ? (
                            <>
                                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center gap-4">
                                            <div className="flex-1">
                                                <h5 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h5>
                                                <div className="flex items-center gap-3 mt-1.5 px-2 py-1 bg-primary/5 w-fit rounded-lg border border-primary/5">
                                                    <button onClick={() => removeFromCart(item.id)} className="text-primary hover:scale-125 transition-transform"><Icons.Minus size={12} /></button>
                                                    <span className="font-black text-xs text-primary">{item.quantity}</span>
                                                    <button onClick={() => addToCart({ _id: item.id })} className="text-primary hover:scale-125 transition-transform"><Icons.Plus size={12} /></button>
                                                </div>
                                            </div>
                                            <div className="font-black text-sm text-gray-900">₹{item.price * item.quantity}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3 border border-emerald-100">
                                    <div className="bg-emerald-500 text-white p-1 rounded-full">
                                        <Icons.Tags size={14} />
                                    </div>
                                    {remainingForFreeVisitation > 0 ? (
                                        <p className="text-xs text-emerald-700 font-bold">
                                            Add <span className="font-black">₹{remainingForFreeVisitation}</span> more to save on visitation fee
                                        </p>
                                    ) : (
                                        <p className="text-xs text-emerald-700 font-black">Free visitation fee applied!</p>
                                    )}
                                </div>

                                <Button asChild className="w-full h-14 rounded-2xl flex items-center justify-between px-6 shadow-xl shadow-primary/30 group">
                                    <Link href="/cart">
                                        <span className="font-black text-base">₹{cartTotal}</span>
                                        <span className="flex items-center gap-2 font-black uppercase tracking-widest text-[11px]">
                                            View Cart <Icons.ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <Icons.ShoppingBasket size={40} />
                                </div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Your cart is empty</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Visitation Info */}
                <Card className="rounded-3xl bg-white/50 backdrop-blur-sm border border-gray-100 p-6 flex items-start gap-4">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl">
                        <Icons.Percent size={20} />
                    </div>
                    <div>
                        <h4 className="font-black text-sm text-gray-900">Get visitation fee off</h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">On orders above ₹{freeVisitationThreshold}</p>
                        <button className="text-primary font-black text-[10px] uppercase tracking-widest mt-3 flex items-center gap-1">
                            View More Offers <Icons.ChevronDown size={12} />
                        </button>
                    </div>
                </Card>

                {/* Trust/Promise */}
                <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white border border-gray-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-6">UC Promise</h4>
                        <ul className="space-y-4">
                            {[
                                'Verified Professionals',
                                'Hassle Free Booking',
                                'Transparent Pricing'
                            ].map((p, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Icons.CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                                    <span className="text-sm font-bold text-gray-600">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-4 right-4 animate-bounce">
                        <div className="w-16 h-16 rounded-full border-4 border-dashed border-primary/20 flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary text-center leading-none uppercase">
                                Quality<br />Assured
                            </div>
                        </div>
                    </div>
                </Card>
            </aside>
        </div>
    );
}
