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

async function getServicesData() {
    try {
        await dbConnect();
        const categories = await Category.find().lean();
        const services = await Service.find().populate('category').lean();
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
    // Resolve searchParams before using
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.q?.toLowerCase() || '';

    // If query exists, we match services (name, description, features) and categories (name, description)
    // and display a combined/filtered list. We'll show matched services specifically, or categories if only category matched.
    const displayItems: any[] = [];

    if (query) {
        // Find matching services
        const matchedServices = services.filter((srv: any) => {
            return (
                srv.name?.toLowerCase().includes(query) ||
                srv.description?.toLowerCase().includes(query) ||
                (srv.features || []).some((f: string) => f.toLowerCase().includes(query))
            );
        }).map((srv: any) => ({
            ...srv,
            type: 'service',
            icon: srv.category?.icon || 'Wrench'
        }));

        // Find matching categories
        const matchedCategories = categories.filter((cat: any) => {
            return (
                cat.name?.toLowerCase().includes(query) ||
                cat.description?.toLowerCase().includes(query)
            );
        }).map((cat: any) => ({
            ...cat,
            type: 'category'
        }));

        // Combine unique items (Services and Categories)
        displayItems.push(...matchedCategories);

        // Add services unless they belong to a category we already matched
        // to avoid duplicating the entire category's content with its own service
        matchedServices.forEach((srv: any) => {
            // Let's just show them all for better search visibility
            displayItems.push(srv);
        });

    } else {
        // No query, just show all categories
        displayItems.push(...categories.map((c: any) => ({ ...c, type: 'category' })));
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <section className="bg-primary pt-20 pb-32 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>
                <div className="container px-4 md:px-8 mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
                        All Professional Services
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                        Professional, reliable, and affordable services delivered to your doorstep in Davanagere.
                    </p>

                    <SearchBar variant="services" placeholder="Search for a service..." />
                </div>
            </section>

            {/* Services Grid */}
            <section className="container px-4 md:px-8 mx-auto -mt-16 pb-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayItems.length > 0 ? (
                        displayItems.map((item: any) => {
                            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
                            // For categories we had text like "Send Request", for services "Book Now"
                            const statusLabel = item.status === 'coming-soon' ? 'Send Request' : 'Book Now';

                            return (
                                <Link key={item.slug + item.type} href={`/services/${item.slug}`} className="group">
                                    <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden hover:-translate-y-2 flex flex-col">
                                        <CardContent className="p-8 flex-1 flex flex-col items-center text-center">
                                            <div className={`w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-primary/5 relative`}>
                                                <IconComponent className="w-10 h-10 text-primary" />
                                                {item.status === 'coming-soon' && (
                                                    <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white font-black text-[8px] uppercase tracking-tighter shadow-lg">Soon</Badge>
                                                )}
                                                {item.type === 'service' && (
                                                    <span className="absolute -bottom-2 bg-blue-100 text-blue-700 font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm border border-blue-200">Service</span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed line-clamp-3">
                                                {item.description}
                                            </p>
                                            <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                                                {statusLabel} <Icons.ArrowRight size={14} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <Icons.SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
                            <p className="text-gray-500">
                                We couldn't find any services matching "{query}".
                            </p>
                            <Link href="/services">
                                <Button variant="outline" className="mt-6 rounded-xl">
                                    Clear Search
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Need Help CTA */}
            <section className="py-24 bg-white">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="bg-primary/5 rounded-[48px] p-12 md:p-20 text-center border border-primary/10 relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Can't find what you're looking for?</h2>
                            <p className="text-lg text-gray-600 mb-10 font-medium">
                                Our team is always expanding our service catalog. Contact us for custom requirements.
                            </p>
                            <Link href="tel:+918904777090">
                                <Button size="lg" className="h-16 px-10 rounded-full font-black uppercase tracking-widest text-base shadow-xl hover:shadow-primary/20 transition-all">
                                    Talk To An Expert
                                </Button>
                            </Link>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />
                    </div>
                </div>
            </section>
        </div>
    );
}
