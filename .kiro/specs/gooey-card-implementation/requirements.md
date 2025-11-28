# Requirements Document

## Introduction

This specification defines the requirements for implementing a GooeyCard component into the GhostUI library. The GooeyCard is a visually striking card component featuring animated liquid drip effects with SVG-based specular lighting highlights, creating a melting appearance. The component will be integrated into both the component library package and the documentation application.

## Glossary

- **GooeyCard**: A React component that renders a card with animated liquid drip effects and SVG filter-based visual enhancements
- **Component Library**: The packages/ghostui package containing reusable React components
- **Documentation App**: The apps/docs Next.js application that showcases component usage
- **SVG Filter**: A declarative graphics effect applied via SVG filter elements (feGaussianBlur, feSpecularLighting, etc.)
- **Framer Motion**: An animation library for React used to create smooth animations
- **Drip Animation**: Animated vertical elements that simulate liquid dripping from the card
- **Specular Lighting**: An SVG filter effect that creates highlight/glare effects on surfaces

## Requirements

### Requirement 1

**User Story:** As a developer using GhostUI, I want to import and use the GooeyCard component, so that I can display content with an animated liquid effect.

#### Acceptance Criteria

1. WHEN a developer imports GooeyCard from the ghostui package THEN the Component_Library SHALL export the component with proper TypeScript types
2. WHEN a developer renders GooeyCard with children THEN the Component_Library SHALL display the children content within the card
3. WHEN a developer provides a className prop THEN the Component_Library SHALL merge it with the default content container classes
4. WHEN a developer provides a gooColor prop THEN the Component_Library SHALL apply that color to all liquid elements
5. WHEN no gooColor prop is provided THEN the Component_Library SHALL use the default deep purple color (bg-[#5b21b6])

### Requirement 2

**User Story:** As a user viewing a GooeyCard, I want to see animated liquid drip effects, so that the card appears to be melting.

#### Acceptance Criteria

1. WHEN the GooeyCard renders THEN the Component_Library SHALL display five animated drip elements positioned on the right side
2. WHEN drip animations execute THEN the Component_Library SHALL animate the height property in a continuous loop
3. WHEN multiple drips animate THEN the Component_Library SHALL stagger their animation delays to create natural variation
4. WHEN drips reach maximum height THEN the Component_Library SHALL smoothly transition back using easeInOut easing
5. WHEN the card is visible THEN the Component_Library SHALL display static pool elements at the bottom to connect drips

### Requirement 3

**User Story:** As a user viewing a GooeyCard, I want to see realistic liquid effects with highlights, so that the component appears three-dimensional and polished.

#### Acceptance Criteria

1. WHEN the GooeyCard renders THEN the Component_Library SHALL apply an SVG filter with id "card-goo" to the liquid layer
2. WHEN the SVG filter processes THEN the Component_Library SHALL apply Gaussian blur with stdDeviation of 8 to create the goo effect
3. WHEN the blur is applied THEN the Component_Library SHALL apply a color matrix to increase contrast and create liquid edges
4. WHEN the goo shape is created THEN the Component_Library SHALL apply specular lighting with surfaceScale of 6 to generate highlights
5. WHEN specular lighting is applied THEN the Component_Library SHALL composite the highlights onto the goo shape using the "in" operator
6. WHEN highlights are composited THEN the Component_Library SHALL combine them with the goo using the "over" operator

### Requirement 4

**User Story:** As a developer, I want the GooeyCard content to remain sharp and readable, so that text and interactive elements are not affected by the liquid filter.

#### Acceptance Criteria

1. WHEN the GooeyCard renders THEN the Component_Library SHALL apply the SVG filter only to the liquid layer container
2. WHEN content is rendered THEN the Component_Library SHALL position it in a separate layer with higher z-index
3. WHEN the filter is applied THEN the Component_Library SHALL ensure children content remains unfiltered and sharp
4. WHEN decorative borders render THEN the Component_Library SHALL position them above the liquid layer but mark them as non-interactive

### Requirement 5

**User Story:** As a developer, I want to view GooeyCard documentation and examples, so that I can understand how to use the component.

#### Acceptance Criteria

1. WHEN a developer navigates to the GooeyCard documentation page THEN the Documentation_App SHALL display component description and usage examples
2. WHEN the documentation page loads THEN the Documentation_App SHALL render an interactive playground with the GooeyCard component
3. WHEN viewing the documentation THEN the Documentation_App SHALL display code examples showing component import and usage
4. WHEN viewing the documentation THEN the Documentation_App SHALL display a props table documenting all available properties
5. WHEN the documentation renders examples THEN the Documentation_App SHALL demonstrate the gooColor customization option

### Requirement 6

**User Story:** As a developer, I want the GooeyCard to follow GhostUI conventions, so that it integrates seamlessly with other components.

#### Acceptance Criteria

1. WHEN the component is implemented THEN the Component_Library SHALL use the cn utility function for className merging
2. WHEN the component is implemented THEN the Component_Library SHALL follow the existing file structure in packages/ghostui/src/components
3. WHEN the component is exported THEN the Component_Library SHALL include it in the main index.ts export file
4. WHEN TypeScript types are defined THEN the Component_Library SHALL use proper React.FC typing with explicit prop interfaces
5. WHEN the component uses animations THEN the Component_Library SHALL use framer-motion consistent with other animated components

### Requirement 7

**User Story:** As a developer, I want the GooeyCard to be accessible and performant, so that it works well for all users.

#### Acceptance Criteria

1. WHEN the SVG filter is defined THEN the Component_Library SHALL use a unique filter ID to avoid conflicts
2. WHEN animations run THEN the Component_Library SHALL use CSS transforms and properties that trigger GPU acceleration
3. WHEN the component renders THEN the Component_Library SHALL apply proper semantic HTML structure
4. WHEN the component is used THEN the Component_Library SHALL ensure the card maintains minimum dimensions for content readability
5. WHEN multiple GooeyCards render on the same page THEN the Component_Library SHALL ensure each uses the same shared SVG filter definition
