'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PRODUCT_TYPES = [
    { id: 'laptop', name: 'Laptop', icon: 'Laptop', description: 'Screens, Batteries, Keyboards' },
    { id: 'desktop', name: 'Desktop', icon: 'Monitor', description: 'RAM, SSD, PSU, Motherboards' },
    { id: 'printer', name: 'Printer', icon: 'Printer', description: 'Toners, Cartridges, Rollers' },
    { id: 'cctv', name: 'CCTV', icon: 'Camera', description: 'Storage, Adapters, Cables' },
];

const BRANDS = [
    { id: 'hp', name: 'HP', logo: '/images/brands/hp.png' },
    { id: 'dell', name: 'Dell', logo: '/images/brands/dell.png' },
    { id: 'lenovo', name: 'Lenovo', logo: '/images/brands/lenovo.png' },
    { id: 'canon', name: 'Canon', logo: '/images/brands/canon.png' },
    { id: 'epson', name: 'Epson', logo: '/images/brands/epson.png' },
    { id: 'apple', name: 'Apple', logo: '/images/brands/apple.png' },
    { id: 'hikvision', name: 'Hikvision', logo: '/images/brands/hikvision.png' },
];

const PARTS: Record<string, any[]> = {
    laptop: [
        { id: 'screen', name: 'Display Screen', icon: 'MonitorSmall' },
        { id: 'battery', name: 'Battery', icon: 'Battery' },
        { id: 'keyboard', name: 'Keyboard', icon: 'Keyboard' },
        { id: 'adapter', name: 'Power Adapter', icon: 'Zap' },
        { id: 'ram-ssd', name: 'RAM/SSD Upgrade', icon: 'Cpu' },
    ],
    printer: [
        { id: 'toner', name: 'Laser Toner', icon: 'Droplets' },
        { id: 'ink', name: 'Ink Cartridge', icon: 'Pipette' },
        { id: 'roller', name: 'Pickup Roller', icon: 'RotateCw' },
        { id: 'teflon', name: 'Teflon Sleeve', icon: 'Layers' },
    ],
    desktop: [
        { id: 'smps', name: 'SMPS / PSU', icon: 'Power' },
        { id: 'motherboard', name: 'Motherboard', icon: 'CircuitBoard' },
        { id: 'cabinet', name: 'CPU Cabinet', icon: 'Box' },
    ],
};

