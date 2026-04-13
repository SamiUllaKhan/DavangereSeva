import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronRight, ChevronLeft, Zap } from 'lucide-react';

interface SpotlightCarouselProps {
    services: any[];
}

export function SpotlightCarousel({ services }: SpotlightCarouselProps) {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const x = useMotionValue(0);

    const items = services.length > 0 ? services : [];

    useEffect(() => {
        if (innerRef.current && carouselRef.current) {
            setWidth(innerRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, [items]);

    const handleScroll = (direction: 'left' | 'right') => {
        const itemWidth = innerRef.current ? innerRef.current.scrollWidth / items.length : 300;
        const currentX = x.get();
        let targetX = direction === 'left' ? currentX + (itemWidth * 2) : currentX - (itemWidth * 2);
        
        // Clamp the values
        if (targetX > 0) targetX = 0;
        if (targetX < -width) targetX = -width;

        controls.start({ x: targetX, transition: { type: "spring", stiffness: 200, damping: 25 } });
    };

    if (items.length === 0) return null;

    return (
        <section className="py-4 md:py-12 bg-[#FAFAFA] overflow-hidden">
            <div className="container px-3 md:px-12 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-10 gap-4 md:gap-8 px-3">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 animate-fade-in border border-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Top Rated Services
                        </div>
                        <h3 className="text-2xl md:text-7xl font-black tracking-[-0.04em] text-gray-900 leading-[0.9] uppercase">
                            In the <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600 italic">Spotlight</span>
                        </h3>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3 md:gap-6 shrink-0">
                        <p className="text-gray-500 font-medium text-xs md:text-base max-w-[320px] md:text-right leading-relaxed italic text-balance opacity-80">
                            "Featured services handpicked for quality and excellence, delivered by our top-rated local experts."
                        </p>
                        <Link href="/services" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.15em] text-gray-900">
                            <span className="relative">
                                View all services
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </span>
                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-visible group/carousel">
                    {/* Navigation Buttons (Floating) */}
                    <div className="hidden lg:block">
                        <button 
                            onClick={() => handleScroll('left')}
                            className="absolute -left-6 top-[45%] -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white shadow-2xl border border-gray-100 flex items-center justify-center text-gray-950 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 opacity-0 group-hover/carousel:opacity-100 -translate-x-6 group-hover/carousel:translate-x-0"
                        >
                            <ChevronLeft size={28} className="stroke-[1.5]" />
                        </button>
                        <button 
                            onClick={() => handleScroll('right')}
                            className="absolute -right-6 top-[45%] -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white shadow-2xl border border-gray-100 flex items-center justify-center text-gray-950 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 opacity-0 group-hover/carousel:opacity-100 translate-x-6 group-hover/carousel:translate-x-0"
                        >
                            <ChevronRight size={28} className="stroke-[1.5]" />
                        </button>
                    </div>

                    <motion.div 
                        ref={carouselRef} 
                        className="cursor-grab active:cursor-grabbing overflow-visible px-2"
                    >
                        <motion.div 
                            ref={innerRef}
                            drag="x" 
                            animate={controls}
                            style={{ x }}
                            dragConstraints={{ right: 4, left: -width - 4 }}
                            className="flex gap-4 md:gap-8 py-4 md:py-8"
                        >
                            {items.map((item, idx) => (
                                <motion.div
                                    key={item._id}
                                    whileHover={{ y: -8 }}
                                    className="w-[calc(48%-8px)] md:w-[calc(33.33%-16px)] xl:w-[calc(20%-18px)] flex-shrink-0 group pointer-events-none self-stretch"
                                >
                                    <Link 
                                        href={`/services/${item.slug}`} 
                                        className="flex flex-col h-full pointer-events-auto"
                                        onDragStart={(e) => e.preventDefault()}
                                    >
                                        <div className="relative flex flex-col h-full bg-white rounded-[24px] md:rounded-[40px] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden border border-gray-100/50">
                                            {/* Top Visual Section */}
                                            <div className="relative h-[120px] md:h-[180px] w-full overflow-hidden bg-gray-50">
                                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                                                
                                                {item.image ? (
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        fill
                                                        priority={idx < 4}
                                                        className="object-cover object-center group-hover:scale-110 transition-transform duration-[2.5s] ease-out pointer-events-none"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-[2.5]" />
                                                            <Zap size={64} className="text-primary/10 relative z-10" />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Stacked Badges for Mobile / Shared for Tablet-Desktop */}
                                                <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20 flex flex-col items-start gap-1.5 md:gap-2">
                                                    {/* Category Badge */}
                                                    <div className="bg-white/95 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-2xl text-[7px] md:text-[10px] font-black uppercase tracking-widest text-gray-950 border border-white/20 shadow-sm flex items-center gap-1.5">
                                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary animate-pulse" />
                                                        {item.category?.name || 'Service'}
                                                    </div>

                                                    {/* Rating Badge (Stacked on Mobile) */}
                                                    <div className="flex md:hidden items-center gap-1 bg-gray-900/90 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[8px] font-black border border-white/10 shadow-xl">
                                                        <Star size={8} fill="#f59e0b" className="text-amber-500" />
                                                        {Number(item.rating || 4.5).toFixed(1)}
                                                    </div>
                                                </div>

                                                {/* Desktop-only Rating Badge (Top Right) */}
                                                <div className="hidden md:block absolute top-6 right-6 z-20">
                                                    <div className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-[11px] font-black border border-white/10 shadow-xl">
                                                        <Star size={10} fill="#f59e0b" className="text-amber-500" />
                                                        {Number(item.rating || 4.5).toFixed(1)}
                                                        <span className="text-gray-400 font-medium ml-1">({(item.reviewCount || 0) > 1000 ? `${(item.reviewCount / 1000).toFixed(1)}k` : item.reviewCount || 0})</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Body Content */}
                                            <div className="relative px-3 md:px-5 pb-5 md:pb-7 flex flex-col flex-1 -mt-6 md:-mt-10 z-20">
                                                <div className="flex-1">
                                                    <h4 className="text-xs md:text-base font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight uppercase mb-1 line-clamp-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-gray-500 font-medium text-[9px] md:text-xs italic leading-relaxed line-clamp-1 md:line-clamp-2 mb-3 opacity-80">
                                                        {item.shortDescription || item.description || "Expert service at your doorstep."}
                                                    </p>
                                                </div>

                                                <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Total Fee</span>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-sm font-bold text-primary">₹</span>
                                                            <span className="text-sm md:text-xl font-black text-gray-950 tracking-tighter leading-none">
                                                                {item.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="relative group/btn">
                                                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover/btn:scale-150 transition-transform duration-500" />
                                                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-950 text-white flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-xl group-hover:shadow-primary/40 relative z-10">
                                                            <ChevronRight size={14} className="md:size-[18px] stroke-[3] group-hover:translate-x-0.5 transition-transform" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Subtle Glow Effect on Hover */}
                                            <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-primary/10 rounded-[24px] md:rounded-[40px] transition-all duration-500" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                <div className="lg:hidden mt-4 text-center">
                    <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                        <div className="w-12 h-[1px] bg-gray-200" />
                        Swipe to Explore
                        <div className="w-12 h-[1px] bg-gray-200" />
                    </div>
                </div>
            </div>
        </section>
    );
}
