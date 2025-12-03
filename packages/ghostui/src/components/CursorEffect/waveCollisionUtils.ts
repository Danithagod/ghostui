import { Wave, RegisteredElement } from '../../types/cursor-effects';

/**
 * Wave collision detection utilities
 * 
 * Provides functions to detect when waves intersect with registered elements
 * and calculate collision effects.
 * 
 * Requirements: 5.3, 5.5
 */

/**
 * Check if a wave intersects with an element's bounding box
 * 
 * A wave intersects an element when the wave's radius reaches or overlaps
 * any part of the element's rectangular bounds.
 * 
 * @param wave - The wave to check
 * @param element - The registered element to check against
 * @returns true if the wave intersects the element
 */
export function checkWaveElementIntersection(
  wave: Wave,
  element: RegisteredElement
): boolean {
  // Skip if element has no valid bounds
  if (!element.bounds || element.bounds.width === 0 || element.bounds.height === 0) {
    return false;
  }
  
  // Get element center point
  const elementCenterX = element.bounds.left + element.bounds.width / 2;
  const elementCenterY = element.bounds.top + element.bounds.height / 2;
  
  // Calculate distance from wave origin to element center
  const dx = elementCenterX - wave.origin.x;
  const dy = elementCenterY - wave.origin.y;
  const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate the element's "radius" (half diagonal)
  // This represents the distance from center to corner
  const elementRadius = Math.sqrt(
    (element.bounds.width / 2) ** 2 + (element.bounds.height / 2) ** 2
  );
  
  // Wave intersects if its radius is within range of the element
  // The wave touches the element when:
  // - The wave radius is at least (distance to center - element radius)
  // - The wave radius is at most (distance to center + element radius)
  const minIntersectionRadius = Math.max(0, distanceToCenter - elementRadius);
  const maxIntersectionRadius = distanceToCenter + elementRadius;
  
  return wave.radius >= minIntersectionRadius && wave.radius <= maxIntersectionRadius;
}

/**
 * Calculate collision intensity for a wave-element intersection
 * 
 * Returns a value between 0 and 1 representing how strongly the wave
 * is affecting the element. Peak intensity occurs when the wave's edge
 * is directly at the element's center.
 * 
 * @param wave - The wave affecting the element
 * @param element - The element being affected
 * @returns Intensity value from 0 to 1
 */
export function calculateCollisionIntensity(
  wave: Wave,
  element: RegisteredElement
): number {
  if (!checkWaveElementIntersection(wave, element)) {
    return 0;
  }
  
  // Get element center point
  const elementCenterX = element.bounds.left + element.bounds.width / 2;
  const elementCenterY = element.bounds.top + element.bounds.height / 2;
  
  // Calculate distance from wave origin to element center
  const dx = elementCenterX - wave.origin.x;
  const dy = elementCenterY - wave.origin.y;
  const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate how close the wave edge is to the element center
  // Intensity is highest when wave radius equals distance to center
  const radiusDifference = Math.abs(wave.radius - distanceToCenter);
  
  // Element radius (half diagonal)
  const elementRadius = Math.sqrt(
    (element.bounds.width / 2) ** 2 + (element.bounds.height / 2) ** 2
  );
  
  // Normalize intensity based on element size
  // Intensity decreases as the wave edge moves away from the element center
  const normalizedDifference = radiusDifference / elementRadius;
  const intensity = Math.max(0, 1 - normalizedDifference);
  
  // Also factor in wave opacity (fading waves have less effect)
  return intensity * wave.opacity;
}

/**
 * Calculate combined collision intensity from multiple waves
 * 
 * When multiple waves overlap at an element, their effects blend additively.
 * The total intensity is capped at 1.0 to prevent excessive effects.
 * 
 * @param waves - Array of active waves
 * @param element - The element being affected
 * @returns Combined intensity value from 0 to 1
 */
export function calculateCombinedWaveIntensity(
  waves: Wave[],
  element: RegisteredElement
): number {
  let totalIntensity = 0;
  
  for (const wave of waves) {
    totalIntensity += calculateCollisionIntensity(wave, element);
  }
  
  // Cap at 1.0 to prevent excessive effects
  return Math.min(1.0, totalIntensity);
}

/**
 * Get all elements currently being affected by a wave
 * 
 * @param wave - The wave to check
 * @param elements - Map of all registered elements
 * @returns Array of element IDs that intersect with the wave
 */
export function getAffectedElements(
  wave: Wave,
  elements: Map<string, RegisteredElement>
): string[] {
  const affected: string[] = [];
  
  for (const [id, element] of elements) {
    if (checkWaveElementIntersection(wave, element)) {
      affected.push(id);
    }
  }
  
  return affected;
}

/**
 * Track which elements have been hit by which waves
 * 
 * This helps trigger animations only once per wave-element pair,
 * rather than continuously while the wave passes through.
 */
export class WaveCollisionTracker {
  private collisions: Map<string, Set<string>> = new Map(); // waveId -> Set of elementIds
  
  /**
   * Check if a wave has already collided with an element
   */
  hasCollided(waveId: string, elementId: string): boolean {
    const waveCollisions = this.collisions.get(waveId);
    return waveCollisions ? waveCollisions.has(elementId) : false;
  }
  
  /**
   * Record a collision between a wave and an element
   */
  recordCollision(waveId: string, elementId: string): void {
    if (!this.collisions.has(waveId)) {
      this.collisions.set(waveId, new Set());
    }
    this.collisions.get(waveId)!.add(elementId);
  }
  
  /**
   * Remove tracking data for a wave that has been cleaned up
   */
  cleanupWave(waveId: string): void {
    this.collisions.delete(waveId);
  }
  
  /**
   * Clear all collision tracking data
   */
  clear(): void {
    this.collisions.clear();
  }
}
