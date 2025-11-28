'use client';

import React from 'react';
import { Ghost } from 'lucide-react';
import { cn } from '../lib/utils';

export interface SpookySkeletonProps {
  variant: 'sweep' | 'scan' | 'flicker' | 'fog';
  className?: string;
}

export interface SkeletonBlockProps {
  variant: 'sweep' | 'scan' | 'flicker' | 'fog';
  className?: string;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ variant, className }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'sweep':
        return 'animate-spirit-sweep';
      case 'scan':
        return 'bg-[#1e1e2e] scanline';
      case 'flicker':
        return 'animate-ecto-flicker';
      case 'fog':
        return 'bg-[#2d2d44]';
      default:
        return 'animate-spirit-sweep';
    }
  };

  return (
    <div className={cn('relative overflow-hidden rounded-md', getVariantClass(), className)}>
      {variant === 'fog' && (
        <div className="absolute inset-0 fog-overlay" />
      )}
    </div>
  );
};

export const SpookySkeleton: React.FC<SpookySkeletonProps> = ({ variant, className }) => {
  return (
    <>
      <style>{`
        @keyframes spirit-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .animate-spirit-sweep {
          background: linear-gradient(90deg, #1a0b2e 0%, #2e1065 25%, #22c55e 50%, #2e1065 75%, #1a0b2e 100%);
          background-size: 200% 100%;
          animation: spirit-sweep 3s linear infinite;
        }

        @keyframes scanline-move {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .scanline::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: #00ff7f;
          box-shadow: 0 0 10px #00ff7f, 0 0 20px #00ff7f;
          opacity: 0.6;
          animation: scanline-move 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 10;
        }

        @keyframes ecto-flicker {
          0%, 100% { opacity: 0.3; }
          5% { opacity: 0.8; }
          10% { opacity: 0.3; }
          15% { opacity: 0.3; }
          20% { opacity: 0.7; }
          40% { opacity: 0.3; }
          80% { opacity: 0.5; }
        }

        .animate-ecto-flicker {
          animation: ecto-flicker 3s steps(10, start) infinite;
          background-color: #4c1d95;
        }

        @keyframes fog-drift {
          0% { transform: translateX(-10%); opacity: 0.2; }
          50% { transform: translateX(10%); opacity: 0.5; }
          100% { transform: translateX(-10%); opacity: 0.2; }
        }

        .fog-overlay {
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          filter: blur(20px);
          animation: fog-drift 6s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spirit-sweep,
          .animate-ecto-flicker,
          .fog-overlay,
          .scanline::after {
            animation: none;
          }
        }
      `}</style>

      <div
        className={cn(
          'relative p-6 rounded-2xl border border-ghost-purple/20 bg-[#0f0716] shadow-lg',
          className
        )}
        role="status"
        aria-label="Loading content"
      >
        {/* Avatar Section */}
        <div className="flex items-start gap-4 mb-4">
          <SkeletonBlock
            variant={variant}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1 space-y-2">
            <SkeletonBlock variant={variant} className="h-4 w-3/4" />
            <SkeletonBlock variant={variant} className="h-3 w-1/2" />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          <SkeletonBlock variant={variant} className="h-3 w-full" />
          <SkeletonBlock variant={variant} className="h-3 w-5/6" />
          <SkeletonBlock variant={variant} className="h-3 w-4/5" />
        </div>

        {/* Decorative Ghost Icon */}
        <div className="absolute top-4 right-4 opacity-20">
          <Ghost className="w-6 h-6 text-ghost-purple" />
        </div>
      </div>
    </>
  );
};
