'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';

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
    const router = useRouter();
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(initialCategoryId || null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load cart from localStorage
        const savedCart = localStorage.getItem('davanagere_seva_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }

        if (highlightedServiceId) {
            const hService = services.find(s => s._id === highlightedServiceId);
            if (hService) {
                setSelectedService(hService);
            }
            
            setTimeout(() => {
                const element = document.getElementById(`service-${highlightedServiceId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }, [highlightedServiceId]);

    const activeCategory = useMemo(() => {
        if (activeCategoryId === 'all') {
            const allBrands = Array.from(new Set(categories.flatMap(c => c.brandLogos || [])));
            return { 
                name: 'All Services', 
                description: 'Browse our full range of professional services for your home and office.',
                brandLogos: allBrands 
            };
        }
        return categories.find(c => c._id === activeCategoryId) || categories[0];
    }, [activeCategoryId, categories]);

    const activeServices = useMemo(() => {
        if (activeCategoryId === 'all') return services;
        return services.filter(s => (s.category?._id || s.category) === activeCategoryId);
    }, [activeCategoryId, services]);

    const addToCart = (item: any) => {
        const id = item._id || item.id;
        const currentCart = [...cart];
        const existing = currentCart.find(cartItem => cartItem.id === id);
        let nextCart;
        
        if (existing) {
            nextCart = currentCart.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
        } else {
            nextCart = [...currentCart, { id: id, name: item.name, price: item.price, quantity: 1 }];
        }
        
        setCart(nextCart);
        localStorage.setItem('davanagere_seva_cart', JSON.stringify(nextCart));
        setTimeout(() => window.dispatchEvent(new Event('cart-updated')), 0);
        toast.success(`Added ${item.name} to cart`);
    };

    const removeFromCart = (serviceId: string) => {
        const currentCart = [...cart];
        const existing = currentCart.find(item => item.id === serviceId);
        let nextCart;
        
        if (existing && existing.quantity > 1) {
            nextCart = currentCart.map(item =>
                item.id === serviceId ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            nextCart = currentCart.filter(item => item.id !== serviceId);
        }
        
        setCart(nextCart);
        localStorage.setItem('davanagere_seva_cart', JSON.stringify(nextCart));
        setTimeout(() => window.dispatchEvent(new Event('cart-updated')), 0);
    };

    const cartTotal = useMemo(() =>
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        [cart]);

    const cartCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]);

    const freeVisitationThreshold = 500;
    const remainingForFreeVisitation = Math.max(0, freeVisitationThreshold - cartTotal);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-4 md:pt-8 pb-20 md:pb-12">
            <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-4 md:mb-12 px-4 md:px-0">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-1 md:mb-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    {(() => {
                                        const IconComponent = (Icons as any)[activeCategory?.icon] || Icons.Zap;
                                        return <IconComponent className="w-5 h-5 md:w-7 md:h-7" />;
                                    })()}
                                </div>
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[7px] md:text-[10px]">Booking Services</span>
                            </div>
                            <h1 className="text-2xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2 md:mb-4">
                                {activeCategory?.name}
                            </h1>
                            <p className="text-slate-500 font-medium text-xs md:text-lg max-w-2xl leading-relaxed">
                                Professional {activeCategory?.name?.toLowerCase()} services delivered to your doorstep by verified experts.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-slate-200 text-slate-600 font-bold px-6 py-2 rounded-2xl text-sm shadow-sm">
                                {activeServices.length} {activeCategoryId === 'all' ? 'Total' : ''} Options Available
                            </Badge>
                        </div>
                    </motion.div>
                </div>
                
                {/* Brand Showcase Carousel */}
                {activeCategory?.brandLogos && activeCategory.brandLogos.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-6 md:mb-10 px-4 md:px-0"
                    >
                        <div className="bg-white rounded-[32px] md:rounded-[48px] p-4 md:p-10 border border-slate-100 shadow-xl shadow-primary/5 relative overflow-hidden group">
                            {/* Animated Background Accent */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
                            
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative z-10">
                                <div className="space-y-1 shrink-0 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Certified Repairs</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Top Brands Serviced</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">All models & issues handled by verified experts</p>
                                </div>

                                <div className="flex-1 w-full">
                                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-6">
                                        {activeCategory.brandLogos.map((logo: string, idx: number) => (
                                            <motion.div 
                                                key={idx} 
                                                className="h-12 md:h-20 min-w-[100px] md:min-w-[160px] px-3 py-2 bg-slate-50/50 hover:bg-white rounded-xl md:rounded-3xl border border-slate-100 hover:border-primary/20 shadow-sm transition-all flex items-center justify-center group/logo shrink-0"
                                            >
                                                <img 
                                                    src={logo} 
                                                    alt="Repair Brand" 
                                                    className="max-h-full max-w-full w-auto object-contain transition-all duration-500" 
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Content with Sidebar */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Main Content Area */}
                    <main className="flex-1 w-full space-y-4 md:space-y-10">
                        {activeServices.map((service, index) => {
                            const cartItem = cart.find(item => item.id === service._id);
                            const isHighlighted = highlightedServiceId === service._id;
                            
                            return (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    id={`service-${service._id}`}
                                    onClick={(e) => {
                                        // Only trigger on mobile or if not clicking a button/interactive element
                                        const target = e.target as HTMLElement;
                                        if (!target.closest('button') && !target.closest('a')) {
                                            window.history.pushState(null, '', `/services/${service.slug}`);
                                            setSelectedService(service);
                                        }
                                    }}
                                    className={`relative group bg-white rounded-[20px] md:rounded-[40px] p-2 md:p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 md:hover:-translate-y-1 cursor-pointer ${isHighlighted ? 'ring-2 ring-primary ring-offset-4 ring-offset-[#F8FAFC]' : ''}`}
                                >
                                    <div className="flex flex-row gap-2.5 md:gap-8 items-start">
                                        {/* Service Image Section */}
                                        <div className="w-24 md:w-56 shrink-0 relative">
                                            <div className="aspect-square rounded-2xl md:rounded-[32px] overflow-hidden bg-slate-100 shadow-inner transition-transform duration-700">
                                                <img
                                                    src={service.image || '/images/placeholder-service.jpg'}
                                                    alt={service.name}
                                                    className="w-full h-full object-cover transition-transform duration-700"
                                                />
                                            </div>
                                            {/* Best Seller Badge */}
                                            {service.rating >= 4.8 && (
                                                <div className="absolute -top-2 -right-2 bg-[#10B981] text-white text-[7px] md:text-[10px] font-black uppercase tracking-widest px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-2xl shadow-lg border-2 border-white">
                                                    Best Rated
                                                </div>
                                            )}
                                        </div>

                                        {/* Service Details Section */}
                                        <div className="flex-1 space-y-2 md:space-y-6 min-w-0">
                                            <div className="space-y-1 md:space-y-2">
                                                <div className="flex items-start md:items-center justify-between gap-2">
                                                    <h3 className="text-base md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight line-clamp-1">{service.name}</h3>
                                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-1.5 md:px-3 py-0.5 md:py-1 rounded-lg text-[9px] md:text-xs font-black border border-yellow-100/50 shrink-0">
                                                        <Icons.Star size={10} className="fill-current md:size-3.5" />
                                                        {service.rating?.toFixed(1) || '4.8'}
                                                    </div>
                                                </div>
                                                <p className="text-slate-500 text-[10px] md:text-sm font-medium line-clamp-1 md:line-clamp-2 leading-relaxed">
                                                    {service.description || 'Professional grade service with guaranteed satisfaction.'}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 md:gap-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Price</span>
                                                    <span className="text-base md:text-2xl font-black text-slate-900 leading-none mt-0.5 md:mt-1">₹{service.price}</span>
                                                </div>
                                                <div className="w-px h-4 md:h-8 bg-slate-100" />
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Duration</span>
                                                    <span className="text-[10px] md:text-sm font-bold text-slate-700 mt-0.5 md:mt-1">45-60 min</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-row items-center gap-2 md:gap-4 pt-2 md:pt-6 border-t border-slate-50">
                                                <Link
                                                    href={`/services/${service.slug}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.history.pushState(null, '', `/services/${service.slug}`);
                                                        setSelectedService(service);
                                                    }}
                                                    className="h-7 md:h-12 px-2 md:px-6 rounded-md md:rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-black text-[7px] md:text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-1 group/btn shrink-0"
                                                >
                                                    Details
                                                    <Icons.ChevronRight size={8} className="group-hover/btn:translate-x-1 transition-transform md:size-3.5" />
                                                </Link>
                                                
                                                <div className="flex-1">
                                                    {cartItem ? (
                                                        <div className="flex items-center justify-between gap-1 md:gap-6 bg-primary px-1.5 md:px-4 py-1 md:py-2 rounded-md md:rounded-2xl shadow-xl shadow-primary/20 text-white h-7 md:h-12">
                                                            <button 
                                                                onClick={() => removeFromCart(service._id)}
                                                                className="w-5 h-5 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 rounded-md transition-colors shrink-0"
                                                            >
                                                                <Icons.Minus size={12} className="md:size-5" />
                                                            </button>
                                                            <span className="font-black text-xs md:text-xl w-3 md:w-8 text-center">{cartItem.quantity}</span>
                                                            <button 
                                                                onClick={() => addToCart(service)}
                                                                className="w-5 h-5 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 rounded-md transition-colors shrink-0"
                                                            >
                                                                <Icons.Plus size={12} className="md:size-5" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            onClick={() => addToCart(service)}
                                                            className="w-full h-7 md:h-12 px-2 md:px-10 rounded-md md:rounded-2xl font-black uppercase tracking-widest text-[7px] md:text-xs shadow-xl shadow-primary/20 bg-primary text-white"
                                                        >
                                                            Add
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </main>

                    {/* Modernized Floating Sidebar Cart */}
                    <aside className="w-full lg:w-[400px] shrink-0 sticky top-24 space-y-6">
                        <Card className="rounded-[40px] border-none shadow-2xl shadow-primary/5 overflow-hidden bg-white">
                            <CardHeader className="p-8 pb-4 bg-white border-b border-slate-50">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Your Order</h4>
                                    <Badge className="bg-primary/10 text-primary border-none font-black px-3 rounded-lg">
                                        {cartCount} Items
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <AnimatePresence mode="popLayout">
                                    {cart.length > 0 ? (
                                        <div className="space-y-4 md:space-y-6">
                                            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar">
                                                {cart.map((item) => (
                                                    <motion.div 
                                                        key={item.id}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="flex justify-between items-center gap-4 group/item"
                                                    >
                                                        <div className="flex-1">
                                                            <h5 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover/item:text-primary transition-colors">{item.name}</h5>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <div className="flex items-center gap-3 px-2 py-1 bg-slate-50 rounded-xl border border-slate-100">
                                                                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-primary transition-colors"><Icons.Minus size={14} /></button>
                                                                    <span className="font-black text-xs text-slate-700 w-4 text-center">{item.quantity}</span>
                                                                    <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })} className="text-slate-400 hover:text-primary transition-colors"><Icons.Plus size={14} /></button>
                                                                </div>
                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">₹{item.price} each</span>
                                                            </div>
                                                        </div>
                                                        <div className="font-black text-base text-slate-900">₹{item.price * item.quantity}</div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Visitation Fee Progress Bar */}
                                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visitation Fee</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                                                        {remainingForFreeVisitation > 0 ? `₹${remainingForFreeVisitation} remaining` : 'Free!'}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        className="h-full bg-emerald-500"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(100, (cartTotal / freeVisitationThreshold) * 100)}%` }}
                                                    />
                                                </div>
                                                {remainingForFreeVisitation > 0 && (
                                                    <p className="text-[10px] font-bold text-slate-500 italic text-center">
                                                        Add ₹{remainingForFreeVisitation} more for free visitation!
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                                                    <span>Subtotal</span>
                                                    <span>₹{cartTotal}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-slate-900 pt-2 border-t border-slate-100">
                                                    <span className="text-lg font-black uppercase tracking-tighter">Order Total</span>
                                                    <span className="text-3xl font-black">₹{cartTotal}</span>
                                                </div>
                                            </div>

                                            <Button 
                                                asChild 
                                                disabled={checkoutLoading}
                                                className="w-full h-16 rounded-[24px] shadow-2xl shadow-primary/30 group hover:scale-[1.02] active:scale-95 transition-all"
                                            >
                                                <Link 
                                                    href="/cart" 
                                                    onClick={() => setCheckoutLoading(true)}
                                                    className="flex items-center justify-between px-8"
                                                >
                                                    <span className="font-black text-lg uppercase tracking-widest">
                                                        {checkoutLoading ? 'Processing...' : 'Checkout'}
                                                    </span>
                                                    {checkoutLoading ? (
                                                        <Icons.Loader2 className="animate-spin" size={20} />
                                                    ) : (
                                                        <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                    )}
                                                </Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="py-16 text-center space-y-6"
                                        >
                                            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200 border-2 border-dashed border-slate-100">
                                                <Icons.ShoppingBasket size={48} />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-sm">Cart is empty</p>
                                                <p className="text-slate-400 text-xs font-bold mt-2">Add services to start your booking</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>

                        {/* UC Promise / Benefits */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: 'ShieldCheck', label: 'Insured Work', color: 'emerald' },
                                { icon: 'Star', label: 'Top Rated', color: 'yellow' },
                                { icon: 'Clock', label: 'On-time', color: 'blue' },
                                { icon: 'CreditCard', label: 'Safe Payments', color: 'purple' }
                            ].map((benefit, i) => {
                                const BenefitIcon = (Icons as any)[benefit.icon];
                                return (
                                    <div key={i} className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center gap-2 text-center group hover:bg-slate-50 transition-colors">
                                        <div className={`w-10 h-10 rounded-xl bg-${benefit.color}-50 text-${benefit.color}-500 flex items-center justify-center`}>
                                            <BenefitIcon size={20} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-tight text-slate-600">{benefit.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>

            {/* Service Details & Add-ons Dialog - Modernized */}
            <Dialog 
                open={!!selectedService} 
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedService(null);
                        // SEO Friendly URL Cleanup: Clear service slug and reset to category slug
                        if (activeCategory?.slug) {
                            window.history.pushState(null, '', `/services/${activeCategory.slug}`);
                        }
                    }
                }}
            >
                <DialogContent className="sm:max-w-[700px] max-h-[95vh] overflow-y-auto rounded-none md:rounded-[48px] p-0 border-none shadow-[0_32px_128px_-12px_rgba(0,0,0,0.3)] bg-white overflow-x-hidden [&>button]:hidden">
                    {selectedService && (
                        <div className="relative">
                            <div className="relative h-[260px] md:h-[400px] w-full group/modal-img">
                                <img
                                    src={selectedService.image || '/images/placeholder-service.jpg'}
                                    alt={selectedService.name}
                                    className="w-full h-full object-cover transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-black/10 md:to-black/20" />
                                <DialogTitle className="sr-only">{selectedService.name}</DialogTitle>
                                
                                <button 
                                    onClick={() => setSelectedService(null)}
                                    className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all z-20"
                                >
                                    <Icons.X size={24} />
                                </button>

                                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 right-6 md:right-10">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                                            <Badge className="bg-primary text-white border-none font-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                                                ₹{selectedService.price}
                                            </Badge>
                                            <div className="flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-white rounded-lg md:rounded-xl text-yellow-600 text-[10px] md:text-xs font-black shadow-lg">
                                                <Icons.Star size={12} className="fill-current md:size-3.5" />
                                                {selectedService.rating?.toFixed(1) || '4.8'}
                                            </div>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">{selectedService.name}</h2>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="px-5 md:px-10 pb-8 md:pb-12 pt-4 space-y-6 md:space-y-12 text-left">
                                {activeCategory?.brandLogos && activeCategory.brandLogos.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 bg-primary/20 rounded-full" />
                                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Supported Brands</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {activeCategory.brandLogos.map((logo: string, idx: number) => (
                                                <div key={idx} className="h-12 w-20 px-3 py-2 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0 shadow-sm transition-transform">
                                                    <img src={logo} alt="Brand Supported" className="max-h-full max-w-full object-contain" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-8 bg-primary/20 rounded-full" />
                                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">The Service</h3>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                        {selectedService.description || "Our premium doorstep service ensures professional quality with verified experts using industry-standard equipment for your complete peace of mind."}
                                    </p>
                                </div>

                                {selectedService.features && selectedService.features.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Guaranteed Highlights</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedService.features.map((feature: string, idx: number) => (
                                                <motion.div 
                                                    key={idx} 
                                                    whileHover={{ x: 5 }}
                                                    className="flex items-center gap-4 p-4 md:p-5 bg-emerald-50/30 rounded-2xl md:rounded-[28px] border border-emerald-100/50 group hover:bg-emerald-50 transition-all"
                                                >
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                                                        <Icons.CheckCircle2 size={16} className="text-white md:size-5" />
                                                    </div>
                                                    <span className="text-xs md:text-sm font-black text-emerald-900 tracking-tight">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}



                                <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl pt-6 pb-2 mt-auto">
                                    <Button
                                        onClick={() => {
                                            if (!cart.find(i => i.id === selectedService._id)) {
                                                addToCart(selectedService);
                                            }
                                            setSelectedService(null);
                                        }}
                                        className="w-full h-14 md:h-20 rounded-2xl md:rounded-[28px] font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 bg-primary text-white"
                                    >
                                        {cart.find(i => i.id === selectedService._id) ? 'Continue Booking' : `Add Service • ₹${selectedService.price}`}
                                    </Button>
                                    <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-4">Free cancellation anytime before pro arrival</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
 

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CBD5E0;
                }
            `}</style>
        </div>
    );
}
