import { getBookings } from '@/app/actions/booking';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Phone, User, MapPin, LogOut } from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
    const bookings = await getBookings();

    return (
        <div className="container px-4 md:px-8 mx-auto py-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-primary tracking-tight uppercase">Admin Dashboard</h1>
                    <p className="text-gray-500">Manage your recent service inquiries and bookings.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs font-mono px-3 py-1">
                        {bookings.length} Total Bookings
                    </Badge>
                    <form action={logout}>
                        <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 gap-2">
                            <LogOut size={16} /> Logout
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="shadow-lg border-none">
                    <CardHeader className="bg-primary text-white rounded-t-lg">
                        <CardTitle>Recent Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b-gray-200">
                                    <TableHead className="w-[200px] text-gray-600 font-bold uppercase text-xs">Customer</TableHead>
                                    <TableHead className="text-gray-600 font-bold uppercase text-xs">Service & Date</TableHead>
                                    <TableHead className="text-gray-600 font-bold uppercase text-xs">Address</TableHead>
                                    <TableHead className="text-gray-600 font-bold uppercase text-xs">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-48 text-center text-gray-500 italic">
                                            No bookings found in the database.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bookings.map((booking: any) => (
                                        <TableRow key={booking._id} className="hover:bg-blue-50/50 transition-colors">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold flex items-center gap-2">
                                                        <User size={14} className="text-primary" /> {booking.customerName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-2">
                                                        <Phone size={14} /> {booking.customerPhone}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-primary uppercase text-xs tracking-wide">
                                                        {booking.service?.name || 'General Service'}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-2">
                                                        <Calendar size={14} /> {new Date(booking.bookingDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-start gap-2 max-w-[250px]">
                                                    <MapPin size={14} className="text-gray-400 mt-1 shrink-0" />
                                                    <span className="text-xs text-gray-600">{booking.customerAddress}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={`${booking.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                                                        'bg-green-100 text-green-700 hover:bg-green-100'
                                                        } border-none shadow-none text-[10px] font-bold uppercase tracking-wider px-2 py-0.5`}
                                                >
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
