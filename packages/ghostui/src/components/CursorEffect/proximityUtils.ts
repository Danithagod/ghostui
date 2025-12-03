import { RegisteredElement } from '../../types/cursor-effects';
import { SpatialGrid } from './SpatialGrid';
import { safeGetBounds, isValidBounds } from './browserUtils';

/**
 * Threshold for enabling spatial partitioning
 * When element count exceeds this, spatial grid is used for optimization
 */
export const SPATIAL_PARTITIONING_THRESHOLD = 20;

/**
 * Calculate the Euclidean distance between two points
 */
export function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Get the center point of a DOMRect
 */
export function getRectCenter(rect: DOMRect): { x: number; y: number } {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

/**
 * Calculate proximity for a single element
 * Returns updated element with distance and proximity status
 * Handles null refs gracefully
 */
export function calculateElementProximity(
  element: RegisteredElement,
  cursorPosition: { x: number; y: number },
  proximityRadius: number
): RegisteredElement {
  // Safely get element bounds - handles null refs and detached elements
  const bounds = safeGetBounds(element.ref.current);
  
  // If bounds are invalid (width or height is 0), skip calculations
  if (!isValidBounds(bounds)) {
    return {
      ...element,
      bounds,
      distance: Infinity,
      isInProximity: false,
      isHovered: false,
    };
  }
  
  // Calculate center of element
  const elementCenter = getRectCenter(bounds);
  
  // Calculate distance from cursor to element center
  const distance = calculateDistance(cursorPosition, elementCenter);
  
  // Determine if element is in proximity
  const isInProximity = distance <= proximityRadius;
  
  // Check if cursor is hovering over element (within bounds)
  const isHovered = 
    cursorPosition.x >= bounds.left &&
    cursorPosition.x <= bounds.right &&
    cursorPosition.y >= bounds.top &&
    cursorPosition.y <= bounds.bottom;
  
  return {
    ...element,
    bounds,
    distance,
    isInProximity,
    isHovered,
  };
}

/**
 * Update proximity for all registered elements
 * Returns a new Map with updated element data
 * 
 * @param elements Map of registered elements
 * @param cursorPosition Current cursor position
 * @param proximityRadius Global proximity radius
 * @param spatialGrid Optional spatial grid for optimization (used when element count > 20)
 */
export function updateAllElementProximity(
  elements: Map<string, RegisteredElement>,
  cursorPosition: { x: number; y: number },
  proximityRadius: number,
  spatialGrid?: SpatialGrid
): Map<string, RegisteredElement> {
  const updatedElements = new Map<string, RegisteredElement>();
  
  // Determine which elements to check based on spatial partitioning
  let elementsToCheck: Set<string>;
  
  if (spatialGrid && elements.size > SPATIAL_PARTITIONING_THRESHOLD) {
    // Use spatial grid to get only nearby elements
    // Use the maximum possible proximity radius to ensure we don't miss any elements
    const maxRadius = Math.max(
      proximityRadius,
      ...Array.from(elements.values()).map(e => e.options.proximityRadius ?? proximityRadius)
    );
    
    elementsToCheck = spatialGrid.getNearbyElements(
      cursorPosition.x,
      cursorPosition.y,
      maxRadius
    );
  } else {
    // Check all elements (no spatial partitioning)
    elementsToCheck = new Set(elements.keys());
  }
  
  elements.forEach((element, id) => {
    // Skip elements with null refs
    if (!element.ref.current) {
      updatedElements.set(id, element);
      return;
    }
    
    // If using spatial partitioning and element is not in nearby cells, keep previous state
    if (spatialGrid && elements.size > SPATIAL_PARTITIONING_THRESHOLD && !elementsToCheck.has(id)) {
      // Element is too far away, mark as not in proximity
      updatedElements.set(id, {
        ...element,
        distance: Infinity,
        isInProximity: false,
        isHovered: false,
      });
      return;
    }
    
    // Use element-specific proximity radius if provided, otherwise use global
    const effectiveRadius = element.options.proximityRadius ?? proximityRadius;
    
    // Calculate proximity for this element
    const updatedElement = calculateElementProximity(
      element,
      cursorPosition,
      effectiveRadius
    );
    
    updatedElements.set(id, updatedElement);
  });
  
  return updatedElements;
}

/**
 * Detect proximity state changes and trigger callbacks
 */
export function detectProximityChanges(
  prevElements: Map<string, RegisteredElement>,
  newElements: Map<string, RegisteredElement>
): void {
  newElements.forEach((newElement, id) => {
    const prevElement = prevElements.get(id);
    
    if (!prevElement) return;
    
    // Detect proximity entry
    if (!prevElement.isInProximity && newElement.isInProximity) {
      newElement.options.onProximityEnter?.();
    }
    
    // Detect proximity exit
    if (prevElement.isInProximity && !newElement.isInProximity) {
      newElement.options.onProximityExit?.();
    }
    
    // Detect hover entry
    if (!prevElement.isHovered && newElement.isHovered) {
      newElement.options.onHover?.();
    }
  });
}
