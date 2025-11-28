# Requirements Document

## Introduction

This specification defines the requirements for implementing the WhisperBox component into the GhostUI library and integrating it into the documentation application. The WhisperBox is a haunted textarea field with dynamic energy-based effects including ectoplasm border distortion, floating runic symbols, whisper glow effects, and a spirit status indicator that responds to typing intensity.

## Glossary

- **WhisperBox**: A themed textarea component with supernatural visual effects that respond to typing intensity, including SVG filter distortions, floating runes, and energy-based animations
- **GhostUI Library**: The React component library package located at `packages/ghostui`
- **Docs App**: The Next.js documentation application located at `apps/docs`
- **Ectoplasm Border**: An SVG filter-based distortion effect applied to the border that creates a turbulent, supernatural appearance
- **Energy System**: A dynamic value (0-100) that increases with typing activity and decreases over time, controlling the intensity of visual effects
- **Floating Runes**: Ancient runic symbols that appear and animate in the background when energy exceeds threshold levels
- **Whisper Glow**: A pulsing glow effect around the textarea that intensifies based on typing energy
- **Status Indicator**: An icon (Ghost or Sparkles) in the bottom-right corner that changes based on energy level
- **Runic Symbols**: Ancient alphabet characters (᚛, ᚜, ᚠ, ᚢ, ᚦ, etc.) displayed in Cinzel font

## Requirements

### Requirement 1

**User Story:** As a developer using GhostUI, I want to import and use the WhisperBox component, so that I can add haunted textarea fields to my application.

#### Acceptance Criteria

1. WHEN the WhisperBox component is exported from the GhostUI package THEN the system SHALL be available for import by consuming applications
2. WHEN a developer imports WhisperBox THEN the system SHALL provide TypeScript type definitions for all props
3. WHEN the component is rendered THEN the system SHALL display a textarea field with the provided label
4. WHEN the component receives standard HTML textarea attributes THEN the system SHALL forward those attributes to the underlying textarea element
5. WHEN a ref is provided to WhisperBox THEN the system SHALL forward the ref to the underlying textarea element

### Requirement 2

**User Story:** As a user typing in the WhisperBox, I want the visual effects to respond to my typing intensity, so that I feel the spirits reacting to my input.

#### Acceptance Criteria

1. WHEN a user types in the textarea THEN the system SHALL increase the energy value by 15 points per keystroke up to a maximum of 100
2. WHEN no typing occurs THEN the system SHALL decrease the energy value by 5 points every 100 milliseconds until it reaches 0
3. WHEN energy increases THEN the system SHALL intensify the whisper glow opacity proportionally to energy level
4. WHEN energy increases THEN the system SHALL increase the SVG turbulence distortion scale proportionally to energy level
5. WHEN energy exceeds 10 THEN the system SHALL display floating runic symbols with opacity based on energy level

### Requirement 3

**User Story:** As a user interacting with the WhisperBox, I want visual feedback when I focus the textarea, so that I understand the field is active.

#### Acceptance Criteria

1. WHEN the textarea receives focus THEN the system SHALL display the ectoplasm border distortion effect
2. WHEN the textarea receives focus THEN the system SHALL move the label upward and change its color to purple
3. WHEN the textarea receives focus THEN the system SHALL increase the box shadow intensity
4. WHEN the textarea loses focus and has no text THEN the system SHALL return the label to its original position
5. WHEN the textarea loses focus THEN the system SHALL reduce the ectoplasm border opacity to 0

### Requirement 4

**User Story:** As a user, I want to see floating runic symbols appear when I type actively, so that the supernatural atmosphere intensifies with my engagement.

#### Acceptance Criteria

1. WHEN energy exceeds 10 THEN the system SHALL render 6 floating runic symbols at random positions
2. WHEN runic symbols appear THEN the system SHALL animate them with fade-in and scale effects
3. WHEN runic symbols are visible THEN the system SHALL apply random rotation transforms to each symbol
4. WHEN energy drops below 10 THEN the system SHALL animate the runic symbols fading out with scale-up effect
5. WHEN runic symbols animate THEN the system SHALL use random positions within 10-90% width and 10-90% height of the container

### Requirement 5

**User Story:** As a user, I want to see a status indicator that reflects my typing activity, so that I can see when the spirits are highly active.

#### Acceptance Criteria

1. WHEN energy exceeds 50 THEN the system SHALL display a spinning Sparkles icon in purple
2. WHEN energy is 50 or below and textarea is focused THEN the system SHALL display a Ghost icon in dark purple
3. WHEN energy is 50 or below and textarea is unfocused THEN the system SHALL display a Ghost icon in very dark purple with low opacity
4. WHEN the status indicator changes THEN the system SHALL transition smoothly over 500 milliseconds
5. WHEN the status indicator is displayed THEN the system SHALL position it in the bottom-right corner of the textarea

