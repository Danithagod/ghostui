# Requirements Document

## Introduction

This document specifies the requirements for implementing the SpectralRiver page transition component in the GhostUI library. SpectralRiver is a dramatic full-screen transition effect that creates a liquid slime/goo animation using SVG filters, featuring spectral purple drips that flow down the screen with organic variability, specular lighting effects, and ambient fog overlays. The component will be integrated into the existing Page Transitions category alongside VeilFade, CrackTransition, BloodSmear, ShadowCrawl, and BatBurst.

## Glossary

- **SpectralRiver**: A React component that renders a full-screen liquid slime transition effect with animated drips and goo filter effects
- **SlimeDrip**: An internal sub-component that renders individual animated drip columns with variable widths and positions
- **SVG Goo Filter**: An SVG filter combining Gaussian blur, color matrix, and specular lighting to create a liquid/goo visual effect
- **GhostUI**: The spectral-themed React component library this component belongs to
- **Page Transition**: A visual effect component used to animate between page states or content changes
- **Framer Motion**: The animation library used for motion effects in GhostUI components
- **isActive**: A boolean prop that controls whether the transition animation is currently playing
- **onComplete**: A callback function invoked when the transition animation finishes

## Requirements

### Requirement 1

**User Story:** As a developer, I want to add the SpectralRiver component to my application, so that I can create dramatic liquid slime page transitions.

#### Acceptance Criteria

1. WHEN a developer imports SpectralRiver from ghostui-react THEN the System SHALL export the SpectralRiver component and SpectralRiverProps type from the package entry point
2. WHEN the SpectralRiver component is rendered with isActive set to true THEN the System SHALL display a full-screen overlay with animated purple slime drips
3. WHEN the SpectralRiver component is rendered with isActive set to false THEN the System SHALL not render any visible content
4. WHEN the transition animation completes THEN the System SHALL invoke the onComplete callback if provided

### Requirement 2

**User Story:** As a developer, I want the SpectralRiver transition to have smooth liquid animation effects, so that the visual experience feels organic and polished.

#### Acceptance Criteria

1. WHEN the transition is active THEN the System SHALL render multiple SlimeDrip elements with variable widths between 2vw and 25vw
2. WHEN the transition is active THEN the System SHALL apply an SVG goo filter with Gaussian blur, color matrix contrast, and specular lighting effects
3. WHEN the transition is active THEN the System SHALL animate drips from top to bottom with staggered delays between 0 and 0.5 seconds
4. WHEN the transition is active THEN the System SHALL render a backing layer that ensures complete screen coverage during the transition

### Requirement 3

**User Story:** As a developer, I want the SpectralRiver component to handle body scroll locking, so that users cannot scroll the page during the transition.

#### Acceptance Criteria

1. WHEN the transition becomes active THEN the System SHALL set document.body.style.overflow to 'hidden'
2. WHEN the transition completes THEN the System SHALL restore document.body.style.overflow to its default value
3. WHEN the component unmounts during an active transition THEN the System SHALL clean up the overflow style and any pending timers

### Requirement 4

**User Story:** As a developer, I want to view SpectralRiver documentation in the docs app, so that I can understand how to use the component.

#### Acceptance Criteria

1. WHEN a user navigates to /docs/components/spectral-river THEN the System SHALL display the SpectralRiver documentation page
2. WHEN viewing the documentation page THEN the System SHALL display an interactive demo with a trigger button
3. WHEN viewing the documentation page THEN the System SHALL display a props table documenting isActive and onComplete props
4. WHEN viewing the documentation page THEN the System SHALL display a code example showing basic usage

### Requirement 5

**User Story:** As a developer, I want the SpectralRiver component to follow GhostUI patterns, so that it integrates consistently with other library components.

#### Acceptance Criteria

1. WHEN the SpectralRiver component is implemented THEN the System SHALL use the cn utility function from the lib/utils module for class name merging
2. WHEN the SpectralRiver component is implemented THEN the System SHALL use Framer Motion for all animations consistent with other page transitions
3. WHEN the SpectralRiver component is implemented THEN the System SHALL export a TypeScript interface SpectralRiverProps defining the component's prop types
4. WHEN the SpectralRiver component is added to the library THEN the System SHALL update the Sidebar navigation to include SpectralRiver in the Page Transitions section
