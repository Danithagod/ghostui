// Export components and their prop types
export { GooeyButton, type GooeyButtonProps } from './GooeyButton';
export { GooeyCard, type GooeyCardProps } from './GooeyCard';
export { MoonlightSwitch, type MoonlightSwitchProps } from './MoonlightSwitch';
export { 
    ThemeProvider, 
    useTheme, 
    useThemeOptional, 
    type Theme, 
    type ThemeContextValue, 
    type ThemeProviderProps 
} from './ThemeProvider';
export { CoffinCard, type CoffinCardProps } from './CoffinCard';
export { SpiritInput, type SpiritInputProps } from './SpiritInput';
export { BatIcon, type BatIconProps } from './BatIcon';
export { JumpscareBat } from './JumpscareBat';
export { AnimatedBat, type AnimatedBatProps } from './AnimatedBat';
export * from './GraveModal';
export * from './SpookyTooltip';
export { 
    HauntedVignette, 
    HauntedCard, 
    HauntedVignetteDemo,
    type HauntedVignetteProps, 
    type HauntedCardProps,
    type HauntedVignetteDemoProps 
} from './HauntedVignette';
export { 
    GooeySidebar, 
    GooeySidebarDemo,
    type GooeySidebarProps, 
    type GooeySidebarDemoProps,
    type MenuItem 
} from './GooeySidebar';
export * from './GhostToast';
export { SpectralTabs, type SpectralTabsProps, type TabItem } from './SpectralTabs';
export { WhisperBox, type WhisperBoxProps } from './WhisperBox';
export { GooeyProgressBar, type GooeyProgressBarProps } from './GooeyProgressBar';
export { SpookySkeleton, SkeletonBlock, type SpookySkeletonProps, type SkeletonBlockProps, type SkeletonVariant } from './SpookySkeleton';
export { SpookyScrollbar, type SpookyScrollbarProps } from './SpookyScrollbar';

// Cursor Effects
export * from './GhostCursor';
export * from './WispTrail';

// Global Cursor Effect System
export { CursorEffectProvider, useCursorContext } from './CursorEffect/CursorContext';
export type { CursorContextValue, CursorEffectProviderProps } from './CursorEffect/CursorContext';
export { useCursorEffect } from './CursorEffect/useCursorEffect';
export { CursorTracker } from './CursorEffect/CursorTracker';
export type { CursorTrackerState, CursorTrackerProps } from './CursorEffect/CursorTracker';
export { GlowAura } from './CursorEffect/GlowAura';
export type { GlowAuraProps } from './CursorEffect/GlowAura';
export { DistortionField } from './CursorEffect/DistortionField';
export type { DistortionFieldProps } from './CursorEffect/DistortionField';
export { WaveGenerator } from './CursorEffect/WaveGenerator';
export type { WaveGeneratorProps } from './CursorEffect/WaveGenerator';
export { EffectRenderer } from './CursorEffect/EffectRenderer';
export type { EffectRendererProps } from './CursorEffect/EffectRenderer';
export { ParticleSystem } from './CursorEffect/ParticleSystem';
export type { ParticleSystemProps } from './CursorEffect/ParticleSystem';

// Page Transitions
export * from './BloodSmear';
export * from './ShadowCrawl';
export * from './BatBurst';
export { SpectralRiver, type SpectralRiverProps } from './SpectralRiver';
