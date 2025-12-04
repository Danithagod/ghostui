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

export const GraveModal = React.forwardRef<HTMLDivElement, GraveModalProps>(
  ({ isOpen, onClose, title, children, className }, ref) => {
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
                        className="absolute inset-0 backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.1)', backdropFilter: 'blur(4px)' }}
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-lg overflow-hidden rounded-xl border-2 shadow-2xl",
                            "before:absolute before:inset-0 before:z-0 before:bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] before:opacity-10 before:mix-blend-overlay",
                            className
                        )}
                        style={{
                            backgroundColor: 'var(--ghost-bg)',
                            borderColor: 'var(--ghost-accent)',
                            boxShadow: `
                                0 0 20px rgba(var(--ghost-accent-rgb), 0.4),
                                0 0 40px rgba(var(--ghost-accent-rgb), 0.2),
                                0 0 60px rgba(var(--ghost-accent-rgb), 0.1),
                                inset 0 0 30px rgba(var(--ghost-accent-rgb), 0.05)
                            `,
                        }}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div 
                            className="relative z-10 flex items-center justify-between px-6 py-4"
                            style={{ 
                                borderBottom: '1px solid var(--ghost-border)',
                                backgroundColor: 'var(--ghost-bg-secondary)',
                            }}
                        >
                            {title && (
                                <h2 
                                    className="text-xl font-display tracking-wide"
                                    style={{ color: 'var(--ghost-text)' }}
                                >
                                    {title}
                                </h2>
                            )}
                            <button
                                onClick={onClose}
                                className="grave-modal-close rounded-full p-2 transition-all duration-200 focus:outline-none"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                                <style>{`
                                    .grave-modal-close {
                                        color: var(--ghost-text-secondary);
                                        background: transparent;
                                    }
                                    .grave-modal-close:hover {
                                        color: var(--ghost-accent);
                                        background: rgba(var(--ghost-accent-rgb), 0.15);
                                    }
                                    .grave-modal-close:focus {
                                        box-shadow: 0 0 0 2px rgba(var(--ghost-accent-rgb), 0.5);
                                    }
                                `}</style>
                            </button>
                        </div>

                        {/* Body */}
                        <div 
                            className="relative z-10 p-6"
                            style={{ color: 'var(--ghost-text-secondary)' }}
                        >
                            {children}
                        </div>

                        {/* Footer/Glow effect */}
                        <div 
                            className="absolute bottom-0 left-0 right-0 h-1 opacity-70"
                            style={{ 
                                background: 'linear-gradient(to right, transparent, var(--ghost-accent), transparent)',
                            }}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
  }
);

GraveModal.displayName = 'GraveModal';
