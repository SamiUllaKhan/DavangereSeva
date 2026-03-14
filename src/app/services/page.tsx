'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/SearchBar';
import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCategoriesAndServices } from '@/app/services/actions';

function ServicesPageContent() {
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoriesAndServices();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const query = searchParams.get('q')?.toLowerCase() || '';

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 pt-24 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section - Premium & Immersive */}
            <section className="relative pt-18 md:pt-32 pb-6 md:pb-20 mb-4 md:mb-12 overflow-hidden bg-primary overflow-x-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
                </div>
                
                <div className="container px-4 md:px-8 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-xl md:text-6xl font-black mb-2 md:mb-6 tracking-tight uppercase text-white leading-tight">
                                WHAT CAN WE <span className="text-blue-200">FIX</span>?
                            </h1>
                            <p className="text-[8px] md:text-xl text-blue-100/80 font-medium mb-4 md:mb-10 max-w-2xl mx-auto uppercase tracking-widest">
                                Reliable. Professional. Guaranteed.
                            </p>
                        </motion.div>
 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-2xl mx-auto px-1"
                        >
                            <SearchBar variant="services" placeholder="Search for service..." className="shadow-2xl shadow-black/20" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="container px-4 md:px-8 mx-auto pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category: any, index: number) => {
                        const IconComponent = (Icons as any)[category.icon] || Icons.Grid;
                        return (
                            <Link 
                                key={category._id} 
                                href={`/services/${category.slug}`}
                                className="group bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 text-center flex flex-col items-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary"
                                >
                                    <IconComponent size={48} />
                                </motion.div>
                                <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors tracking-tighter uppercase mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    Book Now
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="bg-gray-50 rounded-[48px] p-12 md:p-20 text-center border border-gray-100 relative overflow-hidden group">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase italic">Need Custom Help?</h2>
                            <p className="text-lg text-gray-500 mb-10 font-bold uppercase tracking-widest text-xs">
                                Our experts are available 24/7 for consultations
                            </p>
                            <Button asChild size="lg" className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-base shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary text-white">
                                <Link href="tel:+918904777090">
                                    Talk To An Expert
                                </Link>
                            </Button>
                        </div>
                        <div className="absolute top-10 left-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12 text-black">
                            <Icons.Wrench size={120} />
                        </div>
                        <div className="absolute bottom-10 right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity -rotate-12 text-black">
                            <Icons.ShieldCheck size={160} />
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
            <div className="min-h-screen bg-gray-50/50 pt-24 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ServicesPageContent />
        </Suspense>
    );
}

