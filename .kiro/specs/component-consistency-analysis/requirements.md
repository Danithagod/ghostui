# Requirements Document

## Introduction

This document captures the findings from a comprehensive analysis of all GhostUI components to identify inconsistencies in code patterns, API design, styling approaches, and implementation details. The goal is to establish a baseline understanding of the current state and identify areas that need standardization.

## Glossary

- **GhostUI**: The spooky-themed React component library being analyzed
- **ThemeProvider**: The context provider that manages spectral/blood theme switching
- **cn utility**: The className merging utility using clsx and tailwind-merge
- **forwardRef**: React pattern for forwarding refs to underlying DOM elements
- **displayName**: React component property for debugging purposes

---

# COMPONENT CONSISTENCY ANALYSIS REPORT

## Executive Summary

After analyzing all 30+ components in the GhostUI library, I've identified several categories of inconsistencies that should be addressed for better maintainability, developer experience, and code quality.

---

## 1. UTILITY FUNCTION INCONSISTENCIES

### Issue: Duplicate `cn` utility definitions

**Severity: HIGH**

Several components define their own local `cn` utility instead of importing from `../lib/utils`:

| Component | Has Local `cn` | Imports from utils |
|-----------|---------------|-------------------|
| GooeyButton | ✅ Local | ❌ |
| GhostToast | ✅ Local | ❌ |
| GooeySidebar | ✅ Local | ❌ |
| GhostCursor | ✅ Local | ❌ |
| GooeyCard | ❌ | ✅ |
| MoonlightSwitch | ❌ | ✅ |
| CoffinCard | ❌ | ✅ |
| SpiritInput | ❌ | ✅ |
| SpectralTabs | ❌ | ✅ |
| WhisperBox | ❌ | ✅ |
| All others | ❌ | ✅ |

**Recommendation**: Remove local `cn` definitions and import from `../lib/utils` consistently.

---

## 2. COMPONENT EXPORT PATTERNS

### Issue: Inconsistent export styles

**Severity: MEDIUM**

| Pattern | Components |
|---------|-----------|
| `export const Component` | GooeyButton, GooeyCard, SpiritInput, GhostToast, SpectralTabs, WhisperBox, GooeyProgressBar, SpookySkeleton, SpookyScrollbar, SpookyTooltip, GraveModal, BloodSmear, ShadowCrawl, BatBurst, SpectralRiver, GhostCursor, WispTrail, AnimatedBat, BatIcon, JumpscareBat |
| `export function Component` | MoonlightSwitch, CoffinCard, ThemeProvider, HauntedVignette, HauntedCard |
| `export * from` (barrel) | GraveModal, SpookyTooltip, GhostToast, BloodSmear, ShadowCrawl, BatBurst, GhostCursor, WispTrail |

**Recommendation**: Standardize on `export const Component` pattern for consistency.

---

## 3. forwardRef USAGE

### Issue: Inconsistent ref forwarding

**Severity: HIGH**

| Uses forwardRef | Does NOT use forwardRef |
|-----------------|------------------------|
| GooeyButton ✅ | GooeyCard ❌ |
| SpiritInput ✅ | MoonlightSwitch ❌ |
| WhisperBox ✅ | CoffinCard ❌ |
| GooeySidebar ✅ | SpectralTabs ❌ |
| | GhostToast ❌ |
| | GooeyProgressBar ❌ |
| | SpookySkeleton ❌ |
| | SpookyScrollbar ❌ |
| | SpookyTooltip ❌ |
| | GraveModal ❌ |
| | HauntedVignette ❌ |
| | BloodSmear ❌ |
| | ShadowCrawl ❌ |
| | BatBurst ❌ |
| | SpectralRiver ❌ |
| | GhostCursor ❌ |
| | WispTrail ❌ |

**Recommendation**: Add forwardRef to all interactive components that render DOM elements users might need to reference.

---

## 4. displayName ASSIGNMENT

### Issue: Inconsistent displayName usage

**Severity: LOW**

