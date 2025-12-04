'use client';

import React, { useState, createContext, useContext, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

// --- Custom Ghost SVG (Animated) ---
const SpookyGhostIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 174.57 164.28"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`.cls-1{fill:#fff;}.cls-2{fill:#2b2b28;}`}</style>
    </defs>
    <g id="Objects">
      {/* Body */}
      <path
        className="cls-1"
        d="M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
      />
      {/* Eyes Group (Blinking Animation) */}
      <g className="animate-[blink_4s_infinite]">
        <path
          className="cls-2"
          d="M42.43,23.31c-.36,2.1-1.5,3.78-2.53,3.74s-1.59-1.78-1.23-3.88c.36-2.1,1.5-3.78,2.53-3.74,1.04.04,1.59,1.78,1.23,3.88Z"
        />
        <path
          className="cls-2"
          d="M54.14,22.78c.36,2.1-1.5,4.06-1.14,4.32-0.99,0.25-2.08-1.27-2.44-3.4-0.36-2.13,0.15-4.06,1.14-4.32,0.99-0.25,2.08,1.27,2.44,3.4Z"
        />
      </g>
      {/* Mouth */}
      <path
        className="cls-2"
        d="M55.18,40.26c1.67,5.63-0.17,11.28-4.12,12.63-3.95,1.34-8.5-2.13-10.17-7.76-1.67-5.63,0.17-11.28,4.12-12.63,3.95-1.34,8.5,2.13,10.17,7.76Z"
      />
      {/* Hand (Holding the Toast) */}
      <path
        className="cls-1"
        d="M91.39,40.23s20.26,8.26,34.47,3.98,11.53,19.96-12.92,20.27c-24.44,0.31-21.56-24.24-21.56-24.24Z"
      />
      {/* Tail/Wisp */}
      <path
        className="cls-1"
        d="M31.75,71.66c-5.18-16.45-12.67-23.61-26.6-28.73-13.94-5.11,2.77-22.88,22.5-8.45,19.73,14.44,6.91,46.09,4.11,37.17Z"
      />
    </g>
  </svg>
);

// --- Toast Logic ---
type ToastSide = 'left' | 'right';

type ToastType = {
  id: string;
  message: string;
  type: 'info' | 'curse' | 'success';
  side: ToastSide;
  scale: number;
  rotation: number;
  offsetX: number;
};

type ToastContextType = {
  addToast: (msg: string, type?: 'info' | 'curse' | 'success') => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

// --- Component: GhostToastItem ---
const GhostToastItem = forwardRef<
  HTMLDivElement,
  { toast: ToastType; removeToast: (id: string) => void }
>(({ toast, removeToast }, ref) => {
  const isRight = toast.side === 'right';

  return (
    <motion.div
      ref={ref}
      layout
      role="status"
      aria-atomic="true"
      // Start completely off-screen with initial rotation
      initial={{
        x: isRight ? '150%' : '-150%',
        opacity: 0,
        rotate: isRight ? 45 : -45,
      }}
      // Snap to position with randomized offset and rotation
      animate={{
        x: isRight ? -toast.offsetX : toast.offsetX,
        opacity: 1,
        rotate: toast.rotation,
      }}
      // Retract/Fade back into the side
      exit={{
        x: isRight ? '150%' : '-150%',
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.4, ease: "backIn" },
      }}
      // Faster, snappier spring for "jump scare" feel
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      }}
      className={cn(
        "pointer-events-auto relative flex items-center mb-2", // Reduced margin for tighter stack
        isRight ? "flex-row-reverse self-end" : "flex-row self-start"
      )}
      style={{
        scale: toast.scale,
        zIndex: 100, // Ensure new toasts pop on top if desired, or let natural DOM order handle it
      }}
    >
      {/* The Ghost Character */}
      <div
        className={cn(
          "relative z-20 w-24 h-24 filter drop-shadow-2xl",
          isRight ? "-mr-6" : "-ml-6 scale-x-[-1]"
        )}
      >
        <SpookyGhostIcon className="w-full h-full" />
      </div>

      {/* The Message "Card" */}
      <div
        className={cn(
          "relative z-10 p-4 rounded-xl border backdrop-blur-md shadow-2xl max-w-xs",
          toast.type === 'curse'
            ? "bg-[#2a0a0a]/95 border-red-900/50 text-red-100"
            : toast.type === 'success'
            ? "bg-[#0a1f0a]/95 border-green-900/50 text-green-100"
            : "bg-[#0f0a1f]/95 border-purple-900/50 text-purple-100",
          isRight ? "mr-4 rounded-tr-none" : "ml-4 rounded-tl-none"
        )}
      >
        {/* Connection Arrow */}
        <div
          className={cn(
            "absolute top-6 w-3 h-3 rotate-45 border-l border-t",
            toast.type === 'curse'
              ? "bg-[#2a0a0a] border-red-900/50"
              : toast.type === 'success'
              ? "bg-[#0a1f0a] border-green-900/50"
              : "bg-[#0f0a1f] border-purple-900/50",
            isRight
              ? "-right-1.5 border-r border-t-0 border-l-0"
              : "-left-1.5"
          )}
        />

        <div className="flex justify-between items-start gap-3">
          <p className="text-sm font-medium leading-relaxed drop-shadow-md">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-40 hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

GhostToastItem.displayName = "GhostToastItem";

// --- Component: GhostToastContainer ---
const GhostToastContainer = ({
  toasts,
  removeToast,
}: {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}) => {
  return (
    <div 
      className="fixed inset-y-0 left-0 right-0 pointer-events-none flex flex-col justify-end p-6 z-[9999] overflow-hidden"
      aria-live="polite"
      aria-label="Notifications"
    >
      <style>{`
        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
      `}</style>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <GhostToastItem
            key={toast.id}
            toast={toast}
            removeToast={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Provider & Hook ---
export const GhostToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (message: string, type: 'info' | 'curse' | 'success' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);

    // Randomize side (50/50)
    const side: ToastSide = Math.random() > 0.5 ? 'right' : 'left';

    // Randomize scale (0.85 to 1.1) for variety
    const scale = 0.85 + Math.random() * 0.25;

    // Random rotation (-15deg to 15deg) for chaotic stacking
    const rotation = (Math.random() - 0.5) * 30;

    // Random horizontal offset (0px to 60px) to break the grid
    const offsetX = Math.random() * 60;

    setToasts((prev) => [
      ...prev,
      { id, message, type, side, scale, rotation, offsetX },
    ]);

    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <GhostToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

GhostToastProvider.displayName = 'GhostToastProvider';

export const useGhostToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useGhostToast must be used within a GhostToastProvider");
  return context;
};

export { SpookyGhostIcon };
export type { ToastType };
