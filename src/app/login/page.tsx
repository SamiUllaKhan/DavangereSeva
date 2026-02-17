'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { loginUser } from '@/app/actions/user';

// I'll add a simple login action to actions/user.ts but let's define the UI first
export default function UserLoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await loginUser(formData);
            if (result.success) {
                toast.success('Login successful!');
                router.push(result.role === 'partner' ? '/' : '/bookings');
                router.refresh();
            } else {
                toast.error('Login failed', { description: result.error });
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="rounded-[40px] border-none shadow-2xl shadow-gray-200/50 overflow-hidden bg-white">
                    <div className="bg-primary h-32 flex flex-col items-center justify-center p-8 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <CardTitle className="text-4xl font-black uppercase tracking-tighter mb-1">Welcome Back</CardTitle>
                        <CardDescription className="text-blue-100/70 font-bold uppercase tracking-[0.2em] text-[10px]">Secure Gateway</CardDescription>
                    </div>

                    <CardContent className="p-8 lg:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</Label>
                                <div className="relative group/input">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-12 h-16 rounded-[24px] border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Secure Password</Label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-12 h-16 rounded-[24px] border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full h-16 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                {isSubmitting ? 'Authenticating...' : 'Login'}
                            </Button>
                        </form>

                        <div className="mt-12">
                            <div className="relative mb-10 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-100"></span>
                                </div>
                                <span className="relative px-6 bg-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                                    New Member?
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/register/customer" className="group/choice">
                                    <div className="p-6 rounded-[30px] border border-gray-100 bg-gray-50/20 hover:bg-primary hover:border-primary transition-all text-center">
                                        <p className="font-black text-primary group-hover/choice:text-white uppercase tracking-tight text-sm">Join as Customer</p>
                                    </div>
                                </Link>

                                <Link href="/register/partner" className="group/choice">
                                    <div className="p-6 rounded-[30px] border border-gray-100 bg-gray-50/20 hover:bg-orange-600 hover:border-orange-600 transition-all text-center">
                                        <p className="font-black text-orange-600 group-hover/choice:text-white uppercase tracking-tight text-sm">Join as Partner</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                            <Link href="/admin/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-primary transition-colors flex items-center justify-center gap-2">
                                <LogIn size={12} /> Admin Dashboard
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
