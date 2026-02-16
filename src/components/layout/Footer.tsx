import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12 pb-24 md:pb-12">
            <div className="container px-4 md:px-8 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold uppercase tracking-wider">Davanagere Seva</h3>
                        <p className="text-blue-100 text-sm">
                            Your trusted marketplace for all household and professional services in Davanagere. Quality guaranteed.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-blue-200 transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-blue-200 transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-blue-200 transition-colors"><Instagram size={20} /></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><Link href="/" className="hover:underline">Home</Link></li>
                            <li><Link href="/services" className="hover:underline">All Services</Link></li>
                            <li><Link href="/about" className="hover:underline">About Us</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-blue-100">
                            <li className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>info@davanagereseva.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1" />
                                <span>Main Road, Davanagere, Karnataka - 577002</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <p className="text-sm text-blue-100 mb-4">Subscribe to get updates on new services and offers.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-white/30"
                            />
                            <button className="bg-white text-primary px-4 py-2 rounded text-sm font-bold">Join</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-blue-200">
                    <p>© {new Date().getFullYear()} Davanagere Seva. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
