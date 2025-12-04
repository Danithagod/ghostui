import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare const BatIcon: default_2.FC<BatIconProps>;

export declare interface BatIconProps {
    className?: string;
}

/**
 * BloodSmear - A dramatic full-screen page transition component
 * with a default trigger button
 */
export declare const BloodSmear: default_2.FC<BloodSmearProps>;

export declare interface BloodSmearProps {
    /** Optional variant for the fluid effect */
    variant?: FluidVariant;
    /** Optional custom classes for the trigger button */
    className?: string;
    /** Optional button text */
    buttonText?: string;
}

export declare function CoffinCard({ className, children, title, index, animated, intensity, showGlow, }: CoffinCardProps): JSX_2.Element;

export declare namespace CoffinCard {
    var displayName: string;
}

export declare interface CoffinCardProps {
    children: default_2.ReactNode;
    /** Optional title displayed at the top of the card */
    title?: string;
    /** Animation delay index for staggered animations */
    index?: number;
    /** Enable/disable animations */
    animated?: boolean;
    /** Animation intensity level */
    intensity?: 'subtle' | 'medium' | 'intense';
    /** Show the glow shadow effect on hover */
    showGlow?: boolean;
    /** Additional class names */
    className?: string;
}

/**
 * Color zone configuration
 */
export declare interface ColorZone {
    type: 'vertical' | 'horizontal' | 'radial';
    zones: Array<{
        threshold: number;
        theme: CursorTheme;
    }>;
}

/**
 * Context value interface for cursor effects
 */
export declare interface CursorContextValue {
    state: CursorState;
    registerElement: (id: string, ref: default_2.RefObject<HTMLElement>, options: CursorEffectOptions) => void;
    unregisterElement: (id: string) => void;
    config: Required<CursorEffectConfig>;
}

/**
 * Configuration for the cursor effect system
 */
export declare interface CursorEffectConfig {
    theme?: 'spooky' | 'minimal' | 'intense' | CursorTheme;
    intensity?: number;
    effects?: {
        glow?: boolean;
        distortion?: boolean;
        waves?: boolean;
        attraction?: boolean;
        particles?: boolean;
    };
    disableOnMobile?: boolean;
    proximityRadius?: number;
    maxWaves?: number;
    colorTransitionZones?: 'vertical' | 'horizontal' | 'radial';
}

/**
 * Options for individual elements using cursor effects
 */
export declare interface CursorEffectOptions {
    type?: 'button' | 'card' | 'draggable' | 'link' | 'custom';
    intensity?: number;
    proximityRadius?: number;
    attraction?: 'attract' | 'repel' | 'none';
    attractionStrength?: number;
    distortion?: boolean;
    onProximityEnter?: () => void;
    onProximityExit?: () => void;
    onHover?: () => void;
}

/**
 * CursorEffectProvider component
 *
 * Provides global cursor effect system through React context.
 *
 * Features:
 * - React context for cursor state management
 * - Configuration props for theme, intensity, and enabled effects
 * - Device detection (touch vs mouse)
 * - disableOnMobile logic
 * - Initializes cursor tracking on mount
 * - Element registration system
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 10.1, 10.2, 10.3
 */
export declare function CursorEffectProvider({ config, children }: CursorEffectProviderProps): JSX_2.Element;

/**
 * Props for CursorEffectProvider
 */
export declare interface CursorEffectProviderProps {
    config?: CursorEffectConfig;
    children: default_2.ReactNode;
}

/**
 * Cursor position with timestamp
 */
export declare interface CursorPosition {
    x: number;
    y: number;
    timestamp: number;
}

/**
 * Current state of the cursor
 */
export declare interface CursorState {
    position: {
        x: number;
        y: number;
    };
    velocity: {
        x: number;
        y: number;
        magnitude: number;
    };
    isMoving: boolean;
    isClicking: boolean;
    currentTheme: CursorTheme;
    activeElements: Map<string, RegisteredElement>;
}

/**
 * Color theme configuration for cursor effects
 */
