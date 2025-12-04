import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { GhostToastProvider, useGhostToast } from './GhostToast';

describe('GhostToast - Unit Tests', () => {
  // Test aria-live region - Requirements 6.2
  describe('ARIA Live Region', () => {
    it('should have aria-live="polite" on toast container', () => {
      const { container } = render(
        <GhostToastProvider>
          <div>App content</div>
        </GhostToastProvider>
      );
      
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();
    });

    it('should have aria-label on toast container', () => {
      const { container } = render(
        <GhostToastProvider>
          <div>App content</div>
        </GhostToastProvider>
      );
      
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toHaveAttribute('aria-label');
    });
  });

  // Test cn import (no local definition) - Requirements 1.1
  describe('cn Utility Import', () => {
    it('should import cn from utils, not define locally', () => {
      const componentPath = path.join(__dirname, 'GhostToast.tsx');
      const content = fs.readFileSync(componentPath, 'utf-8');
      
      // Check that cn is imported from utils
      const importsFromUtils = /import.*\{[^}]*cn[^}]*\}.*from.*['"]\.\.\/lib\/utils['"]/.test(content);
      expect(importsFromUtils).toBe(true);
      
      // Check that there's no local cn function definition
      const hasLocalCn = /function cn\s*\(/.test(content);
      expect(hasLocalCn).toBe(false);
    });
  });

  // Test displayName
  describe('displayName', () => {
    it('should have displayName set on GhostToastProvider', () => {
      expect(GhostToastProvider.displayName).toBe('GhostToastProvider');
    });
  });

  // Test basic functionality
  describe('Basic Functionality', () => {
    it('should render children content', () => {
      render(
        <GhostToastProvider>
          <div data-testid="child">Child content</div>
        </GhostToastProvider>
      );
      
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should throw error when useGhostToast is used outside provider', () => {
      const TestComponent = () => {
        useGhostToast();
        return null;
      };
      
      expect(() => render(<TestComponent />)).toThrow(
        'useGhostToast must be used within a GhostToastProvider'
      );
    });

    it('should provide addToast function through context', () => {
      let addToastFn: ((msg: string, t?: 'info' | 'curse') => void) | undefined;
      
      const TestComponent = () => {
        const { addToast } = useGhostToast();
        addToastFn = addToast;
        return null;
      };
      
      render(
        <GhostToastProvider>
          <TestComponent />
        </GhostToastProvider>
      );
      
      expect(addToastFn).toBeDefined();
      expect(typeof addToastFn).toBe('function');
    });
  });

  // Test GhostToastItem has role="status" and aria-atomic
  describe('Toast Item Accessibility', () => {
    it('should have role="status" attribute defined in GhostToastItem', () => {
      const componentPath = path.join(__dirname, 'GhostToast.tsx');
      const content = fs.readFileSync(componentPath, 'utf-8');
      
      // Check that role="status" is used in the component
      expect(content).toContain('role="status"');
    });

    it('should have aria-atomic="true" attribute defined in GhostToastItem', () => {
      const componentPath = path.join(__dirname, 'GhostToast.tsx');
      const content = fs.readFileSync(componentPath, 'utf-8');
      
      // Check that aria-atomic="true" is used in the component
      expect(content).toContain('aria-atomic="true"');
    });
  });
});
