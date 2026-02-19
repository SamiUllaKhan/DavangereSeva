'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { submitContactForm } from '@/app/actions/contact';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, FileText, MessageSquare, Send } from 'lucide-react';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const result = await submitContactForm(data);
            if (result.success) {
                toast.success('Message sent successfully!', {
                    description: 'We will get back to you within 24 hours.',
                });
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(result.error || 'Failed to send message');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="rounded-3xl border-none shadow-sm">
            <CardContent className="p-8">
                <h3 className="font-black text-2xl tracking-tight mb-2">Send us a Message</h3>
                <p className="text-gray-500 mb-8">Fill out the form below and our team will respond promptly.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                Your Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input id="name" name="name" placeholder="Full name" className="pl-10 h-12 rounded-xl border-gray-100" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-10 h-12 rounded-xl border-gray-100" required />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                Phone (Optional)
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="pl-10 h-12 rounded-xl border-gray-100" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                Subject
                            </Label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input id="subject" name="subject" placeholder="What is this about?" className="pl-10 h-12 rounded-xl border-gray-100" required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Message
                        </Label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell us how we can help..."
                                className="pl-10 min-h-[140px] rounded-xl border-gray-100"
                                required
                                minLength={10}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            size="lg"
                            className="rounded-xl font-bold uppercase tracking-wider gap-2 shadow-lg hover:shadow-primary/20"
                        >
                            <Send size={18} />
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
