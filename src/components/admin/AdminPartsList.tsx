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
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Edit2, Trash2, Package, Loader2, Search, Zap, Calendar } from 'lucide-react';
import { addPart, updatePartPrice, deletePart } from '@/app/actions/parts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AdminPartsList({ initialParts }: { initialParts: any[] }) {
    const router = useRouter();
    const [parts, setParts] = useState(initialParts);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPart, setEditingPart] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [quickUpdateId, setQuickUpdateId] = useState<string | null>(null);
    const [newPrice, setNewPrice] = useState<string>('');

    useEffect(() => {
        setParts(initialParts);
    }, [initialParts]);

    const filteredParts = useMemo(() => {
        return parts.filter(p => {
            if (!p || !p.name) return false;
            const matchesSearch = 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.type.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [parts, searchQuery]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            brand: formData.get('brand'),
            category: formData.get('category'),
            type: formData.get('type'),
            currentPrice: Number(formData.get('currentPrice')),
        };

        const result = await addPart(data);
        if (result.success) {
            toast.success(editingPart ? 'Part updated' : 'Part added to inventory');
            setIsDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    const handleQuickPriceUpdate = async (id: string) => {
        if (!newPrice || isNaN(Number(newPrice))) {
            toast.error('Please enter a valid price');
            return;
        }
        setLoading(true);
        const result = await updatePartPrice(id, Number(newPrice));
        if (result.success) {
            toast.success('Market price updated');
            setQuickUpdateId(null);
            setNewPrice('');
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this part from inventory?')) return;
        const result = await deletePart(id);
        if (result.success) {
            toast.success('Part removed');
            router.refresh();
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header / Search Area */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search parts, brands, or types..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => {
                        setEditingPart(null);
                        setIsDialogOpen(true);
                    }}
                    className="h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-primary/20 gap-2 w-full md:w-auto"
                >
                    <Plus size={16} /> Add Part To Catalog
                </Button>
            </div>

            {/* Desktop Table View */}
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Part Info</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category & Type</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Market Price</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Last Updated</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredParts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-20 text-center text-gray-400 font-medium">
                                        No parts found matching your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredParts.map((part) => (
                                    <TableRow key={part._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1">{part.name}</p>
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{part.brand}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <Badge variant="outline" className="bg-white border-slate-200 text-slate-900 font-bold text-[9px] uppercase px-2 py-0 rounded-md">
                                                    {part.category}
                                                </Badge>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight pl-0.5">{part.type}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {quickUpdateId === part._id ? (
                                                <div className="flex items-center gap-2">
                                                    <Input 
                                                        type="number" 
                                                        placeholder="New Price" 
                                                        className="h-9 w-24 rounded-lg text-xs font-bold"
                                                        value={newPrice}
                                                        onChange={(e) => setNewPrice(e.target.value)}
                                                        autoFocus
                                                    />
                                                    <Button size="sm" onClick={() => handleQuickPriceUpdate(part._id)} className="h-9 w-9 p-0 rounded-lg">
                                                        <Zap size={14} />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => setQuickUpdateId(null)} className="h-9 w-9 p-0 rounded-lg">
                                                        <Trash2 size={14} className="text-gray-400" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-black text-primary tracking-tighter">₹{part.currentPrice}</span>
                                                    <button 
                                                        onClick={() => { setQuickUpdateId(part._id); setNewPrice(part.currentPrice.toString()); }}
                                                        className="p-1.5 hover:bg-primary/10 text-primary rounded-md opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Calendar size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">
                                                    {new Date(part.lastUpdated || part.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={() => handleDelete(part._id)}
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

            {/* Add Part Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-[40px] max-w-xl p-0 border-none shadow-2xl overflow-hidden">
                    <DialogHeader className="bg-slate-900 p-8 text-white">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-xl">
                                <Package size={24} />
                            </div>
                            Inventory Setupist
                        </DialogTitle>
                        <p className="text-slate-400 text-sm font-medium mt-2 uppercase tracking-widest text-[10px]">Add new hardware components with current market pricing</p>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Component Name</Label>
                            <Input name="name" required placeholder="e.g. 8GB DDR4 RAM 3200MHz" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Brand</Label>
                                <Input name="brand" required placeholder="e.g. Crucial, Dell, HP" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Part Type</Label>
                                <Input name="type" required placeholder="e.g. RAM, SSD, Screen" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Category</Label>
                                <Select name="category" defaultValue="Laptop">
                                    <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="Laptop" className="font-bold">Laptop</SelectItem>
                                        <SelectItem value="Desktop" className="font-bold">Desktop</SelectItem>
                                        <SelectItem value="Printer" className="font-bold">Printer</SelectItem>
                                        <SelectItem value="CCTV" className="font-bold">CCTV</SelectItem>
                                        <SelectItem value="Networking" className="font-bold">Networking</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Today's Price (INR)</Label>
                                <Input name="currentPrice" type="number" required placeholder="₹ 3200" className="h-14 rounded-2xl border-primary/20 bg-primary/5 focus:bg-white transition-all font-black text-primary text-lg" />
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                Discard
                            </Button>
                            <Button type="submit" disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                                {loading ? <Loader2 className="animate-spin text-white" /> : 'Save To Inventory'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