| Has displayName | Missing displayName |
|-----------------|-------------------|
| GooeyButton ✅ | SpectralTabs ❌ |
| GooeyCard ✅ | SpookyTooltip ❌ |
| MoonlightSwitch ✅ | GraveModal ❌ |
| CoffinCard ✅ | HauntedVignette ❌ |
| SpiritInput ✅ | BloodSmear ❌ |
| GhostToast (partial) ✅ | ShadowCrawl ❌ |
| WhisperBox ✅ | BatBurst ❌ |
| GooeyProgressBar ✅ | SpectralRiver ❌ |
| SpookySkeleton (missing) ❌ | GhostCursor ❌ |
| SpookyScrollbar (missing) ❌ | WispTrail ❌ |
| GooeySidebar ✅ | |
| ThemeProvider ✅ | |
| AnimatedBat ✅ | |
| BatIcon ✅ | |
| JumpscareBat ✅ | |

**Recommendation**: Add displayName to all components for better debugging experience.

---

## 5. THEME INTEGRATION

### Issue: Inconsistent theme support

**Severity: HIGH**

| Full Theme Support | Partial/No Theme Support |
|-------------------|-------------------------|
| MoonlightSwitch ✅ | GooeyButton ❌ (hardcoded themes) |
| CoffinCard ✅ | GooeyCard ❌ (gooColor prop only) |
| SpectralTabs ✅ | GhostToast ❌ (hardcoded colors) |
| SpookySkeleton ✅ | GooeyProgressBar ❌ (variant-based) |
| GooeySidebar ✅ | SpookyScrollbar ❌ (CSS vars only) |
| | SpookyTooltip ❌ (hardcoded purple) |
| | GraveModal ✅ (CSS vars) |
| | HauntedVignette ❌ (no theme) |
| | BloodSmear ❌ (hardcoded blood) |
| | ShadowCrawl ❌ (hardcoded black) |
| | SpectralRiver ❌ (hardcoded purple) |
| | GhostCursor ❌ (hardcoded purple) |
| | WispTrail ❌ (color prop only) |
| | WhisperBox ❌ (hardcoded purple) |
| | SpiritInput ✅ (CSS vars) |

**Theme Integration Patterns Found:**
1. `useThemeOptional()` hook - Best practice (CoffinCard, SpectralTabs, SpookySkeleton, GooeySidebar)
2. CSS variables (`var(--ghost-accent)`) - Good (SpiritInput, GraveModal, SpookyScrollbar)
3. Hardcoded colors - Needs update (GooeyButton, GhostToast, SpookyTooltip, etc.)
4. Variant prop with fixed themes - Acceptable but limited (GooeyButton, GooeyProgressBar)

**Recommendation**: Standardize on `useThemeOptional()` hook with fallback to CSS variables.

---

## 6. PROPS INTERFACE PATTERNS

### Issue: Inconsistent props extension

**Severity: MEDIUM**

| Extends HTML Attributes | Custom Props Only |
|------------------------|-------------------|
| GooeyButton (`ButtonHTMLAttributes`) ✅ | GooeyCard ❌ |
| SpiritInput (`InputHTMLAttributes`) ✅ | MoonlightSwitch ❌ |
| WhisperBox (`TextareaHTMLAttributes`) ✅ | CoffinCard ❌ |
| | SpectralTabs ❌ |
| | GhostToast ❌ |
| | GooeyProgressBar ❌ |
| | SpookySkeleton ❌ |
| | SpookyScrollbar ❌ |
| | SpookyTooltip ❌ |
| | GraveModal ❌ |
| | HauntedVignette ❌ |

**Recommendation**: Extend appropriate HTML attributes for components that wrap native elements.

---

## 7. ANIMATION LIBRARY USAGE

### Issue: Consistent use of Framer Motion ✅

**Severity: NONE**

All animated components consistently use `framer-motion`. This is good!

---

## 8. ACCESSIBILITY PATTERNS

### Issue: Inconsistent ARIA attributes

**Severity: HIGH**

| Good Accessibility | Needs Improvement |
|-------------------|-------------------|
| MoonlightSwitch (`role="switch"`, `aria-checked`) ✅ | GooeyButton (missing aria-pressed for toggle states) |
| SpectralTabs (`role="tablist"`, `aria-selected`) ✅ | GooeyCard (no semantic role) |
| SpookyTooltip (`role="tooltip"`, `aria-describedby`) ✅ | GhostToast (missing aria-live) |
| GraveModal (`role="dialog"`, `aria-modal`) ✅ | SpookyScrollbar (missing aria-valuenow) |
| SpookySkeleton (`role="status"`, `aria-label`) ✅ | HauntedVignette (missing aria-hidden on decorative) |
| | BloodSmear (missing aria-hidden) |
| | BatBurst (missing aria-hidden) |

