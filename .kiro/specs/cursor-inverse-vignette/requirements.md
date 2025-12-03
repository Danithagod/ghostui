# Cursor-Following Inverse Vignette - Requirements

## Overview
Transform the HauntedVignette component from a static edge-darkening effect into a dynamic cursor-following "inverse flashlight" effect where a circular clear area follows the cursor and everything outside that area is darkened.

## User Story
As a developer using GhostUI, I want a vignette effect that follows my cursor, creating a clear circular area around it while darkening the rest of the screen, so I can create an immersive "exploring in the dark" experience for horror-themed interfaces.

## Acceptance Criteria

### AC-1: Cursor-Following Behavior
- **Given** the HauntedVignette component is rendered
- **When** the user moves their cursor
- **Then** a circular clear area should follow the cursor position in real-time
- **And** the effect should be smooth and performant

### AC-2: Configurable Clear Area Size
- **Given** the component accepts a radius/size prop
- **When** the developer sets different radius values
- **Then** the circular clear area around the cursor should adjust accordingly
- **And** the size should be customizable via props

### AC-3: Configurable Darkness Intensity
- **Given** the component accepts an intensity prop
- **When** the developer sets different intensity values
- **Then** the darkened area outside the clear circle should adjust its opacity/darkness
- **And** this should maintain backward compatibility with existing intensity options

### AC-4: Configurable Gradient Softness
- **Given** the component accepts a gradient/blur prop
- **When** the developer sets different gradient values
- **Then** the transition between the clear area and dark area should adjust from soft to hard edges
- **And** the gradient should be smooth and visually appealing

### AC-5: Performance Optimization
- **Given** the cursor moves frequently
- **When** the component updates the vignette position
- **Then** the updates should be throttled or optimized to prevent performance issues
- **And** the effect should not cause frame drops or lag

### AC-6: Component API
- **Given** the component replaces the existing HauntedVignette
- **When** developers use the component
- **Then** it should expose props for:
  - `radius` (size of clear area)
  - `intensity` (darkness level)
  - `gradientSize` (softness of transition)
  - `className` (for custom styling)
- **And** it should maintain TypeScript type safety

### AC-7: Accessibility
- **Given** the component creates a visual overlay
- **When** rendered on the page
- **Then** it should not interfere with pointer events
- **And** it should include appropriate ARIA attributes
- **And** it should not affect keyboard navigation

### AC-8: Default Behavior
- **Given** no props are provided
- **When** the component is rendered
- **Then** it should use sensible defaults that work well out of the box
- **And** the defaults should create a balanced, usable effect

## Non-Functional Requirements

### Performance
- Mouse movement updates should be throttled to maintain 60fps
- Component should use CSS transforms and GPU acceleration where possible
- Memory usage should remain constant (no memory leaks)

### Browser Compatibility
- Should work in all modern browsers (Chrome, Firefox, Safari, Edge)
- Should gracefully degrade if features are not supported

### Code Quality
- Component should follow existing GhostUI patterns and conventions
- Should include proper TypeScript types
- Should be tree-shakeable and have minimal bundle impact

## Out of Scope
- Touch device support (can be added in future iteration)
- Multiple simultaneous clear areas
- Non-circular shapes for the clear area
- Animation of the vignette appearance/disappearance
