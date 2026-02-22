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
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Edit2, Trash2, Hammer, Loader2, Search } from 'lucide-react';
import { saveService, deleteService } from '@/app/actions/admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AdminServiceList({ initialServices, categories }: { initialServices: any[], categories: any[] }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [services, setServices] = useState(initialServices);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const filteredServices = useMemo(() => {
        return services.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [services, searchQuery]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        if (editingService) formData.append('id', editingService._id);

        const result = await saveService(formData);
        if (result.success) {
            toast.success(editingService ? 'Service updated' : 'Service created');
            setIsDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        const result = await deleteService(id);
        if (result.success) {
            toast.success('Service deleted');
            setServices(services.filter(s => s._id !== id));
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search services or categories..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => {
                        setEditingService(null);
                        setIsDialogOpen(true);
                    }}
                    className="h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-primary/20 gap-2 w-full md:w-auto"
                >
                    <Plus size={16} /> Add New Service
                </Button>
            </div>

            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Service</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Price</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={48} className="mb-4 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredServices.map((service) => (
                                    <TableRow key={service._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                                                    {mounted ? <Hammer size={24} /> : <div className="w-6 h-6 bg-gray-100 animate-pulse rounded" />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-primary uppercase text-sm leading-none mb-1">{service.name}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{service.description}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-white border-primary/20 text-primary font-bold text-[10px] uppercase px-2 py-0.5 rounded-lg">
                                                {service.category?.name || 'Uncategorized'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-black text-primary tracking-tighter">₹{service.price}</span>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={() => {
                                                        setEditingService(service);
                                                        setIsDialogOpen(true);
                                                    }}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5"
                                                >
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(service._id)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                                                >
                                                    <Trash2 size={16} />
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-[40px] max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
                    <DialogHeader className="bg-primary p-8 text-white">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                            {editingService ? 'Modify Service' : 'Launch New Service'}
                        </DialogTitle>
                        <p className="text-blue-100 opacity-80 text-sm font-medium">Configure service details, pricing and features.</p>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Service Label</Label>
                                <Input name="name" defaultValue={editingService?.name} required placeholder="e.g. Deep Home Cleaning" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Slug Identifier</Label>
                                <Input name="slug" defaultValue={editingService?.slug} required placeholder="e.g. cleaning-standard" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Category Classification</Label>
                                <Select name="category" defaultValue={editingService?.category?._id || editingService?.category}>
                                    <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold">
                                        <SelectValue placeholder="Assign Category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        {categories.map(c => (
                                            <SelectItem key={c._id} value={c._id} className="font-bold uppercase text-[10px] tracking-widest">{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Base Price (INR)</Label>
                                <Input name="price" type="number" defaultValue={editingService?.price} required placeholder="₹ 499" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Service Overview</Label>
                            <Textarea name="description" defaultValue={editingService?.description} required placeholder="Describe the service scope..." className="rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium min-h-[120px]" />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Core Benefits (Comma separated)</Label>
                                <Input name="features" defaultValue={editingService?.features?.join(', ')} placeholder="e.g. Eco-friendly products, 5-Star rated experts" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Value Proposition (Comma separated)</Label>
                                <Input name="whyChooseUs" defaultValue={editingService?.whyChooseUs?.join(', ')} placeholder="e.g. 100% Satisfaction, No hidden costs" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                        </div>

                        <DialogFooter className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                                {loading ? <Loader2 className="animate-spin" /> : editingService ? 'Commit Changes' : 'Publish Service'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