**Recommendation**: Add appropriate ARIA attributes to all interactive and status components.

---

## 9. CSS-IN-JS PATTERNS

### Issue: Mixed styling approaches

**Severity: MEDIUM**

| Pattern | Components |
|---------|-----------|
| Tailwind only | Most components |
| Inline `<style>` tags | GhostCursor, SpookyScrollbar, WhisperBox, SpookySkeleton, GraveModal, HauntedVignette |
| SVG filters inline | GooeyButton, GooeyCard, BloodSmear, SpectralRiver, GooeySidebar, GooeyProgressBar |
| External CSS imports | None (good!) |

**Recommendation**: Consider extracting repeated `<style>` blocks into a shared styles file or CSS module.

---

## 10. PROP NAMING CONVENTIONS

### Issue: Inconsistent prop naming

**Severity: MEDIUM**

| Prop Purpose | Variations Found |
|--------------|-----------------|
| Active state | `isActive`, `isOpen`, `isNavigating`, `checked`, `enabled` |
| Callback | `onComplete`, `onChange`, `onClose`, `onTabChange`, `onActiveChange` |
| Style variant | `variant`, `theme`, `gooColor` |
| Animation control | `animated`, `enabled`, `ghostEnabled` |
| Size/intensity | `intensity`, `fluidity`, `radius`, `darkness` |

**Recommendation**: Establish naming conventions:
- Boolean states: `is*` prefix (isActive, isOpen, isEnabled)
- Callbacks: `on*` prefix matching the event (onChange, onComplete)
- Variants: Use `variant` for visual variants, `theme` for theme integration

---

## 11. DEFAULT PROP VALUES

### Issue: Inconsistent default value patterns

**Severity: LOW**

| Pattern | Example |
|---------|---------|
| Destructuring defaults | `variant = 'spectral'` (most common) |
| defaultProps (deprecated) | None found (good!) |
| Nullish coalescing | `theme ?? 'spectral'` (some components) |

**Recommendation**: Standardize on destructuring defaults with nullish coalescing for context values.

---

## 12. COMPONENT COMPOSITION

### Issue: Demo components mixed with core components

**Severity: MEDIUM**

| Component | Has Demo Export |
|-----------|----------------|
| HauntedVignette | HauntedVignetteDemo ✅ |
| GooeySidebar | GooeySidebarDemo ✅ |
| Others | No demo exports |

**Recommendation**: Either add demo components to all complex components or move demos to a separate `/demos` folder.

---

## 13. TYPE EXPORTS

### Issue: Inconsistent type exports

**Severity: MEDIUM**

| Exports Types | Missing Type Exports |
|--------------|---------------------|
| GooeyButton (`GooeyButtonProps`) ✅ | GhostCursor (no props interface) |
| GooeyCard (`GooeyCardProps`) ✅ | WispTrail (exports but basic) |
| Most components ✅ | ShadowCrawl (exports) |

**Recommendation**: Ensure all components export their props interface.

---

## 14. SVG FILTER ID UNIQUENESS

### Issue: Potential filter ID collisions

**Severity: HIGH**

| Component | Filter ID Pattern | Unique? |
|-----------|------------------|---------|
| GooeyButton | `goo-filter-${useId()}` | ✅ Dynamic |
| GooeyCard | `card-goo` | ❌ Static |
| BloodSmear | `blood-goo` | ❌ Static |
| SpectralRiver | `spectral-goo` | ❌ Static |
| GooeySidebar | `sidebar-goo-3d-${theme}` | ⚠️ Theme-based |
| GooeyProgressBar | `goo-3d-blood`, `goo-3d-candle` | ❌ Static |
| WhisperBox | `ectoplasm-distortion` | ❌ Static |

**Recommendation**: Use `useId()` hook for all SVG filter IDs to prevent collisions when multiple instances exist.

---

## 15. ERROR HANDLING

### Issue: Inconsistent error boundaries and validation

**Severity: MEDIUM**

| Has Validation | No Validation |
|---------------|---------------|
| CursorEffectProvider (validates intensity, radius) ✅ | GooeyProgressBar (no value clamping shown in UI) |
| SpiritInput (error prop) ✅ | Most other components |

