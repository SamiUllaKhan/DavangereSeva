export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import Category from '@/models/Category';
import { getCurrentUser } from '@/app/actions/user';
import { ServiceSelectionListing } from '@/components/services/ServiceSelectionListing';
import { SearchBar } from '@/components/layout/SearchBar';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getData(slug: string) {
    try {
        await dbConnect();

        // 1. Get all active categories for the sidebar
        const categories = await Category.find({ status: { $ne: 'inactive' } }).sort({ name: 1 }).lean();

        // 2. Identify active category from slug
        // Slug could be a category slug or a service slug
        let activeCategory = categories.find(c => c.slug === slug);
        let highlightedServiceId = null;

        if (!activeCategory) {
            // Check if it's a service slug
            const service = await Service.findOne({ slug, isActive: true }).lean();
            if (service) {
                activeCategory = categories.find(c => c._id.toString() === service.category.toString());
                highlightedServiceId = service._id.toString();
            }
        }

        if (!activeCategory) return null;

        // 3. Get all services for all categories (or at least for the sidebar interaction)
        // For performance we could filter, but for the full interactive experience we need them all
        const services = await Service.find({ isActive: true }).lean();

        return {
            categories: JSON.parse(JSON.stringify(categories)),
            services: JSON.parse(JSON.stringify(services)),
            initialCategoryId: activeCategory._id.toString(),
            highlightedServiceId
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const data = await getData(slug);
    const user = await getCurrentUser();

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Minimal Header with Search */}
            <section className="bg-white border-b border-gray-100 pt-24 pb-12 mb-8 sticky top-0 z-40 shadow-sm shadow-gray-100/50">
                <div className="container px-4 md:px-8 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/services" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-500">
                            <Icons.ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 leading-none">Book Service</h1>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Davanagere Seva • Guaranteed Results</p>
                        </div>
                    </div>
                    <div className="w-full md:w-96">
                        <SearchBar variant="services" placeholder="Search within category..." className="shadow-none border border-gray-100 bg-gray-50" />
                    </div>
                </div>
            </section>

            {/* Main Interactive Listing Area */}
            <section className="container px-4 md:px-8 mx-auto pb-24">
                <ServiceSelectionListing
                    categories={data.categories}
                    services={data.services}
                    initialCategoryId={data.initialCategoryId}
                    highlightedServiceId={data.highlightedServiceId}
                />
            </section>

            {/* Floating Support Button for Mobile */}
            <div className="fixed bottom-6 right-6 z-50 md:hidden">
                <Button asChild size="icon" className="w-14 h-14 rounded-full shadow-2xl bg-primary text-white">
                    <Link href="tel:+918904777090">
                        <Icons.Phone size={24} />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
