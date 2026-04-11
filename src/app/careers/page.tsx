import React from 'react';
import Link from 'next/link';
import { Briefcase, Target, Users2, Rocket, Heart, Star, ChevronRight, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
    title: 'Careers | Join Davanagere Seva',
    description: 'Join our team and help us build the most trusted service marketplace in Davanagere.',
};

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-primary pt-40 pb-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                </div>
                
                <div className="container px-4 md:px-8 mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-100 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md border border-white/10">
                        <Rocket size={14} className="text-blue-300" />
                        We're Hiring
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                        Build the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Home Services</span>
                    </h1>
                    <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Join a fast-growing team in Davanagere dedicated to bringing quality, trust, and professional services to every household.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#open-roles" className="bg-white text-primary px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 active:scale-95">View Open Roles</a>
                        <a href="#culture" className="text-white hover:text-blue-200 font-bold px-8 py-5 transition-colors">Our Culture</a>
                    </div>
                </div>
            </div>

            {/* Why Join Us */}
            <div id="culture" className="py-24 bg-white scroll-mt-24">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Why Join Our Mission?</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">We aren't just building an app; we're building a community of empowered professionals and satisfied homeowners.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Heart className="text-rose-500" />, title: 'People First', desc: 'We prioritize the growth and well-being of our team members and partners.' },
                            { icon: <Target className="text-blue-500" />, title: 'Impact Driven', desc: 'Directly influence how thousands of people in Davanagere get work done.' },
                            { icon: <Star className="text-amber-500" />, title: 'Excellence', desc: 'We take pride in delivering top-tier service standards at every step.' }
                        ].map((benefit, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    {benefit.icon}
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-4">{benefit.title}</h4>
                                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats / Numbers */}
            <div className="bg-slate-900 py-20 overflow-hidden relative">
                <div className="container px-4 md:px-8 mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">50+</div>
                            <div className="text-blue-300/60 text-sm uppercase tracking-widest font-bold">Team Members</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">15+</div>
                            <div className="text-blue-300/60 text-sm uppercase tracking-widest font-bold">Service Categories</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">10k+</div>
                            <div className="text-blue-300/60 text-sm uppercase tracking-widest font-bold">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black mb-2">4.8</div>
                            <div className="text-blue-300/60 text-sm uppercase tracking-widest font-bold">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open Roles */}
            <div id="open-roles" className="py-32 scroll-mt-24">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">
                                <Briefcase size={20} />
                                Open Opportunities
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Find Your Place at <br /> Davanagere Seva</h2>
                        </div>
                        <p className="text-slate-500 md:text-right max-w-xs">Filter by position or category to find the perfect role for you.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: 'Operations Manager', type: 'Full-time', location: 'Davangere (On-site)', category: 'Operations' },
                            { title: 'Customer Support Executive', type: 'Full-time', location: 'Davangere (Remote)', category: 'Support' },
                            { title: 'Field Service Specialist', type: 'Contract', location: 'Harihar/Honnali', category: 'Services' },
                            { title: 'Digital Marketing Associate', type: 'Full-time', location: 'Davangere (Hybrid)', category: 'Marketing' }
                        ].map((job, i) => (
                            <div key={i} className="group p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Briefcase size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{job.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5 font-medium"><MapPin size={14} /> {job.location}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <span className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest">{job.category}</span>
                                    <a 
                                        href={`mailto:careers@davanagereseva.com?subject=Application for ${job.title} - Davanagere Seva`}
                                        className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs text-center font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-primary to-blue-700 text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black mb-4">Don't See the Right Fit?</h3>
                            <p className="text-blue-100/80 mb-10 max-w-xl mx-auto">We're always looking for talented individuals. Send us your CV and tell us why you'd be a great addition to the Davanagere Seva team.</p>
                            <a href="mailto:careers@davanagereseva.com" className="bg-white text-primary px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-3">
                                <Mail size={20} />
                                Send Open Application
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
