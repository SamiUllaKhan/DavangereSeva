'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

interface SearchBarProps {
    className?: string;
    placeholder?: string;
    variant?: 'home' | 'services';
}

function SearchBarContent({ className, placeholder = "Search for a service...", variant = 'home' }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');

    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/services?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/services');
        }
    };

    const handleClear = () => {
        setQuery('');
        router.push('/services');
    };

    if (variant === 'home') {
        return (
            <form onSubmit={handleSearch} className={`contents ${className || ''}`}>
                <div className="flex-[2] flex items-center px-4 gap-2 py-2 md:py-0">
                    <Icons.Search className="text-gray-400 shrink-0" size={20} />
                    <Input
                        className="border-none focus-visible:ring-0 text-black placeholder:text-gray-400 w-full"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Icons.X size={16} />
                        </button>
                    )}
                </div>
                <Button type="submit" size="lg" className="px-8 font-bold uppercase tracking-wide w-full md:w-auto">Search</Button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSearch} className={`relative max-w-2xl mx-auto w-full ${className || ''}`}>
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
                placeholder={placeholder}
                className="pl-12 pr-32 h-14 bg-white text-black rounded-2xl border-none shadow-2xl text-lg w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {query && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="h-10 w-10 p-0 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                    >
                        <Icons.X size={18} />
                    </Button>
                )}
                <Button
                    type="submit"
                    className="rounded-xl px-6 h-10 font-bold"
                    size="sm"
                >
                    Search
                </Button>
            </div>
        </form>
    );
}

export function SearchBar(props: SearchBarProps) {
    return (
        <Suspense fallback={<div className="h-14 w-full bg-white/20 rounded-2xl animate-pulse" />}>
            <SearchBarContent {...props} />
        </Suspense>
    );
}
