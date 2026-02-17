'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ShieldAlert, LogIn, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await login(formData);

        if (result.success) {
            toast.success('Login successful!');
            router.push('/admin');
            router.refresh(); // Ensure server components re-render with new session
        } else {
            toast.error(result.error || 'Login failed');
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardHeader className="space-y-1 text-center bg-primary text-white rounded-t-xl py-8">
                    <div className="mx-auto bg-white/20 p-3 rounded-2xl w-fit mb-4">
                        <ShieldAlert className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold uppercase tracking-wider">Admin Portal</CardTitle>
                    <CardDescription className="text-blue-100">
                        Enter your credentials to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8 pb-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    className="pl-10"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-6 font-bold uppercase tracking-widest text-base shadow-lg hover:shadow-primary/20 transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : (
                                <span className="flex items-center gap-2">
                                    <LogIn size={18} /> Sign In
                                </span>
                            )}
                        </Button>
                    </form>
                    <p className="mt-8 text-center text-xs text-gray-400">
                        Authorized Personnel Only
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
