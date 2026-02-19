'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { updateUserProfile } from '@/app/actions/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Phone, FileText, Save } from 'lucide-react';

interface ProfileFormProps {
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
        bio?: string;
    };
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [bio, setBio] = useState(user.bio || '');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await updateUserProfile({ name, phone, bio });
            if (result.success) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error(result.error || 'Failed to update profile');
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
                <h3 className="font-black text-2xl tracking-tight mb-8">Edit Profile</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Full Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 h-12 rounded-xl border-gray-100"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            value={user.email}
                            disabled
                            className="h-12 rounded-xl border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400">Email cannot be changed.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10 h-12 rounded-xl border-gray-100"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Bio / About
                        </Label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder={user.role === 'partner' ? 'Tell customers about your experience and expertise...' : 'Tell us about yourself...'}
                                className="pl-10 min-h-[120px] rounded-xl border-gray-100"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            size="lg"
                            className="rounded-xl font-bold uppercase tracking-wider gap-2 shadow-lg hover:shadow-primary/20"
                        >
                            <Save size={18} />
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
