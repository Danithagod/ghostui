'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface GraveModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const GraveModal: React.FC<GraveModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-lg overflow-hidden rounded-xl border-2 border-ghost-gray/30 bg-ghost-dark shadow-2xl",
                            "before:absolute before:inset-0 before:z-0 before:bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] before:opacity-10 before:mix-blend-overlay",
                            className
                        )}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-ghost-gray/20 px-6 py-4 bg-ghost-gray/5">
                            {title && (
                                <h2 className="text-xl font-display tracking-wide text-ghost-white">
                                    {title}
                                </h2>
                            )}
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 text-ghost-white/50 transition-colors hover:bg-ghost-white/10 hover:text-ghost-white focus:outline-none focus:ring-2 focus:ring-ghost-purple/50"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="relative z-10 p-6 text-ghost-white/80">
                            {children}
                        </div>

                        {/* Footer/Glow effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ghost-purple/50 to-transparent opacity-50" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
