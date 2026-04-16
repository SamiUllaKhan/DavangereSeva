'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, User, Phone, CheckCircle, Clock, Search, Filter, X, ChevronRight, Package, Plus, Trash2, IndianRupee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { addPartsToBooking } from '@/app/actions/booking';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface PartnerOrderListProps {
    initialBookings: any[];
    allParts: any[];
}

export default function PartnerOrderList({ initialBookings, allParts }: PartnerOrderListProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [isPartsDialogOpen, setIsPartsDialogOpen] = useState(false);
    const [selectedParts, setSelectedParts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const filteredBookings = useMemo(() => {
        return initialBookings.filter((booking) => {
            const serviceName = (typeof booking.service === 'object' ? booking.service.name : booking.service).toLowerCase();
            const customerName = booking.customerName.toLowerCase();
            const matchesSearch = serviceName.includes(searchQuery.toLowerCase()) || customerName.includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [initialBookings, searchQuery, statusFilter]);

    const handleOpenPartsDialog = (booking: any) => {
        setSelectedBooking(booking);
        setSelectedParts(booking.parts || []);
        setIsPartsDialogOpen(true);
    };

    const handleAddPart = (part: any) => {
        const existing = selectedParts.find(p => (p.partId || p._id) === (part.partId || part._id));
        if (existing) {
            setSelectedParts(selectedParts.map(p => 
                (p.partId || p._id) === (part.partId || part._id) ? { ...p, quantity: (p.quantity || 1) + 1 } : p
            ));
        } else {
            setSelectedParts([...selectedParts, { 
                partId: part._id, 
                name: part.name, 
                price: part.currentPrice, 
                quantity: 1 
            }]);
        }
    };

    const handleRemovePart = (partId: string) => {
        setSelectedParts(selectedParts.filter(p => (p.partId || p._id) !== partId));
    };

    const handleSaveParts = async () => {
        setLoading(true);
        const result = await addPartsToBooking(selectedBooking._id, selectedParts);
        if (result.success) {
            toast.success('Parts updated and total recalculated');
            setIsPartsDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

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
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" /> Requirements & Parts
                                            </p>
                                            
                                            {/* Show added parts */}
                                            {booking.parts && booking.parts.length > 0 ? (
                                                <div className="space-y-3 mb-4">
                                                    {booking.parts.map((part: any, i: number) => (
                                                        <div key={i} className="flex justify-between items-center text-xs font-bold bg-white p-2 rounded-xl border border-gray-50 shadow-sm">
                                                            <span className="text-gray-600 truncate max-w-[120px]">{part.name}</span>
                                                            <span className="text-primary tracking-tighter">₹{part.price} x {part.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-600 font-medium italic leading-relaxed mb-4">
                                                    {booking.notes ? `"${booking.notes}"` : 'Standard service procedure. No special notes.'}
                                                </p>
                                            )}

                                            <p className="text-[10px] font-black uppercase text-gray-400">Current Total: <span className="text-emerald-600 text-sm">₹{booking.totalAmount}</span></p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Button 
                                                onClick={() => handleOpenPartsDialog(booking)}
                                                variant="outline" 
                                                className="w-full h-12 rounded-[20px] font-bold uppercase tracking-[0.1em] text-[9px] border-primary/20 text-primary hover:bg-primary/5 transition-all gap-2"
                                            >
                                                <Package size={14} /> Manage Parts
                                            </Button>
                                            <Button className="w-full h-14 rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all gap-2">
                                                Update Job Status <ChevronRight size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Manage Parts Dialog */}
            <Dialog open={isPartsDialogOpen} onOpenChange={setIsPartsDialogOpen}>
                <DialogContent className="rounded-[40px] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl">
                    <DialogHeader className="bg-slate-900 p-8 text-white shrink-0">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            <Package size={24} className="text-primary" />
                            Job Inventory Management
                        </DialogTitle>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 italic">
                            Adding parts will automatically update the total service amount.
                        </p>
                    </DialogHeader>

                    <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
                        {/* Parts Selection List */}
                        <div className="lg:w-1/2 p-6 border-r border-gray-100 flex flex-col">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">Available Parts Catalog</Label>
                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <Input 
                                    placeholder="Find part or brand..." 
                                    className="pl-12 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white text-xs font-bold"
                                />
                            </div>
                            <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                                {allParts.map((part) => (
                                    <div 
                                        key={part._id} 
                                        className="p-4 bg-white border border-gray-50 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all group flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="text-xs font-black text-slate-900 uppercase leading-none mb-1">{part.name}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{part.brand} • {part.type}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black text-primary tracking-tighter">₹{part.currentPrice}</span>
                                            <Button 
                                                size="sm" 
                                                onClick={() => handleAddPart(part)}
                                                className="w-8 h-8 p-0 rounded-lg shadow-none"
                                            >
                                                <Plus size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Selected Parts List */}
                        <div className="lg:w-1/2 p-6 bg-slate-50 flex flex-col">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">Proposed Parts for this Job</Label>
                            <div className="flex-grow overflow-y-auto space-y-3 scrollbar-none">
                                {selectedParts.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <Package size={48} className="text-gray-300 mb-4" />
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-tight">No parts added yet.<br/>Use the left panel to search.</p>
                                    </div>
                                ) : (
                                    selectedParts.map((part, i) => (
                                        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/5 p-2 rounded-lg text-primary">
                                                    <Package size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-900 uppercase leading-none mb-1">{part.name}</p>
                                                    <p className="text-[9px] font-bold text-gray-400">₹{part.price} each</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl">
                                                    <span className="text-[10px] font-black">x{part.quantity}</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemovePart(part.partId || part._id)}
                                                    className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Summary & Save */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Service Fee + Parts Total</p>
                                        {(selectedBooking?.items?.reduce((s: number, i: any) => s + (i.price * i.quantity), 0) || 0) === 0 && selectedParts.length > 0 && (
                                            <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest animate-pulse">+ ₹200 Visit Charge Active</p>
                                        )}
                                    </div>
                                    <p className="text-2xl font-black text-primary tracking-tighter flex items-center gap-1">
                                        <IndianRupee size={20} />
                                        { (() => {
                                            let itemsTotal = selectedBooking?.items?.reduce((s: number, i: any) => s + (i.price * i.quantity), 0) || 0;
                                            const partsTotal = selectedParts.reduce((s, p) => s + (p.price * p.quantity), 0);
                                            if (itemsTotal === 0 && partsTotal > 0) {
                                                itemsTotal = 200;
                                            }
                                            return itemsTotal + partsTotal;
                                          })()
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => setIsPartsDialogOpen(false)}
                                        className="h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        disabled={loading}
                                        onClick={handleSaveParts}
                                        className="h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex-1 shadow-xl shadow-primary/20"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : 'Confirm & Quote'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