**Recommendation**: Add prop validation for numeric ranges and required props.

---

## PRIORITY RECOMMENDATIONS

### P0 - Critical (Fix Immediately)
1. Remove duplicate `cn` utility definitions
2. Add unique SVG filter IDs using `useId()`
3. Add forwardRef to interactive components

### P1 - High (Fix Soon)
1. Standardize theme integration using `useThemeOptional()`
2. Add missing ARIA attributes
3. Add displayName to all components

### P2 - Medium (Plan for Next Sprint)
1. Standardize export patterns
2. Extend HTML attributes where appropriate
3. Establish prop naming conventions
4. Export all props interfaces

### P3 - Low (Nice to Have)
1. Extract inline styles to shared files
2. Add demo components consistently
3. Document all components with JSDoc

---

## COMPONENT-BY-COMPONENT SUMMARY

| Component | Issues Found | Priority |
|-----------|-------------|----------|
| GooeyButton | Local cn, no theme integration | P1 |
| GooeyCard | Static filter ID, no forwardRef | P0 |
| MoonlightSwitch | Good overall | - |
| CoffinCard | Good overall | - |
| SpiritInput | Good overall | - |
| GhostToast | Local cn, no theme, no aria-live | P0 |
| SpectralTabs | No forwardRef, no displayName | P1 |
| WhisperBox | Static filter ID | P0 |
| GooeyProgressBar | Static filter IDs, no forwardRef | P0 |
| SpookySkeleton | No displayName | P3 |
| SpookyScrollbar | No displayName, no aria | P1 |
| SpookyTooltip | Hardcoded colors, no displayName | P1 |
| GraveModal | No displayName | P3 |
| HauntedVignette | No theme, no displayName | P1 |
| GooeySidebar | Local cn | P1 |
| BloodSmear | Static filter ID, no aria | P0 |
| ShadowCrawl | No displayName | P3 |
| BatBurst | No displayName, no aria | P1 |
| SpectralRiver | Static filter ID | P0 |
| GhostCursor | Local cn, hardcoded colors | P1 |
| WispTrail | No displayName | P3 |
| ThemeProvider | Good overall | - |

---

## Requirements for Standardization

### Requirement 1

**User Story:** As a developer, I want all components to use the shared `cn` utility, so that the codebase is consistent and maintainable.

#### Acceptance Criteria

1. WHEN a component needs className merging THEN the component SHALL import `cn` from `../lib/utils`
2. WHEN reviewing component code THEN the reviewer SHALL NOT find local `cn` function definitions

### Requirement 2

**User Story:** As a developer, I want all interactive components to support ref forwarding, so that I can access underlying DOM elements when needed.

#### Acceptance Criteria

1. WHEN a component renders an interactive DOM element THEN the component SHALL use `React.forwardRef`
2. WHEN a ref is passed to a forwardRef component THEN the ref SHALL be attached to the primary interactive element

### Requirement 3

**User Story:** As a developer, I want all components to have displayName set, so that debugging in React DevTools is easier.

#### Acceptance Criteria

1. WHEN a component is defined THEN the component SHALL have a `displayName` property set
2. WHEN viewing components in React DevTools THEN the component name SHALL be visible

### Requirement 4

**User Story:** As a developer, I want all components to support the theme system, so that they adapt to spectral/blood themes automatically.

#### Acceptance Criteria

1. WHEN a component uses colors THEN the component SHALL use `useThemeOptional()` or CSS variables
2. WHEN the theme changes THEN the component colors SHALL update accordingly

### Requirement 5

**User Story:** As a developer, I want all SVG filters to have unique IDs, so that multiple component instances don't conflict.

#### Acceptance Criteria

1. WHEN a component defines an SVG filter THEN the filter ID SHALL be generated using `React.useId()`
2. WHEN multiple instances of a component exist THEN each instance SHALL have unique filter IDs

### Requirement 6

**User Story:** As a user with accessibility needs, I want all components to have proper ARIA attributes, so that screen readers can interpret them correctly.

#### Acceptance Criteria

1. WHEN a component has interactive elements THEN appropriate ARIA roles SHALL be applied
2. WHEN a component displays status information THEN `aria-live` regions SHALL be used
3. WHEN a component is purely decorative THEN `aria-hidden="true"` SHALL be applied
