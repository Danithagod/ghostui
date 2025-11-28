'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ghost, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a GhostToastProvider');
    }
    return context;
};

export const GhostToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: Toast = { id, message, type, duration };

        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5" />;
            case 'info':
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getColors = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'border-ghost-green/50 bg-ghost-dark text-ghost-green';
            case 'error':
                return 'border-ghost-blood/50 bg-ghost-dark text-ghost-blood';
            case 'warning':
                return 'border-yellow-500/50 bg-ghost-dark text-yellow-500';
            case 'info':
            default:
                return 'border-ghost-purple/50 bg-ghost-dark text-ghost-purple';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg backdrop-blur-sm pointer-events-auto min-w-[300px] max-w-md",
                                getColors(toast.type)
                            )}
                        >
                            {/* Ghost icon with glow */}
                            <div className="relative flex-shrink-0">
                                {getIcon(toast.type)}
                                <div className="absolute inset-0 blur-sm opacity-50">
                                    {getIcon(toast.type)}
                                </div>
                            </div>

                            {/* Message */}
                            <p className="flex-1 text-sm font-medium text-ghost-white">
                                {toast.message}
                            </p>

                            {/* Close button */}
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                                aria-label="Close notification"
                            >
                                <X className="w-4 h-4 text-ghost-white/60" />
                            </button>

                            {/* Spectral glow */}
                            <div className={cn(
                                "absolute inset-0 rounded-lg opacity-20 blur-md -z-10",
                                toast.type === 'success' && "bg-ghost-green",
                                toast.type === 'error' && "bg-ghost-blood",
                                toast.type === 'warning' && "bg-yellow-500",
                                toast.type === 'info' && "bg-ghost-purple"
                            )} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

// Standalone GhostToast component for custom implementations
export interface GhostToastProps {
    message: string;
    type?: ToastType;
    onClose?: () => void;
    className?: string;
}

export const GhostToast: React.FC<GhostToastProps> = ({
    message,
    type = 'info',
    onClose,
    className,
}) => {
    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5" />;
            case 'info':
            default:
                return <Ghost className="w-5 h-5" />;
        }
    };

    const getColors = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'border-ghost-green/50 bg-ghost-dark text-ghost-green';
            case 'error':
                return 'border-ghost-blood/50 bg-ghost-dark text-ghost-blood';
            case 'warning':
                return 'border-yellow-500/50 bg-ghost-dark text-yellow-500';
            case 'info':
            default:
                return 'border-ghost-purple/50 bg-ghost-dark text-ghost-purple';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg backdrop-blur-sm",
                getColors(type),
                className
            )}
        >
            <div className="relative flex-shrink-0">
                {getIcon(type)}
                <div className="absolute inset-0 blur-sm opacity-50">
                    {getIcon(type)}
                </div>
            </div>

            <p className="flex-1 text-sm font-medium text-ghost-white">
                {message}
            </p>

            {onClose && (
                <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4 text-ghost-white/60" />
                </button>
            )}
        </motion.div>
    );
};
