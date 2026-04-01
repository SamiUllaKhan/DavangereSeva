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
import { Plus, Edit2, Trash2, Hammer, Loader2, Search, LayoutGrid } from 'lucide-react';
import { saveService, deleteService } from '@/app/actions/admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Image as ImageIcon, Briefcase, PlusCircle, XCircle } from 'lucide-react';

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
    
    // Sync state with props when data refreshes
    useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    // Add-on state for the form
    const [formAddOns, setFormAddOns] = useState<any[]>([]);

    useEffect(() => {
        if (editingService) {
            setFormAddOns(editingService.addOns || []);
        } else {
            setFormAddOns([]);
        }
    }, [editingService]);

    const addAddOn = () => {
        setFormAddOns([...formAddOns, { name: '', price: 0, description: '', id: Date.now() }]);
    };

    const removeAddOn = (index: number) => {
        setFormAddOns(formAddOns.filter((_, i) => i !== index));
    };

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
        
        // Count of addons for the server action
        formData.append('addonCount', formAddOns.length.toString());

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
                        setFormAddOns([]);
                        setIsDialogOpen(true);
                    }}
                    className="h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-primary/20 gap-2 w-full md:w-auto"
                >
                    <Plus size={16} /> Add New Service
                </Button>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden lg:block border-none shadow-2xl rounded-[40px] overflow-hidden">
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

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                {filteredServices.length === 0 ? (
                    <div className="col-span-full h-64 bg-white rounded-[40px] flex flex-col items-center justify-center text-gray-400 shadow-xl border border-gray-50">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No records found</p>
                    </div>
                ) : (
                    filteredServices.map((service) => (
                        <Card key={service._id} className="border-none shadow-xl shadow-gray-100/50 rounded-[35px] overflow-hidden bg-white p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3 truncate pr-4">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center overflow-hidden border border-gray-50 shadow-inner">
                                        {service.image ? (
                                            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Hammer size={20} />
                                        )}
                                    </div>
                                    <div className="truncate">
                                        <p className="font-black text-primary uppercase text-sm truncate">{service.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold truncate">{service.category?.name || 'Uncategorized'}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-primary tracking-tighter shrink-0">₹{service.price}</span>
                            </div>

                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 italic">
                                "{service.description}"
                            </p>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
                                <Button
                                    onClick={() => {
                                        setEditingService(service);
                                        setIsDialogOpen(true);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl border-gray-100 text-primary font-bold uppercase tracking-widest text-[9px] gap-2 px-4 shadow-none"
                                >
                                    <Edit2 size={14} /> Edit
                                </Button>
                                <Button
                                    onClick={() => handleDelete(service._id)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl border-gray-100 text-rose-500 hover:bg-rose-50 font-bold uppercase tracking-widest text-[9px] gap-2 px-4 shadow-none"
                                >
                                    <Trash2 size={14} /> Delete
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-[40px] max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-none shadow-2xl overflow-x-hidden">
                    <DialogHeader className="bg-primary p-8 text-white sticky top-0 z-50">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                            {editingService ? 'Modify Service' : 'Launch New Service'}
                        </DialogTitle>
                        <p className="text-blue-100 opacity-80 text-sm font-medium">Configure service details, pricing, images and add-ons.</p>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="p-0">
                        <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="w-full bg-slate-50 p-2 h-auto rounded-none flex items-center justify-start gap-2 border-b border-gray-100">
                                <TabsTrigger value="general" className="rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all uppercase leading-none">General Info</TabsTrigger>
                                <TabsTrigger value="media" className="rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all uppercase leading-none">Media & Brands</TabsTrigger>
                                <TabsTrigger value="addons" className="rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all uppercase leading-none">Add-ons (Sub Services)</TabsTrigger>
                            </TabsList>
                            
                            <div className="p-8 pb-32">
                                <div className={activeTab === 'general' ? 'space-y-8 mt-0 border-none p-0' : 'hidden'}>
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

                                <div className={activeTab === 'media' ? 'space-y-8 mt-0 border-none p-0' : 'hidden'}>
                                    {/* Service Image Section */}
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
                                                <div className="relative group">
                                                    <Input name="imageFile" type="file" accept="image/*" className="h-12 rounded-xl border-gray-100 bg-white focus:bg-white transition-all font-medium text-xs cursor-pointer pt-3 pl-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Brand Logos Section */}
                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="text-primary" size={18} />
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Supported Brands & Partners</Label>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-[32px] border border-gray-100 space-y-4">
                                            <Label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Brand Logo URLs (Comma separated)</Label>
                                            <Textarea 
                                                name="brandLogos" 
                                                defaultValue={editingService?.brandLogos?.join(', ')} 
                                                placeholder="https://logo1.com, https://logo2-url.com..." 
                                                className="rounded-2xl border-gray-100 bg-white focus:bg-white transition-all font-medium min-h-[100px] text-xs" 
                                            />
                                            <div className="flex flex-wrap gap-3">
                                                {editingService?.brandLogos?.map((logo: string, i: number) => (
                                                    <div key={i} className="h-10 w-16 bg-white rounded-xl border border-gray-100 p-2 flex items-center justify-center">
                                                        <img src={logo} alt="brand" className="max-h-full max-w-full object-contain brightness-0 opacity-40" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={activeTab === 'addons' ? 'space-y-6 mt-0 border-none p-0' : 'hidden'}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <LayoutGrid className="text-primary" size={18} />
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Add-Ons & Sub-Services</Label>
                                        </div>
                                        <Button type="button" onClick={addAddOn} variant="outline" size="sm" className="rounded-xl font-bold uppercase text-[9px] tracking-widest h-10 px-4 border-primary/20 text-primary hover:bg-primary/5 gap-2">
                                            <PlusCircle size={14} /> New Add-on
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {formAddOns.map((addon, idx) => (
                                            <div key={addon.id || idx} className="bg-white p-6 rounded-[32px] border-2 border-slate-50 shadow-sm space-y-4 relative group">
                                                <button type="button" onClick={() => removeAddOn(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-white text-rose-500 rounded-full shadow-lg border border-gray-50 flex items-center justify-center hover:bg-rose-50 transition-all">
                                                    <XCircle size={18} />
                                                </button>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Label</Label>
                                                        <Input name={`addon_name_${idx}`} defaultValue={addon.name} placeholder="Name" className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Price (₹)</Label>
                                                        <Input name={`addon_price_${idx}`} type="number" defaultValue={addon.price} placeholder="0" className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Image Upload</Label>
                                                        <Input name={`addon_image_file_${idx}`} type="file" accept="image/*" className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs pt-2.5" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</Label>
                                                        <Input name={`addon_description_${idx}`} defaultValue={addon.description} placeholder="Short description..." className="h-10 rounded-xl bg-gray-50 border-none font-medium text-xs" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Existing Image URL</Label>
                                                        <Input name={`addon_image_${idx}`} defaultValue={addon.image} placeholder="Or paste image URL" className="h-10 rounded-xl bg-gray-50 border-none font-medium text-xs" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {formAddOns.length === 0 && (
                                            <div className="py-12 bg-slate-50 rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 space-y-2">
                                                <ImageIcon size={32} className="opacity-20" />
                                                <p className="font-bold uppercase tracking-widest text-[9px]">No sub-services defined</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Tabs>

                        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6 border-t border-gray-100 z-[60] rounded-b-[40px]">
                            <div className="max-w-4xl mx-auto flex gap-3">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-16 rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-gray-50">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1 h-16 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 bg-primary text-white">
                                    {loading ? <Loader2 className="animate-spin" /> : editingService ? 'Store Permanent Changes' : 'Publish to Marketplace'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
