import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare const BatBurst: default_2.FC<BatBurstProps>;

export declare interface BatBurstProps {
    isActive: boolean;
    onComplete?: () => void;
    batCount?: number;
    duration?: number;
}

export declare function BatDivider({ className, color, ...props }: BatDividerProps): JSX_2.Element;

export declare namespace BatDivider {
    var displayName: string;
}

export declare interface BatDividerProps extends default_2.HTMLAttributes<HTMLDivElement> {
    color?: string;
}

export declare const BatToggle: default_2.FC<BatToggleProps>;

export declare interface BatToggleProps extends WithTooltipProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export declare const BloodSmear: default_2.FC<BloodSmearProps>;

export declare interface BloodSmearProps {
    isNavigating: boolean;
    onComplete?: () => void;
    className?: string;
}

export declare const CauldronLoader: default_2.FC<CauldronLoaderProps>;

export declare interface CauldronLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export declare function CoffinCard({ className, children, tooltip, tooltipPosition, tooltipClassName, ...props }: CoffinCardProps): JSX_2.Element;

export declare namespace CoffinCard {
    var displayName: string;
}

export declare interface CoffinCardProps extends default_2.HTMLAttributes<HTMLDivElement>, WithTooltipProps {
    children: default_2.ReactNode;
}

export declare const CrackTransition: default_2.FC<CrackTransitionProps>;

export declare interface CrackTransitionProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

export declare const CursedPointer: default_2.FC<CursedPointerProps>;

export declare interface CursedPointerProps {
    variant?: 'claw' | 'orb' | 'finger';
    color?: string;
}

export declare function FogBackground({ className, intensity }: FogBackgroundProps): JSX_2.Element;

export declare interface FogBackgroundProps {
    className?: string;
    intensity?: 'low' | 'medium' | 'high' | 'block';
}

export declare const GhostCursor: default_2.FC<GhostCursorProps>;

export declare interface GhostCursorProps {
    color?: string;
    size?: number;
    trailLength?: number;
}

export declare const GhostFloatLoader: default_2.FC<GhostFloatLoaderProps>;

export declare interface GhostFloatLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export declare const GhostToast: default_2.FC<GhostToastProps>;

export declare interface GhostToastProps {
    message: string;
    type?: ToastType;
    onClose?: () => void;
    className?: string;
}

export declare const GhostToastProvider: default_2.FC<{
    children: default_2.ReactNode;
}>;

export declare const GlitchText: default_2.FC<GlitchTextProps>;

export declare interface GlitchTextProps extends default_2.HTMLAttributes<HTMLHeadingElement> {
    text: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    intensity?: 'low' | 'medium' | 'high';
    className?: string;
}

export declare const GooeyButton: default_2.ForwardRefExoticComponent<GooeyButtonProps & default_2.RefAttributes<HTMLButtonElement>>;

export declare interface GooeyButtonProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'slime' | 'blood' | 'ectoplasm';
    fluidity?: 'low' | 'medium' | 'high';
    children: default_2.ReactNode;
    className?: string;
}

export declare const GooeyCard: default_2.FC<GooeyCardProps>;

export declare interface GooeyCardProps {
    children: default_2.ReactNode;
    className?: string;
    gooColor?: string;
}

export declare const GraveModal: default_2.FC<GraveModalProps>;

export declare interface GraveModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: default_2.ReactNode;
    children: default_2.ReactNode;
    className?: string;
}

export declare const HauntedSidebar: default_2.FC<HauntedSidebarProps>;

export declare interface HauntedSidebarProps {
    menuItems?: MenuItem[];
    activeId?: string;
    onActiveChange?: (id: string) => void;
    className?: string;
    title?: string;
    subtitle?: string;
}

export declare const HauntedVignette: default_2.FC<HauntedVignetteProps>;

export declare interface HauntedVignetteProps {
    intensity?: 'light' | 'medium' | 'heavy';
    className?: string;
}

export declare interface MenuItem {
    id: string;
    label: string;
    icon?: default_2.ReactNode;
}

export declare function MoonBackdrop({ className, phase }: MoonBackdropProps): JSX_2.Element;

declare interface MoonBackdropProps {
    className?: string;
    phase?: 'full' | 'waning' | 'new' | 'waxing';
}

export declare function MoonlightSwitch({ checked, onChange, disabled, className, variant, tooltip, tooltipPosition, tooltipClassName, }: MoonlightSwitchProps): JSX_2.Element | null;

export declare namespace MoonlightSwitch {
    var displayName: string;
}

export declare interface MoonlightSwitchProps extends WithTooltipProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    variant?: 'spectral-blood' | 'day-night';
}

export declare const ShadowCrawl: default_2.FC<ShadowCrawlProps>;

export declare interface ShadowCrawlProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

export declare const SkeletonBlock: default_2.FC<SkeletonBlockProps>;

export declare interface SkeletonBlockProps {
    variant: 'sweep' | 'scan' | 'flicker' | 'fog';
    className?: string;
}

export declare function SkullLoader({ className, size }: SkullLoaderProps): JSX_2.Element;

declare interface SkullLoaderProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export declare const SpectralTabs: default_2.FC<SpectralTabsProps>;

export declare interface SpectralTabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
}

export declare const SpiderWeb: default_2.FC<SpiderWebProps>;

export declare interface SpiderWebProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
}

export declare const SpiritInput: default_2.ForwardRefExoticComponent<SpiritInputProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface SpiritInputProps extends default_2.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    ghostIcon?: boolean;
}

export declare const SpookyProgressBar: default_2.FC<SpookyProgressBarProps>;

export declare interface SpookyProgressBarProps {
    value: number;
    variant?: 'blood' | 'candle' | 'soul';
    className?: string;
}

export declare const SpookySkeleton: default_2.FC<SpookySkeletonProps>;

export declare interface SpookySkeletonProps {
    variant: 'sweep' | 'scan' | 'flicker' | 'fog';
    className?: string;
}

export declare const SpookyTooltip: default_2.FC<SpookyTooltipProps>;

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

declare interface ToastContextType {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
}

declare type ToastType = 'success' | 'error' | 'warning' | 'info';

export declare const useToast: () => ToastContextType;

export declare const VeilFade: default_2.FC<VeilFadeProps>;

export declare interface VeilFadeProps {
    isVisible: boolean;
    children: default_2.ReactNode;
    duration?: number;
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
