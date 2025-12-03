import { useEffect, useRef } from 'react';
import { useCursorContext } from './CursorContext';
import { CursorEffectOptions } from '../../types/cursor-effects';

/**
 * Hook for components to opt-in to cursor effects
 * 
 * This hook provides a ref that components can attach to their DOM elements
 * to register for cursor interactions. The element is automatically registered
 * when the ref is attached and unregistered when the component unmounts.
 * 
 * Features:
 * - Returns ref object for DOM attachment
 * - Accepts configuration options for effect type, intensity, and proximity radius
 * - Automatic registration when ref is attached
 * - Automatic cleanup on component unmount
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.4
 * 
 * @param options - Configuration options for cursor effects
 * @returns React ref object to attach to DOM element
 * 
 * @example
 * ```tsx
 * function MyButton() {
 *   const ref = useCursorEffect({ 
 *     type: 'button', 
 *     intensity: 0.8,
 *     attraction: 'attract'
 *   });
 *   
 *   return <button ref={ref}>Click me</button>;
 * }
 * ```
 */
export function useCursorEffect<T extends HTMLElement = HTMLElement>(options: CursorEffectOptions = {}): React.RefObject<T> {
  const { registerElement, unregisterElement } = useCursorContext();
  const ref = useRef<T>(null);
  const idRef = useRef<string>(`cursor-element-${Math.random().toString(36).substr(2, 9)}`);
  
  useEffect(() => {
    const id = idRef.current;
    
    // Register element when ref is attached
    if (ref.current) {
      registerElement(id, ref as React.RefObject<HTMLElement>, options);
    }
    
    // Cleanup: unregister element on unmount
    return () => {
      unregisterElement(id);
    };
  }, [registerElement, unregisterElement, options]);
  
  return ref;
}
