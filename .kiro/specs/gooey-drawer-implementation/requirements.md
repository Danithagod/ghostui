# Requirements Document

## Introduction

The Gooey Drawer (also known as "Ectoplasm Drawer") is an animated overlay component that slides into view from any edge of the screen with a distinctive liquid dripping effect. Unlike traditional drawers that slide from screen edges, this component "floats" near the edges with rounded corners and features animated liquid drips hanging from the bottom edge, creating a supernatural, melting appearance. The component uses SVG filters with specular lighting to create realistic 3D liquid effects with highlights and glare.

This component extends the GhostUI library's collection of gooey-themed components (GooeyCard, GooeyButton, GooeySidebar) by providing an overlay/modal pattern with the same liquid aesthetic. It will be fully integrated into both the component library (packages/ghostui) and the documentation app (apps/docs).

## Glossary

- **Drawer**: An overlay UI component that slides into view, typically containing navigation or supplementary content
- **Placement**: The screen edge from which the drawer appears (top, right, bottom, left)
- **Backdrop**: A semi-transparent overlay that appears behind the drawer to dim the main content
- **Drip Animation**: Animated liquid elements that extend downward from the drawer's bottom edge, creating a melting effect
- **SVG Filter Pipeline**: A series of SVG filter effects (blur, color matrix, specular lighting) that create the liquid appearance
- **Goo Effect**: The visual merging of separate elements into a unified liquid blob through SVG filters
- **Specular Lighting**: An SVG filter effect that simulates light reflecting off shiny surfaces, creating highlights
- **Framer Motion**: The animation library used for spring-based transitions and gestures
- **AnimatePresence**: A Framer Motion component that handles enter/exit animations for conditionally rendered elements
- **Component Library**: The packages/ghostui package containing reusable React components
- **Documentation App**: The apps/docs Next.js application that showcases and documents components
- **ComponentPlayground**: A documentation component that displays interactive previews with code examples
- **PropsTable**: A documentation component that displays component API information in table format

## Requirements

### Requirement 1

**User Story:** As a developer, I want to import and use the GooeyDrawer component in my React application, so that I can display overlay content with a distinctive liquid aesthetic.

#### Acceptance Criteria

1. WHEN a developer imports GooeyDrawer from 'ghostui-react' THEN the system SHALL provide the component with full TypeScript type definitions
2. WHEN a developer renders GooeyDrawer with isOpen={true} THEN the system SHALL display the drawer with animated entrance
3. WHEN a developer renders GooeyDrawer with isOpen={false} THEN the system SHALL hide the drawer with animated exit
4. WHEN a developer provides children to GooeyDrawer THEN the system SHALL render the children inside the drawer's content area
5. WHEN a developer provides an onClose callback THEN the system SHALL invoke the callback when the user closes the drawer

### Requirement 2

**User Story:** As a developer, I want to control the drawer's placement on screen, so that I can position it according to my application's layout needs.

#### Acceptance Criteria

1. WHEN a developer sets placement="right" THEN the system SHALL position the drawer floating near the right edge with vertical centering
2. WHEN a developer sets placement="left" THEN the system SHALL position the drawer floating near the left edge with vertical centering
3. WHEN a developer sets placement="bottom" THEN the system SHALL position the drawer floating near the bottom edge with horizontal centering
4. WHEN a developer sets placement="top" THEN the system SHALL position the drawer floating near the top edge with horizontal centering
5. WHEN no placement is specified THEN the system SHALL default to placement="right"

### Requirement 3

**User Story:** As a developer, I want the drawer to animate smoothly when opening and closing, so that the user experience feels polished and engaging.

#### Acceptance Criteria

1. WHEN the drawer opens THEN the system SHALL animate from off-screen to its final position using spring physics
2. WHEN the drawer opens THEN the system SHALL animate from scale 0.8 to scale 1.0
3. WHEN the drawer opens THEN the system SHALL animate from opacity 0 to opacity 1
4. WHEN the drawer closes THEN the system SHALL animate back off-screen with anticipation easing
5. WHEN the drawer closes THEN the system SHALL animate to scale 0.8 and opacity 0
6. WHEN the drawer is animating THEN the system SHALL use spring physics with damping 25, stiffness 180, and mass 0.8

### Requirement 4

**User Story:** As a developer, I want the drawer to display animated liquid drips, so that it maintains the gooey aesthetic consistent with other library components.

#### Acceptance Criteria

