import { getCustomerBookings } from '@/app/actions/booking';
import { getUserSession } from '@/app/actions/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Search, ArrowRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function CustomerBookingsPage() {
    const session = await getUserSession();

    if (!session || session.role !== 'customer') {
        redirect('/register');
    }

    const bookings = await getCustomerBookings(session.id);

    return (
        <div className="container px-4 md:px-8 mx-auto py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-primary tracking-tighter uppercase mb-2">My Service Requests</h1>
                    <p className="text-gray-500">Track and manage all your home service bookings.</p>
                </div>
                <Badge variant="outline" className="px-4 py-2 text-primary font-bold border-primary/20 bg-primary/5 rounded-xl">
                    {bookings.length} Total Requests
                </Badge>
            </div>

            {bookings.length === 0 ? (
                <Card className="rounded-[40px] border-dashed border-2 border-gray-200 shadow-none p-20 text-center">
                    <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">No bookings found</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't requested any services yet. Our verified experts are ready to help you!</p>
                    <Link href="/">
                        <Button size="lg" className="rounded-2xl font-bold uppercase tracking-widest px-10 h-14 shadow-xl">
                            Explore Services
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map((booking: any) => (
                        <Card key={booking._id} className="rounded-[35px] border-none shadow-xl hover:shadow-2xl transition-all group overflow-hidden flex flex-col">
                            <CardHeader className="bg-gray-50 p-6 flex flex-row items-center justify-between border-b border-gray-100">
                                <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <Clock className="text-primary" size={24} />
                                </div>
                                <Badge
                                    className={`${booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                                booking.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                                        } border-none font-bold uppercase text-[10px] tracking-widest px-3 py-1`}
                                >
                                    {booking.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-8 flex-grow space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Service Type</p>
                                    <h3 className="text-xl font-black text-primary uppercase">
                                        {typeof booking.service === 'object' ? booking.service.name : booking.service}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <Calendar size={14} className="text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">{new Date(booking.bookingDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                            <MapPin size={14} className="text-primary" />
                                        </div>
                                        <span className="text-sm font-medium truncate">{booking.customerAddress}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-50 mt-auto">
                                    <p className="text-xs text-gray-400 italic">Booking ID: #{booking._id.substring(booking._id.length - 8).toUpperCase()}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
