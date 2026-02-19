'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchServices } from '@/app/actions/service';

export default function HomeSearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                const data = await searchServices(query);
                setResults(data);
                setIsOpen(true);
                setIsLoading(false);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/services?q=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
        }
    }

    return (
        <div ref={wrapperRef} className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-lg shadow-2xl">
                <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r">
                    <MapPin className="text-primary shrink-0" size={20} />
                    <Input
                        className="border-none focus-visible:ring-0 text-black placeholder:text-gray-400"
                        placeholder="Davanagere, Karnataka"
                        readOnly
                    />
                </div>
                <div className="flex-[2] flex items-center px-4 gap-2">
                    <Search className="text-gray-400 shrink-0" size={20} />
                    <Input
                        className="border-none focus-visible:ring-0 text-black placeholder:text-gray-400"
                        placeholder="What service do you need?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <Button type="submit" size="lg" className="px-8 font-bold uppercase tracking-wide">Search</Button>
            </form>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    {results.map((service: any) => (
                        <button
                            key={service._id}
                            onClick={() => {
                                router.push(`/services/${service.slug}`);
                                setIsOpen(false);
                            }}
                            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-none"
                        >
                            <Search className="text-gray-300 shrink-0" size={16} />
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{service.name}</p>
                                <p className="text-xs text-gray-500">{service.shortDescription || service.category?.name}</p>
                            </div>
                            <span className="ml-auto text-primary font-bold text-sm">
                                {'\u20B9'}{service.price}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && isLoading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-6 text-center">
                    <p className="text-gray-400 text-sm">Searching...</p>
                </div>
            )}

            {isOpen && !isLoading && query.trim().length >= 2 && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-6 text-center">
                    <p className="text-gray-400 text-sm">No services found for "{query}"</p>
                </div>
            )}
        </div>
    );
}
