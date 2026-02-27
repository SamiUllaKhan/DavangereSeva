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
import { Check, X, User, Loader2, Search, Edit, Save, Hand, CheckCircle, XCircle } from 'lucide-react';
import { setPartnerStatus, updatePartnerDetails } from '@/app/actions/admin';
import { toast } from 'sonner';

export default function AdminPartnerList({ initialPartners }: { initialPartners: any[] }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [partners, setPartners] = useState(initialPartners);
    const [searchQuery, setSearchQuery] = useState('');
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [editingPartner, setEditingPartner] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', serviceCategory: '', experience: '' });
    const [isSaving, setIsSaving] = useState(false);

    const filteredPartners = useMemo(() => {
        return partners.filter(p =>
            p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.serviceCategory?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [partners, searchQuery]);

    const handleSetStatus = async (id: string, newStatus: 'active' | 'inactive' | 'hold') => {
        setProcessingId(id);
        const result = await setPartnerStatus(id, newStatus);
        if (result.success) {
            toast.success(`Partner status updated to ${newStatus}`);
            setPartners(partners.map(p =>
                p._id === id ? { ...p, partnerStatus: newStatus, isActive: newStatus === 'active' } : p
            ));
        } else {
            toast.error(result.error || 'Failed to update status');
        }
        setProcessingId(null);
    };

    const handleEditClick = (partner: any) => {
        setEditingPartner(partner);
        setFormData({
            name: partner.name || '',
            email: partner.email || '',
            phone: partner.phone || '',
            serviceCategory: partner.serviceCategory || '',
            experience: partner.experience || '',
        });
    };

    const handleSavePartner = async () => {
        if (!editingPartner) return;
        setIsSaving(true);
        const result = await updatePartnerDetails(editingPartner._id, formData);

        if (result.success) {
            toast.success('Partner details updated');
            setPartners(partners.map(p =>
                p._id === editingPartner._id ? { ...p, ...formData } : p
            ));
            setEditingPartner(null);
        } else {
            toast.error(result.error || 'Failed to update partner');
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search partners by name, email, or category..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Badge variant="outline" className="px-4 py-2 text-primary font-bold border-primary/20 bg-primary/5 rounded-xl">
                    {partners.length} Total Partners
                </Badge>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden lg:block border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Partner</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category/Exp</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Jobs</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPartners.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={48} className="mb-4 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPartners.map((partner) => (
                                    <TableRow key={partner._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-black text-lg">
                                                    {partner.name?.charAt(0) || <User size={20} />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-primary uppercase text-sm leading-none mb-1">{partner.name}</p>
                                                    <p className="text-xs text-gray-400">{partner.phone}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 items-start">
                                                <Badge variant="outline" className="bg-white border-primary/20 text-primary font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg mb-1">
                                                    {partner.serviceCategory || 'Uncategorized'}
                                                </Badge>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Exp: {partner.experience || 'N/A'} Yrs</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg ${partner.partnerStatus === 'active'
                                                    ? 'bg-green-50/50 border-green-200 text-green-600'
                                                    : partner.partnerStatus === 'hold'
                                                        ? 'bg-orange-50/50 border-orange-200 text-orange-600'
                                                        : 'bg-rose-50/50 border-rose-200 text-rose-600'
                                                    }`}
                                            >
                                                {partner.partnerStatus || (partner.isActive ? 'active' : 'inactive')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-center font-bold text-gray-700 bg-gray-50 rounded-xl py-1 px-3 inline-block">
                                                {partner.assignedBookings?.length || 0}
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <div className="flex justify-end gap-2 items-center flex-wrap">
                                                <Button
                                                    onClick={() => handleEditClick(partner)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="rounded-xl px-3 border-gray-200 text-gray-600 hover:bg-gray-50 h-8"
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>

                                                {partner.partnerStatus !== 'active' && (
                                                    <Button
                                                        onClick={() => handleSetStatus(partner._id, 'active')}
                                                        title="Set Active"
                                                        disabled={processingId === partner._id}
                                                        size="sm"
                                                        variant="outline"
                                                        className="rounded-xl px-3 border-green-200 text-green-600 hover:bg-green-50 h-8"
                                                    >
                                                        {processingId === partner._id ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                                                    </Button>
                                                )}

                                                {partner.partnerStatus !== 'hold' && (
                                                    <Button
                                                        title="Put on Hold"
                                                        onClick={() => handleSetStatus(partner._id, 'hold')}
                                                        disabled={processingId === partner._id}
                                                        size="sm"
                                                        variant="outline"
                                                        className="rounded-xl px-3 border-orange-200 text-orange-600 hover:bg-orange-50 h-8"
                                                    >
                                                        {processingId === partner._id ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <Hand className="h-3.5 w-3.5" />}
                                                    </Button>
                                                )}

                                                {partner.partnerStatus !== 'inactive' && (
                                                    <Button
                                                        title="Set Inactive"
                                                        onClick={() => handleSetStatus(partner._id, 'inactive')}
                                                        disabled={processingId === partner._id}
                                                        size="sm"
                                                        variant="outline"
                                                        className="rounded-xl px-3 border-rose-200 text-rose-600 hover:bg-rose-50 h-8"
                                                    >
                                                        {processingId === partner._id ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                                    </Button>
                                                )}
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
                {filteredPartners.length === 0 ? (
                    <div className="col-span-full h-64 bg-white rounded-[40px] flex flex-col items-center justify-center text-gray-400 shadow-xl border border-gray-50">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                    </div>
                ) : (
                    filteredPartners.map((partner) => (
                        <Card key={partner._id} className="border-none shadow-xl shadow-gray-100/50 rounded-[35px] overflow-hidden bg-white p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-black text-base">
                                        {partner.name?.charAt(0) || <User size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-black text-primary uppercase text-sm">{partner.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold">{partner.phone}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`font-bold text-[9px] uppercase px-2 py-0.5 rounded-lg ${partner.partnerStatus === 'active'
                                        ? 'bg-green-50/50 border-green-200 text-green-600'
                                        : partner.partnerStatus === 'hold'
                                            ? 'bg-orange-50/50 border-orange-200 text-orange-600'
                                            : 'bg-rose-50/50 border-rose-200 text-rose-600'
                                        }`}
                                >
                                    {partner.partnerStatus || (partner.isActive ? 'active' : 'inactive')}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-50">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Category</p>
                                    <Badge variant="outline" className="bg-white border-primary/20 text-primary font-bold text-[9px] uppercase px-2 py-0.5 rounded-lg">
                                        {partner.serviceCategory || 'Uncategorized'}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Experience</p>
                                    <p className="text-xs font-bold text-gray-700">{partner.experience || 'N/A'} Yrs</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase text-gray-400">Jobs:</span>
                                    <span className="font-black text-primary">{partner.assignedBookings?.length || 0}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleEditClick(partner)}
                                        size="sm"
                                        variant="outline"
                                        className="rounded-xl px-3 border-gray-200 bg-white h-8"
                                    >
                                        <Edit className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        onClick={() => handleSetStatus(partner._id, partner.partnerStatus === 'active' ? 'inactive' : 'active')}
                                        size="sm"
                                        variant="outline"
                                        className={`rounded-xl px-3 h-8 ${partner.partnerStatus === 'active' ? 'border-rose-200 text-rose-600' : 'border-green-200 text-green-600'}`}
                                    >
                                        {partner.partnerStatus === 'active' ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modals remain the same but ensure they are wrapped correctly */}
            <Dialog open={!!editingPartner} onOpenChange={(open) => !open && setEditingPartner(null)}>
                <DialogContent className="max-w-md rounded-[35px] p-8 border-none shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Edit className="w-5 h-5 text-primary" />
                            </div>
                            Edit Partner
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 text-left">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</Label>
                            <Input
                                value={formData.email}
                                type="email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</Label>
                                <Input
                                    value={formData.serviceCategory}
                                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                                    className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Experience (Yrs)</Label>
                                <Input
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setEditingPartner(null)}
                                className="rounded-xl font-bold"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSavePartner}
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
