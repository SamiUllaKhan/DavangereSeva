import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Service from '@/models/Service';
import { SearchBar } from '@/components/layout/SearchBar';
import { ServiceSelectionListing } from '@/components/services/ServiceSelectionListing';

async function getServicesData() {
    try {
        await dbConnect();
        const categories = await Category.find({ status: { $ne: 'inactive' } }).sort({ name: 1 }).lean();
        const services = await Service.find({ isActive: true }).populate('category').lean();
        return {
            categories: JSON.parse(JSON.stringify(categories)),
            services: JSON.parse(JSON.stringify(services))
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { categories: [], services: [] };
    }
}

export default async function ServicesPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const { categories, services } = await getServicesData();
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.q?.toLowerCase() || '';

    // Filtered services if query exists
    const filteredServices = query
        ? services.filter((s: any) =>
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.category?.name?.toLowerCase().includes(query)
        )
        : services;

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header Section - Modern and Sleek */}
            <section className="bg-white border-b border-gray-100 pt-24 pb-12 mb-8 container px-4 md:px-8 mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter uppercase text-gray-900">
                            Book Your Service
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Professional door-step services in Davanagere
                        </p>
                    </div>
                    <div className="w-full md:w-[400px]">
                        <SearchBar variant="services" placeholder="Search for cleaning, repair..." />
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="container px-4 md:px-8 mx-auto pb-24">
                <ServiceSelectionListing
                    categories={categories}
                    services={filteredServices}
                />
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
                            <Button asChild size="lg" className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-base shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary">
                                <Link href="tel:+918904777090">
                                    Talk To An Expert
                                </Link>
                            </Button>
                        </div>
                        {/* Decorative Background Icons */}
                        <div className="absolute top-10 left-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12">
                            <Icons.Wrench size={120} />
                        </div>
                        <div className="absolute bottom-10 right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity -rotate-12">
                            <Icons.ShieldCheck size={160} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
