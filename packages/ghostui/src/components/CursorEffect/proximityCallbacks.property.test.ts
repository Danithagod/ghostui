import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import {
  calculateElementProximity,
  updateAllElementProximity,
  detectProximityChanges,
} from './proximityUtils';
import { RegisteredElement } from '../../types/cursor-effects';

/**
 * Property-based tests for proximity callbacks and state transitions
 * 
 * Feature: global-cursor-effects
 */

describe('Proximity Callbacks Properties', () => {
  /**
   * Property 6: Proximity entry triggers animation
   * 
   * For any element that transitions from outside to inside the proximity zone, 
   * an approach animation should be triggered on that element.
   * 
   * Validates: Requirements 2.1
   */
  it('Property 6: proximity entry triggers onProximityEnter callback', () => {
    fc.assert(
      fc.property(
        // Generate random element bounds
        fc.record({
          left: fc.integer({ min: 0, max: 1800 }),
          top: fc.integer({ min: 0, max: 960 }),
          width: fc.integer({ min: 10, max: 200 }),
          height: fc.integer({ min: 10, max: 200 }),
        }),
        // Generate proximity radius
        fc.integer({ min: 50, max: 300 }),
        // Generate two cursor positions: one outside, one inside proximity
        fc.record({
          outsideX: fc.integer({ min: 0, max: 1920 }),
          outsideY: fc.integer({ min: 0, max: 1080 }),
          insideX: fc.integer({ min: 0, max: 1920 }),
          insideY: fc.integer({ min: 0, max: 1080 }),
        }),
        (elementBounds, proximityRadius, cursorPositions) => {
          const bounds = {
            ...elementBounds,
            right: elementBounds.left + elementBounds.width,
            bottom: elementBounds.top + elementBounds.height,
            x: elementBounds.left,
            y: elementBounds.top,
            toJSON: () => ({}),
          } as DOMRect;
          
          // Create a mock ref
          const mockRef = {
            current: {
              getBoundingClientRect: () => bounds,
            } as HTMLElement,
          };
          
          // Create callback spy
          const onProximityEnter = vi.fn();
          
          // Create element with callback
          const element: RegisteredElement = {
            id: 'test-element',
            ref: mockRef,
            options: { onProximityEnter },
            bounds,
            distance: Infinity,
            isInProximity: false,
            isHovered: false,
          };
          
          // Calculate proximity for first position (outside)
          const outsidePos = { x: cursorPositions.outsideX, y: cursorPositions.outsideY };
          const elementOutside = calculateElementProximity(element, outsidePos, proximityRadius);
          
          // Calculate proximity for second position (inside)
          const insidePos = { x: cursorPositions.insideX, y: cursorPositions.insideY };
          const elementInside = calculateElementProximity(elementOutside, insidePos, proximityRadius);
          
          // If element transitioned from outside to inside proximity
          if (!elementOutside.isInProximity && elementInside.isInProximity) {
            // Create maps for detectProximityChanges
            const prevElements = new Map([['test-element', elementOutside]]);
            const newElements = new Map([['test-element', elementInside]]);
            
            // Detect changes
            detectProximityChanges(prevElements, newElements);
            
            // Callback should have been called exactly once
            expect(onProximityEnter).toHaveBeenCalledTimes(1);
          } else {
            // If no transition occurred, callback should not be called
            const prevElements = new Map([['test-element', elementOutside]]);
            const newElements = new Map([['test-element', elementInside]]);
            
            detectProximityChanges(prevElements, newElements);
            
            expect(onProximityEnter).not.toHaveBeenCalled();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Proximity exit returns to original state
   * 
   * For any element, entering then exiting the proximity zone should result in 
   * the element returning to its original transform values (scale: 1, rotate: 0, translate: 0).
   * 
   * Note: This property tests the state transition logic. The actual transform application
   * would be handled by the rendering layer (not tested here).
   * 
   * Validates: Requirements 2.3
   */
  it('Property 8: proximity exit triggers onProximityExit callback', () => {
    fc.assert(
      fc.property(
        fc.record({
          left: fc.integer({ min: 500, max: 600 }),
          top: fc.integer({ min: 500, max: 600 }),
          width: fc.integer({ min: 50, max: 100 }),
          height: fc.integer({ min: 50, max: 100 }),
        }),
        (elementBounds) => {
          const bounds = {
            ...elementBounds,
            right: elementBounds.left + elementBounds.width,
            bottom: elementBounds.top + elementBounds.height,
            x: elementBounds.left,
            y: elementBounds.top,
            toJSON: () => ({}),
          } as DOMRect;
          
          const mockRef = {
            current: {
              getBoundingClientRect: () => bounds,
            } as HTMLElement,
          };
          
          const onProximityEnter = vi.fn();
          const onProximityExit = vi.fn();
          const proximityRadius = 100;
          
          // Calculate element center
          const centerX = elementBounds.left + elementBounds.width / 2;
          const centerY = elementBounds.top + elementBounds.height / 2;
          
          // Position 1: Outside proximity
          const pos1 = { x: centerX - 200, y: centerY };
          
          // Position 2: Inside proximity
          const pos2 = { x: centerX - 50, y: centerY };
          
          // Position 3: Outside proximity again
          const pos3 = { x: centerX + 200, y: centerY };
          
          let element: RegisteredElement = {
            id: 'test-element',
            ref: mockRef,
            options: { onProximityEnter, onProximityExit },
            bounds,
            distance: Infinity,
            isInProximity: false,
            isHovered: false,
          };
          
          // Step 1: Outside
          const element1 = calculateElementProximity(element, pos1, proximityRadius);
          expect(element1.isInProximity).toBe(false);
          
          // Step 2: Enter proximity
          const element2 = calculateElementProximity(element1, pos2, proximityRadius);
          const map1 = new Map([['test-element', element1]]);
          const map2 = new Map([['test-element', element2]]);
          detectProximityChanges(map1, map2);
          
          expect(element2.isInProximity).toBe(true);
          expect(onProximityEnter).toHaveBeenCalledTimes(1);
          
          // Step 3: Exit proximity
          const element3 = calculateElementProximity(element2, pos3, proximityRadius);
          const map3 = new Map([['test-element', element3]]);
          detectProximityChanges(map2, map3);
          
          expect(element3.isInProximity).toBe(false);
          expect(onProximityExit).toHaveBeenCalledTimes(1);
          
          // Verify the element returned to non-proximity state
          expect(element3.isInProximity).toBe(element1.isInProximity);
        }
      ),
      { numRuns: 100 }
    );
  });
});
