# Requirements Document

## Introduction

This specification defines the refactoring of the BatBurst component to use a new implementation based on the provided BatDivider code. The refactored component will feature enhanced physics-based animations with cursor repulsion mechanics, a jumpscare effect, and improved visual fidelity using the proper bat SVG asset. The component will maintain backward compatibility with the existing API while introducing new interactive behaviors.

## Glossary

- **BatBurst**: The component being refactored that displays an animated bat effect
- **Jumpscare Effect**: A sudden, dramatic animation where a large bat appears and scales up rapidly
- **Repulsion Physics**: A physics-based animation system where bats flee from the cursor position
- **Spring Animation**: A physics-based animation that simulates spring-like motion with stiffness and damping
- **Home Position**: The default resting position of a bat on screen before cursor interaction
- **Trigger Button**: A UI element that activates the bat burst effect
- **AnimatedBat**: An individual bat entity with physics-based movement
- **Swarm**: The collection of multiple AnimatedBat instances
- **BatIcon**: The SVG component representing the bat visual asset

## Requirements

### Requirement 1

**User Story:** As a developer, I want to trigger a bat burst effect with a simple button click, so that I can create spooky interactive experiences in my application.

#### Acceptance Criteria

1. WHEN a user clicks the trigger button THEN the system SHALL activate the bat burst effect
2. WHEN the bat burst effect is activated THEN the system SHALL display a jumpscare bat animation
3. WHEN the jumpscare animation completes THEN the system SHALL transition to the interactive swarm state
4. WHEN the effect is deactivated THEN the system SHALL clean up all animations and return to idle state
5. THE system SHALL provide a callback mechanism for when the effect completes

### Requirement 2

**User Story:** As a user, I want to see a dramatic jumpscare effect when the bat burst is triggered, so that I experience an impactful horror-themed animation.

#### Acceptance Criteria

1. WHEN the jumpscare effect triggers THEN the system SHALL display a large bat that scales from 0.2 to 5 times its size
2. WHEN the jumpscare bat animates THEN the system SHALL move the bat from y position 300 to 0
3. WHEN the jumpscare bat exits THEN the system SHALL scale the bat to 8 times its size and move it to y position -200
4. THE jumpscare animation SHALL complete within 600 milliseconds for the entrance
5. THE jumpscare bat SHALL use the provided BatIcon SVG with specific styling including drop shadow and blur effects

### Requirement 3

**User Story:** As a user, I want bats to react to my cursor movement with realistic physics, so that the interaction feels dynamic and engaging.

#### Acceptance Criteria

1. WHEN the cursor moves within 300 pixels of a bat's home position THEN the system SHALL apply repulsion force to that bat
2. WHEN repulsion force is applied THEN the system SHALL calculate the force based on distance with closer distances producing stronger repulsion
3. WHEN a bat is repelled THEN the system SHALL animate the bat using spring physics with stiffness 60 and damping 15
4. WHEN the cursor moves away THEN the system SHALL return the bat to its home position using spring animation
5. WHEN a bat is repelled THEN the system SHALL rotate the bat up to 45 degrees in the direction away from the cursor

### Requirement 4

**User Story:** As a developer, I want to configure the bat swarm with specific positions and properties, so that I can customize the visual appearance of the effect.

#### Acceptance Criteria

1. THE system SHALL support configuring individual bat size in pixels
2. THE system SHALL support configuring bat home position as percentage coordinates (0-100) for x and y axes
3. THE system SHALL support configuring bat opacity values between 0 and 1
4. THE system SHALL support configuring blur effects for individual bats
5. THE system SHALL render at least 10 bats in the swarm with varied sizes and positions

### Requirement 5

**User Story:** As a user, I want to see bats flapping their wings continuously, so that the animation appears lifelike and organic.

#### Acceptance Criteria

1. WHEN a bat is visible THEN the system SHALL animate the bat with a flapping motion
2. THE flapping animation SHALL alternate between scaleY 1 and 0.4 and scaleX 1 and 0.8
3. WHEN multiple bats are displayed THEN the system SHALL vary the flapping duration between 0.1 and 0.2 seconds per bat
4. THE flapping animation SHALL use ease-in-out timing and alternate direction infinitely
5. WHEN the effect is active THEN the system SHALL apply flapping to all visible bats

### Requirement 6

**User Story:** As a user, I want the screen to darken when the bat effect is active, so that the bats are more visible and the atmosphere is enhanced.

#### Acceptance Criteria

1. WHEN the bat effect activates THEN the system SHALL overlay the screen with a semi-transparent red-tinted backdrop
2. THE backdrop SHALL use a red-950 color with 30% opacity
3. THE backdrop SHALL apply a 2-pixel backdrop blur effect
4. WHEN the effect deactivates THEN the system SHALL fade out the backdrop over 300 milliseconds
5. THE backdrop SHALL be positioned as a fixed full-screen overlay with z-index 9990

### Requirement 7

**User Story:** As a developer, I want the component to use the exact BatIcon SVG provided, so that the visual appearance matches the design specification.

#### Acceptance Criteria

1. THE system SHALL use the BatIcon component with the exact SVG path data provided
2. THE BatIcon SHALL accept a className prop for styling customization
3. THE BatIcon SHALL use currentColor for fill to support color theming
4. THE BatIcon SHALL have a viewBox of "0 0 512 512"
5. THE system SHALL NOT generate or use alternative bat SVG designs

### Requirement 8

**User Story:** As a developer, I want comprehensive documentation for the refactored component, so that I can understand how to use it effectively.

#### Acceptance Criteria

1. THE system SHALL provide a documentation page with a working demo
2. THE documentation SHALL include a trigger button that activates the bat burst effect
3. THE documentation SHALL display the component API with all available props
4. THE documentation SHALL include code examples showing basic usage
5. THE documentation SHALL explain the interactive cursor repulsion behavior

### Requirement 9

**User Story:** As a developer, I want the component to handle window resize events properly, so that the bat positions remain correct when the viewport changes.

#### Acceptance Criteria

1. WHEN the window is resized THEN the system SHALL recalculate bat positions based on new viewport dimensions
2. THE system SHALL track window width and height in state
3. WHEN the effect is active THEN the system SHALL add resize event listeners
4. WHEN the effect deactivates THEN the system SHALL remove resize event listeners
5. THE system SHALL convert percentage-based home positions to pixel coordinates using current window dimensions

### Requirement 10

**User Story:** As a developer, I want the component to properly clean up resources, so that there are no memory leaks or performance issues.

#### Acceptance Criteria

1. WHEN the component unmounts THEN the system SHALL remove all event listeners
2. WHEN the effect deactivates THEN the system SHALL clear all animation timers
3. THE system SHALL use React useEffect cleanup functions for all side effects
4. WHEN mouse tracking is active THEN the system SHALL only update state when the effect is hovered
5. THE system SHALL prevent pointer events on animated elements to avoid interfering with page interaction
