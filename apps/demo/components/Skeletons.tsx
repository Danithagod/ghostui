'use client';

import { useThemeOptional } from 'ghostui-react';

// Theme colors matching the SpookySkeleton component
const themeColors = {
  spectral: {
    primary: '#2e1065',
    secondary: '#1a0b2e',
    accent: '#22c55e',
    border: 'rgba(139, 92, 246, 0.2)',
    bg: '#0f0716',
  },
  blood: {
    primary: '#450a0a',
    secondary: '#1f0a0a',
    accent: '#f97316',
    border: 'rgba(239, 68, 68, 0.2)',
    bg: '#150a0a',
  },
} as const;

// Reusable skeleton block with sweep animation
function SkeletonBlock({ className }: { className?: string }) {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];

  return (
    <div
      className={`relative overflow-hidden rounded-md ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.secondary} 0%, ${colors.primary} 25%, ${colors.accent} 50%, ${colors.primary} 75%, ${colors.secondary} 100%)`,
        backgroundSize: '200% 100%',
        animation: 'skeleton-sweep 4.5s ease-in-out infinite',
      }}
    />
  );
}

// Skeleton wrapper with consistent styling
function SkeletonWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];

  return (
    <>
      <style>{`
        @keyframes skeleton-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div
        className={`relative rounded-2xl border shadow-lg ${className}`}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        {children}
      </div>
    </>
  );
}

// Sidebar skeleton - matches GooeySidebar layout
export function SidebarSkeleton() {
  return (
    <SkeletonWrapper className="w-80 h-[80vh] p-6">
      <div className="space-y-2">
        <SkeletonBlock className="h-12 w-full rounded-lg" />
        <SkeletonBlock className="h-12 w-full rounded-lg" />
        <SkeletonBlock className="h-12 w-full rounded-lg" />
        <SkeletonBlock className="h-12 w-full rounded-lg" />
        <SkeletonBlock className="h-12 w-full rounded-lg" />
        <SkeletonBlock className="h-12 w-full rounded-lg" />
      </div>
    </SkeletonWrapper>
  );
}

// Header skeleton - matches Header layout with horizontal lines only
export function HeaderSkeleton() {
  return (
    <SkeletonWrapper className="w-full h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-5 w-40 rounded" />
      </div>
      <SkeletonBlock className="h-8 w-32 rounded-lg" />
      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-6 w-16 rounded" />
        <SkeletonBlock className="h-6 w-10 rounded" />
      </div>
    </SkeletonWrapper>
  );
}

// Single product card skeleton - matches ProductCard layout
export function ProductCardSkeleton() {
  return (
    <SkeletonWrapper className="p-4 pb-8 mb-8">
      <SkeletonBlock className="h-32 w-full rounded-lg mb-3" />
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-3/4 rounded" />
        <SkeletonBlock className="h-3 w-full rounded" />
        <div className="flex justify-between items-center pt-2">
          <SkeletonBlock className="h-5 w-16 rounded" />
          <SkeletonBlock className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </SkeletonWrapper>
  );
}

// Content area skeleton with product grid
export function ContentSkeleton() {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const borderColor = theme === 'blood' ? 'border-red-500/20' : 'border-purple-500/20';

  return (
    <div
      className={`flex-1 overflow-hidden rounded-2xl bg-[var(--ghost-bg-primary)] border shadow-2xl ${borderColor}`}
    >
      <div className="p-8">
        {/* Title skeleton */}
        <SkeletonBlock className="h-8 w-48 rounded mb-8" />

        {/* Category buttons skeleton */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <SkeletonBlock className="h-10 w-24 rounded-full" />
          <SkeletonBlock className="h-10 w-20 rounded-full" />
          <SkeletonBlock className="h-10 w-20 rounded-full" />
          <SkeletonBlock className="h-10 w-28 rounded-full" />
          <SkeletonBlock className="h-10 w-20 rounded-full" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
}
