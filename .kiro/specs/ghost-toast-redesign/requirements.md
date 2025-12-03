# Requirements Document

## Introduction

This specification defines the complete redesign of the GhostToast notification component. The new design replaces the traditional toast notification system with a whimsical, spooky character-based notification system featuring an animated ghost character that delivers messages from either side of the screen. The redesign introduces a more playful, chaotic aesthetic with randomized positioning, rotation, and scaling to create a dynamic "haunted" feel. This upgrade affects the core component package, the documentation site, and all related APIs.

## Glossary

- **GhostToast Component**: The React component that renders individual toast notifications with an animated ghost character
- **Toast Provider**: The context provider component that manages toast state and rendering
- **Toast Hook**: The React hook (`useGhostToast`) that provides the API for triggering toast notifications
- **Ghost Character**: The custom SVG illustration of a ghost that appears with each toast notification
- **Side Positioning**: The randomized left or right screen edge from which toasts appear
- **Chaotic Stacking**: The randomized scale, rotation, and offset applied to each toast for visual variety
- **Speech Bubble**: The message container styled as a speech bubble with a connection arrow to the ghost
- **Toast Type**: The notification category, either 'info' (purple theme) or 'curse' (red theme)
- **Component Package**: The ghostui React component library located in `packages/ghostui`
- **Documentation App**: The Next.js documentation site located in `apps/docs`

## Requirements

### Requirement 1

**User Story:** As a developer, I want to integrate the new GhostToast system into my application, so that I can display whimsical character-based notifications to users.

#### Acceptance Criteria

1. WHEN a developer wraps their application with GhostToastProvider THEN the system SHALL make the toast API available to all child components
2. WHEN a developer calls the `addToast` function with a message THEN the system SHALL display a ghost character with the message in a speech bubble
3. WHEN a toast is displayed THEN the system SHALL automatically dismiss it after 5 seconds
4. WHEN a developer imports the component THEN the system SHALL provide TypeScript type definitions for all props and hook return values
5. WHERE the provider is used THEN the system SHALL render a fixed-position container that does not interfere with page layout

### Requirement 2

**User Story:** As a developer, I want to trigger toast notifications with different severity levels, so that I can communicate different types of messages to users.

#### Acceptance Criteria

1. WHEN a developer calls `addToast` with type 'info' THEN the system SHALL display a purple-themed toast with purple text and borders
2. WHEN a developer calls `addToast` with type 'curse' THEN the system SHALL display a red-themed toast with red text and borders
3. WHEN no type is specified THEN the system SHALL default to 'info' type
4. WHEN a toast type is set THEN the system SHALL apply the corresponding color scheme to both the speech bubble and its border

### Requirement 3

**User Story:** As a user, I want toast notifications to appear with dynamic, varied positioning, so that the interface feels lively and unpredictable.

#### Acceptance Criteria

1. WHEN a toast is created THEN the system SHALL randomly assign it to appear from either the left or right side of the screen
2. WHEN a toast is created THEN the system SHALL apply a random scale factor between 0.85 and 1.1
3. WHEN a toast is created THEN the system SHALL apply a random rotation between -15 and 15 degrees
4. WHEN a toast is created THEN the system SHALL apply a random horizontal offset between 0 and 60 pixels
5. WHEN multiple toasts are displayed THEN the system SHALL stack them vertically with each having independent randomization

### Requirement 4

**User Story:** As a user, I want to see smooth, spring-based animations when toasts appear and disappear, so that the notifications feel polished and engaging.

#### Acceptance Criteria

1. WHEN a toast appears THEN the system SHALL animate it from completely off-screen (150% offset) with initial rotation matching the entry direction
2. WHEN a toast appears THEN the system SHALL use spring physics with stiffness 400, damping 25, and mass 0.8 for a snappy feel
3. WHEN a toast is dismissed THEN the system SHALL animate it back off-screen with a scale reduction to 0.8 over 0.4 seconds
4. WHEN a toast exits THEN the system SHALL use a "backIn" easing function for the retraction animation
5. WHEN toasts are stacked THEN the system SHALL use layout animations to smoothly reposition remaining toasts