export declare interface CursorTheme {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    glowSize: number;
    glowOpacity: number;
    distortionIntensity: number;
}

/**
 * CursorTracker component that tracks global cursor position and state
 *
 * Features:
 * - Global mousemove listener for position tracking
 * - Velocity calculation from position history
 * - Throttling to limit updates to 60fps (16.67ms)
 * - Tracks cursor state (position, velocity, isMoving, isClicking)
 */
export declare function CursorTracker({ onStateChange, throttleMs }: CursorTrackerProps): null;

/**
 * Props for CursorTracker component
 */
export declare interface CursorTrackerProps {
    onStateChange: (state: CursorTrackerState) => void;
    throttleMs?: number;
}

/**
 * Cursor state that includes position, velocity, and interaction flags
 */
export declare interface CursorTrackerState {
    position: {
        x: number;
        y: number;
    };
    velocity: CursorVelocity;
    isMoving: boolean;
    isClicking: boolean;
}

/**
 * Cursor velocity data
 */
export declare interface CursorVelocity {
    x: number;
    y: number;
    magnitude: number;
}

/**
 * Default cursor effect configuration
 */
export declare const DEFAULT_CURSOR_CONFIG: Required<CursorEffectConfig>;

/**
 * DistortionField effect component
 *
 * Renders visual distortion effects on hovered elements using SVG filters.
 * Features:
 * - SVG filters for distortion, wave, and goo effects
 * - Distortion overlays on hovered elements
 * - Distortion follows cursor with delay
 * - Fade-out animation on exit (300-500ms)
 * - Configurable intensity per element type
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */
export declare function DistortionField({ cursorState, config }: DistortionFieldProps): JSX_2.Element | null;

/**
 * Props for DistortionField component
 */
export declare interface DistortionFieldProps {
    cursorState: CursorState;
    config: Required<CursorEffectConfig>;
}

/**
 * EffectRenderer component
 *
 * Renders all cursor effects in a React portal to document.body.
 *
 * Features:
 * - Renders all effects in React portal to document.body
 * - Conditionally renders based on enabled effects configuration
 * - Applies high z-index for proper layering
 * - Sets pointer-events: none to prevent interaction blocking
 * - Composes GlowAura, DistortionField, WaveGenerator
 * - Applies attraction transforms to registered elements
 * - Type-specific attraction strength (intensified for buttons)
 *
 * Requirements: 7.5, 6.1, 6.2
 */
export declare function EffectRenderer({ cursorState, config }: EffectRendererProps): default_2.ReactPortal | null;

/**
 * Props for EffectRenderer component
 */
export declare interface EffectRendererProps {
    cursorState: CursorState;
    config: Required<CursorEffectConfig>;
}

declare type FluidVariant = 'blood' | 'goo' | 'ectoplasm';

export declare const GhostCursor: {
    (): JSX_2.Element;
    displayName: string;
};

export declare const GhostToastProvider: {
    ({ children, }: {
        children: default_2.ReactNode;
    }): JSX_2.Element;
    displayName: string;
};

/**
 * GlowAura effect component
 *
 * Renders a circular glow element that follows the cursor with smooth spring physics.
 * Features:
 * - Follows cursor position with spring animation
 * - Uses current theme colors based on vertical position
 * - Pulsing animation when cursor is stationary
 * - Trailing effect for high velocity movement
 * - Ethereal appearance using mix-blend-mode: screen
 * - Intensified glow for button elements
 * - Subtle glow for card elements
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.3
 */
export declare function GlowAura({ cursorState, config }: GlowAuraProps): JSX_2.Element;

/**
 * Props for GlowAura component
 */
export declare interface GlowAuraProps {
    cursorState: CursorState;
    config: Required<CursorEffectConfig>;
}

export declare const GooeyButton: default_2.ForwardRefExoticComponent<GooeyButtonProps & default_2.RefAttributes<HTMLButtonElement>>;

