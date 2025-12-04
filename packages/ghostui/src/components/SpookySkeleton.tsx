'use client';

import React, { Children, isValidElement, ReactNode } from 'react';
import { cn } from '../lib/utils';
import { useThemeOptional, type Theme } from './ThemeProvider';

// Theme color palettes
const themeColors = {
  spectral: {
    primary: '#2e1065',
    secondary: '#1a0b2e', 
    accent: '#22c55e',
    glow: '#00ff7f',
    block: '#1e1e2e',
    flicker: '#4c1d95',
    fog: '#2d2d44',
    border: 'rgba(139, 92, 246, 0.2)',
    bg: '#0f0716',
  },
  blood: {
    primary: '#450a0a',
    secondary: '#1f0a0a',
    accent: '#f97316',
    glow: '#ff6b35',
    block: '#2e1a1a',
    flicker: '#7f1d1d',
    fog: '#3d2424',
    border: 'rgba(239, 68, 68, 0.2)',
    bg: '#150a0a',
  },
} as const;

export type SkeletonVariant = 'sweep' | 'scan' | 'flicker' | 'fog';

export interface SkeletonBlockProps {
  variant: SkeletonVariant;
  className?: string;
  theme?: Theme;
}

export interface SpookySkeletonProps {
  /** Animation variant */
  variant: SkeletonVariant;
  /** Pass the component layout to skeletonize */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// Generate unique ID for style scoping
let styleId = 0;
const getStyleId = () => `spooky-skeleton-${++styleId}`;

// Analyze element and determine skeleton dimensions
function getSkeletonDimensions(element: React.ReactElement): { width: string; height: string; rounded: string } {
  const { className = '', style } = element.props;
  const classStr = String(className);
  
  // Extract width
  let width = 'w-full';
  const widthMatch = classStr.match(/w-(\[[\d\w%]+\]|\d+\/\d+|full|auto|screen|min|max|fit|\d+)/);
  if (widthMatch) width = `w-${widthMatch[1]}`;
  else if (style?.width) width = `w-[${style.width}]`;
  
  // Extract height  
  let height = 'h-4';
  const heightMatch = classStr.match(/h-(\[[\d\w%]+\]|\d+\/\d+|full|auto|screen|min|max|fit|\d+)/);
  if (heightMatch) height = `h-${heightMatch[1]}`;
  else if (style?.height) height = `h-[${style.height}]`;
  
  // Determine rounding based on element type or class
  let rounded = 'rounded-md';
  if (classStr.includes('rounded-full') || element.type === 'img' && classStr.includes('avatar')) {
    rounded = 'rounded-full';
  } else if (classStr.includes('rounded-lg')) {
    rounded = 'rounded-lg';
  } else if (classStr.includes('rounded-xl')) {
    rounded = 'rounded-xl';
  } else if (classStr.includes('rounded-2xl')) {
    rounded = 'rounded-2xl';
  } else if (classStr.includes('rounded-none')) {
    rounded = 'rounded-none';
  }
  
  return { width, height, rounded };
}

// Check if element is a text-like element
function isTextElement(element: React.ReactElement): boolean {
  const textTags = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'a'];
  return typeof element.type === 'string' && textTags.includes(element.type);
}

// Check if element is an image-like element
function isImageElement(element: React.ReactElement): boolean {
  const { className = '' } = element.props;
  const classStr = String(className);
  return (
    element.type === 'img' || 
    classStr.includes('avatar') || 
    classStr.includes('rounded-full') ||
    (classStr.includes('w-') && classStr.includes('h-') && /w-\d+/.test(classStr) && /h-\d+/.test(classStr))
  );
}

// Check if element is a container
function isContainer(element: React.ReactElement): boolean {
  const containerTags = ['div', 'section', 'article', 'main', 'aside', 'header', 'footer', 'nav'];
  return typeof element.type === 'string' && containerTags.includes(element.type);
}

