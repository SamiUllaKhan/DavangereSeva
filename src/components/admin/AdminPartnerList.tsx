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
import { Check, X, User, Briefcase, Calendar, Loader2, Search } from 'lucide-react';
import { verifyPartner } from '@/app/actions/admin';
import { toast } from 'sonner';

export default function AdminPartnerList({ initialPartners }: { initialPartners: any[] }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [partners, setPartners] = useState(initialPartners);
    const [searchQuery, setSearchQuery] = useState('');
    const [processingId, setProcessingId] = useState<string | null>(null);

    const filteredPartners = useMemo(() => {
        return partners.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.serviceCategory?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [partners, searchQuery]);

    const handleVerify = async (id: string, approve: boolean) => {
        setProcessingId(id);
        const result = await verifyPartner(id, approve);
        if (result.success) {
            toast.success(approve ? 'Partner verified' : 'Partner application rejected');
            setPartners(partners.filter(p => p._id !== id));
        } else {
            toast.error(result.error);
        }
        setProcessingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search partner applications..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Badge variant="outline" className="px-4 py-2 text-primary font-bold border-primary/20 bg-primary/5 rounded-xl">
                    {partners.length} Pending Requests
                </Badge>
            </div>

            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Partner</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Experience</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Applied Date</TableHead>
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
                                                    {partner.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-primary uppercase text-sm leading-none mb-1">{partner.name}</p>
                                                    <p className="text-xs text-gray-400">{partner.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-white border-primary/20 text-primary font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg">
                                                {partner.serviceCategory}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold text-gray-700">{partner.experience} Years</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">
                                                {mounted ? new Date(partner.createdAt).toLocaleDateString() : '...'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={() => handleVerify(partner._id, true)}
                                                    disabled={processingId === partner._id}
                                                    size="sm"
                                                    className="bg-green-500 hover:bg-green-600 rounded-xl px-4"
                                                >
                                                    {processingId === partner._id ? <Loader2 className="animate-spin h-4 w-4" /> : <Check className="h-4 w-4" />}
                                                    <span className="ml-2 font-bold uppercase text-[10px]">Approve</span>
                                                </Button>
                                                <Button
                                                    onClick={() => handleVerify(partner._id, false)}
                                                    disabled={processingId === partner._id}
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl"
                                                >
                                                    <X className="h-4 w-4" />
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
        </div>
    );
}
