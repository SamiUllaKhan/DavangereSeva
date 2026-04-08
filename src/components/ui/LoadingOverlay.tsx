'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
    subMessage?: string;
}

export function LoadingOverlay({ isVisible, message = "Processing...", subMessage = "Please wait while we perform some checks" }: LoadingOverlayProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isVisible) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 15;
                });
            }, 400);
            return () => clearInterval(interval);
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md"
                >
                    <div className="max-w-md w-full px-8 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="bg-white p-10 rounded-[40px] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.1)] border border-slate-100"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
                                <div className="relative flex items-center justify-center w-full h-full bg-primary rounded-full text-white shadow-xl shadow-primary/30">
                                    <Loader2 className="w-10 h-10 animate-spin" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                                {message}
                            </h3>
                            <p className="text-slate-500 font-medium mb-8">
                                {subMessage}
                            </p>

                            <div className="relative">
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Processing</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{Math.round(progress)}%</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
