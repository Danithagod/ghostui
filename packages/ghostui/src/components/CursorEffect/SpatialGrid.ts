import { RegisteredElement } from '../../types/cursor-effects';
import { getRectCenter } from './proximityUtils';

/**
 * SpatialGrid class for performance optimization
 * 
 * Uses cell-based spatial partitioning to reduce proximity calculations
 * from O(n) to O(k) where k is elements in nearby cells.
 * 
 * Automatically enabled when element count exceeds 20.
 * 
 * Requirements: 11.3
 */
export class SpatialGrid {
  private cellSize: number;
  private cells: Map<string, Set<string>>;
  
  /**
   * Create a new spatial grid
   * @param cellSize Size of each grid cell in pixels (default: 200)
   */
  constructor(cellSize: number = 200) {
    this.cellSize = cellSize;
    this.cells = new Map<string, Set<string>>();
  }
  
  /**
   * Get the cell key for a given position
   * @param x X coordinate
   * @param y Y coordinate
   * @returns Cell key as "cellX,cellY"
   */
  getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }
  
  /**
   * Get all element IDs in cells near the given position
   * @param x X coordinate
   * @param y Y coordinate
   * @param radius Search radius in pixels
   * @returns Set of element IDs in nearby cells
   */
  getNearbyElements(x: number, y: number, radius: number): Set<string> {
    const nearby = new Set<string>();
    
    // Calculate how many cells to check based on radius
    const cellRadius = Math.ceil(radius / this.cellSize);
    
    // Get the center cell coordinates
    const centerCellX = Math.floor(x / this.cellSize);
    const centerCellY = Math.floor(y / this.cellSize);
    
    // Check surrounding cells
    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dy = -cellRadius; dy <= cellRadius; dy++) {
        const cellX = centerCellX + dx;
        const cellY = centerCellY + dy;
        const key = `${cellX},${cellY}`;
        
        const cellElements = this.cells.get(key);
        if (cellElements) {
          cellElements.forEach(id => nearby.add(id));
        }
      }
    }
    
    return nearby;
  }
  
  /**
   * Add an element to the grid
   * @param id Element ID
   * @param element Registered element with bounds
   */
  addElement(id: string, element: RegisteredElement): void {
    // Get element center position
    const center = getRectCenter(element.bounds);
    const key = this.getCellKey(center.x, center.y);
    
    // Add element to cell
    if (!this.cells.has(key)) {
      this.cells.set(key, new Set<string>());
    }
    
    this.cells.get(key)!.add(id);
  }
  
  /**
   * Remove an element from the grid
   * @param id Element ID
   * @param element Registered element with bounds (optional, for optimization)
   */
  removeElement(id: string, element?: RegisteredElement): void {
    if (element) {
      // If we have the element, we can directly remove it from its cell
      const center = getRectCenter(element.bounds);
      const key = this.getCellKey(center.x, center.y);
      
      const cellElements = this.cells.get(key);
      if (cellElements) {
        cellElements.delete(id);
        
        // Clean up empty cells
        if (cellElements.size === 0) {
          this.cells.delete(key);
        }
      }
    } else {
      // If we don't have the element, search all cells (slower but safe)
      this.cells.forEach((cellElements, key) => {
        cellElements.delete(id);
        
        // Clean up empty cells
        if (cellElements.size === 0) {
          this.cells.delete(key);
        }
      });
    }
  }
  
  /**
   * Update an element's position in the grid
   * Removes from old cell and adds to new cell if position changed
   * @param id Element ID
   * @param oldElement Previous element state
   * @param newElement New element state
   */
  updateElement(id: string, oldElement: RegisteredElement, newElement: RegisteredElement): void {
    const oldCenter = getRectCenter(oldElement.bounds);
    const newCenter = getRectCenter(newElement.bounds);
    
    const oldKey = this.getCellKey(oldCenter.x, oldCenter.y);
    const newKey = this.getCellKey(newCenter.x, newCenter.y);
    
    // Only update if cell changed
    if (oldKey !== newKey) {
      // Remove from old cell
      const oldCellElements = this.cells.get(oldKey);
      if (oldCellElements) {
        oldCellElements.delete(id);
        
        // Clean up empty cells
        if (oldCellElements.size === 0) {
          this.cells.delete(oldKey);
        }
      }
      
      // Add to new cell
      if (!this.cells.has(newKey)) {
        this.cells.set(newKey, new Set<string>());
      }
      
      this.cells.get(newKey)!.add(id);
    }
  }
  
  /**
   * Clear all elements from the grid
   */
  clear(): void {
    this.cells.clear();
  }
  
  /**
   * Get the total number of elements in the grid
   */
  getElementCount(): number {
    let count = 0;
    this.cells.forEach(cellElements => {
      count += cellElements.size;
    });
    return count;
  }
  
  /**
   * Rebuild the entire grid from a map of elements
   * @param elements Map of registered elements
   */
  rebuild(elements: Map<string, RegisteredElement>): void {
    this.clear();
    
    elements.forEach((element, id) => {
      // Skip elements with invalid bounds
      if (element.bounds.width === 0 || element.bounds.height === 0) {
        return;
      }
      
      this.addElement(id, element);
    });
  }
}
