import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, Clock, Wallet, HelpCircle, CheckCircle2, ChevronRight, Scale } from 'lucide-react';

export const metadata = {
    title: 'Refund Policy | Davanagere Seva',
    description: 'Understand how cancellations and refunds work at Davanagere Seva.',
};

export default function RefundPolicy() {
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
                        <span className="text-white">Refund Policy</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Refund & Cancellation Policy</h1>
                    <p className="text-blue-100 text-lg max-w-2xl">
                        Simple, fair, and transparent. We want you to feel confident every time you book a service with us.
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
                                <RotateCcw className="text-primary" size={20} />
                                Policy Overview
                            </h3>
                            <nav className="flex flex-col gap-4">
                                <a href="#cancellation" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Cancellation Rules</a>
                                <a href="#eligibility" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Refund Eligibility</a>
                                <a href="#processing" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Process & Timeline</a>
                                <a href="#non-refundable" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Non-Refundables</a>
                                <a href="#disputes" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Dispute Resolution</a>
                                <a href="#contact" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium border-t border-slate-100 pt-4 mt-2">Help Center</a>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: <Clock className="text-blue-600" />, title: '4 Hour Window', desc: 'Cancel free before 4 hours of service.' },
                                { icon: <Wallet className="text-emerald-600" />, title: 'Quick Refunds', desc: 'Processed within 5-7 business days.' },
                                { icon: <ShieldCheck className="text-primary" />, title: 'Service Guarantee', desc: 'Free re-work if not satisfied.' }
                            ].map((card, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                                        {card.icon}
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{card.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Section 1 */}
                        <section id="cancellation" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                01. Timing
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Cancellation Rules</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                                <p>
                                    At Davanagere Seva, we understand that plans can change. To be fair to our service professionals who block their time for you, we maintain the following cancellation windows:
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex gap-3">
                                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-1" />
                                        <span><strong>Standard Cancellation:</strong> More than 4 hours before the slot – 100% Refund.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-1" />
                                        <span><strong>Late Cancellation:</strong> Within 4 hours of the slot – Small convenience fee may apply.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 size={18} className="text-rose-500 shrink-0 mt-1" />
                                        <span><strong>No-Show:</strong> Professional reaches location but user is unavailable – Visit charge applicable.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="eligibility" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                02. Eligibility
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Refund Eligibility</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                You are eligible for a refund or credit under the following circumstances:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Professional fails to arrive for the scheduled booking.',
                                    'Service cancelled by Davanagere Seva due to unforeseen reasons.',
                                    'Double payment made for the same service booking.',
                                    'Service quality does not meet our guaranteed standards (subject to review).'
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-3 italic text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="processing" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                03. Timeline
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Process & Timeline</h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Once a refund is approved, it is processed back to the original payment method. The timeline typically depends on your bank:
                            </p>
                            <div className="relative border-l-2 border-slate-100 ml-4 pl-8 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                                    <h4 className="font-bold text-slate-900">Day 1: Request Approval</h4>
                                    <p className="text-sm text-slate-500">Our team validates the cancellation/refund claim.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow-sm" />
                                    <h4 className="font-bold text-slate-900">Day 2: Bank Initiation</h4>
                                    <p className="text-sm text-slate-500">Refund is triggered via our payment gateway.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-emerald-400 border-4 border-white shadow-sm" />
                                    <h4 className="font-bold text-slate-900">Day 5-7: Credit Applied</h4>
                                    <p className="text-sm text-slate-500">Amt reflected in your bank account / credit card statement.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="non-refundable" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                04. Exceptions
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Non-Refundable Situations</h2>
                            <div className="bg-rose-50 rounded-3xl p-6 border border-rose-100 flex gap-4">
                                <Scale className="text-rose-600 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-rose-900 mb-2">Important Notice</h4>
                                    <ul className="text-sm text-rose-800 space-y-2 list-disc ml-4">
                                        <li>Spare parts or materials purchased for a service are non-refundable.</li>
                                        <li>Visiting charges once the professional has arrived and started inspection or work.</li>
                                        <li>Claims raised after 48 hours of service completion.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="disputes" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                05. Support
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Dispute Resolution</h2>
                            <p className="text-slate-600 leading-relaxed">
                                If you are unhappy with the service, we prefer resolving it through a **re-visit guarantee**. A verified professional will fix the issue within 24 hours at no extra cost. If the issue persists, a partial or full refund will be considered after a thorough investigation.
                            </p>
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="pt-12 border-t border-slate-100">
                            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <HelpCircle size={120} className="text-white" />
                                </div>
                                <h2 className="text-3xl font-black mb-4 text-white">Need Help?</h2>
                                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                    Our support team is available 24/7 to help you with cancellations or refund queries.
                                </p>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                    <Link href="/contact" className="bg-white text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-xl">Talk to Support</Link>
                                    <a href="tel:+918904777090" className="text-white font-bold">+91 890 4777 090</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
