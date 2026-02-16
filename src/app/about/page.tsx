import {
    Users,
    Target,
    Heart,
    ShieldCheck,
    MapPin,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden">
                <div className="container px-4 md:px-8 mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-6">Our Story</h2>
                        <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">
                            Empowering <br />
                            <span className="text-primary italic">Davanagere</span> <br />
                            Every Day.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-medium leading-relaxed">
                            Davanagere Seva was founded with a simple mission: to bridge the gap between quality professionals and households in our vibrant city.
                        </p>
                    </div>
                </div>

                {/* Large Decorative Text background */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[40rem] font-black uppercase leading-none">SEVA</span>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-primary py-24 text-white">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { val: "500+", label: "Verified Pros" },
                            { val: "10k+", label: "Happy Homes" },
                            { val: "25+", label: "Service Categories" },
                            { val: "24/7", label: "Local Support" }
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">{stat.val}</div>
                                <div className="text-blue-100/60 font-black uppercase tracking-[0.2em] text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-32">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div className="space-y-10">
                            <div className="p-12 rounded-[60px] bg-gray-50 border border-gray-100 hover:shadow-2xl transition-all duration-700">
                                <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center mb-8">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-3xl font-black mb-6 tracking-tight">Our Vision</h3>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    To become the most trusted and efficient service ecosystem in Davanagere, where expertise meets opportunity seamlessly.
                                </p>
                            </div>

                            <div className="p-12 rounded-[60px] bg-primary/5 border border-primary/10 hover:shadow-2xl transition-all duration-700">
                                <div className="w-16 h-16 rounded-3xl bg-blue-500 text-white flex items-center justify-center mb-8">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-3xl font-black mb-6 tracking-tight tracking-tight">Our Mission</h3>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    To empower local professionals by providing a transparent platform and to ensure households receive premium services with a single click.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Values that drive us</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Transparency", icon: ShieldCheck, desc: "No hidden agendas, clear pricing, and open communication." },
                                    { title: "Community First", icon: Heart, desc: "We are built by Davanagere, for Davanagere." },
                                    { title: "Unyielding Quality", icon: CheckCircle2, desc: "We never compromise on the standards of our deliverables." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6 items-start group">
                                        <div className="mt-1 p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h4>
                                            <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 bg-gray-900 text-white p-12 rounded-[48px] relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold mb-4 tracking-tight">Based in the heart of Karnataka</h4>
                                    <p className="text-gray-400 mb-8 font-medium">Serving every corner of Davanagere city with pride and dedication.</p>
                                    <Link href="/">
                                        <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-bold uppercase tracking-widest text-xs px-8">
                                            Our Locations <MapPin className="ml-2" size={14} />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <MapPin size={120} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
