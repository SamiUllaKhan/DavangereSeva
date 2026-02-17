'use client';

import { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    Search,
    Calendar,
    Phone,
    User as UserIcon,
    MapPin,
    Mail,
    Clock,
    CheckCircle,
    Settings2,
    Filter,
    ArrowUpRight,
    TrendingUp,
    Users,
    Briefcase,
    Hammer,
    X,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { updateBooking } from '@/app/actions/booking';
import { toast } from 'sonner';

interface AdminStatsProps {
    total: number;
    pending: number;
    completed: number;
}

function AdminStats({ total, pending, completed }: AdminStatsProps) {
    const stats = [
        { label: 'Total Requests', value: total, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Task', value: pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Network experts', value: 24, icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
                <Card key={i} className="border-none shadow-xl shadow-gray-100/50 rounded-[30px] overflow-hidden group hover:scale-[1.02] transition-all">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-3xl transition-transform group-hover:rotate-12`}>
                                <stat.icon size={24} />
                            </div>
                            <ArrowUpRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                            <p className="text-3xl font-black text-primary mt-1">{stat.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function AdminOrderList({ initialBookings, partners }: { initialBookings: any[], partners: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Management State
    const [status, setStatus] = useState('');
    const [partnerId, setPartnerId] = useState('');

    const filteredBookings = useMemo(() => {
        return initialBookings.filter(b =>
            b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof b.service === 'object' ? b.service.name : b.service).toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialBookings, searchQuery]);

    const stats = {
        total: initialBookings.length,
        pending: initialBookings.filter(b => b.status === 'Pending').length,
        completed: initialBookings.filter(b => b.status === 'Completed').length,
    };

    function handleOpenManage(booking: any) {
        setSelectedBooking(booking);
        setStatus(booking.status);
        setPartnerId(booking.assignedPartnerId || 'unassigned');
    }

    async function handleUpdate() {
        if (!selectedBooking) return;
        setIsUpdating(true);

        const data = {
            status,
            assignedPartnerId: partnerId === 'unassigned' ? null : partnerId
        };

        try {
            const res = await updateBooking(selectedBooking._id, data);
            if (res.success) {
                toast.success('Booking updated successfully');
                setSelectedBooking(null);
                // In a real app, we'd use router.refresh() or local state update
                // Since this is a server component parent, refresh will work
                window.location.reload();
            } else {
                toast.error('Failed to update: ' + res.error);
            }
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className="space-y-6">
            <AdminStats {...stats} />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-8">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search customer, service or contact..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="h-14 rounded-2xl border-gray-100 font-bold uppercase tracking-widest text-[10px] gap-2 px-6">
                        <Filter size={16} /> Filters
                    </Button>
                    <Button className="h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-primary/20">
                        Export Data
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Service Type</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Assignment</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Manage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={48} className="mb-4 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBookings.map((booking) => {
                                    const assignedPartner = partners.find(p => p._id === booking.assignedPartnerId);

                                    return (
                                        <TableRow key={booking._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                            <TableCell className="py-6 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                                                        {booking.customerName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-primary uppercase text-sm leading-none mb-1">{booking.customerName}</p>
                                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                                            <Phone size={10} /> {booking.customerPhone}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <Badge variant="outline" className="bg-white border-primary/20 text-primary font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg">
                                                        {typeof booking.service === 'object' ? booking.service.name : booking.service}
                                                    </Badge>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={10} className="text-gray-400" />
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {assignedPartner ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-orange-600 uppercase flex items-center gap-1">
                                                            <Hammer size={12} /> {assignedPartner.name}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 italic">{assignedPartner.serviceCategory}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-lg">Unassigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={`
                                                        ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                            booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}
                                                        border-none shadow-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-xl
                                                    `}
                                                >
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="pr-8 text-right">
                                                <Button
                                                    onClick={() => handleOpenManage(booking)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-xl hover:bg-primary text-gray-400 hover:text-white transition-all font-bold uppercase tracking-widest text-[10px] gap-2"
                                                >
                                                    Manage <ChevronRight size={14} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Management Dialog */}
            <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                <DialogContent className="rounded-[40px] border-none shadow-2xl p-0 overflow-hidden max-w-md">
                    <DialogHeader className="bg-primary p-8 text-white">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Modify Service Order</DialogTitle>
                        <DialogDescription className="text-blue-100 opacity-80">
                            Update job status and assign a verified partner for {selectedBooking?.customerName}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Job Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold focus:ring-primary/10 transition-all">
                                        <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="Pending">Pending Approval</SelectItem>
                                        <SelectItem value="Confirmed">Confirmed Order</SelectItem>
                                        <SelectItem value="Completed">Job Completed</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Assign Service Expert</Label>
                                <Select value={partnerId} onValueChange={setPartnerId}>
                                    <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold focus:ring-primary/10 transition-all">
                                        <SelectValue placeholder="Choose Expert" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl overflow-y-auto max-h-[300px]">
                                        <SelectItem value="unassigned" className="font-bold text-gray-400">No Assignment</SelectItem>
                                        {partners.map(p => (
                                            <SelectItem key={p._id} value={p._id}>
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{p.name}</span>
                                                    <span className="text-[10px] uppercase text-primary tracking-tighter">{p.serviceCategory}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                            <p className="text-[10px] text-blue-600 font-bold uppercase mb-1 flex items-center gap-1">
                                <MapPin size={10} /> Customer Address
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed italic">
                                {selectedBooking?.customerAddress}
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-3">
                        <Button variant="ghost" onClick={() => setSelectedBooking(null)} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" /> : 'Apply Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
