'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { subscribeNewsletter } from '@/app/actions/contact';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);

        try {
            const result = await subscribeNewsletter(email);
            if (result.success) {
                toast.success('Subscribed successfully!');
                setEmail('');
            } else {
                toast.error(result.error || 'Failed to subscribe');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-white/30"
                required
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-primary px-4 py-2 rounded text-sm font-bold disabled:opacity-50 hover:bg-white/90 transition-colors"
            >
                {isSubmitting ? '...' : 'Join'}
            </button>
        </form>
    );
}
