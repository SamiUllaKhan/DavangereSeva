'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Phone, Lock, Eye, EyeOff, Briefcase, Award } from 'lucide-react';
import Link from 'next/link';

const categories = [
    'AC Repair',
    'Cleaning',
    'Plumbing',
    'Electrician',
    'Painting',
    'Pest Control',
    'Appliance Repair',
    'Packers & Movers'
];

export default function PartnerRegister() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [category, setCategory] = useState('');
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!category) {
            toast.error('Please select your service category');
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        formData.append('role', 'partner');
        formData.append('serviceCategory', category);

        try {
            const result = await registerUser(formData);
            if (result.success) {
                toast.success('Registration request received!', {
                    description: 'Our team will verify your profile and contact you soon.',
                });
                router.push('/');
                router.refresh();
            } else {
                toast.error('Registration failed', {
                    description: result.error,
                });
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container px-4 py-20 mx-auto max-w-2xl">
            <Card className="rounded-[40px] border-none shadow-2xl overflow-hidden">
                <CardHeader className="bg-orange-600 text-white p-8">
                    <CardTitle className="text-3xl font-black uppercase tracking-tight">Expert Partner Registration</CardTitle>
                    <CardDescription className="text-orange-50/80">Join Davanagere's #1 Service Marketplace.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input id="name" name="name" placeholder="Expert Name" className="pl-10 h-14 rounded-2xl" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-500">Mobile Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input id="phone" name="phone" placeholder="+91 XXXXX XXXXX" className="pl-10 h-14 rounded-2xl" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10 h-14 rounded-2xl" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Service Area</Label>
                                <Select onValueChange={setCategory}>
                                    <SelectTrigger className="h-14 rounded-2xl pl-10 relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-widest text-gray-500">Experience</Label>
                                <div className="relative">
                                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input id="experience" name="experience" placeholder="e.g. 5 Years" className="pl-10 h-14 rounded-2xl" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-500">Create Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="px-10 h-14 rounded-2xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-base shadow-xl bg-orange-600 hover:bg-orange-700">
                            {isSubmitting ? 'Submitting Application...' : 'Apply to Join'}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 font-medium">
                            Already have an account? <Link href="/login" className="text-orange-600 font-bold hover:underline">Login here</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
