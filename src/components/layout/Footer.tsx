import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-8 md:py-12 pb-8 md:pb-12">
            {/* Pre-footer / Service Area Banner */}
            <div className="border-b border-white/10 pb-6 mb-6">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center py-1">
                        <MapPin size={18} className="text-blue-300 shrink-0 mb-1 md:mb-0" />
                        <p className="text-blue-100 text-sm md:text-base font-medium tracking-wide leading-relaxed">
                            We are available in Davanagere, Harihar, Chitradurga, Honnali, Sulekere, Santhebennur, and surrounding areas within a 70 km radius of Davanagere. For assistance, contact us anytime.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-8 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="text-xl font-bold uppercase tracking-wider">Davanagere Seva</h3>
                        <p className="text-blue-100/80 text-sm leading-relaxed">
                            Your trusted marketplace for all household and professional services in Davanagere. Quality guaranteed.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"><Facebook size={18} /></Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"><Twitter size={18} /></Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"><Instagram size={18} /></Link>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 text-blue-200 uppercase tracking-widest text-xs">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 text-blue-200 uppercase tracking-widest text-xs">Company</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 text-blue-200 uppercase tracking-widest text-xs">Contact Us</h4>
                        <ul className="space-y-5 text-sm text-blue-100">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Phone size={14} className="text-blue-300" />
                                </div>
                                <span className="font-medium text-xs">+91 890 4777 090</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Mail size={14} className="text-blue-300" />
                                </div>
                                <span className="font-medium text-xs break-all">info@davanagereseva.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin size={14} className="text-blue-300" />
                                </div>
                                <span className="text-xs leading-relaxed">Main Road, Davanagere, KA - 577002</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-blue-200">Newsletter</h4>
                        <p className="text-sm text-blue-100/60 mb-6 italic">Subscribe for exclusive offers and updates.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm w-full outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20"
                            />
                            <button className="bg-white text-primary px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg active:scale-95">Join Now</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-sm text-blue-200">
                    <p>© {new Date().getFullYear()} Davanagere Seva. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
