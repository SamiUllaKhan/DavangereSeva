import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react';

export const metadata = {
    title: 'Terms of Use | Davanagere Seva',
    description: 'Please read these terms of use carefully before using our services.',
};

export default function TermsOfUse() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 -right-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl" />
                </div>
                <div className="container px-4 md:px-8 mx-auto relative z-10">
                    <nav className="flex items-center gap-2 text-blue-200 text-sm mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Terms of Use</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Terms of Use</h1>
                    <p className="text-blue-100 text-lg max-w-2xl">
                        Last updated: April 11, 2026. Please read these terms carefully to understand your rights and responsibilities when using Davanagere Seva.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container px-4 md:px-8 mx-auto py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Navigation Sidebar (Desktop) */}
                    <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <FileText className="text-primary" size={20} />
                                Quick Links
                            </h3>
                            <nav className="flex flex-col gap-4">
                                <a href="#introduction" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">1. Introduction</a>
                                <a href="#services" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">2. Services Offered</a>
                                <a href="#user-responsibilities" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">3. User Responsibilities</a>
                                <a href="#booking-payment" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">4. Booking & Payments</a>
                                <a href="#cancellation" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">5. Cancellation & Refunds</a>
                                <a href="#liability" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">6. Limitation of Liability</a>
                                <a href="#contact" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium border-t border-slate-100 pt-4 mt-2">Contact Support</a>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200">
                        {/* Section 1 */}
                        <section id="introduction" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                01. Welcome
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Welcome to Davanagere Seva</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                                <p>
                                    Thank you for using Davanagere Seva. By accessing or using our platform, website, or mobile application, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
                                </p>
                                <p>
                                    Davanagere Seva operates as a marketplace connecting users with independent service professionals. We facilitate the booking process but are not the direct employer of the service providers.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="services" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                02. Scope
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Services Offered</h2>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {[
                                    { title: 'Electrical & Plumbing', desc: 'Expert repair and installation services.' },
                                    { title: 'Home Cleaning', desc: 'Professional deep cleaning and sanitation.' },
                                    { title: 'Appliance Repair', desc: 'Maintenance for all major home appliances.' },
                                    { title: 'Personal Grooming', desc: 'Salon and wellness services at your home.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="shrink-0 text-primary pt-1">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                We cover Davanagere, Harihar, Chitradurga, and surrounding areas within a 70 km radius. Availability of specific services may vary based on your exact location.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section id="user-responsibilities" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                03. Conduct
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">User Responsibilities</h2>
                            <ul className="space-y-4">
                                {[
                                    'Provide accurate contact and location information when booking.',
                                    'Ensure a safe and respectful environment for the service professionals.',
                                    'Comply with all local laws and regulations.',
                                    'Unauthorized commercial use of the platform is strictly prohibited.'
                                ].map((bullet, i) => (
                                    <li key={i} className="flex gap-4 items-start text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Alert Box */}
                        <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                            <AlertCircle className="text-amber-600 shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-amber-900 mb-1">Safety Notice</h4>
                                <p className="text-sm text-amber-800 leading-relaxed">
                                    For your safety, we recommend verifying the identity of the service professional upon arrival. Never share your account passwords or sensitive personal financial details directly with providers.
                                </p>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <section id="booking-payment" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                04. Financials
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Booking & Payments</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                                <p>
                                    All bookings made through the platform are subject to availability. Prices listed are estimates and may be finalized after a preliminary inspection by the professional if required.
                                </p>
                                <p>
                                    Payments can be made online via our secure payment gateway or, where applicable, as cash-on-service. Any tips or additional payments made directly to the provider are outside our responsibility.
                                </p>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="cancellation" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                05. Policy
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Cancellation & Refunds</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Cancellations made more than 4 hours before the scheduled service are eligible for a full refund. Same-day cancellations may incur a nominal processing fee.
                            </p>
                            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                <h4 className="font-bold mb-4 text-slate-900 flex items-center gap-2">
                                    <Shield size={18} className="text-primary" />
                                    Refund Guarantee
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    If a service is not performed to the agreed standard, we offer a re-visit guarantee. Disputes must be raised within 24 hours of service completion to be eligible for review.
                                </p>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="liability" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                06. Legal
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Limitation of Liability</h2>
                            <p className="text-slate-600 leading-relaxed italic">
                                Davanagere Seva is not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services. While we vet all professionals, we do not guarantee the absolute perfection of every service performed.
                            </p>
                        </section>

                        {/* Final Contact Section */}
                        <section id="contact" className="pt-12 border-t border-slate-100">
                            <div className="bg-primary rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-black mb-4">Have Questions?</h2>
                                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                                        If you have any questions about these Terms of Use, please reach out to our legal team or customer support.
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                        <Link href="/contact" className="bg-white text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all">Contact Us</Link>
                                        <a href="mailto:info@davanagereseva.com" className="text-white hover:text-blue-200 font-medium underline underline-offset-4">info@davanagereseva.com</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
