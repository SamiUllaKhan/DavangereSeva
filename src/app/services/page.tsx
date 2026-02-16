import Link from 'next/link';
import {
    Wrench,
    Paintbrush,
    Sparkles,
    Wind,
    Plug,
    Bug,
    Truck,
    Monitor,
    Search,
    ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
    { name: 'Cleaning', icon: Sparkles, slug: 'cleaning', color: 'bg-blue-50', description: 'Deep cleaning for homes and offices.' },
    { name: 'Plumbing', icon: Wrench, slug: 'plumbing', color: 'bg-indigo-50', description: 'Expert solutions for all plumbing needs.' },
    { name: 'Electrician', icon: Plug, slug: 'electrician', color: 'bg-amber-50', description: 'Certified electrical repairs and installs.' },
    { name: 'AC Repair', icon: Wind, slug: 'ac-repair', color: 'bg-cyan-50', description: 'Maintenance and repair for all AC types.' },
    { name: 'Painting', icon: Paintbrush, slug: 'painting', color: 'bg-rose-50', description: 'Professional interior and exterior painting.' },
    { name: 'Pest Control', icon: Bug, slug: 'pest-control', color: 'bg-emerald-50', description: 'Safe and effective pest management.' },
    { name: 'Appliance', icon: Monitor, slug: 'appliance-repair', color: 'bg-purple-50', description: 'Repair for all major home appliances.' },
    { name: 'Shifting', icon: Truck, slug: 'packers-movers', color: 'bg-orange-50', description: 'Reliable packing and moving services.' },
];

export default function ServicesPage() {
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

                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            placeholder="Search for a service..."
                            className="pl-12 h-14 bg-white text-black rounded-2xl border-none shadow-2xl text-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="container px-4 md:px-8 mx-auto -mt-16 pb-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link key={cat.slug} href={`/services/${cat.slug}`} className="group">
                            <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden hover:-translate-y-2 flex flex-col">
                                <CardContent className="p-8 flex-1 flex flex-col items-center text-center">
                                    <div className={`w-20 h-20 rounded-3xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-primary/5`}>
                                        <cat.icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">
                                        {cat.description}
                                    </p>
                                    <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                                        Book Now <ArrowRight size={14} />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
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
                            <Link href="tel:+919876543210">
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
