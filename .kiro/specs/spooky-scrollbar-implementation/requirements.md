# Requirements Document

## Introduction

The SpookyScrollbar is a custom scrollbar component that replaces native browser scrollbars with a themed, interactive experience featuring animated ghost characters. The component provides a peeking ghost that appears on hover/drag and a jump scare ghost that appears when users scroll to the bottom of content. This component enhances the spooky aesthetic of the GhostUI library while maintaining full scrolling functionality.

## Glossary

- **SpookyScrollbar**: The main component that wraps scrollable content and provides custom scrollbar functionality
- **Scrollbar Track**: The vertical bar on the right side of the content area where the thumb moves
- **Scrollbar Thumb**: The draggable element within the track that indicates scroll position
- **PeekingGhost**: An SVG ghost character that appears when hovering over or dragging the scrollbar thumb
- **JumpScareGhost**: A larger SVG ghost character that appears with an overlay when scrolling reaches the bottom
- **Content Area**: The scrollable region containing user content
- **Scroll Ratio**: The proportional position of the scroll thumb relative to content height
- **Jump Scare Trigger**: The event that occurs when scrolling within 10px of the bottom

## Requirements

### Requirement 1

**User Story:** As a user, I want to scroll through content using a custom-styled scrollbar, so that I can navigate content while experiencing the spooky theme.

#### Acceptance Criteria

1. WHEN content exceeds the container height THEN the SpookyScrollbar SHALL display a custom scrollbar track on the right side
2. WHEN the user scrolls the content THEN the scrollbar thumb SHALL move proportionally to reflect the current scroll position
3. WHEN the content height changes THEN the scrollbar thumb height SHALL adjust proportionally to the visible content ratio
4. WHEN the scrollbar thumb is dragged THEN the content SHALL scroll to the corresponding position
5. THE SpookyScrollbar SHALL hide the native browser scrollbar while maintaining scroll functionality

### Requirement 2

**User Story:** As a user, I want to see a peeking ghost when I interact with the scrollbar, so that I have visual feedback and an engaging experience.

#### Acceptance Criteria

1. WHEN the user hovers over the scrollbar thumb THEN the PeekingGhost SHALL appear to the left of the thumb with a speech bubble
2. WHEN the user drags the scrollbar thumb THEN the PeekingGhost SHALL remain visible during the drag operation
3. WHEN the user stops hovering and is not dragging THEN the PeekingGhost SHALL disappear with an exit animation
4. WHEN the PeekingGhost appears THEN it SHALL animate in with a spring motion from the right
5. WHEN the PeekingGhost is visible THEN it SHALL display the text "Boo! Scrolled ya!" in a speech bubble

### Requirement 3

**User Story:** As a user, I want to see a jump scare effect when I reach the bottom of the content, so that I experience a surprising and memorable interaction.

#### Acceptance Criteria

1. WHEN the user scrolls within 10 pixels of the bottom THEN the JumpScareGhost SHALL appear with a dark overlay
2. WHEN the JumpScareGhost appears THEN it SHALL animate from the bottom with a spring motion and scale effect
3. WHEN the JumpScareGhost is visible THEN it SHALL display the text "The End Is Here" above the ghost
4. WHEN the user scrolls away from the bottom THEN the JumpScareGhost SHALL disappear with an exit animation
5. WHEN the JumpScareGhost overlay is visible THEN it SHALL apply a backdrop blur effect to the content

### Requirement 4

**User Story:** As a developer, I want the SpookyScrollbar to accept children and className props, so that I can integrate it into various layouts with custom styling.

#### Acceptance Criteria

1. THE SpookyScrollbar SHALL accept a children prop containing the scrollable content
2. THE SpookyScrollbar SHALL accept an optional className prop for custom styling
3. WHEN className is provided THEN it SHALL be merged with default classes using the cn utility
4. THE SpookyScrollbar SHALL render children within the scrollable content area
5. THE SpookyScrollbar SHALL maintain proper z-index layering for content, scrollbar, and overlays

### Requirement 5

**User Story:** As a user, I want the scrollbar to provide visual feedback on hover, so that I know the scrollbar is interactive.

#### Acceptance Criteria

1. WHEN the user hovers over the scrollbar track THEN the track background SHALL change to a lighter shade
2. WHEN the user hovers over the scrollbar thumb THEN the thumb background SHALL change from purple-500/50 to purple-500
3. WHEN the user hovers over or drags the thumb THEN a purple glow effect SHALL appear around the thumb
4. WHEN the user stops hovering THEN all hover effects SHALL transition smoothly back to default state
5. THE scrollbar track SHALL display a rounded border with white/10 opacity

### Requirement 6

**User Story:** As a user, I want smooth dragging behavior when moving the scrollbar thumb, so that I can precisely control scroll position.

#### Acceptance Criteria

1. WHEN the user clicks on the scrollbar thumb THEN dragging mode SHALL be activated
2. WHILE dragging THEN the content SHALL scroll continuously as the mouse moves vertically
3. WHEN the user releases the mouse button THEN dragging mode SHALL be deactivated
4. WHILE dragging THEN text selection SHALL be prevented on the page
5. WHEN dragging ends THEN text selection SHALL be restored

### Requirement 7

**User Story:** As a developer, I want the component to handle dynamic content changes, so that the scrollbar updates correctly when content is added or removed.

#### Acceptance Criteria

1. WHEN content is added or removed THEN the scrollbar thumb height SHALL recalculate automatically
2. WHEN the container is resized THEN the scrollbar SHALL update its dimensions accordingly
3. THE SpookyScrollbar SHALL use a ResizeObserver to detect content dimension changes
4. WHEN content becomes shorter than the container THEN the scrollbar SHALL hide or adjust appropriately
5. THE scrollbar calculations SHALL maintain accuracy across all content size changes

### Requirement 8

**User Story:** As a user, I want the ghost animations to be smooth and performant, so that the scrolling experience feels polished.

#### Acceptance Criteria

1. THE PeekingGhost SHALL use framer-motion for spring-based animations
2. THE JumpScareGhost SHALL use framer-motion for entrance and exit animations
3. THE ghost floating animation SHALL use CSS keyframes for continuous motion
4. WHEN animations trigger THEN they SHALL complete at 60 frames per second without dropped frames
5. THE SpookyScrollbar SHALL use AnimatePresence for proper mount/unmount animations

### Requirement 9

**User Story:** As a developer, I want to see the SpookyScrollbar demonstrated in the docs app, so that I can understand how to use it and see it in action.

#### Acceptance Criteria

1. THE docs app SHALL include a dedicated page at /docs/components/spooky-scrollbar
2. WHEN viewing the documentation page THEN it SHALL display a live interactive demo
3. THE demo SHALL show scrollable content with placeholder text and blocks
4. THE documentation SHALL include code examples showing component usage
5. THE documentation SHALL include a props table describing available properties
