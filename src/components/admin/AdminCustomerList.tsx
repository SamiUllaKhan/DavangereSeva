'use client';

import { useState, useMemo, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Check, X, User, Loader2, Search, Zap, ZapOff, ShoppingBag, MapPin, Calendar, Edit, Save } from 'lucide-react';
import { toggleCustomerStatus, updateCustomer } from '@/app/actions/admin';
import { toast } from 'sonner';

export default function AdminCustomerList({ initialCustomers }: { initialCustomers: any[] }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchQuery, setSearchQuery] = useState('');
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
    const [isSaving, setIsSaving] = useState(false);

    const filteredCustomers = useMemo(() => {
        return customers.filter(c =>
            c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.phone?.includes(searchQuery)
        );
    }, [customers, searchQuery]);

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;
        setProcessingId(id);
        const result = await toggleCustomerStatus(id, newStatus);
        if (result.success) {
            toast.success(`Customer ${newStatus ? 'activated' : 'deactivated'} successfully`);
            setCustomers(customers.map(c =>
                c._id === id ? { ...c, isActive: newStatus } : c
            ));
        } else {
            toast.error(result.error || 'Failed to update customer status');
        }
        setProcessingId(null);
    };

    const handleEditClick = (customer: any) => {
        setEditingCustomer(customer);
        setFormData({
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            address: customer.address || '',
        });
    };

    const handleSaveCustomer = async () => {
        if (!editingCustomer) return;
        setIsSaving(true);
        const result = await updateCustomer(editingCustomer._id, formData);

        if (result.success) {
            toast.success('Customer details updated');
            setCustomers(customers.map(c =>
                c._id === editingCustomer._id ? { ...c, ...formData } : c
            ));
            setEditingCustomer(null);
        } else {
            toast.error(result.error || 'Failed to update customer');
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search customers by name, email, or phone..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Badge variant="outline" className="px-4 py-2 text-primary font-bold border-primary/20 bg-primary/5 rounded-xl">
                    {customers.length} Total Customers
                </Badge>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden lg:block border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Phone</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Joined</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Orders</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={48} className="mb-4 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-black text-lg">
                                                    {customer.name?.charAt(0) || <User size={20} />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-primary uppercase text-sm leading-none mb-1">{customer.name}</p>
                                                    <p className="text-xs text-gray-400">{customer.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold text-gray-700">{customer.phone}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">
                                                {mounted ? new Date(customer.createdAt).toLocaleDateString() : '...'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="rounded-xl px-4 border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                                                        <ShoppingBag className="w-4 h-4 text-primary" />
                                                        <span className="font-bold">{customer.bookings?.length || 0}</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto rounded-[35px] p-8 border-none shadow-2xl">
                                                    <DialogHeader className="mb-6">
                                                        <DialogTitle className="text-2xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                                <ShoppingBag className="w-5 h-5 text-primary" />
                                                            </div>
                                                            Order History for {customer.name}
                                                        </DialogTitle>
                                                    </DialogHeader>

                                                    {!customer.bookings || customer.bookings.length === 0 ? (
                                                        <div className="text-center py-12 bg-gray-50 rounded-3xl">
                                                            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No orders yet</p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            {customer.bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((booking: any) => (
                                                                <div key={booking._id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <Badge variant="outline" className={`font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg ${booking.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' :
                                                                                booking.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                                                                    booking.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                                                        'bg-orange-50 text-orange-600 border-orange-200'
                                                                                }`}>
                                                                                {booking.status}
                                                                            </Badge>
                                                                            <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                                                                <Calendar className="w-3 h-3" />
                                                                                {new Date(booking.createdAt).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                        <p className="font-black text-gray-800">{booking.service?.name}</p>
                                                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                                            <MapPin className="w-3 h-3" /> {booking.customerAddress}
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-xs font-bold text-gray-400 mb-1">Total Amount</p>
                                                                        <p className="font-black text-primary border border-primary/20 bg-primary/5 px-3 py-1 rounded-xl inline-block">
                                                                            ₹{booking.service?.price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg ${customer.isActive !== false
                                                    ? 'bg-green-50/50 border-green-200 text-green-600'
                                                    : 'bg-rose-50/50 border-rose-200 text-rose-600'
                                                    }`}
                                            >
                                                {customer.isActive !== false ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={() => handleEditClick(customer)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="rounded-xl px-4 border-gray-200 text-gray-600 hover:bg-gray-50"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="ml-2 font-bold uppercase text-[10px]">Edit</span>
                                                </Button>

                                                <Button
                                                    onClick={() => handleToggleStatus(customer._id, customer.isActive !== false)}
                                                    disabled={processingId === customer._id}
                                                    size="sm"
                                                    variant="outline"
                                                    className={`rounded-xl px-4 ${customer.isActive !== false
                                                        ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                                                        : 'border-green-200 text-green-600 hover:bg-green-50'
                                                        }`}
                                                >
                                                    {processingId === customer._id ? (
                                                        <Loader2 className="animate-spin h-4 w-4" />
                                                    ) : customer.isActive !== false ? (
                                                        <ZapOff className="h-4 w-4" />
                                                    ) : (
                                                        <Zap className="h-4 w-4" />
                                                    )}
                                                    <span className="ml-2 font-bold uppercase text-[10px]">
                                                        {customer.isActive !== false ? 'Deactivate' : 'Activate'}
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                {filteredCustomers.length === 0 ? (
                    <div className="col-span-full h-64 bg-white rounded-[40px] flex flex-col items-center justify-center text-gray-400 shadow-xl border border-gray-50">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                    </div>
                ) : (
                    filteredCustomers.map((customer) => (
                        <Card key={customer._id} className="border-none shadow-xl shadow-gray-100/50 rounded-[35px] overflow-hidden bg-white p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-black text-base">
                                        {customer.name?.charAt(0) || <User size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-black text-primary uppercase text-sm leading-tight">{customer.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold leading-tight">{customer.email}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`font-bold text-[9px] uppercase px-2 py-0.5 rounded-lg ${customer.isActive !== false
                                        ? 'bg-green-50/50 border-green-200 text-green-600'
                                        : 'bg-rose-50/50 border-rose-200 text-rose-600'
                                        }`}
                                >
                                    {customer.isActive !== false ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-50">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Contact</p>
                                    <p className="text-xs font-bold text-gray-700">{customer.phone}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Orders</p>
                                    <p className="text-xs font-bold text-primary">{customer.bookings?.length || 0} Total</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
                                <Button
                                    onClick={() => handleEditClick(customer)}
                                    size="sm"
                                    variant="outline"
                                    className="rounded-xl px-4 border-gray-100 text-gray-600 h-9"
                                >
                                    <Edit className="h-3.5 w-3.5 mr-2" />
                                    <span className="font-bold uppercase text-[9px]">Edit</span>
                                </Button>
                                <Button
                                    onClick={() => handleToggleStatus(customer._id, customer.isActive !== false)}
                                    disabled={processingId === customer._id}
                                    size="sm"
                                    variant="outline"
                                    className={`rounded-xl px-4 h-9 ${customer.isActive !== false ? 'border-rose-100 text-rose-500' : 'border-green-100 text-green-600'}`}
                                >
                                    {processingId === customer._id ? (
                                        <Loader2 className="animate-spin h-3.5 w-3.5" />
                                    ) : customer.isActive !== false ? (
                                        <ZapOff className="h-3.5 w-3.5 mr-2" />
                                    ) : (
                                        <Zap className="h-3.5 w-3.5 mr-2" />
                                    )}
                                    <span className="font-bold uppercase text-[9px]">
                                        {customer.isActive !== false ? 'Disable' : 'Enable'}
                                    </span>
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editingCustomer} onOpenChange={(open) => !open && setEditingCustomer(null)}>
                <DialogContent className="max-w-md rounded-[35px] p-8 border-none shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Edit className="w-5 h-5 text-primary" />
                            </div>
                            Edit Customer
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address</Label>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setEditingCustomer(null)}
                                className="rounded-xl font-bold"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveCustomer}
                                disabled={isSaving}
                                className="rounded-xl font-bold"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
