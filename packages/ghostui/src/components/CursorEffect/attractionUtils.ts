import { RegisteredElement } from '../../types/cursor-effects';

/**
 * Maximum displacement in pixels for attraction effects
 */
export const MAX_ATTRACTION_DISPLACEMENT = 50;

/**
 * Calculate attraction force displacement for an element
 * 
 * This function calculates the displacement vector for an element based on
 * cursor proximity using vector mathematics. The displacement is proportional
 * to proximity and can be configured for attraction or repulsion modes.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 * 
 * @param elementPos - Center position of the element
 * @param cursorPos - Current cursor position
 * @param distance - Distance between cursor and element center
 * @param proximityRadius - Radius within which attraction is active
 * @param attractionMode - 'attract' moves toward cursor, 'repel' moves away, 'none' disables
 * @param attractionStrength - Intensity scaling factor (0-1)
 * @returns Displacement vector { x, y } in pixels
 */
export function calculateAttraction(
  elementPos: { x: number; y: number },
  cursorPos: { x: number; y: number },
  distance: number,
  proximityRadius: number,
  attractionMode: 'attract' | 'repel' | 'none' = 'attract',
  attractionStrength: number = 0.5
): { x: number; y: number } {
  // No attraction if mode is 'none' or element is outside proximity radius
  if (attractionMode === 'none' || distance > proximityRadius) {
    return { x: 0, y: 0 };
  }
  
  // Clamp attraction strength to 0-1 range
  const clampedStrength = Math.max(0, Math.min(1, attractionStrength));
  
  // If strength is 0, no displacement
  if (clampedStrength === 0) {
    return { x: 0, y: 0 };
  }
  
  // Calculate direction vector from element to cursor
  const dx = cursorPos.x - elementPos.x;
  const dy = cursorPos.y - elementPos.y;
  
  // Handle case where cursor is exactly at element center
  if (distance === 0) {
    return { x: 0, y: 0 };
  }
  
  // Normalize direction vector
  const dirX = dx / distance;
  const dirY = dy / distance;
  
  // Calculate force strength based on proximity
  // Closer = stronger force (proportional to proximity)
  // Formula: (proximityRadius - distance) / proximityRadius
  // This gives 1.0 when distance is 0, and 0.0 when distance equals proximityRadius
  const proximityFactor = (proximityRadius - distance) / proximityRadius;
  
  // Apply attraction strength scaling
  const scaledForce = proximityFactor * clampedStrength;
  
  // Calculate displacement magnitude
  const displacementMagnitude = scaledForce * MAX_ATTRACTION_DISPLACEMENT;
  
  // Apply direction based on mode
  // 'attract' = move toward cursor (positive direction)
  // 'repel' = move away from cursor (negative direction)
  const multiplier = attractionMode === 'repel' ? -1 : 1;
  
  return {
    x: dirX * displacementMagnitude * multiplier,
    y: dirY * displacementMagnitude * multiplier,
  };
}

/**
 * Calculate attraction displacement for a registered element
 * 
 * This is a convenience function that extracts the necessary data from
 * a RegisteredElement and calls calculateAttraction.
 * 
 * @param element - Registered element with bounds and options
 * @param cursorPos - Current cursor position
 * @param globalProximityRadius - Global proximity radius (used if element doesn't override)
 * @returns Displacement vector { x, y } in pixels
 */
export function calculateElementAttraction(
  element: RegisteredElement,
  cursorPos: { x: number; y: number },
  globalProximityRadius: number
): { x: number; y: number } {
  // Get element center from bounds
  const elementCenter = {
    x: element.bounds.left + element.bounds.width / 2,
    y: element.bounds.top + element.bounds.height / 2,
  };
  
  // Use element-specific proximity radius if provided, otherwise use global
  const effectiveRadius = element.options.proximityRadius ?? globalProximityRadius;
  
  // Get attraction mode and strength from options
  const attractionMode = element.options.attraction ?? 'none';
  const attractionStrength = element.options.attractionStrength ?? 0.5;
  
  return calculateAttraction(
    elementCenter,
    cursorPos,
    element.distance,
    effectiveRadius,
    attractionMode,
    attractionStrength
  );
}

/**
 * Apply attraction displacement to all elements in proximity
 * 
 * This function calculates attraction for all registered elements and
 * returns a map of element IDs to their displacement vectors.
 * 
 * @param elements - Map of registered elements
 * @param cursorPos - Current cursor position
 * @param globalProximityRadius - Global proximity radius
 * @returns Map of element IDs to displacement vectors
 */
export function calculateAllAttractions(
  elements: Map<string, RegisteredElement>,
  cursorPos: { x: number; y: number },
  globalProximityRadius: number
): Map<string, { x: number; y: number }> {
  const displacements = new Map<string, { x: number; y: number }>();
  
  elements.forEach((element, id) => {
    // Skip elements with no attraction enabled
    if (!element.options.attraction || element.options.attraction === 'none') {
      displacements.set(id, { x: 0, y: 0 });
      return;
    }
    
    // Calculate displacement for this element
    const displacement = calculateElementAttraction(
      element,
      cursorPos,
      globalProximityRadius
    );
    
    displacements.set(id, displacement);
  });
  
  return displacements;
}
