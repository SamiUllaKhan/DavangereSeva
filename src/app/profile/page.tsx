'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, updateUserProfile, updateUserPassword } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { User, Lock, MapPin, Phone, Mail } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getCurrentUser();
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        }
        fetchUser();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdatingProfile(true);
        const formData = new FormData(e.currentTarget);
        const result = await updateUserProfile(formData);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.error);
        }
        setUpdatingProfile(false);
    };

    const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdatingPassword(true);
        const formData = new FormData(e.currentTarget);
        const result = await updateUserPassword(formData);
        if (result.success) {
            toast.success(result.message);
            (e.target as HTMLFormElement).reset();
        } else {
            toast.error(result.error);
        }
        setUpdatingPassword(false);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Please login to view profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container px-4 md:px-8 mx-auto">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">My Profile</h1>
                        <p className="text-gray-500 font-medium">Manage your personal information and security settings.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            {/* Profile Info Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
                                <form onSubmit={handleUpdateProfile} className="space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={24} />
                                        </div>
                                        <h2 className="text-xl font-bold">Personal Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input value={user.name} disabled className="pl-10 h-12 rounded-xl bg-gray-50" />
                                            </div>
                                            <p className="text-xs text-gray-400">Name cannot be changed</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input value={user.email} disabled className="pl-10 h-12 rounded-xl bg-gray-50" />
                                            </div>
                                            <p className="text-xs text-gray-400">Email cannot be changed</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-gray-700 uppercase tracking-wider font-bold h-12">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input name="phone" defaultValue={user.phone} placeholder="Your phone number" className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-primary focus:border-primary" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Service Address</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-4 text-gray-400" size={18} />
                                            <Textarea
                                                name="address"
                                                defaultValue={user.address}
                                                placeholder="Enter your complete address for service delivery"
                                                className="pl-10 min-h-[100px] rounded-xl border-gray-200 focus:ring-primary focus:border-primary resize-none"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={updatingProfile} className="w-full md:w-auto h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all">
                                        {updatingProfile ? 'Saving...' : 'Update Profile'}
                                    </Button>
                                </form>
                            </div>

                            {/* Password Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
                                <form onSubmit={handleUpdatePassword} className="space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                                            <Lock size={24} />
                                        </div>
                                        <h2 className="text-xl font-bold">Security</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Current Password</Label>
                                            <Input type="password" name="currentPassword" required className="h-12 rounded-xl border-gray-200 focus:ring-primary focus:border-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-gray-700 uppercase tracking-wider">New Password</Label>
                                            <Input type="password" name="newPassword" required className="h-12 rounded-xl border-gray-200 focus:ring-primary focus:border-primary" />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={updatingPassword} variant="outline" className="w-full md:w-auto h-12 px-8 rounded-xl border-rose-200 text-rose-600 font-bold hover:bg-rose-50">
                                        {updatingPassword ? 'Updating...' : 'Change Password'}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Summary/Avatar Card */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100/50 border border-gray-100 sticky top-24">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-black mb-4">
                                        {user.name.charAt(0)}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                                    <p className="text-gray-500 font-medium mb-6 uppercase tracking-widest text-xs">{user.role}</p>

                                    <div className="w-full space-y-4 text-left">
                                        <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                            <span className="text-sm text-gray-500 font-medium">Status</span>
                                            <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Active</span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                            <span className="text-sm text-gray-500 font-medium">Member Since</span>
                                            <span className="text-sm font-bold text-gray-700">Feb 2026</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
