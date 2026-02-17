import { getPartnerBookings } from '@/app/actions/booking';
import { getCurrentUser } from '@/app/actions/user';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';
import PartnerOrderList from '@/components/partner/PartnerOrderList';

export default async function PartnerDashboardPage() {
    const user = await getCurrentUser();

    // Secure the route: only partners can access
    if (!user || user.role !== 'partner') {
        redirect('/login');
    }

    const bookings = await getPartnerBookings(user._id);

    return (
        <div className="container px-4 md:px-8 mx-auto py-20 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-5xl font-black text-orange-600 tracking-tighter uppercase mb-3">Partner Dashboard</h1>
                    <p className="text-gray-500 font-medium text-lg italic">"Top-rated service for a better Davanagere."</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="px-6 py-2 border-orange-200 bg-orange-50 text-orange-700 font-bold rounded-2xl text-base shadow-sm">
                        {bookings.length} Orders Assigned
                    </Badge>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user.serviceCategory} Expert</span>
                </div>
            </div>

            <PartnerOrderList initialBookings={bookings} />
        </div>
    );
}