// Recursively convert React tree to skeleton
function skeletonize(
  node: ReactNode,
  variant: SkeletonVariant,
  theme: Theme,
  depth = 0
): ReactNode {
  if (!node) return null;
  
  // Handle arrays
  if (Array.isArray(node)) {
    return node.map((child, i) => skeletonize(child, variant, theme, depth));
  }
  
  // Handle strings/numbers - convert to skeleton block
  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node).trim();
    if (!text) return null;
    // Estimate width based on text length
    const charWidth = Math.min(text.length * 8, 200);
    return (
      <SkeletonBlock 
        variant={variant} 
        theme={theme}
        className={`h-4 w-[${charWidth}px] inline-block`} 
      />
    );
  }
  
  // Handle React elements
  if (isValidElement(node)) {
    const element = node as React.ReactElement;
    const { className = '', children, style } = element.props;
    const classStr = String(className);
    
    // Skip hidden elements
    if (classStr.includes('hidden') || classStr.includes('sr-only')) {
      return null;
    }
    
    // Image/avatar elements -> skeleton block with same dimensions
    if (isImageElement(element)) {
      const dims = getSkeletonDimensions(element);
      return (
        <SkeletonBlock 
          variant={variant}
          theme={theme}
          className={cn(dims.width, dims.height, dims.rounded, 'flex-shrink-0')}
        />
      );
    }
    
    // Text elements -> skeleton line
    if (isTextElement(element)) {
      const dims = getSkeletonDimensions(element);
      // Vary width slightly for natural look
      const widthVariants = ['w-full', 'w-11/12', 'w-5/6', 'w-4/5', 'w-3/4'];
      const randomWidth = dims.width === 'w-full' 
        ? widthVariants[Math.floor(Math.random() * widthVariants.length)]
        : dims.width;
      return (
        <SkeletonBlock 
          variant={variant}
          theme={theme}
          className={cn(randomWidth, dims.height || 'h-4', dims.rounded)}
        />
      );
    }
    
    // Container elements -> preserve structure, skeletonize children
    if (isContainer(element)) {
      const skeletonChildren = Children.map(children, child => 
        skeletonize(child, variant, theme, depth + 1)
      );
      
      // Preserve layout classes
      const layoutClasses = classStr.split(' ').filter(c => 
        c.startsWith('flex') || 
        c.startsWith('grid') || 
        c.startsWith('gap') || 
        c.startsWith('space-') ||
        c.startsWith('p-') || c.startsWith('px-') || c.startsWith('py-') ||
        c.startsWith('m-') || c.startsWith('mx-') || c.startsWith('my-') ||
        c.startsWith('w-') || c.startsWith('h-') ||
        c.startsWith('max-') || c.startsWith('min-') ||
        c.startsWith('rounded') ||
        c.startsWith('items-') || c.startsWith('justify-') ||
        c.startsWith('self-') || c.startsWith('col-') || c.startsWith('row-')
      ).join(' ');
      
      return (
        <div className={layoutClasses}>
          {skeletonChildren}
        </div>
      );
    }
    
    // For other elements, try to skeletonize children
    if (children) {
      return skeletonize(children, variant, theme, depth + 1);
    }
    
    // Fallback: render as skeleton block
    const dims = getSkeletonDimensions(element);
    return (
      <SkeletonBlock 
        variant={variant}
        theme={theme}
        className={cn(dims.width, dims.height, dims.rounded)}
      />
    );
  }
  
  return null;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ variant, className, theme: themeProp }) => {
  const themeContext = useThemeOptional();
  const theme = themeProp ?? themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];
  
  const getVariantClass = () => {
    switch (variant) {
      case 'sweep':
        return 'skeleton-sweep';
      case 'scan':
        return `bg-[${colors.block}] skeleton-scan`;
      case 'flicker':
        return 'skeleton-flicker';
      case 'fog':
        return `bg-[${colors.fog}]`;
      default:
        return 'skeleton-sweep';
    }
  };

  return (
    <div 
      className={cn('relative overflow-hidden rounded-md', getVariantClass(), className)}
      style={{
        backgroundColor: variant === 'scan' ? colors.block : 
                        variant === 'flicker' ? colors.flicker :
                        variant === 'fog' ? colors.fog : undefined
      }}
    >
      {variant === 'fog' && (
        <div className="absolute inset-0 skeleton-fog-overlay" />
      )}
    </div>
  );
};

