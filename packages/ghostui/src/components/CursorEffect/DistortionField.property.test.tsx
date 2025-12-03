import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import React from 'react';
import { DistortionField } from './DistortionField';
import { CursorState, CursorEffectConfig, RegisteredElement, PRESET_THEMES } from '../../types/cursor-effects';

/**
 * Property-based tests for DistortionField component
 * 
 * Feature: global-cursor-effects
 */

describe('DistortionField - Property-Based Tests', () => {
  /**
   * Property 10: Hover triggers distortion
   * 
   * For any element where the cursor position is within the element's bounding box,
   * a distortion effect should be applied to that element.
   * 
   * **Validates: Requirements 3.1**
   */
  it('Property 10: hover triggers distortion', () => {
    fc.assert(
      fc.property(
        // Generate random element bounds
        fc.record({
          left: fc.integer({ min: 0, max: 1000 }),
          top: fc.integer({ min: 0, max: 1000 }),
          width: fc.integer({ min: 50, max: 500 }),
          height: fc.integer({ min: 50, max: 500 }),
        }),
        // Generate random cursor position
        fc.record({
          x: fc.integer({ min: 0, max: 1500 }),
          y: fc.integer({ min: 0, max: 1500 }),
        }),
        (bounds, cursorPos) => {
      // Calculate if cursor is within bounds
      const isWithinBounds = 
        cursorPos.x >= bounds.left &&
        cursorPos.x <= bounds.left + bounds.width &&
        cursorPos.y >= bounds.top &&
        cursorPos.y <= bounds.top + bounds.height;
      
      // Create a registered element with the generated bounds
      const element: RegisteredElement = {
        id: 'test-element',
        ref: { current: null },
        options: { distortion: true },
        bounds: new DOMRect(bounds.left, bounds.top, bounds.width, bounds.height),
        distance: 0,
        isInProximity: false,
        isHovered: isWithinBounds, // Element is hovered if cursor is within bounds
      };
      
      // Create cursor state
      const cursorState: CursorState = {
        position: cursorPos,
        velocity: { x: 0, y: 0, magnitude: 0 },
        isMoving: false,
        isClicking: false,
        currentTheme: PRESET_THEMES.spooky,
        activeElements: new Map([['test-element', element]]),
      };
      
      // Create config
      const config: Required<CursorEffectConfig> = {
        theme: 'spooky',
        intensity: 1.0,
        effects: {
          glow: true,
          distortion: true,
          waves: true,
          attraction: true,
          particles: true,
        },
        disableOnMobile: false,
        proximityRadius: 150,
        maxWaves: 5,
        colorTransitionZones: 'vertical',
      };
      
      // Render the component
      const { container } = render(
        <DistortionField cursorState={cursorState} config={config} />
      );
      
      // Check if distortion overlay is rendered
      const distortionOverlay = container.querySelector('.distortion-overlay');
      
      if (isWithinBounds) {
        // If cursor is within bounds, distortion overlay should be rendered
        expect(distortionOverlay).not.toBeNull();
        
        // Verify the overlay is positioned at the element's bounds
        if (distortionOverlay) {
          const style = window.getComputedStyle(distortionOverlay);
          expect(style.position).toBe('absolute');
          expect(style.left).toBe(`${bounds.left}px`);
          expect(style.top).toBe(`${bounds.top}px`);
          expect(style.width).toBe(`${bounds.width}px`);
          expect(style.height).toBe(`${bounds.height}px`);
        }
      } else {
        // If cursor is not within bounds, no distortion overlay should be rendered
        expect(distortionOverlay).toBeNull();
      }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  /**
   * Property 11: Distortion intensity per component type
   * 
   * For any two elements with different component types (e.g., button vs card),
   * the element with type 'button' should receive higher distortion intensity than type 'card'.
   * 
   * **Validates: Requirements 3.5**
   */
  it('Property 11: distortion intensity per component type', () => {
    fc.assert(
      fc.property(
        // Generate random element bounds for two elements
        fc.record({
          left: fc.integer({ min: 0, max: 1000 }),
          top: fc.integer({ min: 0, max: 1000 }),
          width: fc.integer({ min: 50, max: 500 }),
          height: fc.integer({ min: 50, max: 500 }),
        }),
        fc.record({
          left: fc.integer({ min: 0, max: 1000 }),
          top: fc.integer({ min: 0, max: 1000 }),
          width: fc.integer({ min: 50, max: 500 }),
          height: fc.integer({ min: 50, max: 500 }),
        }),
        (buttonBounds, cardBounds) => {
          // Create cursor positions within each element's bounds
          const buttonCursorPos = {
            x: buttonBounds.left + buttonBounds.width / 2,
            y: buttonBounds.top + buttonBounds.height / 2,
          };
          
          const cardCursorPos = {
            x: cardBounds.left + cardBounds.width / 2,
            y: cardBounds.top + cardBounds.height / 2,
          };
          
          // Create button element
          const buttonElement: RegisteredElement = {
            id: 'button-element',
            ref: { current: null },
            options: { type: 'button', distortion: true },
            bounds: new DOMRect(buttonBounds.left, buttonBounds.top, buttonBounds.width, buttonBounds.height),
            distance: 0,
            isInProximity: false,
            isHovered: true,
          };
          
          // Create card element
          const cardElement: RegisteredElement = {
            id: 'card-element',
            ref: { current: null },
            options: { type: 'card', distortion: true },
            bounds: new DOMRect(cardBounds.left, cardBounds.top, cardBounds.width, cardBounds.height),
            distance: 0,
            isInProximity: false,
            isHovered: true,
          };
          
          const config: Required<CursorEffectConfig> = {
            theme: 'spooky',
            intensity: 1.0,
            effects: {
              glow: true,
              distortion: true,
              waves: true,
              attraction: true,
              particles: true,
            },
            disableOnMobile: false,
            proximityRadius: 150,
            maxWaves: 5,
            colorTransitionZones: 'vertical',
          };
          
          // Test button element
          const buttonCursorState: CursorState = {
            position: buttonCursorPos,
            velocity: { x: 0, y: 0, magnitude: 0 },
            isMoving: false,
            isClicking: false,
            currentTheme: PRESET_THEMES.spooky,
            activeElements: new Map([['button-element', buttonElement]]),
          };
          
          const { container: buttonContainer } = render(
            <DistortionField cursorState={buttonCursorState} config={config} />
          );
          
          // Test card element
          const cardCursorState: CursorState = {
            position: cardCursorPos,
            velocity: { x: 0, y: 0, magnitude: 0 },
            isMoving: false,
            isClicking: false,
            currentTheme: PRESET_THEMES.spooky,
            activeElements: new Map([['card-element', cardElement]]),
          };
          
          const { container: cardContainer } = render(
            <DistortionField cursorState={cardCursorState} config={config} />
          );
          
          // Get distortion overlays
          const buttonOverlay = buttonContainer.querySelector('.distortion-overlay');
          const cardOverlay = cardContainer.querySelector('.distortion-overlay');
          
          // Both should have distortion overlays
          expect(buttonOverlay).not.toBeNull();
          expect(cardOverlay).not.toBeNull();
          
          // Verify that button uses distortion filter and card uses wave filter
          // This is the implementation detail that shows different intensities
          if (buttonOverlay && cardOverlay) {
            const buttonStyle = window.getComputedStyle(buttonOverlay);
            const cardStyle = window.getComputedStyle(cardOverlay);
            
            // Button should use cursor-distortion filter (stronger)
            expect(buttonStyle.filter).toContain('cursor-distortion');
            
            // Card should use cursor-wave filter (subtle)
            expect(cardStyle.filter).toContain('cursor-wave');
            
            // The filters are different, indicating different intensity levels
            expect(buttonStyle.filter).not.toBe(cardStyle.filter);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  /**
   * Test that distortion is not applied when element has distortion disabled
   */
  it('should not apply distortion when element has distortion disabled', () => {
    fc.assert(
      fc.property(
        fc.record({
          left: fc.integer({ min: 0, max: 1000 }),
          top: fc.integer({ min: 0, max: 1000 }),
          width: fc.integer({ min: 50, max: 500 }),
          height: fc.integer({ min: 50, max: 500 }),
        }),
        (bounds) => {
      // Create cursor position within bounds
      const cursorPos = {
        x: bounds.left + bounds.width / 2,
        y: bounds.top + bounds.height / 2,
      };
      
      // Create element with distortion disabled
      const element: RegisteredElement = {
        id: 'test-element',
        ref: { current: null },
        options: { distortion: false }, // Distortion explicitly disabled
        bounds: new DOMRect(bounds.left, bounds.top, bounds.width, bounds.height),
        distance: 0,
        isInProximity: false,
        isHovered: true, // Element is hovered
      };
      
      const cursorState: CursorState = {
        position: cursorPos,
        velocity: { x: 0, y: 0, magnitude: 0 },
        isMoving: false,
        isClicking: false,
        currentTheme: PRESET_THEMES.spooky,
        activeElements: new Map([['test-element', element]]),
      };
      
      const config: Required<CursorEffectConfig> = {
        theme: 'spooky',
        intensity: 1.0,
        effects: {
          glow: true,
          distortion: true,
          waves: true,
          attraction: true,
          particles: true,
        },
        disableOnMobile: false,
        proximityRadius: 150,
        maxWaves: 5,
        colorTransitionZones: 'vertical',
      };
      
      const { container } = render(
        <DistortionField cursorState={cursorState} config={config} />
      );
      
      // No distortion overlay should be rendered when distortion is disabled
      const distortionOverlay = container.querySelector('.distortion-overlay');
      expect(distortionOverlay).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
