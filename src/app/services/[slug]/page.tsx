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
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const data = await getData(slug);
    
    if (!data) return { title: 'Service Not Found | Davanagere Seva' };
    
    const categories = data.categories;
    const activeCategory = categories.find((c: any) => c._id.toString() === data.initialCategoryId);
    
    // If it's a specific service being highlighted
    if (data.highlightedServiceId) {
        const service = data.services.find((s: any) => s._id.toString() === data.highlightedServiceId);
        if (service) {
            return {
                title: `${service.name} in Davanagere | Professional ${activeCategory?.name}`,
                description: service.description || `Book ${service.name} in Davanagere. Professional quality, verified experts, and transparent pricing.`,
                keywords: `${service.name}, ${activeCategory?.name}, Davanagere, home services, professional ${service.name.toLowerCase()}`
            };
        }
    }

    return {
        title: `${activeCategory?.name} Services in Davanagere | Davanagere Seva`,
        description: activeCategory?.description || `Professional ${activeCategory?.name} services at your doorstep in Davanagere. Verified experts and quality guarantee.`,
        keywords: `${activeCategory?.name}, Davanagere, door-step services, professional ${activeCategory?.name?.toLowerCase()}`
    };
}

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
            <section className="bg-white border-b border-gray-100 pt-[68px] md:pt-24 pb-2 md:pb-12 mb-2 md:mb-8 sticky top-0 md:top-0 z-40 shadow-sm shadow-gray-100/50">
                <div className="container px-0 md:px-8 mx-auto">
                    <div className="flex items-center gap-2 md:gap-6 px-4 md:px-0">
                        <Link href="/services" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-500 shrink-0">
                            <Icons.ArrowLeft size={16} className="md:w-5 md:h-5" />
                        </Link>
                        <div className="hidden md:block shrink-0">
                            <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 leading-none">Book Service</h1>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Davanagere Seva • Guaranteed Results</p>
                        </div>
                        <div className="flex-1">
                            <SearchBar variant="services" placeholder="Search service..." className="shadow-none border border-gray-100 bg-gray-50 max-w-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Interactive Listing Area */}
            <section className="container px-0 md:px-8 mx-auto pb-24">
                <ServiceSelectionListing
                    categories={data.categories}
                    services={data.services}
                    initialCategoryId={data.initialCategoryId}
                    highlightedServiceId={data.highlightedServiceId}
                />
            </section>

        </div>
    );
}
