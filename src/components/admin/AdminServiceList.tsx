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
import { Plus, Edit2, Trash2, Hammer, Loader2, Search, Camera } from 'lucide-react';
import * as Icons from 'lucide-react';
import { saveService, deleteService } from '@/app/actions/admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminServiceList({ initialServices, categories }: { initialServices: any[], categories: any[] }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [services, setServices] = useState(initialServices);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    
    useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    const filteredServices = useMemo(() => {
        return services.filter(s => {
            if (!s || !s.name) return false;
            const matchesName = s.name.toLowerCase().includes((searchQuery || '').toLowerCase());
            const matchesCategory = s.category?.name?.toLowerCase().includes((searchQuery || '').toLowerCase());
            return matchesName || matchesCategory;
        });
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

            <Card className="hidden lg:block border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Service</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Price</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.map((service) => (
                                <TableRow key={service._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                    <TableCell className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center overflow-hidden border border-gray-50 shadow-inner">
                                                {service.image ? (
                                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    mounted ? <Hammer size={24} /> : <div className="w-6 h-6 bg-gray-100 animate-pulse rounded" />
                                                )}
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
                                    <TableCell>
                                        {service.isActive !== false ? (
                                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] uppercase tracking-wider rounded-lg px-2">Live</Badge>
                                        ) : (
                                            <Badge className="bg-rose-500/10 text-rose-600 border-none font-black text-[9px] uppercase tracking-wider rounded-lg px-2">Hidden</Badge>
                                        )}
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
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-[40px] max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-none shadow-2xl">
                    <DialogHeader className="bg-primary p-8 text-white sticky top-0 z-50">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                            {editingService ? 'Modify Service' : 'Launch New Service'}
                        </DialogTitle>
                        <p className="text-blue-100 opacity-80 text-sm font-medium">Configure service details, pricing, images and characteristics.</p>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="p-0">
                        <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="w-full bg-slate-50 p-2 h-auto rounded-none flex items-center justify-start gap-2 border-b border-gray-100">
                                <TabsTrigger value="general" className="rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all uppercase leading-none">General Info</TabsTrigger>
                                <TabsTrigger value="media" className="rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all uppercase leading-none">Media & Visuals</TabsTrigger>
                            </TabsList>
                            
                            <div className="p-8 pb-32">
                                <div className={activeTab === 'general' ? 'space-y-8' : 'hidden'}>
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Category Classification</Label>
                                            <Select name="category" defaultValue={editingService?.category?._id || editingService?.category}>
                                                <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-xs">
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
                                            <Input name="price" type="number" defaultValue={editingService?.price} required placeholder="₹ 499" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-xs" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Availability Status</Label>
                                            <Select name="isActive" defaultValue={editingService?.isActive === false ? 'false' : 'true'}>
                                                <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-xs">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                                    <SelectItem value="true" className="font-bold uppercase text-[10px] tracking-widest text-emerald-600">Active (Live On Site)</SelectItem>
                                                    <SelectItem value="false" className="font-bold uppercase text-[10px] tracking-widest text-rose-600">Inactive (Hidden)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Service Overview</Label>
                                        <Textarea name="description" defaultValue={editingService?.description} required placeholder="Describe the service scope..." className="rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium min-h-[120px]" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Core Benefits (Comma separated)</Label>
                                            <Input name="features" defaultValue={editingService?.features?.join(', ')} placeholder="e.g. Eco-friendly, 5-Star rated" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Value Prop (Comma separated)</Label>
                                            <Input name="whyChooseUs" defaultValue={editingService?.whyChooseUs?.join(', ')} placeholder="e.g. No hidden costs" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                                        </div>
                                    </div>
                                </div>
                                <div className={activeTab === 'media' ? 'space-y-8' : 'hidden'}>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Camera className="text-primary" size={18} />
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Main Service Image</Label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[32px] border border-gray-100">
                                            <div className="space-y-2">
                                                <Label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Image URL</Label>
                                                <Input name="image" defaultValue={editingService?.image} placeholder="Paste image URL..." className="h-12 rounded-xl border-gray-100 bg-white focus:bg-white transition-all font-medium text-xs" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Or Upload Locally</Label>
                                                <Input name="imageFile" type="file" accept="image/*, image/webp" className="h-12 rounded-xl border-gray-100 bg-white focus:bg-white transition-all font-medium text-xs cursor-pointer pt-3 pl-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs>

                        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 z-50">
                            <div className="flex gap-4">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                                    {loading ? <Loader2 className="animate-spin" /> : editingService ? 'Update Service' : 'Create Service'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
