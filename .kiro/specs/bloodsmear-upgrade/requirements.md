# Requirements Document

## Introduction

This specification defines the upgrade of the BloodSmear component from a simple directional wipe transition to a sophisticated page transition system with viscous blood-dripping effects, particle animations, and navigation state management. The upgraded component will provide a cinematic, horror-themed transition experience suitable for page navigation and state changes in the GhostUI library.

## Glossary

- **BloodSmear Component**: The React component that renders the blood transition effect
- **Navigation State**: Boolean flag indicating whether a transition is currently in progress
- **Drip Edge**: SVG path element that creates the wavy, dripping bottom edge of the blood effect
- **Droplet Particles**: Independent animated elements that simulate detached blood drops
- **Viscous Easing**: Custom animation timing function that simulates thick, slow-moving liquid
- **Demo Application**: Example implementation showing the component in a page navigation context
- **GhostUI Library**: The React component library containing horror-themed UI components
- **Documentation Page**: The Next.js page that documents and demonstrates the component

## Requirements

### Requirement 1

**User Story:** As a developer, I want to use the upgraded BloodSmear component for page transitions, so that I can create immersive horror-themed navigation experiences.

#### Acceptance Criteria

1. WHEN the component receives `isNavigating={true}`, THE BloodSmear Component SHALL render a full-screen overlay that slides from top to bottom
2. WHEN the animation completes, THE BloodSmear Component SHALL invoke the `onComplete` callback function
3. WHEN the component is not navigating, THE BloodSmear Component SHALL render nothing to the DOM
4. THE BloodSmear Component SHALL use a z-index of 100 to ensure it appears above all other content
5. THE BloodSmear Component SHALL include `pointer-events-none` to prevent interaction blocking

### Requirement 2

**User Story:** As a developer, I want the blood effect to have realistic viscous movement, so that the transition feels like thick liquid rather than a simple wipe.

#### Acceptance Criteria

1. WHEN the animation plays, THE BloodSmear Component SHALL use a duration of 2.5 seconds for the main transition
2. WHEN the animation plays, THE BloodSmear Component SHALL use a custom cubic-bezier easing function [0.45, 0, 0.55, 1]
3. WHEN the solid blood block animates, THE BloodSmear Component SHALL move from y: -100% to y: 200%
4. THE BloodSmear Component SHALL use the color #991b1b for all blood elements

### Requirement 3

**User Story:** As a developer, I want the blood to have a dripping edge, so that the transition appears more organic and fluid.

#### Acceptance Criteria

1. WHEN the component renders, THE BloodSmear Component SHALL include a DripEdge SVG component at the bottom of the blood block
2. THE DripEdge Component SHALL use a complex wavy path with multiple peaks and valleys
3. THE DripEdge Component SHALL preserve aspect ratio with `preserveAspectRatio="none"`
4. THE DripEdge Component SHALL have a height of 48px on mobile and 64px on desktop (md breakpoint)
5. THE DripEdge Component SHALL include a drop-shadow effect for depth

### Requirement 4

**User Story:** As a developer, I want animated droplet particles, so that the blood effect appears more dynamic and realistic.

#### Acceptance Criteria

1. WHEN the component renders during navigation, THE BloodSmear Component SHALL display at least 3 independent droplet particles
2. WHEN droplets animate, THE BloodSmear Component SHALL move each droplet downward with different speeds
3. WHEN droplets animate, THE BloodSmear Component SHALL scale droplets vertically to simulate stretching
4. WHEN droplets animate, THE BloodSmear Component SHALL repeat droplet animations infinitely during the transition
5. THE BloodSmear Component SHALL position droplets at different horizontal positions (20%, 60%, 85%)

### Requirement 5

**User Story:** As a developer, I want to integrate the component with my application state, so that I can coordinate content changes with the transition.

#### Acceptance Criteria

1. WHEN the component accepts an `isNavigating` prop, THE BloodSmear Component SHALL control animation playback based on this boolean value
2. WHEN the component accepts an `onComplete` prop, THE BloodSmear Component SHALL invoke this callback when AnimatePresence exits
3. THE BloodSmear Component SHALL use AnimatePresence with mode="wait" for proper enter/exit sequencing
4. THE BloodSmear Component SHALL support TypeScript with properly typed props interface

### Requirement 6

**User Story:** As a developer, I want a demo application showing page navigation, so that I can understand how to implement the component in real scenarios.

#### Acceptance Criteria

1. WHEN the demo renders, THE Demo Application SHALL display two distinct pages with different themes
2. WHEN a user clicks a navigation button, THE Demo Application SHALL trigger the BloodSmear transition
3. WHEN the transition is halfway complete, THE Demo Application SHALL swap the page content
4. WHEN the transition completes, THE Demo Application SHALL reset the navigation state
5. THE Demo Application SHALL disable navigation buttons during active transitions

### Requirement 7

**User Story:** As a developer, I want the component documented in the GhostUI docs site, so that I can learn how to use it effectively.

#### Acceptance Criteria

1. WHEN a user visits the BloodSmear documentation page, THE Documentation Page SHALL display component description and purpose
2. WHEN a user views the documentation, THE Documentation Page SHALL show an interactive demo with the full navigation example
3. WHEN a user views the documentation, THE Documentation Page SHALL display a code example showing basic usage
4. WHEN a user views the documentation, THE Documentation Page SHALL include a props table with all available properties
5. THE Documentation Page SHALL include usage notes about timing content swaps during transitions

### Requirement 8

**User Story:** As a developer, I want the component to be properly exported from the library, so that I can import it in my projects.

#### Acceptance Criteria

1. WHEN the component is built, THE GhostUI Library SHALL export the BloodSmear component from the main index
2. WHEN the component is built, THE GhostUI Library SHALL export the BloodSmearProps interface
3. WHEN the component is built, THE GhostUI Library SHALL include the DripEdge SVG component as an internal dependency
4. THE GhostUI Library SHALL maintain backward compatibility by preserving the component name

### Requirement 9

**User Story:** As a developer, I want the component to include utility functions, so that I can maintain consistent styling.

#### Acceptance Criteria

1. WHEN the component needs to merge class names, THE BloodSmear Component SHALL use a cn utility function
2. THE cn Utility Function SHALL combine clsx and twMerge for Tailwind class merging
3. THE BloodSmear Component SHALL accept optional className props for customization
4. THE DripEdge Component SHALL accept a className prop for styling flexibility
