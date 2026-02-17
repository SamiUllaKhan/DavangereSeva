'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Lock, LogIn, ArrowRight, ShieldAlert } from 'lucide-react';
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
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="rounded-[50px] border border-gray-100/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden bg-white/80 backdrop-blur-xl">
                    <div className="bg-primary h-40 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
                        {/* Glassmorphic highlights in header */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 rotate-12" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl -ml-12 -mb-12" />

                        <CardTitle className="text-4xl font-black uppercase tracking-tighter mb-1 relative z-10">Welcome Back</CardTitle>
                        <CardDescription className="text-blue-100/70 font-black uppercase tracking-[0.4em] text-[10px] relative z-10">Secure Gateway Access</CardDescription>
                    </div>

                    <CardContent className="p-8 lg:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Verified Email</Label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-primary transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="pl-14 h-16 rounded-[28px] border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all font-bold text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Access Password</Label>
                                <div className="relative group/input">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-primary transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-14 h-16 rounded-[28px] border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all font-bold text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full h-16 rounded-[28px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary hover:bg-primary-dark"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2 animate-pulse">Authenticating...</span>
                                ) : (
                                    <span className="flex items-center gap-2">Login to Account <ArrowRight size={14} /></span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-14">
                            <div className="relative mb-10 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <span className="relative px-6 bg-white/80 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                                    New to Seva?
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/register/customer" className="group/choice flex flex-col">
                                    <div className="p-6 rounded-[35px] border border-gray-100 bg-gray-50/30 hover:bg-primary hover:border-primary transition-all text-center flex-grow flex items-center justify-center">
                                        <p className="font-black text-primary group-hover/choice:text-white uppercase tracking-tighter text-xs">Join as Customer</p>
                                    </div>
                                </Link>

                                <Link href="/register/partner" className="group/choice flex flex-col">
                                    <div className="p-6 rounded-[35px] border border-gray-100 bg-gray-50/30 hover:bg-orange-600 hover:border-orange-600 transition-all text-center flex-grow flex items-center justify-center">
                                        <p className="font-black text-orange-600 group-hover/choice:text-white uppercase tracking-tighter text-xs">Join as Partner</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-50/50 text-center">
                            <Link href="/admin/login" className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-primary hover:bg-primary/5 transition-all">
                                <LogIn size={12} className="opacity-50" /> Portal for Administrators
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
