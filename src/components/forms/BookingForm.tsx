'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createBooking } from '@/app/actions/booking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, User, Mail } from 'lucide-react';

interface BookingFormProps {
    serviceId: string;
    serviceName: string;
    price: number;
}

export default function BookingForm({ serviceId, serviceName, price }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const timeStr = "09:00"; // Default time
        const bookingDate = formData.get('date') as string;

        const data = {
            serviceId,
            customerName: formData.get('name') as string,
            customerPhone: formData.get('phone') as string,
            customerEmail: formData.get('email') as string,
            customerAddress: formData.get('address') as string,
            bookingDate: `${bookingDate}T${timeStr}:00`, // Combine date and time
            notes: formData.get('notes') as string,
        };

        try {
            const result = await createBooking(data);

            if (result.success) {
                toast.success('Booking Successful!', {
                    description: `Your request for ${serviceName} has been received.`,
                });
                (event.target as HTMLFormElement).reset();
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            toast.error('Booking Failed', {
                description: error.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="shadow-2xl border-none overflow-hidden group">
            <CardHeader className="bg-primary text-white py-6 transition-all group-hover:bg-primary/95">
                <CardTitle className="text-2xl font-bold uppercase tracking-tight">Book {serviceName}</CardTitle>
                <CardDescription className="text-blue-100/80">
                    Trusted experts for your home service.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-6 pb-10 space-y-6">
                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-2 group/input">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500 group-focus-within/input:text-primary transition-colors">
                            Customer Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                            <Input id="name" name="name" placeholder="Who is booking?" className="pl-10 h-12 rounded-xl border-gray-100 focus:border-primary focus:ring-primary/10 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2 group/input">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-500 group-focus-within/input:text-primary transition-colors">
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                            <Input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="pl-10 h-12 rounded-xl border-gray-100 focus:border-primary focus:ring-primary/10 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2 group/input">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500 group-focus-within/input:text-primary transition-colors">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                            <Input id="email" name="email" type="email" placeholder="yourname@example.com" className="pl-10 h-12 rounded-xl border-gray-100 focus:border-primary focus:ring-primary/10 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2 group/input">
                        <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-gray-500 group-focus-within/input:text-primary transition-colors">
                            Service Address
                        </Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                            <Input id="address" name="address" placeholder="Where in Davanagere?" className="pl-10 h-12 rounded-xl border-gray-100 focus:border-primary focus:ring-primary/10 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2 group/input">
                        <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-gray-500 group-focus-within/input:text-primary transition-colors">
                            Booking Date
                        </Label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                            <Input id="date" name="date" type="date" className="pl-10 h-12 rounded-xl border-gray-100 focus:border-primary focus:ring-primary/10 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-gray-500">Requirements</Label>
                        <Textarea id="notes" name="notes" placeholder="Any specific instructions for our team?" className="min-h-[100px] rounded-xl border-gray-100 focus:border-primary focus:ring-primary/10 tracking-tight" />
                    </div>

                    <div className="pt-6 border-t border-dashed mt-6 flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Total Estimates</p>
                                <p className="text-3xl font-black text-primary tracking-tighter">₹{price}</p>
                            </div>
                            <p className="text-[10px] text-gray-400 italic">Pay after service completion</p>
                        </div>
                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-base shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            {isSubmitting ? 'Processing...' : 'Secure Booking'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