export declare interface GooeyButtonProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'slime' | 'blood' | 'ectoplasm';
    fluidity?: 'low' | 'medium' | 'high';
    children: default_2.ReactNode;
    className?: string;
}

export declare const GooeyCard: default_2.ForwardRefExoticComponent<GooeyCardProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface GooeyCardProps {
    children: default_2.ReactNode;
    className?: string;
    gooColor?: string;
    /** Theme variant - defaults to ThemeProvider context or 'spectral' */
    variant?: Theme;
}

/**
 * GooeyDrawer - An animated overlay component with liquid dripping effects
 *
 * Features:
 * - Slides in from any screen edge (top, right, bottom, left)
 * - Animated liquid drips with SVG filter effects
 * - Specular lighting for 3D appearance
 * - Backdrop with click-to-close
 * - Keyboard support (Escape to close)
 * - Scrollable content area
 */
export declare const GooeyDrawer: default_2.FC<GooeyDrawerProps>;

/**
 * Props for the GooeyDrawer component
 */
export declare interface GooeyDrawerProps {
    /** Controls drawer visibility */
    isOpen: boolean;
    /** Callback invoked when drawer should close */
    onClose: () => void;
    /** Screen edge placement */
    placement?: Placement;
    /** Content to render inside drawer */
    children: default_2.ReactNode;
    /** Additional CSS classes for customization */
    className?: string;
}

export declare const GooeyProgressBar: default_2.ForwardRefExoticComponent<GooeyProgressBarProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface GooeyProgressBarProps {
    value: number;
    variant?: 'blood' | 'candle' | 'soul';
    className?: string;
}

export declare const GooeySidebar: default_2.ForwardRefExoticComponent<GooeySidebarProps & default_2.RefAttributes<HTMLDivElement>>;

export declare const GooeySidebarDemo: default_2.FC<GooeySidebarDemoProps>;

export declare interface GooeySidebarDemoProps {
    /** Initial active menu item ID @default 'home' */
    initialActiveId?: string;
    /** Additional CSS classes for the container */
    className?: string;
}

export declare interface GooeySidebarProps {
    menuItems: MenuItem[];
    activeId?: string;
    onActiveChange?: (id: string) => void;
    className?: string;
}

export declare const GraveModal: default_2.ForwardRefExoticComponent<GraveModalProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface GraveModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: default_2.ReactNode;
    children: default_2.ReactNode;
    className?: string;
}

/**
 * Grid cell data
 */
export declare interface GridCell {
    x: number;
    y: number;
    elements: Set<string>;
}

export declare const HauntedCard: default_2.FC<HauntedCardProps>;

export declare interface HauntedCardProps {
    /** Content to wrap with the ghost effect */
    children: default_2.ReactNode;
    /** Additional CSS classes for the wrapper */
    className?: string;
    /** Delay before ghost appears (ms) @default 250 */
    peekDelay?: number;
    /** Whether ghost effect is enabled @default true */
    ghostEnabled?: boolean;
    /** Size of the ghost in pixels @default 112 */
    ghostSize?: number;
    /** Whether to show the "BOO!" text @default true */
    showBoo?: boolean;
    /** Custom content wrapper classes (for the solid background layer) */
    contentClassName?: string;
}

export declare const HauntedVignette: default_2.FC<HauntedVignetteProps>;

export declare const HauntedVignetteDemo: default_2.FC<HauntedVignetteDemoProps>;

export declare interface HauntedVignetteDemoProps {
    /** Initial flashlight state @default true */
    initialFlashlightOn?: boolean;
    /** Show toggle button @default true */
    showToggle?: boolean;
    /** Additional CSS classes for the container */
    className?: string;
}

export declare interface HauntedVignetteProps {
    /** Size of the flashlight circle in pixels @default 350 */
    radius?: number;
    /** Darkness of the overlay (0-1) @default 0.9 */
    darkness?: number;
    /** Backdrop blur amount in pixels @default 2 */
    blur?: number;
    /** Whether the vignette is enabled @default true */
    enabled?: boolean;
    /** Spring damping for cursor following @default 25 */
    springDamping?: number;
    /** Spring stiffness for cursor following @default 150 */
    springStiffness?: number;
    /** Additional CSS classes */
    className?: string;
}

