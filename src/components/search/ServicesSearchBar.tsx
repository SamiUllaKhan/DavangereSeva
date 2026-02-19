'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ServicesSearchBarProps {
    initialQuery: string;
}

export default function ServicesSearchBar({ initialQuery }: ServicesSearchBarProps) {
    const [query, setQuery] = useState(initialQuery);
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/services?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/services');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
                placeholder="Search for a service..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-black rounded-2xl border-none shadow-2xl text-lg"
            />
        </form>
    );
}
