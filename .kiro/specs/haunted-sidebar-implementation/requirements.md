# Requirements Document

## Introduction

This specification defines the requirements for implementing the HauntedSidebar component into the GhostUI library. The HauntedSidebar is a navigation component featuring advanced 3D goo filter effects, spring physics-based animations, and atmospheric visual elements. The component uses a multi-layered rendering architecture with separated filter and content layers to maintain text clarity while applying liquid morphing effects to the active state indicator.

## Glossary

- **HauntedSidebar**: A React navigation component that displays menu items with a liquid morphing active state indicator
- **Goo Filter**: An SVG filter combining Gaussian blur, color matrix, and specular lighting to create liquid blob effects
- **Spring Physics**: Animation system using mass, stiffness, and damping parameters to create natural motion
- **Blob System**: Multi-element animation system consisting of Head, Tail, and Drip blobs with different physics properties
- **Head Blob**: The primary active state indicator that moves quickly with high stiffness
- **Tail Blob**: A secondary blob with increased mass and reduced stiffness to create drag and stretch effects
- **Drip Blob**: A tertiary element with extreme mass to trail significantly behind, creating liquid strand connections
- **Filter Layer**: Rendering layer where SVG filters are applied to blob elements
- **Content Layer**: Rendering layer containing interactive buttons and text without filters
- **WanderingGhost**: Background animation element that moves across the sidebar for atmospheric effect
- **LayoutGroup**: Framer Motion component that coordinates shared layout animations between elements
- **LayoutId**: Unique identifier for elements participating in shared layout animations

## Requirements

### Requirement 1

**User Story:** As a developer, I want to integrate the HauntedSidebar component into the GhostUI library, so that users can add atmospheric navigation to their applications.

#### Acceptance Criteria

1. WHEN the component is created THEN the system SHALL place the file at packages/ghostui/src/components/HauntedSidebar.tsx
2. WHEN the component is exported THEN the system SHALL add the export to packages/ghostui/src/components/index.ts
3. WHEN the component uses utilities THEN the system SHALL define an inline cn function within the component file
4. WHEN the component is imported THEN the system SHALL be available as a named export from ghostui-react

### Requirement 2

**User Story:** As a developer, I want the HauntedSidebar to accept configurable menu items, so that I can customize the navigation structure for my application.

#### Acceptance Criteria

1. WHEN defining menu items THEN the system SHALL accept an array of objects with id, label, and icon properties
2. WHEN a menu item is defined THEN the system SHALL require id as a unique string identifier
3. WHEN a menu item is defined THEN the system SHALL require label as a display string
4. WHEN a menu item is defined THEN the system SHALL accept icon as an optional React node
5. WHEN no menu items are provided THEN the system SHALL use a default set of themed navigation items

### Requirement 3

**User Story:** As a developer, I want to control the active menu item, so that the sidebar reflects the current application state.

#### Acceptance Criteria

1. WHEN the component accepts activeId prop THEN the system SHALL highlight the corresponding menu item
2. WHEN the component accepts onActiveChange callback THEN the system SHALL invoke it when a menu item is clicked
3. WHEN no activeId is provided THEN the system SHALL manage active state internally with useState
4. WHEN activeId changes THEN the system SHALL animate the blob system to the new position

### Requirement 4

**User Story:** As a developer, I want the 3D goo filter to create realistic liquid effects, so that the active state indicator appears as a morphing blob.

#### Acceptance Criteria

1. WHEN the goo filter renders THEN the system SHALL apply Gaussian blur with standard deviation of 8
2. WHEN the blur result is processed THEN the system SHALL apply a color matrix with values that harden edges
3. WHEN the goo is formed THEN the system SHALL apply specular lighting with surface scale 5, specular constant 1.2, and specular exponent 20
4. WHEN specular lighting is applied THEN the system SHALL use a point light source at coordinates x=-100, y=-200, z=300
5. WHEN the filter composites THEN the system SHALL layer the specular highlights over the goo using appropriate operators

### Requirement 5

**User Story:** As a user, I want the active state indicator to stretch and morph when switching menu items, so that the navigation feels fluid and organic.

#### Acceptance Criteria

