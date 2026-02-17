'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, User, Phone, CheckCircle, Clock, Search, Filter, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PartnerOrderListProps {
    initialBookings: any[];
}

export default function PartnerOrderList({ initialBookings }: PartnerOrderListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredBookings = useMemo(() => {
        return initialBookings.filter((booking) => {
            const serviceName = (typeof booking.service === 'object' ? booking.service.name : booking.service).toLowerCase();
            const customerName = booking.customerName.toLowerCase();
            const matchesSearch = serviceName.includes(searchQuery.toLowerCase()) || customerName.includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [initialBookings, searchQuery, statusFilter]);

    return (
        <div className="space-y-8">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[30px] shadow-lg shadow-gray-100/50 border border-gray-50">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search by customer or service..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
                <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-14 w-[160px] rounded-2xl border-none bg-gray-50 shadow-sm font-bold text-gray-600">
                            <div className="flex items-center gap-2">
                                <Filter size={16} />
                                <SelectValue placeholder="Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-none shadow-xl">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Bookings Counter */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">
                    Showing {filteredBookings.length} results
                </p>
                {(searchQuery || statusFilter !== 'all') && (
                    <button
                        onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                        className="text-xs font-bold text-primary hover:underline"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* List */}
            {filteredBookings.length === 0 ? (
                <Card className="rounded-[40px] border-dashed border-2 border-gray-100 shadow-none p-20 text-center">
                    <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">No matching orders found</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Try adjusting your filters or search terms.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredBookings.map((booking: any) => (
                        <Card key={booking._id} className="relative rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/30 hover:shadow-2xl hover:shadow-gray-200/40 transition-all overflow-hidden group bg-white">
                            {/* Status Indicator Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-2 ${booking.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'}`} />

                            <div className="p-8 lg:p-10 pl-10">
                                {/* Top Row: Service Name and Status Badge */}
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2">Booking ID: <span className="text-primary">#{booking._id.substring(booking._id.length - 6).toUpperCase()}</span></p>
                                        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter group-hover:text-orange-600 transition-colors">
                                            {typeof booking.service === 'object' ? booking.service.name : booking.service}
                                        </h2>
                                    </div>
                                    <Badge
                                        className={`
                                            ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                                            border-none shadow-none font-black text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-2xl flex items-center gap-2
                                        `}
                                    >
                                        {booking.status === 'Completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                                        {booking.status}
                                    </Badge>
                                </div>

                                {/* Main Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                    {/* Customer Column */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                                <User size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Primary Contact</p>
                                                <p className="font-black text-primary text-xl tracking-tight">{booking.customerName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                                <Phone size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Contact Number</p>
                                                <p className="font-black text-primary text-xl tracking-tight underline underline-offset-4 decoration-green-200">{booking.customerPhone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details Column */}
                                    <div className="space-y-6 lg:border-l lg:border-gray-50 lg:pl-10">
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                                <Calendar size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Scheduled Date</p>
                                                <p className="font-black text-primary text-xl tracking-tight">{new Date(booking.bookingDate).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                                <MapPin size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Service Location</p>
                                                <p className="font-black text-primary leading-tight tracking-tight text-lg">{booking.customerAddress}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Column */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-gray-50/80 rounded-[35px] p-6 border border-gray-100 flex-grow flex flex-col justify-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" /> Requirements
                                            </p>
                                            <p className="text-sm text-gray-600 font-medium italic leading-relaxed">
                                                {booking.notes ? `"${booking.notes}"` : 'Standard service procedure. No special notes provided by customer.'}
                                            </p>
                                        </div>

                                        <Button className="w-full h-16 rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all gap-2">
                                            Update Job Status <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
