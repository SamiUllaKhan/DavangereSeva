export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/user';
import ProfileForm from '@/components/profile/ProfileForm';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, Phone, Shield, Calendar, Briefcase } from 'lucide-react';

export default async function ProfilePage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const memberSince = new Date(user.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <section className="bg-primary pt-16 pb-28 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>
                <div className="container px-4 md:px-8 mx-auto relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">{user.name}</h1>
                            <p className="text-blue-100 mt-1 flex items-center gap-2">
                                <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {user.role}
                                </span>
                                {user.isVerified && (
                                    <span className="bg-green-400 text-black px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Shield size={10} /> Verified
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container px-4 md:px-8 mx-auto -mt-16 pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Info Cards */}
                    <div className="space-y-6">
                        <Card className="rounded-3xl border-none shadow-sm">
                            <CardContent className="p-6 space-y-5">
                                <h3 className="font-black text-lg tracking-tight">Account Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <Mail className="text-primary" size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</p>
                                            <p className="font-medium text-sm text-gray-800">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <Phone className="text-primary" size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</p>
                                            <p className="font-medium text-sm text-gray-800">{user.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <Calendar className="text-primary" size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Member Since</p>
                                            <p className="font-medium text-sm text-gray-800">{memberSince}</p>
                                        </div>
                                    </div>
                                    {user.role === 'partner' && user.serviceCategory && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                                <Briefcase className="text-primary" size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Service Category</p>
                                                <p className="font-medium text-sm text-gray-800">{user.serviceCategory}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Edit Form */}
                    <div className="lg:col-span-2">
                        <ProfileForm user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}
