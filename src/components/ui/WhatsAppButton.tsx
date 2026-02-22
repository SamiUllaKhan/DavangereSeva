'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppButton() {
    const phoneNumber = "918904777090";
    const message = "Hi Davanagere Seva, I'm interested in booking a service.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            className="fixed bottom-24 md:bottom-8 right-6 z-[100] group flex items-center"
        >
            <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-gray-100 mr-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 hidden md:block">
                <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">Chat with us</p>
                <p className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Instant Support</p>
            </div>
            <div className="w-16 h-16 bg-[#25D366] text-white rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce hover:animate-none">
                <MessageCircle size={32} fill="white" />
            </div>
        </Link>
    );
}
