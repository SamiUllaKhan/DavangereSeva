'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import RatingDialog from '@/components/booking/RatingDialog';
import { Button } from '@/components/ui/button';

export default function BookingList({ bookings }: { bookings: any[] }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

    return (
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
                                <span className="text-sm font-medium">
                                    {mounted ? new Date(booking.bookingDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : '...'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                    <MapPin size={14} className="text-primary" />
                                </div>
                                <span className="text-sm font-medium truncate">{booking.customerAddress}</span>
                            </div>
                        </div>

                        {booking.status === 'Completed' && (
                            <div className="pt-4 border-t border-gray-50">
                                {booking.rating ? (
                                    <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < booking.rating ? '#F59E0B' : 'none'} className={i < booking.rating ? 'text-amber-500' : 'text-gray-300'} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Rated</span>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={() => setSelectedBookingId(booking._id)}
                                        className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase tracking-widest text-[10px] gap-2"
                                    >
                                        <Star size={14} /> Rate Service
                                    </Button>
                                )}
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-50 mt-auto">
                            <p className="text-xs text-gray-400 italic">Booking ID: #{booking._id.substring(booking._id.length - 8).toUpperCase()}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <RatingDialog
                bookingId={selectedBookingId || ''}
                isOpen={!!selectedBookingId}
                onOpenChange={(open) => !open && setSelectedBookingId(null)}
            />
        </div>
    );
}
