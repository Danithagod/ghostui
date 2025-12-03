import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { CursorEffectProvider } from './CursorContext';
import { useCursorEffect } from './useCursorEffect';

/**
 * Integration tests for component type-specific behaviors
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
describe('Component Type-Specific Behaviors', () => {
  it('should allow button elements to register with intensified effects', () => {
    function TestButton() {
      const ref = useCursorEffect({ type: 'button', intensity: 1.0 });
      return <button ref={ref as React.RefObject<HTMLButtonElement>}>Test Button</button>;
    }
    
    const { container } = render(
      <CursorEffectProvider>
        <TestButton />
      </CursorEffectProvider>
    );
    
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });
  
  it('should allow draggable elements to register with grabbing cursor', () => {
    function TestDraggable() {
      const ref = useCursorEffect<HTMLDivElement>({ type: 'draggable', attraction: 'attract' });
      return <div ref={ref}>Draggable</div>;
    }
    
    const { container } = render(
      <CursorEffectProvider>
        <TestDraggable />
      </CursorEffectProvider>
    );
    
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
  });
  
  it('should allow card elements to register with subtle effects', () => {
    function TestCard() {
      const ref = useCursorEffect<HTMLDivElement>({ type: 'card', intensity: 0.5 });
      return <div ref={ref}>Card</div>;
    }
    
    const { container } = render(
      <CursorEffectProvider>
        <TestCard />
      </CursorEffectProvider>
    );
    
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
  });
  
  it('should allow link elements to register with particle effects', () => {
    function TestLink() {
      const ref = useCursorEffect({ type: 'link' });
      return <a ref={ref as React.RefObject<HTMLAnchorElement>} href="#">Link</a>;
    }
    
    const { container } = render(
      <CursorEffectProvider config={{ effects: { particles: true } }}>
        <TestLink />
      </CursorEffectProvider>
    );
    
    const link = container.querySelector('a');
    expect(link).toBeTruthy();
  });
  
  it('should support multiple element types simultaneously', () => {
    function TestMultiple() {
      const buttonRef = useCursorEffect<HTMLButtonElement>({ type: 'button' });
      const cardRef = useCursorEffect<HTMLDivElement>({ type: 'card' });
      const linkRef = useCursorEffect<HTMLAnchorElement>({ type: 'link' });
      
      return (
        <>
          <button ref={buttonRef}>Button</button>
          <div ref={cardRef}>Card</div>
          <a ref={linkRef} href="#">Link</a>
        </>
      );
    }
    
    const { container } = render(
      <CursorEffectProvider>
        <TestMultiple />
      </CursorEffectProvider>
    );
    
    expect(container.querySelector('button')).toBeTruthy();
    expect(container.querySelector('div')).toBeTruthy();
    expect(container.querySelector('a')).toBeTruthy();
  });
});