1. WHEN the drawer is visible THEN the system SHALL render 12 animated drip elements hanging from the bottom edge
2. WHEN a drip animates THEN the system SHALL extend downward from its initial height to a stretched height and back
3. WHEN drips animate THEN the system SHALL use staggered delays between 0 and 2 seconds for natural variation
4. WHEN drips animate THEN the system SHALL use durations between 2 and 4 seconds for varied timing
5. WHEN drips animate THEN the system SHALL loop infinitely with easeInOut easing
6. WHEN the drawer is visible THEN the system SHALL render static bulge elements at the bottom for visual connection
7. WHEN drips are rendered THEN the system SHALL position them randomly across 10-90% of the bottom edge width
8. WHEN drips are rendered THEN the system SHALL vary their widths between 15px and 45px
9. WHEN drips are rendered THEN the system SHALL vary their stretch distances between 30px and 80px

### Requirement 5

**User Story:** As a developer, I want the drawer to apply SVG filter effects to create realistic liquid appearance, so that the component has visual depth and polish.

#### Acceptance Criteria

1. WHEN the drawer renders THEN the system SHALL generate a unique filter ID using React.useId to avoid conflicts
2. WHEN the SVG filter is applied THEN the system SHALL blur the liquid layer with stdDeviation="10" for initial goo effect
3. WHEN the SVG filter is applied THEN the system SHALL apply color matrix with values "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" for contrast
4. WHEN the SVG filter is applied THEN the system SHALL apply specular lighting with surfaceScale="4" for 3D effect
5. WHEN the SVG filter is applied THEN the system SHALL use specularConstant="1.3" and specularExponent="30" for highlight intensity
6. WHEN the SVG filter is applied THEN the system SHALL position the light source at azimuth="225" and elevation="55"
7. WHEN the SVG filter is applied THEN the system SHALL composite the lighting effects with the goo layer
8. WHEN the filter is defined THEN the system SHALL hide the SVG element with aria-hidden="true"

### Requirement 6

**User Story:** As a developer, I want the drawer content to remain sharp and unfiltered, so that text and interactive elements are readable while the liquid effect applies only to the background.

#### Acceptance Criteria

1. WHEN the drawer renders THEN the system SHALL separate the liquid layer from the content layer using z-index stacking
2. WHEN the SVG filter is applied THEN the system SHALL apply it only to the liquid layer container
3. WHEN content is rendered THEN the system SHALL render it in an unfiltered layer above the liquid layer
4. WHEN the drawer renders THEN the system SHALL apply backdrop-blur to the content container for subtle depth
5. WHEN the drawer renders THEN the system SHALL use rounded corners matching the liquid shape (2rem border-radius)

### Requirement 7

**User Story:** As a developer, I want the drawer to display a backdrop overlay, so that the main content is visually de-emphasized when the drawer is open.

#### Acceptance Criteria