const SpookySkeletonComponent: React.FC<SpookySkeletonProps> = ({ variant, children, className }) => {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const colors = themeColors[theme];
  const scopeId = React.useMemo(() => getStyleId(), []);

  // Generate skeleton content
  const skeletonContent = children 
    ? skeletonize(children, variant, theme)
    : (
      // Default fallback layout when no children provided
      <>
        <div className="flex items-start gap-4 mb-4">
          <SkeletonBlock variant={variant} theme={theme} className="w-12 h-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock variant={variant} theme={theme} className="h-4 w-3/4" />
            <SkeletonBlock variant={variant} theme={theme} className="h-3 w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <SkeletonBlock variant={variant} theme={theme} className="h-3 w-full" />
          <SkeletonBlock variant={variant} theme={theme} className="h-3 w-5/6" />
          <SkeletonBlock variant={variant} theme={theme} className="h-3 w-4/5" />
        </div>
      </>
    );

  return (
    <>
      <style>{`
        .${scopeId} .skeleton-sweep {
          background: linear-gradient(90deg, ${colors.secondary} 0%, ${colors.primary} 25%, ${colors.accent} 50%, ${colors.primary} 75%, ${colors.secondary} 100%);
          background-size: 200% 100%;
          animation: skeleton-sweep-anim 4.5s ease-in-out infinite;
          box-shadow: 0 0 8px ${colors.accent}40, inset 0 0 4px ${colors.accent}20;
        }

        @keyframes skeleton-sweep-anim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .${scopeId} .skeleton-scan {
          position: relative;
          box-shadow: 0 0 6px ${colors.glow}30, inset 0 0 3px ${colors.glow}15;
        }

        .${scopeId} .skeleton-scan::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: ${colors.glow};
          box-shadow: 0 0 12px ${colors.glow}, 0 0 24px ${colors.glow}, 0 0 36px ${colors.glow}80;
          opacity: 0.7;
          animation: skeleton-scan-anim 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 10;
        }

        @keyframes skeleton-scan-anim {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .${scopeId} .skeleton-flicker {
          animation: skeleton-flicker-anim 4.5s steps(10, start) infinite;
          box-shadow: 0 0 10px ${colors.accent}50, 0 0 20px ${colors.accent}25;
        }

        @keyframes skeleton-flicker-anim {
          0%, 100% { opacity: 0.3; box-shadow: 0 0 6px ${colors.accent}30; }
          5% { opacity: 0.8; box-shadow: 0 0 16px ${colors.accent}70, 0 0 24px ${colors.accent}40; }
          10% { opacity: 0.3; box-shadow: 0 0 6px ${colors.accent}30; }
          15% { opacity: 0.3; box-shadow: 0 0 6px ${colors.accent}30; }
          20% { opacity: 0.7; box-shadow: 0 0 14px ${colors.accent}60, 0 0 20px ${colors.accent}35; }
          40% { opacity: 0.3; box-shadow: 0 0 6px ${colors.accent}30; }
          80% { opacity: 0.5; box-shadow: 0 0 10px ${colors.accent}45; }
        }

        .${scopeId} .skeleton-fog-overlay {
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          filter: blur(20px);
          animation: skeleton-fog-anim 8s ease-in-out infinite alternate;
        }

        @keyframes skeleton-fog-anim {
          0% { transform: translateX(-10%); opacity: 0.3; }
          50% { transform: translateX(10%); opacity: 0.6; }
          100% { transform: translateX(-10%); opacity: 0.3; }
        }

        @media (prefers-reduced-motion: reduce) {
          .${scopeId} .skeleton-sweep,
          .${scopeId} .skeleton-flicker,
          .${scopeId} .skeleton-fog-overlay,
          .${scopeId} .skeleton-scan::after {
            animation: none;
          }
        }
      `}</style>

      <div
        className={cn(
          scopeId,
          'relative p-6 rounded-2xl border shadow-lg',
          className
        )}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          boxShadow: `0 0 20px ${colors.accent}15, 0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px ${colors.accent}08`,
        }}
        role="status"
        aria-label="Loading content"
      >
        {skeletonContent}
      </div>
    </>
  );
};

SpookySkeletonComponent.displayName = 'SpookySkeleton';

export const SpookySkeleton = SpookySkeletonComponent;
