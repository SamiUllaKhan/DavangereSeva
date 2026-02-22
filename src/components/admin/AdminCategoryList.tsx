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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, LayoutGrid, Loader2, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { saveCategory, deleteCategory } from '@/app/actions/admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AdminCategoryList({ categories: initialCategories }: { categories: any[] }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [categories, setCategories] = useState(initialCategories);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const filteredCategories = useMemo(() => {
        return categories.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.slug.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [categories, searchQuery]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        if (editingCategory) formData.append('id', editingCategory._id);

        const result = await saveCategory(formData);
        if (result.success) {
            toast.success(editingCategory ? 'Category updated' : 'Category created');
            setIsDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This will fail if services are assigned to it.`)) return;
        const result = await deleteCategory(id);
        if (result.success) {
            toast.success('Category deleted');
            setCategories(categories.filter(c => c._id !== id));
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
                        placeholder="Search categories..."
                        className="pl-12 h-14 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => {
                        setEditingCategory(null);
                        setIsDialogOpen(true);
                    }}
                    className="h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-primary/20 gap-2 w-full md:w-auto"
                >
                    <Plus size={16} /> Add New Category
                </Button>
            </div>

            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Slug</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Description</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={48} className="mb-4 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No categories found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCategories.map((cat) => {
                                    const IconComponent = (Icons as any)[cat.icon] || Icons.HelpCircle;
                                    return (
                                        <TableRow key={cat._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                            <TableCell className="py-6 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                                                        {mounted ? <IconComponent size={24} /> : <div className="w-6 h-6 bg-gray-100 animate-pulse rounded" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-primary uppercase text-sm leading-none mb-1">{cat.name}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.icon}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{cat.slug}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`
                                                        font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-lg border-none
                                                        ${cat.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                                                            cat.status === 'coming-soon' ? 'bg-amber-50 text-amber-600' :
                                                                'bg-rose-50 text-rose-600'}
                                                    `}
                                                >
                                                    {cat.status || 'active'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-xs text-gray-500 max-w-[200px] truncate">{cat.description}</p>
                                            </TableCell>
                                            <TableCell className="pr-8 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        onClick={() => {
                                                            setEditingCategory(cat);
                                                            setIsDialogOpen(true);
                                                        }}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(cat._id, cat.name)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-[40px] max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
                    <DialogHeader className="bg-primary p-8 text-white">
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                            {editingCategory ? 'Modify Category' : 'Create New Category'}
                        </DialogTitle>
                        <p className="text-blue-100 opacity-80 text-sm font-medium">Define category name, icon and description.</p>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Category Name</Label>
                                <Input name="name" defaultValue={editingCategory?.name} required placeholder="e.g. Home Cleaning" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Slug Identifier</Label>
                                <Input name="slug" defaultValue={editingCategory?.slug} required placeholder="e.g. home-cleaning" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Visibility Status</Label>
                            <Select name="status" defaultValue={editingCategory?.status || 'active'}>
                                <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                    <SelectItem value="active" className="font-bold uppercase text-[10px] tracking-widest text-emerald-600">Active (Visible)</SelectItem>
                                    <SelectItem value="coming-soon" className="font-bold uppercase text-[10px] tracking-widest text-amber-600">Coming Soon (Preview)</SelectItem>
                                    <SelectItem value="inactive" className="font-bold uppercase text-[10px] tracking-widest text-rose-600">Inactive (Hidden)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1 text-center block mb-4">Select Icon (Lucide name)</Label>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                {[
                                    'Sparkles', 'Wrench', 'Zap', 'Droplets', 'Wind', 'Paintbrush', 'Bug', 'User',
                                    'Home', 'Hammer', 'Settings', 'Shield', 'Car', 'Camera', 'Music', 'ShoppingBag'
                                ].map(iconName => (
                                    <label key={iconName} className="relative group cursor-pointer">
                                        <input
                                            type="radio"
                                            name="icon"
                                            value={iconName}
                                            defaultChecked={editingCategory?.icon === iconName}
                                            className="peer absolute inset-0 opacity-0 cursor-pointer"
                                            required
                                        />
                                        <div className="w-full aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all group-hover:scale-105">
                                            {(() => {
                                                const Icon = (Icons as any)[iconName];
                                                return Icon ? <Icon size={20} /> : <span>{iconName[0]}</span>;
                                            })()}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <Input name="icon" defaultValue={editingCategory?.icon} placeholder="Or type any Lucide icon name..." className="mt-4 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-center" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Description</Label>
                            <Textarea name="description" defaultValue={editingCategory?.description} required placeholder="Brief description of segments in this category..." className="rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium min-h-[100px]" />
                        </div>

                        <DialogFooter className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                                {loading ? <Loader2 className="animate-spin" /> : editingCategory ? 'Update Category' : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
