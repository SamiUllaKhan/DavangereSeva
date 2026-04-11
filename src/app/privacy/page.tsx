import React from 'react';
import Link from 'next/link';
import { Eye, ShieldCheck, Lock, Users, Bell, Mail, ChevronRight, FileLock2 } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy | Davanagere Seva',
    description: 'Learn how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicy() {
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
                        <span className="text-white">Privacy Policy</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-blue-100 text-lg max-w-2xl">
                        Your privacy matters to us. This policy explains how we handle your information with the care it deserves.
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
                                <FileLock2 className="text-primary" size={20} />
                                Policy Sections
                            </h3>
                            <nav className="flex flex-col gap-4">
                                <a href="#collection" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Data Collection</a>
                                <a href="#usage" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">How We Use Info</a>
                                <a href="#sharing" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Information Sharing</a>
                                <a href="#security" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Security Measures</a>
                                <a href="#cookies" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Cookies & Tracking</a>
                                <a href="#rights" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Your Legal Rights</a>
                                <a href="#contact" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium border-t border-slate-100 pt-4 mt-2">Privacy Support</a>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200">
                        {/* Section 1 */}
                        <section id="collection" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
                                01. Collection
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">What Information We Collect</h2>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                    <h4 className="font-bold flex items-center gap-2 mb-3 text-slate-800">
                                        <Users size={18} className="text-primary" />
                                        Personal Data
                                    </h4>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        Name, phone number, email, and physical address for service delivery.
                                    </p>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                    <h4 className="font-bold flex items-center gap-2 mb-3 text-slate-800">
                                        <Eye size={18} className="text-primary" />
                                        Usage Data
                                    </h4>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        Device type, browser info, and how you interact with our platform.
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                We only collect information that is necessary for the performance of our services and to improve your user experience on Davanagere Seva.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section id="usage" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
                                02. Purpose
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">How We Use Your Information</h2>
                            <ul className="space-y-6">
                                {[
                                    { icon: <ShieldCheck />, title: 'Service Fulfillment', desc: 'To connect you with verified professionals and manage your bookings.' },
                                    { icon: <Bell />, title: 'Communication', desc: 'Sending service updates, security alerts, and support messages.' },
                                    { icon: <Lock />, title: 'Fraud Prevention', desc: 'To protect our platform and your account from unauthorized activities.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-5 items-start">
                                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Middle Callout */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="shrink-0 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                                    <Lock size={32} className="text-blue-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">We never sell your data.</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Your trust is our most valuable asset. Davanagere Seva does not sell or lease your personal information to third-party marketing agencies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <section id="sharing" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
                                03. Sharing
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Information Sharing</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                We share necessary details with:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50">
                                    <span className="font-bold text-slate-900 block mb-1">Service Professionals</span>
                                    <span className="text-xs text-slate-500">Address and contact info to deliver the service you booked.</span>
                                </div>
                                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50">
                                    <span className="font-bold text-slate-900 block mb-1">Payment Processors</span>
                                    <span className="text-xs text-slate-500">Securely handling your transaction details.</span>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="security" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
                                04. Security
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Security Measures</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We implement industry-standard security protocols (SSL/TLS encryption) to protect your data during transmission and storage. Access to personal data is restricted to authorized employees who need it to perform their jobs.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section id="cookies" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
                                05. Cookies
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Cookies & Tracking</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Small data files called cookies are used to:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Keep you logged in', 'Remember your preferences', 'Analyze site traffic', 'Improve performance'].map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">{tag}</span>
                                ))}
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="rights" className="scroll-mt-24">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
                                06. Legal
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">Your Legal Rights</h2>
                            <div className="prose prose-slate text-sm text-slate-600 leading-relaxed">
                                <p>You have the right to access, correct, or delete your personal data. To exercise these rights or if you have concerns about how we handle your info, please contact our Data Protection Officer.</p>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="pt-12 border-t border-slate-100 text-center">
                            <div className="max-w-xl mx-auto">
                                <Mail size={40} className="mx-auto text-primary mb-6" />
                                <h2 className="text-2xl font-black mb-4">Privacy Questions?</h2>
                                <p className="text-slate-500 mb-8">
                                    If you have any questions about this Privacy Policy or our data practices, please reach out to us at:
                                </p>
                                <a href="mailto:privacy@davanagereseva.com" className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all inline-block shadow-xl shadow-primary/20">
                                    Email Privacy Team
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
