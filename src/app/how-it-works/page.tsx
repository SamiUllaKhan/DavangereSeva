import {
    Search,
    Calendar,
    CheckCircle,
    PhoneCall,
    Settings,
    ShieldCheck,
    Star,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-primary pt-24 pb-32 text-white relative overflow-hidden">
                <div className="container px-4 md:px-8 mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[1.1]">
                        Simplicity in <br /> every <span className="text-blue-400">Step</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 font-medium">
                        We've redesigned the service experience from the ground up to be fast, transparent, and completely worry-free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/services">
                            <Button size="lg" className="bg-white text-primary hover:bg-blue-50 h-16 px-10 rounded-full font-black uppercase tracking-widest text-base shadow-2xl transition-all">
                                Browse Services
                            </Button>
                        </Link>
                        <Link href="tel:+919876543210">
                            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-16 px-10 rounded-full font-black uppercase tracking-widest text-base backdrop-blur-md">
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
            </section>

            {/* Step by Step */}
            <section className="py-24">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Desktop Connector Line */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gray-50 -z-0" />

                        {[
                            {
                                title: "Discover & Choose",
                                desc: "Browse through our extensively curated list of professional services tailored for Davanagere.",
                                icon: Search,
                                step: "01",
                                color: "bg-blue-500"
                            },
                            {
                                title: "Book Instantly",
                                desc: "Select a date and time that fits your busy lifestyle. No back-and-forth calls needed.",
                                icon: Calendar,
                                step: "02",
                                color: "bg-primary"
                            },
                            {
                                title: "Excellence Delivered",
                                desc: "Our verified professional arrives and ensures the job is done to the highest standards.",
                                icon: CheckCircle,
                                step: "03",
                                color: "bg-indigo-600"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-24 h-24 rounded-[32px] ${item.color} text-white flex items-center justify-center mb-8 shadow-2xl shadow-${item.color.split('-')[1]}/20 group hover:scale-110 transition-transform duration-500`}>
                                    <item.icon size={40} />
                                </div>
                                <span className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Step {item.step}</span>
                                <h3 className="text-2xl font-black mb-6 tracking-tight text-gray-900">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why We Are Different */}
            <section className="py-24 bg-gray-50/50">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="max-w-3xl mb-20">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">The Advantage</h2>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-gray-900 leading-tight">
                            WHY DAVANAGERE SEVA <br /> STANDS OUT
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Strictly Verified", icon: ShieldCheck, desc: "Every professional undergoes a rigorous background check." },
                            { title: "Price Guarantee", icon: Zap, desc: "Know the exact cost upfront. No hidden charges, ever." },
                            { title: "Satisfaction First", icon: Star, desc: "We don't consider the job done until you are 100% happy." },
                            { title: "24/7 Support", icon: PhoneCall, desc: "Our local team is always here to resolve any queries." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                                <div className="bg-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon className="text-primary" size={28} />
                                </div>
                                <h4 className="font-bold text-lg mb-4 tracking-tight">{item.title}</h4>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
