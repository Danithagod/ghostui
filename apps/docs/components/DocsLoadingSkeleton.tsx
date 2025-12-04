'use client';

import { SkeletonBlock } from 'ghostui-react';
import { Ghost } from 'lucide-react';

export interface DocsLoadingSkeletonProps {
  variant?: 'sweep' | 'scan' | 'flicker' | 'fog';
}

export const DocsLoadingSkeleton: React.FC<DocsLoadingSkeletonProps> = ({
  variant = 'sweep'
}) => {
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
          animation: spirit-sweep 4.5s ease-in-out infinite;
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
          animation: ecto-flicker 4.5s steps(10, start) infinite;
          background-color: #4c1d95;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spirit-sweep,
          .animate-ecto-flicker {
            animation: none;
          }
        }
      `}</style>

      <div className="prose prose-invert max-w-none" role="status" aria-label="Loading page content">
        {/* Page Title Skeleton */}
        <SkeletonBlock variant={variant} className="h-12 w-2/3 mb-6 rounded-lg" />
        
        {/* Lead Paragraph Skeleton */}
        <div className="space-y-2 mb-12">
          <SkeletonBlock variant={variant} className="h-5 w-full rounded" />
          <SkeletonBlock variant={variant} className="h-5 w-4/5 rounded" />
        </div>

        {/* Section 1 - Heading + Content */}
        <SkeletonBlock variant={variant} className="h-8 w-1/3 mb-4 mt-12 rounded-lg" />
        <div className="space-y-2 mb-6">
          <SkeletonBlock variant={variant} className="h-4 w-full rounded" />
          <SkeletonBlock variant={variant} className="h-4 w-5/6 rounded" />
        </div>

        {/* Code Block Skeleton */}
        <div className="relative rounded-xl border border-ghost-purple/20 bg-[#0f0716] p-6 mb-8">
          <div className="space-y-2">
            <SkeletonBlock variant={variant} className="h-4 w-3/4 rounded" />
            <SkeletonBlock variant={variant} className="h-4 w-1/2 rounded" />
            <SkeletonBlock variant={variant} className="h-4 w-2/3 rounded" />
          </div>
          <div className="absolute top-3 right-3 opacity-20">
            <Ghost className="w-5 h-5 text-ghost-purple" />
          </div>
        </div>

        {/* Section 2 - Heading + Content */}
        <SkeletonBlock variant={variant} className="h-8 w-2/5 mb-4 mt-12 rounded-lg" />
        <div className="space-y-2 mb-6">
          <SkeletonBlock variant={variant} className="h-4 w-full rounded" />
          <SkeletonBlock variant={variant} className="h-4 w-4/5 rounded" />
          <SkeletonBlock variant={variant} className="h-4 w-3/4 rounded" />
        </div>

        {/* Component Playground Skeleton */}
        <div className="rounded-xl border border-ghost-purple/20 bg-[#0f0716] overflow-hidden mb-8">
          {/* Preview Area */}
          <div className="p-8 border-b border-ghost-purple/20">
            <div className="flex gap-4">
              <SkeletonBlock variant={variant} className="h-10 w-32 rounded-lg" />
              <SkeletonBlock variant={variant} className="h-10 w-32 rounded-lg" />
              <SkeletonBlock variant={variant} className="h-10 w-32 rounded-lg" />
            </div>
          </div>
          {/* Code Area */}
          <div className="p-6 bg-[#0a0510]">
            <div className="space-y-2">
              <SkeletonBlock variant={variant} className="h-4 w-2/3 rounded" />
              <SkeletonBlock variant={variant} className="h-4 w-1/2 rounded" />
            </div>
          </div>
        </div>

        {/* Section 3 - List Items */}
        <SkeletonBlock variant={variant} className="h-8 w-1/4 mb-4 mt-12 rounded-lg" />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SkeletonBlock variant={variant} className="h-2 w-2 rounded-full flex-shrink-0" />
            <SkeletonBlock variant={variant} className="h-4 w-3/4 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonBlock variant={variant} className="h-2 w-2 rounded-full flex-shrink-0" />
            <SkeletonBlock variant={variant} className="h-4 w-2/3 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonBlock variant={variant} className="h-2 w-2 rounded-full flex-shrink-0" />
            <SkeletonBlock variant={variant} className="h-4 w-4/5 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};