1. WHEN the active item changes THEN the system SHALL animate three blob elements: Head, Tail, and Drip
2. WHEN the Head blob animates THEN the system SHALL use spring physics with stiffness 350 and damping 30
3. WHEN the Tail blob animates THEN the system SHALL use spring physics with stiffness 120, damping 18, and mass 3
4. WHEN the Drip blob animates THEN the system SHALL use spring physics with stiffness 80, damping 20, mass 5, and delay 0.05 seconds
5. WHEN blobs animate THEN the system SHALL use Framer Motion layoutId for shared layout transitions

### Requirement 6

**User Story:** As a developer, I want the blob system to be separated from interactive content, so that text remains crisp while liquid effects are applied.

#### Acceptance Criteria

1. WHEN the component renders THEN the system SHALL create two distinct layers: filter layer and content layer
2. WHEN the filter layer renders THEN the system SHALL contain blob elements with SVG filter applied
3. WHEN the content layer renders THEN the system SHALL contain button elements without filter applied
4. WHEN both layers render THEN the system SHALL position them to overlap using absolute positioning
5. WHEN the filter layer is styled THEN the system SHALL apply the goo-3d filter using CSS filter property

### Requirement 7

**User Story:** As a developer, I want blob positions to be calculated dynamically, so that the active indicator moves to the correct menu item location.

#### Acceptance Criteria

1. WHEN calculating blob position THEN the system SHALL use the menu item index multiplied by 52 pixels
2. WHEN the Head blob positions THEN the system SHALL align to the left edge with full width
3. WHEN the Tail blob positions THEN the system SHALL offset left by 16 pixels with 75% width
4. WHEN the Drip blob positions THEN the system SHALL offset left by 40 pixels with 40 pixel width and top offset by 8 pixels
5. WHEN positioning blobs THEN the system SHALL use inline style objects with top property

### Requirement 8

**User Story:** As a user, I want hover feedback on menu items, so that I know which item I'm about to select.

#### Acceptance Criteria

1. WHEN a user hovers over a menu item THEN the system SHALL update hoveredId state
2. WHEN a menu item is hovered and not active THEN the system SHALL display a small indicator dot on the right
3. WHEN the hover indicator appears THEN the system SHALL animate from opacity 0 to 1 with x translation
4. WHEN a menu item is hovered THEN the system SHALL change text color to gray-300
5. WHEN the user stops hovering THEN the system SHALL remove the hover indicator

### Requirement 9

**User Story:** As a user, I want the menu item icon to animate when active or hovered, so that the interaction feels responsive.

#### Acceptance Criteria

1. WHEN a menu item is active THEN the system SHALL scale the icon to 1.1 and translate x by 4 pixels
2. WHEN a menu item is hovered but not active THEN the system SHALL translate the icon x by 2 pixels
3. WHEN a menu item is neither active nor hovered THEN the system SHALL reset icon to scale 1 and x position 0
4. WHEN icon animations occur THEN the system SHALL use Framer Motion animate prop for smooth transitions

### Requirement 10

**User Story:** As a developer, I want atmospheric background elements, so that the sidebar has visual depth and theme consistency.

#### Acceptance Criteria

1. WHEN the sidebar renders THEN the system SHALL display a WanderingGhost component in the background
2. WHEN the WanderingGhost animates THEN the system SHALL move from x -100% to 400% over 25 seconds
3. WHEN the WanderingGhost moves THEN the system SHALL vary y position between 20%, 40%, and 10%
4. WHEN the WanderingGhost animates THEN the system SHALL rotate between -5, 5, and -5 degrees
5. WHEN the animation completes THEN the system SHALL repeat infinitely with linear easing
6. WHEN the sidebar renders THEN the system SHALL display a wood texture overlay at 10% opacity
7. WHEN the sidebar renders THEN the system SHALL apply a gradient from black/80 via transparent to black/80

### Requirement 11

**User Story:** As a developer, I want the sidebar to have a fixed size and themed styling, so that it integrates with the GhostUI design system.

#### Acceptance Criteria

1. WHEN the sidebar renders THEN the system SHALL use width of 288 pixels (w-72)
2. WHEN the sidebar renders THEN the system SHALL use height of 650 pixels
3. WHEN the sidebar renders THEN the system SHALL use background color #0c0a0f
4. WHEN the sidebar renders THEN the system SHALL apply rounded-r-2xl border radius
5. WHEN the sidebar renders THEN the system SHALL display a right border with white/5 opacity
6. WHEN the sidebar renders THEN the system SHALL apply shadow-2xl for depth

### Requirement 12

**User Story:** As a developer, I want the sidebar header to display branding, so that users understand the navigation context.

