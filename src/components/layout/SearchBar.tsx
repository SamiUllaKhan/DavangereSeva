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
            <div className={`flex flex-col md:flex-row items-stretch bg-white rounded-[32px] shadow-[0_32px_96px_-12px_rgba(0,0,0,0.15)] p-2 gap-2 group ${className || ''}`}>
                {/* Location Picker (Visual only for now) */}
                <div className="flex-1 flex items-center px-6 gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-gray-100 min-w-[200px]">
                    <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <Icons.MapPin size={22} className="stroke-[2.5]" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Service City</p>
                        <Input
                            className="border-none focus-visible:ring-0 text-gray-900 font-black p-0 h-auto bg-transparent text-sm md:text-base leading-none"
                            placeholder="Davanagere, KA"
                            readOnly
                            value="Davanagere, KA"
                        />
                    </div>
                </div>

                {/* Service Search */}
                <form onSubmit={handleSearch} className="flex-[2] flex items-center px-6 gap-4 py-4 md:py-0">
                    <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Icons.Search size={22} className="stroke-[2.5]" />
                    </div>
                    <div className="flex-1 relative">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Looking for</p>
                        <Input
                            className="border-none focus-visible:ring-0 text-gray-900 font-black p-0 h-auto bg-transparent text-sm md:text-base leading-none placeholder:text-gray-300"
                            placeholder="Home cleaning, AC Repair..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1.5 hover:bg-rose-50 rounded-full text-gray-200 hover:text-rose-500 transition-all"
                        >
                            <Icons.XCircle size={18} />
                        </button>
                    )}
                    <Button 
                        type="submit" 
                        size="lg" 
                        className="hidden md:flex items-center gap-2 px-10 h-16 rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] bg-gray-950 hover:bg-primary transition-all shadow-xl hover:shadow-primary/30 ml-4 group/btn"
                    >
                        Find Service
                        <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>

                {/* Mobile Button */}
                <Button 
                    onClick={handleSearch}
                    size="lg" 
                    className="md:hidden w-full h-16 rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] bg-gray-950 hover:bg-primary transition-all mt-2"
                >
                    Find Service
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSearch} className={`relative w-full group ${className || ''}`}>
            {/* Outer Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
            
            <div className="relative flex items-center bg-white/70 backdrop-blur-2xl border border-white rounded-[26px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 p-2 overflow-hidden">
                <div className="flex items-center px-6 gap-5 flex-1">
                    <div className="relative">
                        <Icons.Search size={22} className="text-primary stroke-[2.5] relative z-10" />
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full scale-150 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                    <Input
                        placeholder={placeholder}
                        className="border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-500/60 bg-transparent h-14 text-base md:text-lg font-black tracking-tight p-0 w-full"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-3 px-2">
                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleClear}
                            className="h-10 w-10 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                        >
                            <Icons.XCircle size={20} className="stroke-[2]" />
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="rounded-[20px] px-8 h-12 font-black uppercase tracking-[0.2em] text-[10px] bg-primary text-white hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95"
                    >
                        Search
                    </Button>
                </div>
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
