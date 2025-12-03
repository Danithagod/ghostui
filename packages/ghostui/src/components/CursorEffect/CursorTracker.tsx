import { useEffect, useRef, useState } from 'react';
import { CursorPosition, CursorVelocity } from '../../types/cursor-effects';

/**
 * Cursor state that includes position, velocity, and interaction flags
 */
export interface CursorTrackerState {
  position: { x: number; y: number };
  velocity: CursorVelocity;
  isMoving: boolean;
  isClicking: boolean;
}

/**
 * Props for CursorTracker component
 */
export interface CursorTrackerProps {
  onStateChange: (state: CursorTrackerState) => void;
  throttleMs?: number;
}

/**
 * Calculate velocity from position history
 */
function calculateVelocity(
  prevPosition: CursorPosition,
  newPosition: CursorPosition
): CursorVelocity {
  const timeDelta = newPosition.timestamp - prevPosition.timestamp;
  
  // Avoid division by zero
  if (timeDelta === 0) {
    return { x: 0, y: 0, magnitude: 0 };
  }
  
  // Calculate velocity in pixels per millisecond, then convert to pixels per frame (assuming 60fps)
  const frameTime = 16.67; // milliseconds per frame at 60fps
  const vx = ((newPosition.x - prevPosition.x) / timeDelta) * frameTime;
  const vy = ((newPosition.y - prevPosition.y) / timeDelta) * frameTime;
  const magnitude = Math.sqrt(vx * vx + vy * vy);
  
  return { x: vx, y: vy, magnitude };
}

/**
 * CursorTracker component that tracks global cursor position and state
 * 
 * Features:
 * - Global mousemove listener for position tracking
 * - Velocity calculation from position history
 * - Throttling to limit updates to 60fps (16.67ms)
 * - Tracks cursor state (position, velocity, isMoving, isClicking)
 */
export function CursorTracker({ onStateChange, throttleMs = 16.67 }: CursorTrackerProps) {
  const [cursorState, setCursorState] = useState<CursorTrackerState>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, magnitude: 0 },
    isMoving: false,
    isClicking: false,
  });
  
  const prevPositionRef = useRef<CursorPosition>({
    x: 0,
    y: 0,
    timestamp: Date.now(),
  });
  
  const lastUpdateRef = useRef<number>(Date.now());
  const isClickingRef = useRef<boolean>(false);
  const onStateChangeRef = useRef(onStateChange);
  
  // Keep the callback ref up to date
  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);
  
  // Call onStateChange when cursorState changes
  useEffect(() => {
    onStateChangeRef.current(cursorState);
  }, [cursorState]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle updates to limit to 60fps
      if (now - lastUpdateRef.current < throttleMs) {
        return;
      }
      
      const newPosition: CursorPosition = {
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
      };
      
      // Calculate velocity from previous position
      const velocity = calculateVelocity(prevPositionRef.current, newPosition);
      
      // Update state
      const newState: CursorTrackerState = {
        position: { x: newPosition.x, y: newPosition.y },
        velocity,
        isMoving: velocity.magnitude > 0.5, // Consider moving if velocity > 0.5 pixels/frame
        isClicking: isClickingRef.current,
      };
      
      setCursorState(newState);
      
      // Update refs
      prevPositionRef.current = newPosition;
      lastUpdateRef.current = now;
    };
    
    const handleMouseDown = () => {
      isClickingRef.current = true;
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };
    
    const handleMouseUp = () => {
      isClickingRef.current = false;
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };
    
    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [throttleMs]);
  
  // This component doesn't render anything visible
  return null;
}
