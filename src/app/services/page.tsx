export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
    Wrench,
    Paintbrush,
    Sparkles,
    Wind,
    Plug,
    Bug,
    Truck,
    Monitor,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCategories, getServices, searchServices } from '@/app/actions/service';
import ServicesSearchBar from '@/components/search/ServicesSearchBar';

const iconMap: Record<string, any> = {
    Sparkles, Wrench, Plug, Wind, Paintbrush, Bug, Monitor, Truck,
};

interface Props {
    searchParams: Promise<{ q?: string }>;
}

export default async function ServicesPage({ searchParams }: Props) {
    const { q } = await searchParams;
    const categories = await getCategories();
    let services: any[] = [];

    if (q && q.trim().length >= 2) {
        services = await searchServices(q);
    } else {
        services = await getServices();
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
                        {q ? `Results for "${q}"` : 'All Professional Services'}
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                        Professional, reliable, and affordable services delivered to your doorstep in Davanagere.
                    </p>

                    <ServicesSearchBar initialQuery={q || ''} />
                </div>
            </section>

            {/* Category Filter Chips */}
            {!q && (
                <section className="container px-4 md:px-8 mx-auto -mt-6 relative z-30 mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat: any) => {
                            const IconComponent = iconMap[cat.icon] || Sparkles;
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/services/${cat.slug}`}
                                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all text-sm font-semibold text-gray-700 hover:text-primary"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Services Grid */}
            <section className="container px-4 md:px-8 mx-auto -mt-10 pb-24 relative z-20">
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                        {services.map((service: any) => {
                            const catIcon = service.category?.icon;
                            const IconComponent = iconMap[catIcon] || Sparkles;
                            const catColor = service.category?.color || 'bg-blue-50';
                            return (
                                <Link key={service._id} href={`/services/${service.slug}`} className="group">
                                    <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden hover:-translate-y-2 flex flex-col">
                                        <CardContent className="p-8 flex-1 flex flex-col items-center text-center">
                                            <div className={`w-20 h-20 rounded-3xl ${catColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-primary/5`}>
                                                <IconComponent className="w-10 h-10 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                                                {service.name}
                                            </h3>
                                            <p className="text-primary font-bold text-lg mb-3">
                                                {'\u20B9'}{service.price}
                                            </p>
                                            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">
                                                {service.shortDescription || service.description?.substring(0, 100) + '...'}
                                            </p>
                                            <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                                                Book Now <ArrowRight size={14} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-2xl font-bold text-gray-400 mb-4">No services found</p>
                        <p className="text-gray-500 mb-6">
                            {q ? `No results for "${q}". Try a different search term.` : 'No services available at the moment.'}
                        </p>
                        {q && (
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="rounded-full">
                                    View All Services
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </section>

            {/* Need Help CTA */}
            <section className="py-24 bg-white">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="bg-primary/5 rounded-[48px] p-12 md:p-20 text-center border border-primary/10 relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-balance">{"Can't find what you're looking for?"}</h2>
                            <p className="text-lg text-gray-600 mb-10 font-medium">
                                Our team is always expanding our service catalog. Contact us for custom requirements.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="h-16 px-10 rounded-full font-black uppercase tracking-widest text-base shadow-xl hover:shadow-primary/20 transition-all">
                                    Talk To An Expert
                                </Button>
                            </Link>
                        </div>
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />
                    </div>
                </div>
            </section>
        </div>
    );
}
