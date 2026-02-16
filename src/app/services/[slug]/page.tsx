import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, Star, ShieldCheck, Clock, Award, MapPin, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import BookingForm from '@/components/forms/BookingForm';

// Mock data generator
function getServiceData(slug: string) {
    const services: Record<string, any> = {
        'ac-repair': {
            id: '1',
            name: 'AC Repair & Service',
            price: 499,
            description: 'Professional AC repair and maintenance service in Davanagere. Our certified technicians handle all brands and models, ensuring efficient cooling and long life for your air conditioner.',
            features: [
                'Deep Cleaning of Filters & Coils',
                'Gas Charging & Leak Fix',
                'Electrical Component Check',
                'Drainage Pipe Cleaning',
                '30 Days Service Warranty'
            ],
            reviews: [
                { id: 'r1', author: 'Suresh Kumar', rating: 5, comment: 'Excellent service! The technician was very professional and fixed the cooling issue quickly.', date: '2 days ago' },
                { id: 'r2', author: 'Megha S.', rating: 4, comment: 'Good experience. On time and efficient. Highly recommended for Davanagere residents.', date: '1 week ago' }
            ]
        },
        'cleaning': {
            id: '2',
            name: 'Full Home Cleaning',
            price: 1999,
            description: 'Comprehensive deep cleaning service for your entire home. From kitchen degreasing to bathroom sanitization, we cover everything.',
            features: [
                'Floor Scrubbing & Polishing',
                'Kitchen Deep Cleaning',
                'Bathroom Sanitization',
                'Window & Grill Cleaning',
                'Dusting & Vacuuming'
            ],
            reviews: [
                { id: 'r3', author: 'Priya R.', rating: 5, comment: 'My house is sparkling clean! They even cleaned corners I usually miss. Very impressed.', date: '3 days ago' },
                { id: 'r4', author: 'Vinay Patel', rating: 5, comment: 'Professional team and high-quality cleaning equipment. Worth every rupee.', date: '2 weeks ago' }
            ]
        },
        'plumbing': {
            id: '3',
            name: 'Professional Plumbing',
            price: 299,
            description: 'Expert plumbing solutions for leaks, pipe repairs, and new installations. Fast and reliable service across Davanagere.',
            features: ['Leak Detection', 'Tap & Shower Repair', 'Pipe Blockage Clearing', 'Tank Cleaning', 'Sanitary Fitting'],
            reviews: [
                { id: 'r5', author: 'Arjun M.', rating: 4, comment: 'Fixed the kitchen leak perfectly. Very prompt response.', date: '5 days ago' }
            ]
        },
        'electrician': {
            id: '4',
            name: 'Expert Electrician',
            price: 199,
            description: 'Certified electricians for all your wiring, switchboard fix, and electrical appliance installation needs.',
            features: ['Wiring & Rewiring', 'Switchboard Repair', 'Fan & Light Installation', 'Inverter Setup', 'Short Circuit Fix'],
            reviews: [
                { id: 'r6', author: 'Karthik N.', rating: 5, comment: 'Very knowledgeable electrician. Solved a complex wiring issue safely.', date: '1 day ago' }
            ]
        },
        'painting': {
            id: '5',
            name: 'Home Painting',
            price: 5000,
            description: 'Professional interior and exterior painting services with high-quality finish and expert color consultation.',
            features: ['Wall Putty Application', 'Interior Emulsion', 'Exterior Weather-proof Paint', 'Texture Painting', 'Wood & Metal Polish'],
            reviews: [
                { id: 'r7', author: 'Ravi Teja', rating: 5, comment: 'Transformed my living room! The finish is premium and the team was very tidy.', date: '1 month ago' }
            ]
        },
        'pest-control': {
            id: '6',
            name: 'Pest Control',
            price: 899,
            description: 'Effective and safe pest control services to keep your home free from termites, cockroaches, and bed bugs.',
            features: ['Termite Treatment', 'Cockroach Gel', 'Bed Bug Heat Treatment', 'Rodent Control', 'Mosquito Fogging'],
            reviews: [
                { id: 'r8', author: 'Deepa K.', rating: 5, comment: 'No more cockroaches! The treatment was odorless and very effective.', date: '2 weeks ago' }
            ]
        },
        'appliance-repair': {
            id: '7',
            name: 'Appliance Repair',
            price: 399,
            description: 'Repair services for washing machines, refrigerators, microwaves, and other major home appliances.',
            features: ['Washing Machine Setup', 'Fridge Gas Refilling', 'Oven Heating Issues', 'TV Wall Mount', 'Spare Parts Replacement'],
            reviews: [
                { id: 'r9', author: 'Manjunath', rating: 4, comment: 'Fixed my washing machine in one visit. Professional service.', date: '1 week ago' }
            ]
        },
        'packers-movers': {
            id: '8',
            name: 'Packers & Movers',
            price: 4500,
            description: 'Safe and hassle-free relocation services within Davanagere or for inter-city shifting.',
            features: ['Premium Packing', 'Loading & Unloading', 'Secure Transport', 'Furniture Disassembly', 'Insurance Coverage'],
            reviews: [
                { id: 'r10', author: 'Sneha P.', rating: 5, comment: 'Smooth shifting experience. All items arrived safely without a scratch.', date: '3 weeks ago' }
            ]
        }
    };

    return services[slug.toLowerCase()] || null;
}

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug;
    const service = getServiceData(slug);

    if (!service) return { title: 'Service Not Found | Davanagere Seva' };

    return {
        title: `${service.name} in Davanagere | Professional Home Services`,
        description: `Book professional ${service.name} in Davanagere. Starting at ₹${service.price}. ${service.description.substring(0, 100)}...`,
    };
}

export default async function ServicePage({ params }: Props) {
    const slug = (await params).slug;
    const service = getServiceData(slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header / Hero */}
            <div className="bg-primary pt-12 pb-24 text-white">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                Premium Home Service
                            </span>
                            <span className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                                <Star size={12} className="fill-current" /> 4.9 Rating
                            </span>
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
                        <Card className="rounded-[40px] border-none bg-gray-50/50 p-4 md:p-8">
                            <CardContent className="p-0">
                                <h2 className="text-3xl font-black mb-10 flex items-center gap-3 tracking-tighter">
                                    <CheckCircle2 className="text-primary" size={32} />
                                    WHAT'S INCLUDED?
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

                        {/* Reviews Section */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-black tracking-tighter uppercase">Customer Reviews</h2>
                                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100">
                                    <Star className="text-yellow-500 fill-current" size={20} />
                                    <span className="font-bold text-yellow-700">4.9 / 5.0</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.reviews?.map((review: any) => (
                                    <Card key={review.id} className="rounded-3xl border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {review.author[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm leading-none">{review.author}</h4>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{review.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-200"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed italic">
                                                "{review.comment}"
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

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
                            serviceId={service.id}
                            serviceName={service.name}
                            price={service.price}
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
