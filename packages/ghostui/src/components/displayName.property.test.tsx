import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Import all components that should have displayName
import { GooeyButton } from './GooeyButton';
import { GooeyCard } from './GooeyCard';
import { MoonlightSwitch } from './MoonlightSwitch';
import { CoffinCard } from './CoffinCard';
import { SpiritInput } from './SpiritInput';
import { GhostToastProvider } from './GhostToast';
import { SpectralTabs } from './SpectralTabs';
import { WhisperBox } from './WhisperBox';
import { GooeyProgressBar } from './GooeyProgressBar';
import { SpookySkeleton } from './SpookySkeleton';
import { SpookyScrollbar } from './SpookyScrollbar';
import { SpookyTooltip } from './SpookyTooltip';
import { GraveModal } from './GraveModal';
import { HauntedVignette, HauntedCard } from './HauntedVignette';
import { GooeySidebar } from './GooeySidebar';
import { BloodSmear } from './BloodSmear';
import { ShadowCrawl } from './ShadowCrawl';
import { SpectralRiver } from './SpectralRiver';
import { GhostCursor } from './GhostCursor';
import { WispTrail } from './WispTrail';
import { ThemeProvider } from './ThemeProvider';
import { BatIcon } from './BatIcon';

/**
 * Property-based tests for displayName assignment
 * 
 * Feature: component-consistency-analysis, Property 3: displayName assignment
 * Validates: Requirements 3.1
 * 
 * For any exported component, the component should have a displayName property
 * set to a string matching the component name.
 */

// Define all components that should have displayName
const componentsWithDisplayName = [
  { name: 'GooeyButton', Component: GooeyButton },
  { name: 'GooeyCard', Component: GooeyCard },
  { name: 'MoonlightSwitch', Component: MoonlightSwitch },
  { name: 'CoffinCard', Component: CoffinCard },
  { name: 'SpiritInput', Component: SpiritInput },
  { name: 'GhostToastProvider', Component: GhostToastProvider },
  { name: 'SpectralTabs', Component: SpectralTabs },
  { name: 'WhisperBox', Component: WhisperBox },
  { name: 'GooeyProgressBar', Component: GooeyProgressBar },
  { name: 'SpookySkeleton', Component: SpookySkeleton },
  { name: 'SpookyScrollbar', Component: SpookyScrollbar },
  { name: 'SpookyTooltip', Component: SpookyTooltip },
  { name: 'GraveModal', Component: GraveModal },
  { name: 'HauntedVignette', Component: HauntedVignette },
  { name: 'HauntedCard', Component: HauntedCard },
  { name: 'GooeySidebar', Component: GooeySidebar },
  { name: 'BloodSmear', Component: BloodSmear },
  { name: 'ShadowCrawl', Component: ShadowCrawl },
  { name: 'SpectralRiver', Component: SpectralRiver },
  { name: 'GhostCursor', Component: GhostCursor },
  { name: 'WispTrail', Component: WispTrail },
  { name: 'ThemeProvider', Component: ThemeProvider },
  { name: 'AnimatedBat', Component: AnimatedBat },
  { name: 'BatIcon', Component: BatIcon },
  { name: 'JumpscareBat', Component: JumpscareBat },
] as const;

describe('displayName Assignment - Property-Based Tests', () => {
  /**
   * Feature: component-consistency-analysis, Property 3: displayName assignment
   * Validates: Requirements 3.1
   * 
   * For any exported component, the component should have a displayName property set.
   */
  it('Property 3: All components should have displayName set', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentsWithDisplayName),
        (componentConfig) => {
          const { Component } = componentConfig;
          
          // Check that displayName is defined and is a non-empty string
          const hasDisplayName = 
            typeof Component.displayName === 'string' && 
            Component.displayName.length > 0;
          
          return hasDisplayName;
        }
      ),
      { numRuns: componentsWithDisplayName.length * 5 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 3: displayName assignment
   * Validates: Requirements 3.1
   * 
   * For any exported component, the displayName should match the expected component name.
   */
  it('Property 3: displayName should match the component name', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentsWithDisplayName),
        (componentConfig) => {
          const { name, Component } = componentConfig;
          
          // Check that displayName matches the expected name
          const displayNameMatches = Component.displayName === name;
          
          return displayNameMatches;
        }
      ),
      { numRuns: componentsWithDisplayName.length * 5 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 3: displayName assignment
   * Validates: Requirements 3.1
   * 
   * For any exported component, the displayName should be a valid identifier
   * (starts with uppercase letter, contains only alphanumeric characters).
   */
  it('Property 3: displayName should be a valid React component identifier', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentsWithDisplayName),
        (componentConfig) => {
          const { Component } = componentConfig;
          
          // Check that displayName follows React naming conventions
          // (starts with uppercase, alphanumeric)
          const displayName = Component.displayName;
          const isValidIdentifier = 
            typeof displayName === 'string' &&
            /^[A-Z][a-zA-Z0-9]*$/.test(displayName);
          
          return isValidIdentifier;
        }
      ),
      { numRuns: componentsWithDisplayName.length * 5 }
    );
  });
});
