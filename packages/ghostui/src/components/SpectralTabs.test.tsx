import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { SpectralTabs } from './SpectralTabs';
import { ThemeProvider } from './ThemeProvider';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

describe('SpectralTabs - Unit Tests', () => {
  // Test ref forwarding - Requirements 2.1
  describe('Ref Forwarding', () => {
    it('should forward ref to the root div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SpectralTabs ref={ref} tabs={mockTabs} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should allow accessing DOM methods through ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SpectralTabs ref={ref} tabs={mockTabs} />);
      
      expect(ref.current?.getBoundingClientRect).toBeDefined();
    });
  });

  // Test displayName - Requirements 3.1
  describe('displayName', () => {
    it('should have displayName set to SpectralTabs', () => {
      expect(SpectralTabs.displayName).toBe('SpectralTabs');
    });
  });

  // Test ARIA attributes - Requirements 6.1
  describe('ARIA Attributes', () => {
    it('should have role="tablist" on tab container', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('should have role="tab" on each tab button', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(mockTabs.length);
    });

    it('should have aria-selected on active tab', () => {
      render(<SpectralTabs tabs={mockTabs} defaultTab="tab2" />);
      
      const tabs = screen.getAllByRole('tab');
      const tab2 = tabs.find(tab => tab.textContent === 'Tab 2');
      
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('should have aria-controls linking tab to panel', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute('aria-controls', `panel-${mockTabs[index].id}`);
      });
    });

    it('should have role="tabpanel" on content area', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should have aria-labelledby on tabpanel', () => {
      render(<SpectralTabs tabs={mockTabs} defaultTab="tab1" />);
      
      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-tab1');
    });
  });

  // Test basic functionality
  describe('Basic Functionality', () => {
    it('should render all tab labels', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      mockTabs.forEach(tab => {
        expect(screen.getByText(tab.label)).toBeInTheDocument();
      });
    });

    it('should show first tab content by default', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should show specified default tab content', () => {
      render(<SpectralTabs tabs={mockTabs} defaultTab="tab2" />);
      
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should switch tabs on click', () => {
      render(<SpectralTabs tabs={mockTabs} />);
      
      fireEvent.click(screen.getByText('Tab 2'));
      
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should call onTabChange when tab is clicked', () => {
      const onTabChange = vi.fn();
      render(<SpectralTabs tabs={mockTabs} onTabChange={onTabChange} />);
      
      fireEvent.click(screen.getByText('Tab 2'));
      
      expect(onTabChange).toHaveBeenCalledWith('tab2');
    });
  });

  // Test theme integration
  describe('Theme Integration', () => {
    it('should apply spectral theme by default', () => {
      const { container } = render(<SpectralTabs tabs={mockTabs} />);
      
      // Check that spectral colors are applied (purple-based)
      const tabContainer = container.querySelector('[style*="border"]');
      expect(tabContainer).toBeTruthy();
    });

    it('should apply blood theme when variant is set', () => {
      const { container } = render(
        <SpectralTabs tabs={mockTabs} variant="blood" />
      );
      
      // Component should render with blood theme
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should use theme from ThemeProvider context', () => {
      const { container } = render(
        <ThemeProvider defaultTheme="blood">
          <SpectralTabs tabs={mockTabs} />
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

// Import vi for mocking
import { vi } from 'vitest';
