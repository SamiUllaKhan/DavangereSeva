'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createReview } from '@/app/actions/review';

interface ReviewSectionProps {
    serviceId: string;
    reviews: any[];
    ratingData: { average: number; count: number };
    userId: string | null;
}

export default function ReviewSection({ serviceId, reviews, ratingData, userId }: ReviewSectionProps) {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localReviews, setLocalReviews] = useState(reviews);
    const [localRating, setLocalRating] = useState(ratingData);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        setIsSubmitting(true);

        try {
            const result = await createReview({ serviceId, rating, comment });
            if (result.success && result.review) {
                toast.success('Review submitted successfully!');
                setLocalReviews([result.review, ...localReviews]);
                const newCount = localRating.count + 1;
                const newAvg = ((localRating.average * localRating.count) + rating) / newCount;
                setLocalRating({ average: Math.round(newAvg * 10) / 10, count: newCount });
                setShowForm(false);
                setRating(0);
                setComment('');
            } else {
                toast.error(result.error || 'Failed to submit review');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Customer Reviews</h2>
                <div className="flex items-center gap-4">
                    {localRating.count > 0 && (
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100">
                            <Star className="text-yellow-500 fill-current" size={20} />
                            <span className="font-bold text-yellow-700">{localRating.average} / 5.0</span>
                            <span className="text-yellow-600 text-sm">({localRating.count})</span>
                        </div>
                    )}
                    {userId && !showForm && (
                        <Button
                            onClick={() => setShowForm(true)}
                            variant="outline"
                            className="rounded-full font-bold"
                        >
                            Write a Review
                        </Button>
                    )}
                </div>
            </div>

            {/* Review Form */}
            {showForm && (
                <Card className="rounded-3xl border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <p className="text-sm font-bold text-gray-700 mb-2">Your Rating</p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={28}
                                                className={
                                                    star <= (hoverRating || rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                }
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Textarea
                                    placeholder="Share your experience with this service..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="min-h-[100px] rounded-xl bg-white"
                                    required
                                    minLength={5}
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-full font-bold"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setShowForm(false);
                                        setRating(0);
                                        setComment('');
                                    }}
                                    className="rounded-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Reviews List */}
            {localReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {localReviews.map((review: any) => (
                        <Card key={review._id} className="rounded-3xl border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {review.userName?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm leading-none">{review.userName}</h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                                                {formatDate(review.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed italic">
                                    {'"'}{review.comment}{'"'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-3xl">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No reviews yet. Be the first to review!</p>
                    {!userId && (
                        <p className="text-gray-400 text-sm mt-2">Log in to leave a review.</p>
                    )}
                </div>
            )}
        </div>
    );
}
