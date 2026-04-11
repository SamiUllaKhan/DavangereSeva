'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/SearchBar';
import { ServiceSelectionListing } from '@/components/services/ServiceSelectionListing';
import { motion } from 'framer-motion';
import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCategoriesAndServices } from '@/app/services/actions';

function ServicesPageContent() {
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoriesAndServices();
                setCategories(data.categories);
                setServices(data.services);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const query = searchParams.get('q')?.toLowerCase() || '';

    // Filter services based on search query
    const filteredServices = useMemo(() => {
        if (!query) return [];
        return services.filter(service => 
            service.name.toLowerCase().includes(query) || 
            service.description?.toLowerCase().includes(query) ||
            service.category?.name?.toLowerCase().includes(query)
        );
    }, [services, query]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 pt-24 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header Section - Premium & Immersive */}
            <section className="relative pt-20 md:pt-32 pb-12 md:pb-24 overflow-hidden bg-primary">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
                </div>
                
                <div className="container px-4 md:px-8 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-8 tracking-tighter uppercase text-white leading-tight">
                                {query ? 'SEARCH RESULTS' : <>WHAT CAN WE <span className="text-blue-200">FIX</span>?</>}
                            </h1>
                            <p className="text-[10px] md:text-xl text-blue-100/80 font-black mb-8 md:mb-14 uppercase tracking-[0.3em]">
                                {query ? `Showing results for "${query}"` : 'Reliable. Professional. Guaranteed.'}
                            </p>
                        </motion.div>
 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-2xl mx-auto"
                        >
                            <SearchBar variant="services" placeholder="Try 'AC Repair' or 'Cleaning'..." className="shadow-2xl shadow-primary/20" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="container px-4 md:px-8 mx-auto -mt-8 md:-mt-12 relative z-20 pb-24">
                {query ? (
                    <div className="space-y-12">
                        {filteredServices.length > 0 ? (
                            <ServiceSelectionListing
                                categories={categories}
                                services={filteredServices}
                                initialCategoryId="all"
                            />
                        ) : (
                            <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100 shadow-xl max-w-3xl mx-auto mt-12">
                                <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-300 mb-8">
                                    <Icons.SearchX size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">No services found</h3>
                                <p className="text-slate-500 mb-10">We couldn't find any services matching your search. Try a different keyword or browse our categories below.</p>
                                <Button asChild variant="outline" className="rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-xs border-slate-200 hover:bg-slate-50">
                                    <Link href="/services">View All Categories</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                        {categories.map((category: any, index: number) => {
                            const IconComponent = (Icons as any)[category.icon] || Icons.Grid;
                            return (
                                <Link 
                                    key={category._id} 
                                    href={`/services/${category.slug}`}
                                    className="group bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 md:hover:-translate-y-2 flex flex-col items-center text-center"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="w-16 h-16 md:w-28 md:h-28 bg-primary/5 rounded-[24px] md:rounded-[40px] flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary shrink-0"
                                    >
                                        <IconComponent className="w-8 h-8 md:w-14 md:h-14" />
                                    </motion.div>
                                    <div className="space-y-2 md:space-y-3">
                                        <h3 className="text-sm md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tighter uppercase leading-tight">
                                            {category.name}
                                        </h3>
                                        <p className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform md:translate-y-2 group-hover:translate-y-0">
                                            Book Now
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Support CTA */}
            <section className="py-24 bg-white border-t border-slate-50">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="bg-slate-900 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden group">
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-white leading-none italic">Need Custom Help?</h2>
                                <p className="text-blue-300/60 font-black uppercase tracking-[0.3em] text-xs">
                                    Our experts are available 24/7 for consultations
                                </p>
                            </div>
                            <Button asChild size="lg" className="h-14 md:h-20 px-10 md:px-16 rounded-2xl md:rounded-[32px] font-black uppercase tracking-widest text-xs md:text-base shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary text-white hover:scale-105 active:scale-95">
                                <Link href="tel:+918904777090" className="flex items-center gap-4">
                                    <Icons.PhoneCall size={24} />
                                    Talk To An Expert
                                </Link>
                            </Button>
                        </div>
                        {/* Decorative Icons */}
                        <div className="absolute top-10 left-10 opacity-10 group-hover:opacity-20 transition-all duration-700 rotate-12 text-white">
                            <Icons.Wrench size={160} />
                        </div>
                        <div className="absolute bottom-10 right-10 opacity-10 group-hover:opacity-20 transition-all duration-700 -rotate-12 text-white">
                            <Icons.ShieldCheck size={200} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F8FAFC] pt-24 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ServicesPageContent />
        </Suspense>
    );
}

