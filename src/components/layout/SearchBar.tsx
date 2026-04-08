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
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setQuery(searchParams.get('q') || '');
        setIsSearching(false);
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
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
            <div className={`relative w-full max-w-4xl mx-auto group ${className || ''}`}>
                {/* Decorative glow behind the card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 to-primary/10 rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                
                <div className="relative flex flex-col md:flex-row items-stretch bg-white rounded-[24px] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.1)] p-1.5 border border-white transition-all duration-500">
                    {/* Location Part */}
                    <div className="flex items-center px-4 py-3 md:py-0 gap-4 border-b md:border-b-0 md:border-r border-gray-100 min-w-[180px]">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                            <Icons.MapPin size={20} className="stroke-[2.5]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Your Location</p>
                            <span className="text-gray-900 font-bold text-base leading-tight block">Davanagere, KA</span>
                        </div>
                    </div>

                    {/* Search Input Part */}
                    <form onSubmit={handleSearch} className="flex-[3] flex items-center px-4 py-3 md:py-0 gap-4 min-w-0">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary transition-all group-focus-within:bg-primary group-focus-within:text-white">
                            <Icons.Search size={20} className="stroke-[2.5]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity">Find Services</p>
                            <Input
                                className="border-none focus-visible:ring-0 text-gray-900 font-bold p-0 h-auto bg-transparent text-base md:text-lg placeholder:text-gray-300 transition-all"
                                placeholder="Search for AC Repair, Cleaning..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                disabled={isSearching}
                            />
                        </div>
                        
                        {query && !isSearching && (
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
                            disabled={isSearching}
                            className="hidden md:flex h-12 px-8 rounded-[18px] bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 gap-2 ml-2"
                        >
                            {isSearching ? <Icons.Loader2 className="animate-spin" size={16} /> : (
                                <>
                                    Find Service
                                    <Icons.ArrowRight size={16} />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Mobile Only Button */}
                    <div className="md:hidden p-1.5 pt-0">
                        <Button 
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="w-full h-12 rounded-[18px] bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px]"
                        >
                            {isSearching ? <Icons.Loader2 className="animate-spin" size={16} /> : 'Find Service'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSearch} className={`relative w-full group ${className || ''}`}>
            {/* Outer Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
            
            <div className="relative flex items-center bg-white/70 backdrop-blur-2xl border border-white rounded-xl md:rounded-[26px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 p-1 md:p-2 overflow-hidden">
                <div className="flex items-center px-2 md:px-6 gap-2 md:gap-5 flex-1">
                    <div className="relative">
                        {isSearching ? (
                            <Icons.Loader2 size={16} className="text-primary md:w-[22px] md:h-[22px] animate-spin relative z-10" />
                        ) : (
                            <Icons.Search size={16} className="text-primary md:w-[22px] md:h-[22px] stroke-[2.5] relative z-10" />
                        )}
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full scale-150 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                    <Input
                        placeholder={placeholder}
                        className="border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-500/60 bg-transparent h-8 md:h-14 text-[13px] md:text-lg font-black tracking-tight p-0 w-full"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isSearching}
                    />
                </div>
                
                <div className="flex items-center gap-1.5 md:gap-3 px-1 md:px-2">
                    {query && !isSearching && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleClear}
                            className="h-7 w-7 md:h-10 md:w-10 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                        >
                            <Icons.XCircle size={14} className="md:w-5 md:h-5 stroke-[2]" />
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={isSearching}
                        className="rounded-lg md:rounded-[20px] px-3 md:px-8 h-8 md:h-12 font-black uppercase tracking-[0.2em] text-[7px] md:text-[10px] bg-primary text-white hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95"
                    >
                        {isSearching ? <Icons.Loader2 className="animate-spin" size={14} /> : 'Search'}
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