export default function PartFinder() {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({
        product: null as any,
        brand: null as any,
        part: null as any,
    });

    const handleSelectProduct = (product: any) => {
        setSelection({ ...selection, product, part: null });
        setStep(2);
    };

    const handleSelectBrand = (brand: any) => {
        setSelection({ ...selection, brand });
        setStep(3);
    };

    const handleSelectPart = (part: any) => {
        setSelection({ ...selection, part });
        setStep(4);
    };

    const handleReset = () => {
        setStep(1);
        setSelection({ product: null, brand: null, part: null });
    };

    const handleWhatsAppInquiry = () => {
        const message = `Hi Davanagere Seva, I'm looking for a *${selection.part?.name}* for my *${selection.brand?.name} ${selection.product?.name}*. Please let me know the availability and price.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/918904777090?text=${encodedMessage}`, '_blank');
    };

    return (
        <section className="py-12 md:py-24 bg-white overflow-hidden">
            <div className="container px-4 md:px-8 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
                    <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-2 rounded-xl mb-6 uppercase tracking-widest text-xs">
                        Parts & Accessories
                    </Badge>
                    <h2 className="text-3xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
                        Find The Right <span className="text-primary italic">Part</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-xs md:text-xl uppercase tracking-widest">
                        Genuine Spares for all major brands in Davanagere
                    </p>
                </div>

                <div className="relative min-h-[400px] md:min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
                            >
                                {PRODUCT_TYPES.map((product) => {
                                    const Icon = (Icons as any)[product.icon] || Icons.Box;
                                    return (
                                        <Card
                                            key={product.id}
                                            onClick={() => handleSelectProduct(product)}
                                            className="group cursor-pointer p-6 md:p-10 rounded-[32px] md:rounded-[48px] border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all text-center flex flex-col items-center gap-6"
                                        >
                                            <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 group-hover:bg-primary group-hover:text-white rounded-[24px] md:rounded-[36px] flex items-center justify-center transition-all duration-500 text-slate-400">
                                                <Icon size={48} className="md:size-64" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.description}</p>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                                        <button onClick={() => setStep(1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Icons.ArrowLeft size={24} /></button>
                                        Select Brand for {selection.product?.name}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
                                    {BRANDS.map((brand) => (
                                        <Card
                                            key={brand.id}
                                            onClick={() => handleSelectBrand(brand)}
                                            className="group cursor-pointer p-4 md:p-6 rounded-3xl border-slate-100 hover:border-primary/20 transition-all flex items-center justify-center aspect-square"
                                        >
                                            <div className="text-slate-900 font-black text-xl italic uppercase group-hover:scale-110 transition-transform">
                                                {brand.name}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                                        <button onClick={() => setStep(2)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Icons.ArrowLeft size={24} /></button>
                                        What do you need for your {selection.brand?.name} {selection.product?.name}?
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                    {(PARTS[selection.product?.id] || PARTS['laptop']).map((part) => (
                                        <div
                                            key={part.id}
                                            onClick={() => handleSelectPart(part)}
                                            className="p-6 md:p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all cursor-pointer flex items-center gap-6 group"
                                        >
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                                <Icons.Settings size={28} />
                                            </div>
                                            <span className="text-lg font-black text-slate-900 uppercase tracking-tight line-clamp-1">{part.name}</span>
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => handleSelectPart({ id: 'other', name: 'Other / Custom Part' })}
                                        className="p-6 md:p-8 bg-primary/5 rounded-[32px] border border-primary/10 hover:bg-primary hover:text-white transition-all cursor-pointer flex items-center gap-6 group"
                                    >
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                            <Icons.HelpCircle size={28} />
                                        </div>
                                        <span className="text-lg font-black uppercase tracking-tight">Other Part</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-2xl mx-auto"
                            >
                                <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 text-center text-white space-y-12 relative overflow-hidden">
                                    {/* Animated Background */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                    
                                    <div className="space-y-4 relative z-10">
                                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
                                            <Icons.Search size={48} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight italic">
                                            Found your match!
                                        </h3>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                                            Inquiry Summary
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                                        {[
                                            { label: 'Device', value: selection.product?.name },
                                            { label: 'Brand', value: selection.brand?.name },
                                            { label: 'Part', value: selection.part?.name }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{item.label}</p>
                                                <p className="text-lg font-black uppercase tracking-tight">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 pt-8 relative z-10">
                                        <Button 
                                            size="lg" 
                                            onClick={handleWhatsAppInquiry}
                                            className="w-full h-16 md:h-24 rounded-3xl bg-primary hover:bg-primary/90 text-white font-black text-lg md:text-2xl uppercase tracking-widest gap-4 shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95"
                                        >
                                            <Icons.MessageCircle size={32} />
                                            Get Price on WhatsApp
                                        </Button>
                                        <button 
                                            onClick={handleReset}
                                            className="text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] transition-colors"
                                        >
                                            Search Another Part
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-slate-100 pt-16">
                    {[
                        { icon: 'ShieldCheck', title: 'GENUINE PARTS', desc: 'Sourced directly from authorized distributors only.' },
                        { icon: 'Truck', title: 'SAME DAY DELIVERY', desc: 'Most common parts delivered/replaced within 24 hours.' },
                        { icon: 'CircleDollarSign', title: 'WHOLESALE RATES', desc: 'Get competitive local pricing compared to service centers.' }
                    ].map((feat, i) => {
                        const FeatIcon = (Icons as any)[feat.icon];
                        return (
                            <div key={i} className="flex flex-col items-center text-center space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
                                    <FeatIcon size={24} />
                                </div>
                                <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">{feat.title}</h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">{feat.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
