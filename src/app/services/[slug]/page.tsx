export const dynamic = 'force-dynamic';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, Star, ShieldCheck, Clock, Award, MapPin, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import BookingForm from '@/components/forms/BookingForm';
import { getCurrentUser } from '@/app/actions/user';
import { getServiceBySlug, getServices } from '@/app/actions/service';
import { getReviewsForService, getServiceRating } from '@/app/actions/review';
import ReviewSection from '@/components/reviews/ReviewSection';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug;
    const service = await getServiceBySlug(slug);

    if (!service) return { title: 'Service Not Found | Davanagere Seva' };

    return {
        title: `${service.name} in Davanagere | Professional Home Services`,
        description: `Book professional ${service.name} in Davanagere. Starting at ₹${service.price}. ${service.description.substring(0, 100)}...`,
    };
}

export default async function ServicePage({ params }: Props) {
    const slug = (await params).slug;
    const service = await getServiceBySlug(slug);
    const user = await getCurrentUser();

    if (!service) {
        notFound();
    }

    const reviews = await getReviewsForService(service._id);
    const ratingData = await getServiceRating(service._id);

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header / Hero */}
            <div className="bg-primary pt-12 pb-24 text-white">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                {service.category?.name || 'Premium Home Service'}
                            </span>
                            {ratingData.count > 0 && (
                                <span className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                                    <Star size={12} className="fill-current" /> {ratingData.average.toFixed(1)} Rating
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter">
                            {service.name}
                        </h1>
                        <p className="text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                            {service.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-8 mx-auto -mt-12 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Content Section */}
                    <div className="lg:col-span-2 space-y-12 pt-0 pb-4">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Clock, label: '60 Min', sub: 'Response' },
                                { icon: ShieldCheck, label: 'Verified', sub: 'Experts' },
                                { icon: Award, label: '30 Days', sub: 'Warranty' },
                                { icon: Zap, label: 'Express', sub: 'Booking' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
                                    <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <item.icon className="text-primary" size={24} />
                                    </div>
                                    <h4 className="font-bold text-sm">{item.label}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* What's included Card */}
                        {service.features && service.features.length > 0 && (
                            <Card className="rounded-[40px] border-none bg-gray-50/50 p-4 md:p-8">
                                <CardContent className="p-0">
                                    <h2 className="text-3xl font-black mb-10 flex items-center gap-3 tracking-tighter">
                                        <CheckCircle2 className="text-primary" size={32} />
                                        {"WHAT'S INCLUDED?"}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                        {service.features.map((feature: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-4 group">
                                                <div className="h-2 w-2 rounded-full bg-primary transition-all group-hover:w-6" />
                                                <span className="text-gray-700 font-medium text-lg leading-tight">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Reviews Section */}
                        <ReviewSection
                            serviceId={service._id}
                            reviews={reviews}
                            ratingData={ratingData}
                            userId={user?._id || null}
                        />

                        {/* Location / Availability */}
                        <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/10 flex flex-col md:flex-row items-center gap-6">
                            <div className="bg-primary w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                <MapPin className="text-white" size={32} />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-black tracking-tight text-primary">AVAILABLE IN ALL AREAS OF DAVANAGERE</h3>
                                <p className="text-gray-600 font-medium">Serving Vidyanagar, MCC, Nituvalli, PJ Extension & more.</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <aside className="lg:sticky lg:top-24">
                        <BookingForm
                            serviceId={service._id}
                            serviceName={service.name}
                            price={service.price}
                            userData={user}
                        />

                        <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
                            <ShieldCheck size={40} />
                            <Clock size={40} />
                            <Award size={40} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
