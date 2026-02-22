export const dynamic = 'force-dynamic';
import { getBookings, getPartners } from '@/app/actions/booking';
import { getPendingPartners, getServices, getCategories, getPendingReviews } from '@/app/actions/admin';
import AdminOrderList from '@/components/admin/AdminOrderList';
import AdminPartnerList from '@/components/admin/AdminPartnerList';
import AdminServiceList from '@/components/admin/AdminServiceList';
import AdminCategoryList from '@/components/admin/AdminCategoryList';
import AdminReviewList from '@/components/admin/AdminReviewList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Hammer, LayoutGrid, MessageSquare } from 'lucide-react';

export default async function AdminDashboard() {
    const bookings = await getBookings();
    const partners = await getPartners();
    const pendingPartners = await getPendingPartners();
    const services = await getServices();
    const categories = await getCategories(true);
    const pendingReviews = await getPendingReviews();

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="container px-4 md:px-8 mx-auto py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                <span className="font-black text-xl">D</span>
                            </div>
                            <h1 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Management</h1>
                        </div>
                        <p className="text-gray-500 font-medium ml-1">Central control panel for Davanagere Seva services.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-3 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100">
                        <div className="px-4 py-2 border-r border-gray-100">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Live Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-gray-700">Healthy</span>
                            </div>
                        </div>
                        <div className="px-4">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Server</p>
                            <span className="text-xs font-bold text-gray-700">Davanagere Main</span>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="orders" className="space-y-8" suppressHydrationWarning>
                    <TabsList className="bg-white p-1 rounded-2xl shadow-lg border border-gray-100 h-auto gap-1">
                        <TabsTrigger value="orders" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                            <Briefcase size={14} /> Orders
                        </TabsTrigger>
                        <TabsTrigger value="partners" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                            <Users size={14} /> Partners {pendingPartners.length > 0 && <span className="bg-rose-500 text-white w-4 h-4 rounded-full text-[8px] flex items-center justify-center">{pendingPartners.length}</span>}
                        </TabsTrigger>
                        <TabsTrigger value="services" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                            <Hammer size={14} /> Services
                        </TabsTrigger>
                        <TabsTrigger value="categories" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                            <LayoutGrid size={14} /> Categories
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                            <MessageSquare size={14} /> Reviews {pendingReviews.length > 0 && <span className="bg-rose-500 text-white w-4 h-4 rounded-full text-[8px] flex items-center justify-center">{pendingReviews.length}</span>}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="orders">
                        <AdminOrderList initialBookings={bookings} partners={partners} />
                    </TabsContent>

                    <TabsContent value="partners">
                        <AdminPartnerList initialPartners={pendingPartners} />
                    </TabsContent>

                    <TabsContent value="services">
                        <AdminServiceList initialServices={services} categories={categories} />
                    </TabsContent>

                    <TabsContent value="categories">
                        <AdminCategoryList categories={categories} />
                    </TabsContent>

                    <TabsContent value="reviews">
                        <AdminReviewList initialReviews={pendingReviews} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
