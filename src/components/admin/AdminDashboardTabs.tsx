'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Hammer, LayoutGrid, MessageSquare } from 'lucide-react';
import AdminOrderList from './AdminOrderList';
import AdminPartnerList from './AdminPartnerList';
import AdminServiceList from './AdminServiceList';
import AdminCategoryList from './AdminCategoryList';
import AdminReviewList from './AdminReviewList';
import AdminCustomerList from './AdminCustomerList';

interface AdminDashboardTabsProps {
    bookings: any[];
    partners: any[];
    customers: any[];
    services: any[];
    categories: any[];
    pendingReviews: any[];
}

export default function AdminDashboardTabs({
    bookings,
    partners,
    customers,
    services,
    categories,
    pendingReviews,
}: AdminDashboardTabsProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!mounted) {
        return (
            <div className="space-y-8">
                {/* Skeleton tab bar */}
                <div className="bg-white p-1 sm:p-1.5 rounded-2xl shadow-lg border border-gray-100 h-14 sm:h-16 flex gap-1 sm:gap-2 items-center px-1.5 sm:px-2 w-full max-w-full overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 sm:h-11 rounded-xl bg-gray-100 animate-pulse shrink-0 w-24 sm:flex-1 sm:min-w-[100px]" />
                    ))}
                </div>
                {/* Skeleton content */}
                <div className="h-96 bg-white rounded-3xl animate-pulse shadow-xl" />
            </div>
        );
    }

    return (
        <Tabs defaultValue="orders" className="flex flex-col gap-10">
            <TabsList className="bg-white p-2 rounded-[30px] shadow-xl border border-gray-100/50 !h-auto flex flex-wrap lg:flex-nowrap justify-center lg:justify-start gap-x-2 gap-y-3 w-full relative z-20">
                <TabsTrigger value="orders" className="flex-1 lg:flex-none rounded-2xl px-5 py-3.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] gap-2 transition-all shadow-none border-none">
                    <Briefcase size={14} className="shrink-0" /> <span className="truncate">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="partners" className="flex-1 lg:flex-none rounded-2xl px-5 py-3.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] gap-2 transition-all shadow-none border-none">
                    <Users size={14} className="shrink-0" /> <span className="truncate">Partners</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex-1 lg:flex-none rounded-2xl px-5 py-3.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] gap-2 transition-all shadow-none border-none">
                    <Hammer size={14} className="shrink-0" /> <span className="truncate">Services</span>
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex-1 lg:flex-none rounded-2xl px-5 py-3.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] gap-2 transition-all shadow-none border-none">
                    <LayoutGrid size={14} className="shrink-0" /> <span className="truncate">Categories</span>
                </TabsTrigger>
                <TabsTrigger value="customers" className="flex-1 lg:flex-none rounded-2xl px-5 py-3.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] gap-2 transition-all shadow-none border-none">
                    <Users size={14} className="shrink-0" /> <span className="truncate">Customers</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 lg:flex-none rounded-2xl px-5 py-3.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] gap-2 transition-all shadow-none border-none relative">
                    <MessageSquare size={14} className="shrink-0" /> <span className="truncate">Reviews</span>
                    {pendingReviews.length > 0 && (
                        <span className="bg-rose-500 text-white min-w-[20px] h-[20px] px-1.5 rounded-full text-[9px] flex items-center justify-center shrink-0 ml-1.5 font-black border-2 border-white shadow-sm">
                            {pendingReviews.length}
                        </span>
                    )}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
                <AdminOrderList initialBookings={bookings} partners={partners} />
            </TabsContent>

            <TabsContent value="partners">
                <AdminPartnerList initialPartners={partners} />
            </TabsContent>

            <TabsContent value="services">
                <AdminServiceList initialServices={services} categories={categories} />
            </TabsContent>

            <TabsContent value="categories">
                <AdminCategoryList categories={categories} />
            </TabsContent>

            <TabsContent value="customers">
                <AdminCustomerList initialCustomers={customers} />
            </TabsContent>

            <TabsContent value="reviews">
                <AdminReviewList initialReviews={pendingReviews} />
            </TabsContent>
        </Tabs>
    );
}
