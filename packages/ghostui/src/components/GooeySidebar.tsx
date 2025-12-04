'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useThemeOptional, type Theme } from './ThemeProvider';
import { cn } from '../lib/utils';

// --- TypeScript Interfaces ---
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface GooeySidebarProps {
  menuItems: MenuItem[];
  activeId?: string;
  onActiveChange?: (id: string) => void;
  className?: string;
}

// --- Constants ---
const ITEM_HEIGHT = 48; // h-12 = 48px
const ITEM_GAP = 4; // gap-1 = 4px
const ITEM_SPACING = ITEM_HEIGHT + ITEM_GAP; // 52px total

// --- Theme Color Configuration ---
const themeColors = {
  spectral: {
    bgGradient: 'from-purple-950/90 via-purple-900/80 to-purple-950/90',
    border: 'border-purple-500/20',
    blobBg: 'bg-orange-500/80',
    blobColor: '#f97316',
    activeText: 'text-white',
    inactiveText: 'text-purple-300/60',
    hoverText: 'text-purple-200',
    hoverDot: 'bg-orange-400',
    specularColor: '#fed7aa',
  },
  blood: {
    bgGradient: 'from-red-950/90 via-red-900/80 to-red-950/90',
    border: 'border-red-500/20',
    blobBg: 'bg-red-500/80',
    blobColor: '#ef4444',
    activeText: 'text-white',
    inactiveText: 'text-red-300/60',
    hoverText: 'text-red-200',
    hoverDot: 'bg-red-400',
    specularColor: '#fecaca',
  },
} as const;

// --- GooFilter Component ---
interface GooFilterProps {
  theme: Theme;
}

