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
                <div className="bg-white p-1 rounded-2xl shadow-lg border border-gray-100 h-14 flex gap-1 items-center px-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 rounded-xl bg-gray-100 animate-pulse flex-1" />
                    ))}
                </div>
                {/* Skeleton content */}
                <div className="h-96 bg-white rounded-[40px] animate-pulse shadow-xl" />
            </div>
        );
    }

    return (
        <Tabs defaultValue="orders" className="space-y-8">
            <TabsList className="bg-white p-1 rounded-2xl shadow-lg border border-gray-100 h-auto gap-1">
                <TabsTrigger value="orders" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                    <Briefcase size={14} /> Orders
                </TabsTrigger>
                <TabsTrigger value="partners" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                    <Users size={14} /> Partners
                </TabsTrigger>
                <TabsTrigger value="services" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                    <Hammer size={14} /> Services
                </TabsTrigger>
                <TabsTrigger value="categories" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                    <LayoutGrid size={14} /> Categories
                </TabsTrigger>
                <TabsTrigger value="customers" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                    <Users size={14} /> Customers
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] gap-2">
                    <MessageSquare size={14} /> Reviews {pendingReviews.length > 0 && <span className="bg-rose-500 text-white w-4 h-4 rounded-full text-[8px] flex items-center justify-center">{pendingReviews.length}</span>}
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
