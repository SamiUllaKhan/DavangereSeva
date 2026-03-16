'use client';

import { MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FloatingSupport() {
    const phoneNumber = "918904777090";
    const message = "Hi Davanagere Seva, I'm interested in booking a service.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-40 right-4 z-[100] flex flex-col gap-3 md:bottom-10 md:right-8">
            {/* WhatsApp Link */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="flex items-center gap-3 group"
                >
                    <span className="hidden md:block bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/40 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                        Chat with us
                    </span>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-2xl md:rounded-[24px] shadow-[0_8px_30px_rgb(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                        <MessageCircle size={24} fill="white" className="md:w-7 md:h-7" />
                    </div>
                </Link>
            </motion.div>

            {/* Call Link */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Link
                    href={`tel:+${phoneNumber}`}
                    className="flex items-center gap-3 group"
                >
                    <span className="hidden md:block bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/40 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                        Call Expert
                    </span>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-2xl md:rounded-[24px] shadow-[0_8px_30px_rgb(25,38,77,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                        <Phone size={20} fill="white" className="md:w-6 md:h-6" />
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}
