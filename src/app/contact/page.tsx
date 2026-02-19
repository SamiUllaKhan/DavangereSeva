import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Davanagere Seva',
    description: 'Get in touch with Davanagere Seva for any queries about our professional home services.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <section className="bg-primary pt-20 pb-32 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>
                <div className="container px-4 md:px-8 mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
                        Contact Us
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        {"Have a question or need help? We're here to assist you."}
                    </p>
                </div>
            </section>

            <div className="container px-4 md:px-8 mx-auto -mt-16 pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: Phone,
                                title: 'Call Us',
                                primary: '+91 98765 43210',
                                secondary: 'Mon-Sat, 8AM to 8PM',
                            },
                            {
                                icon: Mail,
                                title: 'Email Us',
                                primary: 'info@davanagereseva.com',
                                secondary: 'We reply within 24 hours',
                            },
                            {
                                icon: MapPin,
                                title: 'Visit Us',
                                primary: 'Main Road, Davanagere',
                                secondary: 'Karnataka - 577002',
                            },
                            {
                                icon: Clock,
                                title: 'Working Hours',
                                primary: 'Mon - Sat: 8AM - 8PM',
                                secondary: 'Sunday: 9AM - 5PM',
                            },
                        ].map((item, i) => (
                            <Card key={i} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="text-primary" size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item.title}</p>
                                        <p className="font-bold text-gray-900">{item.primary}</p>
                                        <p className="text-sm text-gray-500">{item.secondary}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
