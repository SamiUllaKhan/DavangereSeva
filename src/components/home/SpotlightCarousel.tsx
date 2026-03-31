import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { Star, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const spotlightItems = [
    {
        id: 1,
        title: "AC Deep Cleaning",
        desc: "Breathe fresh air. Special foam-based cleaning.",
        price: "699",
        rating: "4.9",
        revCount: "2.4k",
        image: "/images/ac-deep-cleaning.png",
        gradient: "from-blue-600/10 to-indigo-600/10",
        slug: "ac-service"
    },
    {
        id: 2,
        title: "AC Repair & Service",
        desc: "Gas charging & leak fix. Expert technicians.",
        price: "499",
        rating: "4.8",
        revCount: "1.8k",
        image: "/images/ac-repair.png",
        gradient: "from-cyan-600/10 to-blue-600/10",
        slug: "ac-service"
    },
    {
        id: 3,
        title: "Full Home Cleaning",
        desc: "Deep kitchen & bathroom cleaning experts.",
        price: "1299",
        rating: "4.7",
        revCount: "3.2k",
        image: null,
        gradient: "from-amber-600/10 to-orange-600/10",
        slug: "home-cleaning"
    },
    {
        id: 4,
        title: "Expert Electrician",
        desc: "Wiring, fixtures & appliance repair.",
        price: "199",
        rating: "4.9",
        revCount: "5.1k",
        image: null,
        gradient: "from-emerald-600/10 to-teal-600/10",
        slug: "electrical"
    },
    {
        id: 5,
        title: "Kitchen Deep Clean",
        desc: "Removal of oil, grease and tough stains.",
        price: "899",
        rating: "4.8",
        revCount: "1.1k",
        image: null,
        gradient: "from-rose-600/10 to-pink-600/10",
        slug: "home-cleaning"
    },
    {
        id: 6,
        title: "Bathroom Cleaning",
        desc: "Water stain removal & sanitization.",
        price: "449",
        rating: "4.7",
        revCount: "940",
        image: null,
        gradient: "from-violet-600/10 to-purple-600/10",
        slug: "home-cleaning"
    }
];

export function SpotlightCarousel() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const x = useMotionValue(0);

    useEffect(() => {
        if (innerRef.current && carouselRef.current) {
            setWidth(innerRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        const itemWidth = innerRef.current ? innerRef.current.scrollWidth / spotlightItems.length : 300;
        const currentX = x.get();
        let targetX = direction === 'left' ? currentX + (itemWidth * 2) : currentX - (itemWidth * 2);
        
        // Clamp the values
        if (targetX > 0) targetX = 0;
        if (targetX < -width) targetX = -width;

        controls.start({ x: targetX, transition: { type: "spring", stiffness: 200, damping: 25 } });
    };

    return (
        <section className="py-24 bg-[#FAFAFA] overflow-hidden">
            <div className="container px-6 md:px-12 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 animate-fade-in border border-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Curated Selection
                        </div>
                        <h3 className="text-5xl md:text-7xl font-black tracking-[-0.04em] text-gray-900 leading-[0.9] uppercase">
                            In the <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600 italic">Spotlight</span>
                        </h3>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6 shrink-0">
                        <p className="text-gray-500 font-medium text-sm md:text-base max-w-[320px] md:text-right leading-relaxed italic text-balance opacity-80">
                            "Handpicked services with top-tier verified professionals, designed for the modern Davanagere home."
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
                            className="flex gap-4 md:gap-8 py-8"
                        >
                            {spotlightItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -12 }}
                                    className="min-w-[calc(50%-8px)] md:min-w-[calc(25%-24px)] flex-shrink-0 group pointer-events-none self-stretch"
                                >
                                    <Link 
                                        href={`/services/${item.slug}`} 
                                        className="flex flex-col h-full pointer-events-auto"
                                        onDragStart={(e) => e.preventDefault()}
                                    >
                                        <div className="relative flex flex-col h-full bg-white rounded-[24px] md:rounded-[40px] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden border border-gray-100/50">
                                            {/* Top Visual Section */}
                                            <div className="relative h-[160px] md:h-[240px] w-full overflow-hidden">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40`} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                                                
                                                {item.image ? (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[2.5s] ease-out pointer-events-none"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                        <div className="relative scale-75 md:scale-100">
                                                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-[2.5] animate-pulse" />
                                                            <Zap size={64} className="text-primary/10 relative z-10" />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Rating Floating Badge */}
                                                <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20">
                                                    <div className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-md text-white px-2 md:px-3 py-1 md:py-1.5 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black border border-white/10 shadow-xl">
                                                        <Star size={8} fill="#f59e0b" className="text-amber-500" />
                                                        {item.rating}
                                                    </div>
                                                </div>

                                                {/* Featured Badge */}
                                                <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20">
                                                    <div className="bg-white/90 backdrop-blur-md px-2 md:px-3.5 py-1 md:py-1.5 rounded-xl md:rounded-2xl text-[7px] md:text-[9px] font-black uppercase tracking-widest text-gray-900 border border-gray-100 shadow-sm flex items-center gap-1 md:gap-2">
                                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary animate-pulse" />
                                                        Exclusive
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Body Content */}
                                            <div className="relative px-4 md:px-8 pb-6 md:pb-10 flex flex-col flex-1 -mt-8 md:-mt-12 z-20">
                                                <div className="flex-1">
                                                    <h4 className="text-sm md:text-2xl font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight uppercase mb-1 md:mb-2 line-clamp-1">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-gray-400 font-medium text-[10px] md:text-xs italic leading-relaxed line-clamp-1 md:line-clamp-2 mb-4 md:mb-8 pr-2">
                                                        "{item.desc}"
                                                    </p>
                                                </div>

                                                <div className="pt-3 md:pt-6 border-t border-gray-50 flex justify-between items-end">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] md:text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-0.5 md:mb-1">Book Today</span>
                                                        <span className="text-lg md:text-3xl font-black text-gray-950 tracking-tighter leading-none">
                                                            <span className="text-[10px] md:text-sm font-bold text-primary mr-0.5 md:mr-1">₹</span>
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="relative flex items-center justify-center">
                                                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                                                        <div className="h-8 w-8 md:h-14 md:w-14 rounded-full bg-gray-950 text-white flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-xl group-hover:shadow-primary/40 relative z-10 scale-90 md:scale-100">
                                                            <motion.div
                                                                whileHover={{ rotate: 90 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            >
                                                                <ChevronRight size={16} className="md:size-[24px] stroke-[3]" />
                                                            </motion.div>
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

                <div className="lg:hidden mt-20 text-center">
                    <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                        <div className="w-12 h-[1px] bg-gray-200" />
                        Explore Excellence
                        <div className="w-12 h-[1px] bg-gray-200" />
                    </div>
                </div>
            </div>
        </section>
    );
}