### Requirement 5

**User Story:** As a user, I want to manually dismiss toast notifications, so that I can clear messages I've already read.

#### Acceptance Criteria

1. WHEN a user clicks the X button on a toast THEN the system SHALL immediately trigger the exit animation and remove the toast
2. WHEN a toast is dismissed THEN the system SHALL remove it from the toast array state
3. WHEN the X button is hovered THEN the system SHALL increase its opacity from 40% to 100%
4. WHEN the X button is rendered THEN the system SHALL be positioned in the top-right corner of the speech bubble

### Requirement 6

**User Story:** As a developer, I want the ghost character to be visually consistent and animated, so that it enhances the whimsical theme of the notifications.

#### Acceptance Criteria

1. WHEN a toast is displayed THEN the system SHALL render a custom SVG ghost character with body, eyes, mouth, hand, and tail elements
2. WHEN the ghost is rendered THEN the system SHALL apply a blinking animation to the eyes that repeats every 4 seconds
3. WHEN a toast appears from the right side THEN the system SHALL display the ghost facing left (default orientation)
4. WHEN a toast appears from the left side THEN the system SHALL flip the ghost horizontally using scale-x-[-1]
5. WHEN the ghost is rendered THEN the system SHALL apply a drop-shadow filter for depth

### Requirement 7

**User Story:** As a user, I want the speech bubble to visually connect to the ghost character, so that it's clear the ghost is delivering the message.

#### Acceptance Criteria

1. WHEN a toast is displayed THEN the system SHALL render a triangular arrow connecting the speech bubble to the ghost
2. WHEN the toast is on the right side THEN the system SHALL position the arrow on the right edge of the bubble pointing right
3. WHEN the toast is on the left side THEN the system SHALL position the arrow on the left edge of the bubble pointing left
4. WHEN the arrow is rendered THEN the system SHALL match the background color and border color of the speech bubble
5. WHEN the arrow is rendered THEN the system SHALL be positioned at the vertical center of the speech bubble

### Requirement 8

**User Story:** As a developer, I want to update the documentation site with the new GhostToast design, so that users can learn how to use the redesigned component.

#### Acceptance Criteria

1. WHEN a user visits the ghost-toast documentation page THEN the system SHALL display an interactive demo with "Summon Spirit" and "Invoke Curse" buttons
2. WHEN the documentation page loads THEN the system SHALL show code examples demonstrating the new API
3. WHEN the documentation displays the API reference THEN the system SHALL document the `addToast` function signature and parameters
4. WHEN the documentation shows props tables THEN the system SHALL list all provider props and hook return values
5. WHEN the demo buttons are clicked THEN the system SHALL trigger toasts with appropriate messages and types

### Requirement 9

**User Story:** As a developer, I want the component to be accessible and properly structured, so that it works well with assistive technologies.

#### Acceptance Criteria

1. WHEN the toast container is rendered THEN the system SHALL use pointer-events-none on the container and pointer-events-auto on individual toasts
2. WHEN a toast is displayed THEN the system SHALL ensure the message text has sufficient contrast against the background
3. WHEN the close button is rendered THEN the system SHALL include appropriate ARIA labels or accessible text
4. WHEN toasts are stacked THEN the system SHALL use appropriate z-index values to ensure proper layering
5. WHEN the component is rendered THEN the system SHALL not interfere with keyboard navigation or screen reader functionality

### Requirement 10

**User Story:** As a developer, I want the component to export all necessary types and utilities, so that I can use it with full TypeScript support.

#### Acceptance Criteria

1. WHEN a developer imports from the package THEN the system SHALL export GhostToastProvider as a named export
2. WHEN a developer imports from the package THEN the system SHALL export useGhostToast as a named export
3. WHEN a developer uses TypeScript THEN the system SHALL provide type definitions for ToastType ('info' | 'curse')
4. WHEN a developer uses TypeScript THEN the system SHALL provide type definitions for the addToast function signature
5. WHEN the component is imported THEN the system SHALL include all necessary dependencies (framer-motion, lucide-react, clsx, tailwind-merge)