export declare interface MenuItem {
    id: string;
    label: string;
    icon?: default_2.ReactNode;
}

export declare function MoonlightSwitch({ checked: checkedProp, onChange: onChangeProp, disabled, className, variant, tooltip, tooltipPosition, tooltipClassName, }: MoonlightSwitchProps): JSX_2.Element | null;

export declare namespace MoonlightSwitch {
    var displayName: string;
}

export declare interface MoonlightSwitchProps extends WithTooltipProps {
    /** Controlled checked state - if omitted, uses ThemeProvider context */
    checked?: boolean;
    /** Change handler - if omitted, uses ThemeProvider context */
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    variant?: 'spectral-blood' | 'day-night';
}

/**
 * ParticleSystem effect component
 *
 * Generates particle trails for link elements when hovered.
 * Features:
 * - Generates particles along cursor trail
 * - Particles fade out over time
 * - Particles move with initial velocity
 * - Uses current theme color
 *
 * Requirements: 6.4
 */
export declare function ParticleSystem({ cursorState, config }: ParticleSystemProps): JSX_2.Element;

/**
 * Props for ParticleSystem component
 */
export declare interface ParticleSystemProps {
    cursorState: CursorState;
    config: Required<CursorEffectConfig>;
}

/**
 * Placement options for the drawer
 */
declare type Placement = 'right' | 'left' | 'bottom' | 'top';

/**
 * Preset theme constants
 */
export declare const PRESET_THEMES: Record<'spooky' | 'minimal' | 'intense', CursorTheme>;

/**
 * Registered element that responds to cursor effects
 */
export declare interface RegisteredElement {
    id: string;
    ref: default_2.RefObject<HTMLElement>;
    options: CursorEffectOptions;
    bounds: DOMRect;
    distance: number;
    isInProximity: boolean;
    isHovered: boolean;
}

export declare const ShadowCrawl: default_2.FC<ShadowCrawlProps>;

export declare interface ShadowCrawlProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

export declare const SkeletonBlock: default_2.FC<SkeletonBlockProps>;

export declare interface SkeletonBlockProps {
    variant: SkeletonVariant;
    className?: string;
    theme?: Theme;
}

export declare type SkeletonVariant = 'sweep' | 'scan' | 'flicker' | 'fog';

/**
 * Spatial grid for performance optimization
 */
export declare interface SpatialGrid {
    cellSize: number;
    cells: Map<string, Set<string>>;
}

export declare const SpectralRiver: default_2.FC<SpectralRiverProps>;

export declare interface SpectralRiverProps {
    /** Controls whether the transition is active */
    isActive: boolean;
    /** Callback invoked when the transition animation completes */
    onComplete?: () => void;
}

export declare const SpectralTabs: default_2.ForwardRefExoticComponent<SpectralTabsProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface SpectralTabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    /** Theme variant - defaults to ThemeProvider context or 'spectral' */
    variant?: Theme;
}

export declare const SpiritInput: default_2.ForwardRefExoticComponent<SpiritInputProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface SpiritInputProps extends default_2.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    ghostIcon?: boolean;
}

export declare const SpookyGhostIcon: ({ className }: {
    className?: string;
}) => JSX_2.Element;

export declare const SpookyScrollbar: default_2.ForwardRefExoticComponent<SpookyScrollbarProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface SpookyScrollbarProps {
    children: default_2.ReactNode;
    className?: string;
}

export declare const SpookySkeleton: default_2.FC<SpookySkeletonProps>;