### Requirement 6

**User Story:** As a user, I want the ectoplasm border to have a living, turbulent appearance, so that the textarea feels supernatural and alive.

#### Acceptance Criteria

1. WHEN the component renders THEN the system SHALL define an SVG filter with fractal noise turbulence
2. WHEN the SVG filter is active THEN the system SHALL animate the baseFrequency attribute continuously over 15 seconds
3. WHEN energy increases THEN the system SHALL increase the displacement scale from base 20 to maximum 70
4. WHEN the textarea is focused THEN the system SHALL apply the ectoplasm filter to the border background element
5. WHEN the ectoplasm border is visible THEN the system SHALL display it with purple coloring and semi-transparent opacity

### Requirement 7

**User Story:** As a developer, I want to customize the WhisperBox appearance and behavior, so that I can adapt it to different contexts in my application.

#### Acceptance Criteria

1. WHEN a className prop is provided THEN the system SHALL merge the custom classes with the default textarea styles
2. WHEN a custom label is provided THEN the system SHALL display that label instead of the default "Invoke the Spirits"
3. WHEN custom styles are applied THEN the system SHALL preserve the core animation and energy-based behaviors
4. WHEN the component is rendered THEN the system SHALL apply a maximum width constraint of 36rem (max-w-xl)
5. WHEN the component is rendered THEN the system SHALL use a minimum height of 160px for the textarea

### Requirement 8

**User Story:** As a user, I want the WhisperBox to have decorative corner accents, so that the supernatural aesthetic is enhanced.

#### Acceptance Criteria

1. WHEN the component renders THEN the system SHALL display corner accent borders in all four corners
2. WHEN corner accents are displayed THEN the system SHALL use purple borders with 40% opacity
3. WHEN corner accents are displayed THEN the system SHALL position them absolutely at each corner
4. WHEN corner accents are displayed THEN the system SHALL make them 4x4 pixels in size
5. WHEN corner accents are displayed THEN the system SHALL apply appropriate border-radius to match corner positions

### Requirement 9

**User Story:** As a developer reading the documentation, I want to see the WhisperBox component demonstrated in the docs app, so that I can understand how to use it.

#### Acceptance Criteria

1. WHEN a user navigates to the WhisperBox documentation page THEN the system SHALL display an interactive component playground
2. WHEN the documentation page loads THEN the system SHALL show code examples demonstrating basic usage
3. WHEN the documentation page loads THEN the system SHALL display a props table documenting all available properties
4. WHEN the playground is rendered THEN the system SHALL demonstrate the energy system responding to typing
5. WHEN the playground is rendered THEN the system SHALL demonstrate the floating runes appearing at high energy levels

### Requirement 10

**User Story:** As a developer, I want the WhisperBox to support all standard textarea behaviors, so that it works seamlessly in forms.

#### Acceptance Criteria

1. WHEN the component receives onChange events THEN the system SHALL invoke the provided onChange handler
2. WHEN the component receives onFocus events THEN the system SHALL invoke the provided onFocus handler after updating internal state
3. WHEN the component receives onBlur events THEN the system SHALL invoke the provided onBlur handler after updating internal state
4. WHEN the component is used in a form THEN the system SHALL support form submission and validation
5. WHEN the component receives a placeholder prop THEN the system SHALL display the placeholder text in the textarea field

### Requirement 11

**User Story:** As a user, I want the WhisperBox to have a dark, mystical appearance, so that it fits the haunted aesthetic of GhostUI.

#### Acceptance Criteria

1. WHEN the component renders THEN the system SHALL use a dark background color (#0a0510) with 80% opacity
2. WHEN the component renders THEN the system SHALL apply backdrop blur for a frosted glass effect
3. WHEN the component renders THEN the system SHALL use purple text color (#e9d5ff range) for input text
4. WHEN the component renders THEN the system SHALL use a serif font family for the textarea text
5. WHEN the component renders THEN the system SHALL style text selection with purple background and white text

### Requirement 12

**User Story:** As a developer, I want the WhisperBox label to animate smoothly, so that the user experience feels polished and supernatural.

#### Acceptance Criteria

1. WHEN the textarea is empty and unfocused THEN the system SHALL position the label inside the textarea at top-left
2. WHEN the textarea receives focus or contains text THEN the system SHALL translate the label upward by 7 units
3. WHEN the label moves THEN the system SHALL reduce its font size to 10px
4. WHEN the label moves THEN the system SHALL change its color to purple (#a78bfa)
5. WHEN the label animates THEN the system SHALL transition smoothly over 300 milliseconds
