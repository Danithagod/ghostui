# Requirements Document

## Introduction

This specification defines the requirements for upgrading the GooeyButton component with enhanced visual effects, improved animation architecture, and better user interaction feedback. The upgrade introduces specular lighting effects, body wobble animations, click splash effects, and a restructured rendering architecture that separates filtered liquid layers from crisp text content.

## Glossary

- **GooeyButton**: A React button component that uses SVG filters and animations to create a liquid, gooey visual effect
- **Specular Lighting**: An SVG filter effect that simulates light reflection on glossy surfaces, creating shine and glare
- **Body Wobble**: An organic breathing animation applied to the button body during hover state
- **Drip Elements**: Small circular shapes that animate downward from the button to simulate liquid dripping
- **Splash Effect**: A radial expansion animation triggered on button click to simulate liquid ripple
- **Filter Layer**: The rendering layer where SVG filters are applied to create gooey effects
- **Content Layer**: The rendering layer containing text and interactive elements, kept outside filters for clarity
- **Fluidity Config**: Configuration object controlling animation duration and displacement intensity
- **Theme Config**: Configuration object defining colors and visual styling for button variants

## Requirements

### Requirement 1

**User Story:** As a developer, I want to integrate specular lighting effects into the GooeyButton, so that the button appears more three-dimensional with realistic shine and glare.

#### Acceptance Criteria

1. WHEN the GooeyButton renders THEN the system SHALL apply an SVG specular lighting filter with surface scale, specular constant, and specular exponent parameters
2. WHEN specular lighting is applied THEN the system SHALL composite the shine effect onto the goo filter result using appropriate blend modes
3. WHEN the lighting is configured THEN the system SHALL use a distant light source with azimuth 225 degrees and elevation 45 degrees
4. WHEN the filter processes THEN the system SHALL blur the goo result before applying specular lighting to create smooth highlights

### Requirement 2

**User Story:** As a user, I want the button body to animate with organic wobble during hover, so that the button feels alive and responsive to my interaction.

#### Acceptance Criteria

1. WHEN a user hovers over the GooeyButton THEN the system SHALL animate the button body with scale variations creating a breathing effect
2. WHEN the wobble animation runs THEN the system SHALL use scale values that oscillate between 0.98 and 1.02 with smooth easing
3. WHEN the animation repeats THEN the system SHALL use mirror repeat type to create organic in-out breathing motion
4. WHEN the user stops hovering THEN the system SHALL return the button body to its initial scale state
5. WHEN the user taps the button THEN the system SHALL apply a scale-down effect to 0.95 for tactile feedback

### Requirement 3

**User Story:** As a user, I want to see a splash effect when I click the button, so that I receive immediate visual feedback for my action.

#### Acceptance Criteria

1. WHEN a user clicks the GooeyButton THEN the system SHALL trigger a radial splash animation from the button center
2. WHEN the splash animates THEN the system SHALL scale from 0.8 to 1.8 while fading opacity from 1 to 0
3. WHEN the splash completes THEN the system SHALL remove the animation element from the DOM
4. WHEN multiple clicks occur THEN the system SHALL create independent splash animations for each click using unique keys

### Requirement 4

**User Story:** As a developer, I want the rendering architecture to separate filtered liquid layers from text content, so that text remains crisp while liquid effects are applied.

#### Acceptance Criteria

1. WHEN the GooeyButton renders THEN the system SHALL create two distinct rendering layers: filter layer and content layer
2. WHEN the filter layer renders THEN the system SHALL contain the button body, drip elements, and splash effects with SVG filter applied
3. WHEN the content layer renders THEN the system SHALL contain the button element with text and interaction handlers without filter applied
4. WHEN both layers render THEN the system SHALL position them to overlap perfectly using absolute positioning
5. WHEN the glow ring renders THEN the system SHALL position it behind all other layers with negative z-index

### Requirement 5

**User Story:** As a developer, I want drip elements to originate from inside the button body, so that the dripping animation appears more natural and integrated.

#### Acceptance Criteria

1. WHEN drip elements are positioned THEN the system SHALL place them at bottom 50% (inside the button boundary)
2. WHEN drip elements animate THEN the system SHALL use transform origin set to top for proper pivot point
3. WHEN drip animation runs THEN the system SHALL apply vertical stretch (scaleY) and horizontal compression (scaleX) for organic deformation
4. WHEN multiple drips render THEN the system SHALL position them at 25%, 50%, and 75% horizontal positions

### Requirement 6

**User Story:** As a developer, I want to adjust fluidity displacement values, so that animations are more subtle and appropriate for the gooey effect.

#### Acceptance Criteria

1. WHEN fluidity is set to low THEN the system SHALL use displacement value of 15 pixels
2. WHEN fluidity is set to medium THEN the system SHALL use displacement value of 25 pixels
3. WHEN fluidity is set to high THEN the system SHALL use displacement value of 35 pixels
4. WHEN drip animation uses displacement THEN the system SHALL apply the value to vertical translation and scale transformations

### Requirement 7

**User Story:** As a developer, I want the glow ring to respond to hover state, so that the button provides clear visual feedback for interactivity.

#### Acceptance Criteria

1. WHEN the button is not hovered THEN the system SHALL render the glow ring with 60% opacity and scale 1.0
2. WHEN the button is hovered THEN the system SHALL transition the glow ring to 100% opacity and scale 1.05
3. WHEN the glow transitions THEN the system SHALL use a 300ms duration for smooth animation
4. WHEN the button is disabled THEN the system SHALL maintain glow behavior but prevent interaction

### Requirement 8

**User Story:** As a developer, I want to remove the tooltip integration from GooeyButton, so that the component has a single clear responsibility.

#### Acceptance Criteria

1. WHEN the GooeyButton component is defined THEN the system SHALL not extend WithTooltipProps interface
2. WHEN the GooeyButton renders THEN the system SHALL not conditionally wrap with SpookyTooltip component
3. WHEN the GooeyButton props are defined THEN the system SHALL not include tooltip, tooltipPosition, or tooltipClassName properties
4. WHEN developers need tooltip functionality THEN the system SHALL allow manual wrapping of GooeyButton with SpookyTooltip

### Requirement 9

**User Story:** As a developer, I want the component to handle click events properly, so that both splash animation and user-provided onClick handlers execute correctly.

#### Acceptance Criteria

1. WHEN a user clicks the button THEN the system SHALL increment the clickKey state to trigger splash animation
2. WHEN the clickKey updates THEN the system SHALL invoke the user-provided onClick handler if present
3. WHEN the onClick handler is invoked THEN the system SHALL pass the original click event object
4. WHEN no onClick handler is provided THEN the system SHALL still trigger the splash animation

### Requirement 10

**User Story:** As a developer, I want the component to use inline cn utility function, so that the component is self-contained and doesn't rely on external utility imports.

#### Acceptance Criteria

1. WHEN the component file is parsed THEN the system SHALL define a cn function within the component file
2. WHEN the cn function is called THEN the system SHALL merge Tailwind classes using clsx and tailwind-merge
3. WHEN the component uses className merging THEN the system SHALL call the inline cn function
4. WHEN the component is imported THEN the system SHALL not import cn from external lib/utils module