const GooFilter: React.FC<GooFilterProps> = ({ theme }) => {
  const colors = themeColors[theme];
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id={`sidebar-goo-3d-${theme}`} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="3" result="smoothGoo" />
          <feSpecularLighting in="smoothGoo" surfaceScale="6" specularConstant="1.4" specularExponent="25" lightingColor={colors.specularColor} result="specular">
            <fePointLight x="-100" y="-200" z="350" />
          </feSpecularLighting>
          <feComposite in="specular" in2="goo" operator="in" result="specularClean" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" result="solidGoo" />
          <feComposite in="specularClean" in2="solidGoo" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

// --- Theme Colors Type ---
type ThemeColors = (typeof themeColors)[keyof typeof themeColors];

// --- Teardrop Goo Blob Component ---
interface TeardropBlobProps {
  activeIndex: number;
  previousIndex: number;
  isAnimating: boolean;
  colors: ThemeColors;
}

const TeardropBlob: React.FC<TeardropBlobProps> = ({
  activeIndex,
  previousIndex,
  isAnimating,
  colors,
}) => {
  const targetY = activeIndex * ITEM_SPACING;
  const prevY = previousIndex * ITEM_SPACING;
  const direction = activeIndex > previousIndex ? 1 : -1; // 1 = down, -1 = up
  const distance = Math.abs(activeIndex - previousIndex);

  // Spring configs - head moves fast, tail drags behind
  const headSpring = { stiffness: 300, damping: 30, mass: 0.8 };
  const tailSpring = { stiffness: 120, damping: 25, mass: 2.5 };

  // Head position (leads the movement - arrives first)
  const headY = useSpring(targetY, headSpring);
  // Tail position (drags behind - creates the stretch)
  const tailY = useSpring(targetY, tailSpring);

  // Update springs when target changes
  useEffect(() => {
    headY.set(targetY);
    tailY.set(targetY);
  }, [targetY, headY, tailY]);

  // Calculate the top and bottom of the teardrop based on head/tail positions
  // When moving DOWN: head is at bottom, tail drags from top
  // When moving UP: head is at top, tail drags from bottom
  const blobTop = useTransform([headY, tailY], ([h, t]: number[]) => {
    return Math.min(h, t);
  });

  const blobHeight = useTransform([headY, tailY], ([h, t]: number[]) => {
    const diff = Math.abs(h - t);
    // Minimum height is ITEM_HEIGHT, stretches during animation
    return Math.max(ITEM_HEIGHT, diff + ITEM_HEIGHT);
  });

  // Border radius morphing for teardrop shape
  // When stretched: rounded on leading edge, pinched on trailing edge
  const topRadius = useTransform([headY, tailY], ([h, t]: number[]) => {
    const diff = Math.abs(h - t);
    const stretch = Math.min(diff / ITEM_SPACING, 1);
    // If moving down (tail is above head), pinch the top
    if (t < h) {
      return `${Math.max(4, 16 - stretch * 12)}px`;
    }
    return '16px';
  });

  const bottomRadius = useTransform([headY, tailY], ([h, t]: number[]) => {
    const diff = Math.abs(h - t);
    const stretch = Math.min(diff / ITEM_SPACING, 1);
    // If moving up (tail is below head), pinch the bottom
    if (t > h) {
      return `${Math.max(4, 16 - stretch * 12)}px`;
    }
    return '16px';
  });

  // Width pinching - narrower at the trailing end during stretch
  const topWidth = useTransform([headY, tailY], ([h, t]: number[]) => {
    const diff = Math.abs(h - t);
    const stretch = Math.min(diff / ITEM_SPACING, 1);
    // If moving down, pinch width at top (tail end)
    if (t < h) {
      return `${100 - stretch * 40}%`;
    }
    return '100%';
  });

  const bottomWidth = useTransform([headY, tailY], ([h, t]: number[]) => {
    const diff = Math.abs(h - t);
    const stretch = Math.min(diff / ITEM_SPACING, 1);
    // If moving up, pinch width at bottom (tail end)
    if (t > h) {
      return `${100 - stretch * 40}%`;
    }
    return '100%';
  });

  // Combine border radius into a single value
  const borderRadius = useTransform(
    [topRadius, bottomRadius],
    ([top, bottom]: string[]) => `${top} ${top} ${bottom} ${bottom}`
  );

  // Create clip-path for teardrop shape
  const clipPath = useTransform(
    [topWidth, bottomWidth],
    ([tw, bw]: string[]) => {
      const topInset = (100 - parseFloat(tw)) / 2;
      const bottomInset = (100 - parseFloat(bw)) / 2;
      return `polygon(${topInset}% 0%, ${100 - topInset}% 0%, ${100 - bottomInset}% 100%, ${bottomInset}% 100%)`;
    }
  );

  // Secondary blob for extra goo effect - trails even more
  const secondaryY = useSpring(targetY, { stiffness: 80, damping: 20, mass: 3.5 });
  
  useEffect(() => {
    secondaryY.set(targetY);
  }, [targetY, secondaryY]);

  // Secondary blob scale - shrinks as it catches up
  const secondaryScale = useTransform([headY, secondaryY], ([h, s]: number[]) => {
    const diff = Math.abs(h - s);
    const stretch = Math.min(diff / (ITEM_SPACING * 2), 1);
    return 0.3 + stretch * 0.7;
  });

  const secondaryOpacity = useTransform([headY, secondaryY], ([h, s]: number[]) => {
    const diff = Math.abs(h - s);
    return Math.min(diff / 20, 0.8);
  });

  return (
    <>
      {/* Main teardrop blob */}
      <motion.div
        className={cn('absolute left-0 w-full', colors.blobBg)}
        style={{
          y: blobTop,
          height: blobHeight,
          borderRadius,
          clipPath,
        }}
      />

      {/* Secondary trailing droplet for extra goo effect */}
      <motion.div
        className={cn('absolute left-1/4 w-1/2 h-8 rounded-full', colors.blobBg)}
        style={{
          y: secondaryY,
          scale: secondaryScale,
          opacity: secondaryOpacity,
        }}
      />

      {/* Tertiary micro-droplet for long transitions */}
      <motion.div
        className={cn('absolute left-1/3 w-1/3 h-6 rounded-full', colors.blobBg)}
        style={{
          y: useTransform(secondaryY, (v) => v + (direction > 0 ? -20 : 20)),
          scale: useTransform(secondaryScale, (s) => s * 0.6),
          opacity: useTransform(secondaryOpacity, (o) => (distance > 2 ? o * 0.8 : 0)),
        }}
      />
    </>
  );
};

// --- GooeySidebar Component ---
export const GooeySidebar = React.forwardRef<HTMLDivElement, GooeySidebarProps>(
  ({ menuItems, activeId: controlledActiveId, onActiveChange, className }, ref) => {
    const themeContext = useThemeOptional();
    const theme: Theme = themeContext?.theme ?? 'spectral';
    const colors = themeColors[theme];

    // Internal state for uncontrolled mode
    const [internalActiveId, setInternalActiveId] = useState<string>(
      menuItems[0]?.id || ''
    );
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    
    // Track previous index for direction-aware animation
    const [previousIndex, setPreviousIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const activeId = controlledActiveId ?? internalActiveId;
    const activeIndex = menuItems.findIndex((item) => item.id === activeId);

    // Update previous index when active changes
    useEffect(() => {
      if (activeIndex !== previousIndex) {
        setIsAnimating(true);
        
        // Clear any existing timeout
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
        
        // Set animation end after transition completes
        animationTimeoutRef.current = setTimeout(() => {
          setPreviousIndex(activeIndex);
          setIsAnimating(false);
        }, 600); // Match the slowest spring duration
      }
      
      return () => {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    }, [activeIndex, previousIndex]);

    const handleItemClick = (id: string, index: number) => {
      setPreviousIndex(activeIndex);
      setInternalActiveId(id);
      onActiveChange?.(id);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-72 h-[650px] bg-gradient-to-b overflow-hidden rounded-2xl shadow-2xl border",
          colors.bgGradient,
          colors.border,
          className
        )}
      >
        <GooFilter theme={theme} />

        <nav className="relative flex flex-col gap-1 p-6 pt-8">
          {/* Goo Layer with teardrop animation */}
          <div
            className="absolute left-6 top-8 right-6 bottom-6 pointer-events-none"
            style={{ filter: `url(#sidebar-goo-3d-${theme})` }}
          >
            <TeardropBlob
              activeIndex={activeIndex >= 0 ? activeIndex : 0}
              previousIndex={previousIndex}
              isAnimating={isAnimating}
              colors={colors}
            />
          </div>

          {/* Interactive Buttons */}
          {menuItems.map((item, index) => {
            const isActive = activeId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, index)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  'relative w-full h-12 flex items-center gap-4 px-4 text-sm transition-all duration-300 rounded-lg outline-none group z-10',
                  isActive
                    ? `${colors.activeText} font-medium`
                    : `${colors.inactiveText} hover:${colors.hoverText} font-normal`
                )}
              >
                {item.icon && (
                  <motion.div
                    animate={
                      isActive
                        ? { scale: 1.1, x: 4 }
                        : isHovered
                        ? { x: 2 }
                        : { x: 0, scale: 1 }
                    }
                    className={cn(
                      'relative z-20 transition-colors',
                      isActive
                        ? `${colors.activeText} drop-shadow-md`
                        : `group-hover:${colors.hoverText}`
                    )}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <span className="relative z-20 tracking-wide">{item.label}</span>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn("absolute right-4 w-1.5 h-1.5 rounded-full", colors.hoverDot)}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }
);

GooeySidebar.displayName = 'GooeySidebar';


// --- GooeySidebarDemo Props ---
export interface GooeySidebarDemoProps {
  /** Initial active menu item ID @default 'home' */
  initialActiveId?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

// --- Default Menu Items for Demo ---
const defaultMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Team' },
  { id: 'messages', label: 'Messages' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
];

// --- Demo Content Configuration ---
const demoContent: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Welcome Home',
    description: 'Your haunted dashboard awaits. Navigate through the shadows to explore different sections.',
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Overview of your spectral activities. Monitor ghost sightings and paranormal metrics.',
  },
  projects: {
    title: 'Projects',
    description: 'Manage your supernatural projects. Track progress on hauntings and ethereal endeavors.',
  },
  team: {
    title: 'Team',
    description: 'Your ghostly crew. Collaborate with fellow spirits on otherworldly tasks.',
  },
  messages: {
    title: 'Messages',
    description: 'Whispers from beyond. Check your spectral inbox for communications from the other side.',
  },
  analytics: {
    title: 'Analytics',
    description: 'Paranormal statistics. Analyze haunting patterns and supernatural trends.',
  },
  settings: {
    title: 'Settings',
    description: 'Configure your haunted experience. Adjust preferences for optimal spookiness.',
  },
};

// --- GooeySidebarDemo Component ---
export const GooeySidebarDemo: React.FC<GooeySidebarDemoProps> = ({
  initialActiveId = 'home',
  className,
}) => {
  const [activeId, setActiveId] = useState(initialActiveId);
  const themeContext = useThemeOptional();
  const theme: Theme = themeContext?.theme ?? 'spectral';

  const content = demoContent[activeId] || demoContent.home;

  const contentColors = theme === 'blood' 
    ? {
        bg: 'bg-red-950/30',
        border: 'border-red-800/50',
        title: 'text-red-100',
        description: 'text-red-300/80',
        accent: 'text-red-400',
      }
    : {
        bg: 'bg-purple-950/30',
        border: 'border-purple-800/50',
        title: 'text-purple-100',
        description: 'text-purple-300/80',
        accent: 'text-orange-400',
      };

  return (
    <div className={cn('flex gap-6 w-full min-h-[700px]', className)}>
      <GooeySidebar
        menuItems={defaultMenuItems}
        activeId={activeId}
        onActiveChange={setActiveId}
      />

      <div
        className={cn(
          'flex-1 rounded-2xl p-8 border transition-colors duration-300',
          contentColors.bg,
          contentColors.border
        )}
      >
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col"
        >
          <h2 className={cn('text-3xl font-bold mb-4', contentColors.title)}>
            {content.title}
          </h2>
          <p className={cn('text-lg leading-relaxed', contentColors.description)}>
            {content.description}
          </p>

          <div className="mt-8 flex-1 flex items-center justify-center">
            <div
              className={cn(
                'text-center p-8 rounded-xl border border-dashed',
                contentColors.border
              )}
            >
              <p className={cn('text-sm', contentColors.accent)}>
                Active Section: <span className="font-mono font-bold">{activeId}</span>
              </p>
              <p className={cn('text-xs mt-2', contentColors.description)}>
                Theme: <span className="font-mono">{theme}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

GooeySidebarDemo.displayName = 'GooeySidebarDemo';