#### Acceptance Criteria

1. WHEN the header renders THEN the system SHALL display a title with configurable text
2. WHEN the header renders THEN the system SHALL display an icon next to the title
3. WHEN the header renders THEN the system SHALL display a subtitle with uppercase tracking
4. WHEN the header uses default values THEN the system SHALL display "MANOR" as title and "Navigation" as subtitle
5. WHEN the header is styled THEN the system SHALL use font-serif for the title with tracking-widest

### Requirement 13

**User Story:** As a developer, I want the sidebar footer to display action buttons, so that users can access settings and logout functionality.

#### Acceptance Criteria

1. WHEN the footer renders THEN the system SHALL display a border-top separator
2. WHEN the footer renders THEN the system SHALL display a Configuration button with Settings icon
3. WHEN the footer renders THEN the system SHALL display an Abandon button with LogOut icon
4. WHEN footer buttons are hovered THEN the system SHALL change text color and apply background tint
5. WHEN the Abandon button is styled THEN the system SHALL use red-900 color scheme

### Requirement 14

**User Story:** As a developer, I want to create comprehensive documentation for the HauntedSidebar, so that users understand how to implement and customize the component.

#### Acceptance Criteria

1. WHEN documentation is created THEN the system SHALL create a page at apps/docs/app/docs/components/haunted-sidebar/page.tsx
2. WHEN the documentation renders THEN the system SHALL display component description and use cases
3. WHEN the documentation renders THEN the system SHALL show a live interactive preview
4. WHEN the documentation renders THEN the system SHALL display a props table with all configurable properties
5. WHEN the documentation renders THEN the system SHALL include code examples for basic usage
6. WHEN the documentation renders THEN the system SHALL include examples for controlled and uncontrolled modes
7. WHEN the documentation renders THEN the system SHALL include examples for custom menu items
8. WHEN the documentation renders THEN the system SHALL explain the blob animation system
9. WHEN the documentation renders THEN the system SHALL document the goo filter technical details

### Requirement 15

**User Story:** As a developer, I want the sidebar to be added to the documentation navigation, so that users can discover the component.

#### Acceptance Criteria

1. WHEN the sidebar navigation is updated THEN the system SHALL add HauntedSidebar to the Components section
2. WHEN the navigation item is added THEN the system SHALL use href /docs/components/haunted-sidebar
3. WHEN the navigation item is added THEN the system SHALL use an appropriate icon
4. WHEN the navigation is rendered THEN the system SHALL display HauntedSidebar in alphabetical order within its section

### Requirement 16

**User Story:** As a developer, I want the component to support TypeScript, so that users get type safety and autocomplete.

#### Acceptance Criteria

1. WHEN the component is defined THEN the system SHALL export a HauntedSidebarProps interface
2. WHEN the props interface is defined THEN the system SHALL include menuItems as optional MenuItem array
3. WHEN the props interface is defined THEN the system SHALL include activeId as optional string
4. WHEN the props interface is defined THEN the system SHALL include onActiveChange as optional callback function
5. WHEN the props interface is defined THEN the system SHALL include className as optional string
6. WHEN the props interface is defined THEN the system SHALL include title and subtitle as optional strings
7. WHEN MenuItem type is defined THEN the system SHALL include id, label, and optional icon properties

### Requirement 17

**User Story:** As a developer, I want the component to handle edge cases gracefully, so that the application remains stable.

#### Acceptance Criteria

1. WHEN no menu items are provided THEN the system SHALL render with default menu items
2. WHEN an invalid activeId is provided THEN the system SHALL not render any active blob
3. WHEN menu items array is empty THEN the system SHALL render the sidebar structure without navigation items
4. WHEN onActiveChange is not provided THEN the system SHALL still update internal state on click
5. WHEN a menu item has no icon THEN the system SHALL render the label without icon spacing issues

### Requirement 18

**User Story:** As a developer, I want the component to be accessible, so that all users can navigate effectively.

#### Acceptance Criteria

1. WHEN menu items render THEN the system SHALL use semantic button elements
2. WHEN buttons are rendered THEN the system SHALL be keyboard navigable with tab order
3. WHEN buttons receive focus THEN the system SHALL display a visible focus outline
4. WHEN buttons are activated THEN the system SHALL respond to Enter and Space keys
5. WHEN the component renders THEN the system SHALL use nav element for semantic navigation structure
