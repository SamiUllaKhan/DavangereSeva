'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';
import { submitRating } from '@/app/actions/booking';
import { toast } from 'sonner';

export default function RatingDialog({
    bookingId,
    isOpen,
    onOpenChange
}: {
    bookingId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Please select a star rating');
            return;
        }

        setLoading(true);
        const result = await submitRating(bookingId, rating, review);
        if (result.success) {
            toast.success('Thank you for your rating!');
            onOpenChange(false);
            window.location.reload();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[40px] max-w-md border-none shadow-2xl overflow-hidden p-0">
                <DialogHeader className="bg-primary p-8 text-white">
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">Rate Your Service</DialogTitle>
                </DialogHeader>

                <div className="p-8 space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Your Experience</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="outline-none transition-transform active:scale-95"
                                >
                                    <Star
                                        size={40}
                                        fill={(hover || rating) >= star ? '#F59E0B' : 'none'}
                                        className={(hover || rating) >= star ? 'text-amber-500' : 'text-gray-200'}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : rating === 1 ? 'Poor' : 'Select Rating'}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 font-bold">Share your feedback (Optional)</Label>
                        <Textarea
                            placeholder="Tell us about the service quality, partner behavior, etc."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="min-h-[100px] rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all resize-none"
                        />
                    </div>
                </div>

                <DialogFooter className="p-8 pt-0">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Submit Rating'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