export declare interface SpookySkeletonProps {
    /** Animation variant */
    variant: SkeletonVariant;
    /** Pass the component layout to skeletonize */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export declare const SpookyTooltip: default_2.ForwardRefExoticComponent<SpookyTooltipProps & default_2.RefAttributes<HTMLDivElement>>;

export declare interface SpookyTooltipProps {
    content: default_2.ReactNode;
    children: default_2.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export declare interface TabItem extends WithTooltipProps {
    id: string;
    label: string;
    content: default_2.ReactNode;
    icon?: default_2.ReactNode;
}

export declare type Theme = 'spectral' | 'blood';

export declare interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export declare function ThemeProvider({ children, defaultTheme, storageKey }: ThemeProviderProps): JSX.Element;

export declare namespace ThemeProvider {
    var displayName: string;
}

export declare interface ThemeProviderProps {
    children: default_2.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

declare type ToastContextType = {
    addToast: (msg: string, type?: 'info' | 'curse' | 'success') => void;
};

declare type ToastSide = 'left' | 'right';

export declare type ToastType = {
    id: string;
    message: string;
    type: 'info' | 'curse' | 'success';
    side: ToastSide;
    scale: number;
    rotation: number;
    offsetX: number;
};

/**
 * Hook to access cursor effect context
 */
export declare function useCursorContext(): CursorContextValue;

/**
 * Hook for components to opt-in to cursor effects
 *
 * This hook provides a ref that components can attach to their DOM elements
 * to register for cursor interactions. The element is automatically registered
 * when the ref is attached and unregistered when the component unmounts.
 *
 * Features:
 * - Returns ref object for DOM attachment
 * - Accepts configuration options for effect type, intensity, and proximity radius
 * - Automatic registration when ref is attached
 * - Automatic cleanup on component unmount
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4
 *
 * @param options - Configuration options for cursor effects
 * @returns React ref object to attach to DOM element
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const ref = useCursorEffect({
 *     type: 'button',
 *     intensity: 0.8,
 *     attraction: 'attract'
 *   });
 *
 *   return <button ref={ref}>Click me</button>;
 * }
 * ```
 */
export declare function useCursorEffect<T extends HTMLElement = HTMLElement>(options?: CursorEffectOptions): React.RefObject<T>;

export declare const useGhostToast: () => ToastContextType;

export declare function useTheme(): ThemeContextValue;

export declare function useThemeOptional(): ThemeContextValue | undefined;

/**
 * Wave effect data model
 */
export declare interface Wave {
    id: string;
    origin: {
        x: number;
        y: number;
    };
    radius: number;
    maxRadius: number;
    opacity: number;
    timestamp: number;
    color: string;
}

/**
 * Wave configuration
 */
export declare interface WaveConfig {
    speed: number;
    maxRadius: number;
    opacity: number;
    color: string;
    affectsElements: boolean;
}

/**
 * WaveGenerator component
 *
 * Generates and animates wave effects that emanate from cursor position.
 *
 * Features:
 * - Generates waves on click events
 * - Implements wave expansion animation using RAF
 * - Automatic wave cleanup when faded or max radius reached
 * - Limits simultaneous waves to configured maximum (default 5)
 * - Renders wave rings with current theme color
 *
 * Requirements: 5.1, 5.2, 5.4, 11.5
 */
export declare const WaveGenerator: default_2.FC<WaveGeneratorProps>;

/**
 * Props for WaveGenerator component
 */
export declare interface WaveGeneratorProps {
    cursorState: CursorState;
    config: Required<CursorEffectConfig>;
}

export declare const WhisperBox: default_2.ForwardRefExoticComponent<WhisperBoxProps & default_2.RefAttributes<HTMLTextAreaElement>>;

export declare interface WhisperBoxProps extends default_2.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    className?: string;
}

export declare const WispTrail: default_2.FC<WispTrailProps>;

export declare interface WispTrailProps {
    color?: string;
    particleCount?: number;
}

/**
 * Shared interface for components that support tooltip functionality.
 * This interface can be extended by any component to add tooltip support.
 */
export declare interface WithTooltipProps {
    /** Content to display in the tooltip */
    tooltip?: React.ReactNode;
    /** Position of the tooltip relative to the component */
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    /** Additional CSS classes for the tooltip */
    tooltipClassName?: string;
}

export { }
