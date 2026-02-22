export const dynamic = 'force-dynamic';
import { getCustomerBookings } from '@/app/actions/booking';
import { getUserSession } from '@/app/actions/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Search, ArrowRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BookingList from '@/components/booking/BookingList';

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
                <BookingList bookings={bookings} />
            )}
        </div>
    );
}
