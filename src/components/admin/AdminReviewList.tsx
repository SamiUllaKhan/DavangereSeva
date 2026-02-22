'use client';

import { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Star, Check, X, MessageSquare, User, Calendar, Loader2 } from 'lucide-react';
import { approveReview, deleteReview } from '@/app/actions/admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AdminReviewList({ initialReviews }: { initialReviews: any[] }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const [reviews, setReviews] = useState(initialReviews);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setLoadingId(id);
        const result = await approveReview(id);
        if (result.success) {
            toast.success('Review approved and live!');
            setReviews(reviews.filter(r => r._id !== id));
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoadingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to reject/delete this review?')) return;
        setLoadingId(id);
        const result = await deleteReview(id);
        if (result.success) {
            toast.success('Review removed');
            setReviews(reviews.filter(r => r._id !== id));
            router.refresh();
        } else {
            toast.error(result.error);
        }
        setLoadingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-[35px] shadow-xl shadow-gray-100/50 border border-gray-100 mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-primary uppercase flex items-center gap-2">
                        <MessageSquare size={20} /> Pending Reviews
                    </h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Moderate customer feedback before it goes public</p>
                </div>
                <Badge className="bg-primary text-white font-bold px-4 py-1.5 rounded-xl">{reviews.length} Pending</Badge>
            </div>

            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 border-none hover:bg-gray-50/50">
                                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer & Service</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Rating & Review</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</TableHead>
                                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Decision</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reviews.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Check size={48} className="mb-4 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">All reviews moderated</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                reviews.map((review) => (
                                    <TableRow key={review._id} className="group hover:bg-primary/[0.02] border-b border-gray-50 transition-colors">
                                        <TableCell className="py-6 px-8">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                                        {review.customerName[0]}
                                                    </div>
                                                    <span className="font-black text-primary uppercase text-sm">{review.customerName}</span>
                                                </div>
                                                <Badge variant="outline" className="w-fit text-[10px] font-bold uppercase border-primary/20 text-primary bg-primary/5">
                                                    {typeof review.service === 'object' ? review.service.name : review.service}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-md">
                                            <div className="space-y-2">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < review.rating ? '#F59E0B' : 'none'} className={i < review.rating ? 'text-amber-500' : 'text-gray-200'} />
                                                    ))}
                                                </div>
                                                <p className="text-sm font-medium text-gray-600 leading-relaxed italic">"{review.review || 'No written comment'}"</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Calendar size={14} />
                                                <span className="text-xs font-bold uppercase">
                                                    {mounted ? new Date(review.createdAt).toLocaleDateString() : '...'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={() => handleApprove(review._id)}
                                                    disabled={loadingId === review._id}
                                                    className="h-10 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-widest text-[9px] gap-2 px-4"
                                                >
                                                    {loadingId === review._id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Approve
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(review._id)}
                                                    disabled={loadingId === review._id}
                                                    variant="ghost"
                                                    className="h-10 rounded-xl text-rose-500 hover:bg-rose-50 font-bold uppercase tracking-widest text-[9px] gap-2 px-4 shadow-none"
                                                >
                                                    <X size={14} /> Reject
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