1. WHEN the drawer opens THEN the system SHALL render a backdrop covering the entire viewport
2. WHEN the backdrop renders THEN the system SHALL apply semi-transparent black background (#05020a at 60% opacity)
3. WHEN the backdrop renders THEN the system SHALL apply backdrop-blur-sm for depth of field effect
4. WHEN the backdrop animates in THEN the system SHALL fade from opacity 0 to opacity 1
5. WHEN the backdrop animates out THEN the system SHALL fade from opacity 1 to opacity 0
6. WHEN a user clicks the backdrop THEN the system SHALL invoke the onClose callback

### Requirement 8

**User Story:** As a developer, I want the drawer to include a header with close button, so that users have a clear way to dismiss the drawer.

#### Acceptance Criteria

1. WHEN the drawer renders THEN the system SHALL display a header section at the top
2. WHEN the header renders THEN the system SHALL display a ghost icon and "Possession" title using Creepster font
3. WHEN the header renders THEN the system SHALL display a close button (X icon) on the right side
4. WHEN a user clicks the close button THEN the system SHALL invoke the onClose callback
5. WHEN a user hovers the close button THEN the system SHALL apply hover state styling (increased opacity and background)
6. WHEN the header renders THEN the system SHALL apply a bottom border to separate it from content

### Requirement 9

**User Story:** As a developer, I want the drawer body to support scrollable content, so that I can display any amount of content without layout issues.

#### Acceptance Criteria

1. WHEN the drawer renders THEN the system SHALL create a scrollable content area below the header
2. WHEN content exceeds the visible area THEN the system SHALL enable vertical scrolling
3. WHEN the scrollbar is rendered THEN the system SHALL hide it using no-scrollbar utility class
4. WHEN the content area renders THEN the system SHALL apply consistent padding (p-5)
5. WHEN the content area renders THEN the system SHALL apply spacing between child elements (space-y-3)

### Requirement 10

**User Story:** As a developer, I want to customize the drawer's appearance, so that I can adapt it to different use cases and themes.

#### Acceptance Criteria

1. WHEN a developer provides a className prop THEN the system SHALL apply it to the drawer container
2. WHEN the drawer renders THEN the system SHALL use CSS custom properties (--goo-bg, --goo-bg-dark, --goo-highlight) for theming
3. WHEN the drawer renders THEN the system SHALL default to violet color scheme (#8b5cf6 for main, #7c3aed for dark, #e9d5ff for highlight)
4. WHEN the drawer renders THEN the system SHALL support different sizes based on placement (350px width for sides, 80vw for top/bottom)
5. WHEN the drawer renders THEN the system SHALL support different heights based on placement (70vh for sides, 50vh for top/bottom)

### Requirement 11

**User Story:** As a developer, I want the component to be accessible, so that all users can interact with it effectively.

#### Acceptance Criteria

1. WHEN the drawer opens THEN the system SHALL trap focus within the drawer
2. WHEN a user presses Escape key THEN the system SHALL invoke the onClose callback
3. WHEN the SVG filter is rendered THEN the system SHALL mark it with aria-hidden="true"
4. WHEN the close button renders THEN the system SHALL provide appropriate accessible label
5. WHEN the drawer renders THEN the system SHALL use semantic HTML structure

### Requirement 12

**User Story:** As a developer, I want comprehensive documentation for the GooeyDrawer component, so that I can understand how to use it effectively.

#### Acceptance Criteria

1. WHEN a developer visits the documentation page THEN the system SHALL display a component overview with description
2. WHEN a developer views the documentation THEN the system SHALL provide a basic usage example with code
3. WHEN a developer views the documentation THEN the system SHALL display all four placement options with interactive demos
4. WHEN a developer views the documentation THEN the system SHALL provide a complete props table with types and descriptions
5. WHEN a developer views the documentation THEN the system SHALL include examples of custom content layouts
6. WHEN a developer views the documentation THEN the system SHALL explain the SVG filter pipeline and how it works
7. WHEN a developer views the documentation THEN the system SHALL document accessibility features
8. WHEN a developer views the documentation THEN the system SHALL provide real-world usage examples

### Requirement 13

**User Story:** As a developer, I want the component to be exported from the main library entry point, so that I can import it consistently with other components.

#### Acceptance Criteria

1. WHEN the component is built THEN the system SHALL export GooeyDrawer from packages/ghostui/src/components/index.ts
2. WHEN the component is built THEN the system SHALL export GooeyDrawerProps type from packages/ghostui/src/components/index.ts
3. WHEN the component is built THEN the system SHALL include the component in the library's TypeScript declarations
4. WHEN the component is built THEN the system SHALL make it available via the 'ghostui-react' package import
5. WHEN the component is built THEN the system SHALL include proper displayName for React DevTools

### Requirement 14

**User Story:** As a developer, I want the component to integrate with the documentation app's navigation, so that users can discover and access the component documentation.

#### Acceptance Criteria

1. WHEN the documentation is built THEN the system SHALL add a "Gooey Drawer" entry to the components navigation menu
2. WHEN a user clicks the navigation entry THEN the system SHALL navigate to /docs/components/gooey-drawer
3. WHEN the documentation page loads THEN the system SHALL display the component documentation with proper styling
4. WHEN the navigation renders THEN the system SHALL position "Gooey Drawer" alphabetically among other components
5. WHEN the documentation builds THEN the system SHALL include the page in the site's routing configuration

### Requirement 15

**User Story:** As a developer, I want the component to follow the library's code style and patterns, so that it maintains consistency with existing components.

#### Acceptance Criteria

1. WHEN the component is implemented THEN the system SHALL use React.forwardRef for ref forwarding
2. WHEN the component is implemented THEN the system SHALL use the cn() utility from lib/utils for className merging
3. WHEN the component is implemented THEN the system SHALL use Framer Motion for animations
4. WHEN the component is implemented THEN the system SHALL follow the library's TypeScript interface naming conventions
5. WHEN the component is implemented THEN the system SHALL use 'use client' directive for client-side rendering
6. WHEN the component is implemented THEN the system SHALL organize code with clear component separation (main component, sub-components, types)
