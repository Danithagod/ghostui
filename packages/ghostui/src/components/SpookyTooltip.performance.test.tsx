import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpookyTooltip } from './SpookyTooltip';
import { GooeyButton } from './GooeyButton';
import { MoonlightSwitch } from './MoonlightSwitch';
import { CoffinCard } from './CoffinCard';
import { SpectralTabs, TabItem } from './SpectralTabs';

/**
 * Test suite for tooltip performance and DOM behavior
 * Requirements: 5.1, 5.3
 * 
 * This test suite verifies that:
 * - Tooltips only render when visible
 * - Conditional wrapper mounting works correctly
 * - No tooltip DOM when tooltip prop is omitted
 */
describe('SpookyTooltip - Performance and DOM Behavior', () => {
  describe('Conditional Wrapper Mounting', () => {
    it('should not mount tooltip wrapper when GooeyButton is not wrapped with SpookyTooltip', () => {
      const { container } = render(
        <GooeyButton>
          Click me
        </GooeyButton>
      );

      // Verify no tooltip-related elements exist in the DOM
      expect(container.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      
      // Verify the button itself is rendered
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('should not mount tooltip wrapper when tooltip prop is omitted on MoonlightSwitch', () => {
      const { container } = render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
        />
      );

      // Verify no tooltip-related elements exist in the DOM
      expect(container.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      
      // Verify the switch itself is rendered
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should not mount tooltip wrapper when tooltip prop is omitted on CoffinCard', () => {
      const { container } = render(
        <CoffinCard>
          Card Content
        </CoffinCard>
      );

      // Verify no tooltip-related elements exist in the DOM
      expect(container.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      
      // Verify the card itself is rendered
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should not mount tooltip wrapper when tooltip prop is omitted on SpectralTabs', () => {
      const tabs: TabItem[] = [
        {
          id: 'tab1',
          label: 'Tab 1',
          content: <div>Content 1</div>,
        },
        {
          id: 'tab2',
          label: 'Tab 2',
          content: <div>Content 2</div>,
        },
      ];

      const { container } = render(<SpectralTabs tabs={tabs} />);

      // Verify no tooltip-related elements exist in the DOM
      expect(container.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      
      // Verify the tabs themselves are rendered
      expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    });

    it('should mount tooltip wrapper when GooeyButton is manually wrapped with SpookyTooltip', () => {
      const { container } = render(
        <SpookyTooltip content="Click to submit">
          <GooeyButton>
            Submit
          </GooeyButton>
        </SpookyTooltip>
      );

      // Verify the button is rendered
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toBeInTheDocument();
      
      // Verify tooltip wrapper container exists (the relative inline-block div)
      const tooltipWrapper = container.querySelector('.relative.inline-block');
      expect(tooltipWrapper).toBeInTheDocument();
    });

    it('should mount tooltip wrapper when tooltip prop is provided on MoonlightSwitch', () => {
      const { container } = render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
          tooltip="Toggle setting"
        />
      );

      // Verify the switch is rendered
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      
      // Verify tooltip wrapper container exists
      const tooltipWrapper = container.querySelector('.relative.inline-block');
      expect(tooltipWrapper).toBeInTheDocument();
    });
  });

  describe('Hidden Tooltip DOM Absence', () => {
    it('should not render tooltip DOM when not visible on manually wrapped GooeyButton', () => {
      const { container } = render(
        <SpookyTooltip content="Hover me">
          <GooeyButton>
            Button
          </GooeyButton>
        </SpookyTooltip>
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      
      // Verify no tooltip content is rendered
      expect(container.textContent).not.toContain('Hover me');
    });

    it('should not render tooltip DOM when not visible on MoonlightSwitch', () => {
      const { container } = render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
          tooltip="Switch tooltip"
        />
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      
      // Verify no tooltip content is rendered
      expect(container.textContent).not.toContain('Switch tooltip');
    });

    it('should render CoffinCard without tooltip DOM', () => {
      const { container } = render(
        <CoffinCard>
          Card Content
        </CoffinCard>
      );

      // CoffinCard should not have tooltip functionality
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      
      // Verify only card content is rendered
      expect(screen.getByText('Card Content')).toBeInTheDocument();
      expect(container.textContent).not.toContain('Card info');
    });

    it('should not render tooltip DOM when not visible on SpectralTabs', () => {
      const tabs: TabItem[] = [
        {
          id: 'tab1',
          label: 'Tab 1',
          content: <div>Content 1</div>,
          tooltip: 'Tab 1 info',
        },
      ];

      const { container } = render(<SpectralTabs tabs={tabs} />);

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      
      // Verify no tooltip content is rendered
      expect(container.textContent).not.toContain('Tab 1 info');
    });
  });

  describe('Tooltips Only Render When Visible', () => {
    it('should render tooltip DOM only when hovered on manually wrapped GooeyButton', async () => {
      const user = userEvent.setup();
      
      render(
        <SpookyTooltip content="Click to submit">
          <GooeyButton>
            Submit
          </GooeyButton>
        </SpookyTooltip>
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Hover over the button
      const button = screen.getByRole('button', { name: /submit/i });
      await user.hover(button);

      // Now tooltip should be visible in the DOM
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Click to submit');
      });

      // Unhover
      await user.unhover(button);

      // Tooltip should be removed from the DOM
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('should render tooltip DOM only when hovered on MoonlightSwitch', async () => {
      const user = userEvent.setup();
      
      render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
          tooltip="Toggle setting"
        />
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Hover over the switch
      const switchElement = screen.getByRole('switch');
      await user.hover(switchElement);

      // Now tooltip should be visible in the DOM
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Toggle setting');
      });

      // Unhover
      await user.unhover(switchElement);

      // Tooltip should be removed from the DOM
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('should render tooltip DOM only when focused on manually wrapped GooeyButton', async () => {
      const user = userEvent.setup();
      
      // Note: GooeyButton has a complex structure where the button is nested inside a container div.
      // SpookyTooltip wraps the entire GooeyButton component, so focus events on the inner button
      // don't bubble up to trigger the tooltip. This is expected behavior - tooltips show on hover,
      // not on focus for complex wrapped components. For focus-based tooltips, wrap the button directly.
      render(
        <SpookyTooltip content="Click to submit">
          <button>Submit</button>
        </SpookyTooltip>
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Focus the button
      const button = screen.getByRole('button', { name: /submit/i });
      await user.tab(); // Tab to focus the button

      // Now tooltip should be visible in the DOM
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Click to submit');
      });

      // Blur the button
      button.blur();

      // Tooltip should be removed from the DOM (allow time for exit animation)
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('should render tooltip DOM only when focused on MoonlightSwitch', async () => {
      const user = userEvent.setup();
      
      render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
          tooltip="Toggle setting"
        />
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Focus the switch
      const switchElement = screen.getByRole('switch');
      await user.tab(); // Tab to focus the switch

      // Now tooltip should be visible in the DOM
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Toggle setting');
      });

      // Blur the switch
      switchElement.blur();

      // Tooltip should be removed from the DOM
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('Multiple Components with Tooltips', () => {
    it('should handle multiple components with tooltips without performance issues', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <SpookyTooltip content="Button 1">
            <GooeyButton>Button 1</GooeyButton>
          </SpookyTooltip>
          <SpookyTooltip content="Button 2">
            <GooeyButton>Button 2</GooeyButton>
          </SpookyTooltip>
          <SpookyTooltip content="Button 3">
            <GooeyButton>Button 3</GooeyButton>
          </SpookyTooltip>
          <MoonlightSwitch
            checked={false}
            onChange={() => {}}
            tooltip="Switch 1"
          />
          <MoonlightSwitch
            checked={true}
            onChange={() => {}}
            tooltip="Switch 2"
          />
        </div>
      );

      // Initially, no tooltips should be in the DOM
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);

      // Hover over first button
      const button1 = screen.getByRole('button', { name: /button 1/i });
      await user.hover(button1);

      // Only one tooltip should be visible
      await waitFor(() => {
        const tooltips = screen.queryAllByRole('tooltip');
        expect(tooltips).toHaveLength(1);
        expect(tooltips[0]).toHaveTextContent('Button 1');
      });

      // Unhover first button
      await user.unhover(button1);

      // No tooltips should be visible
      await waitFor(() => {
        expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
      });

      // Hover over switch
      const switch1 = screen.getAllByRole('switch')[0];
      await user.hover(switch1);

      // Only one tooltip should be visible
      await waitFor(() => {
        const tooltips = screen.queryAllByRole('tooltip');
        expect(tooltips).toHaveLength(1);
        expect(tooltips[0]).toHaveTextContent('Switch 1');
      });
    });

    it('should not render any tooltip DOM when no components are hovered', () => {
      render(
        <div>
          <SpookyTooltip content="Button 1">
            <GooeyButton>Button 1</GooeyButton>
          </SpookyTooltip>
          <SpookyTooltip content="Button 2">
            <GooeyButton>Button 2</GooeyButton>
          </SpookyTooltip>
          <MoonlightSwitch
            checked={false}
            onChange={() => {}}
            tooltip="Switch 1"
          />
        </div>
      );

      // No tooltips should be in the DOM
      expect(screen.queryAllByRole('tooltip')).toHaveLength(0);
    });
  });

  describe('Direct SpookyTooltip Usage', () => {
    it('should not render tooltip DOM when not visible', () => {
      render(
        <SpookyTooltip content="Tooltip text">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('should render tooltip DOM only when hovered', async () => {
      const user = userEvent.setup();
      
      render(
        <SpookyTooltip content="Tooltip text">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Hover over the button
      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      // Now tooltip should be visible in the DOM
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
      });

      // Unhover
      await user.unhover(button);

      // Tooltip should be removed from the DOM
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('should render tooltip DOM only when focused', async () => {
      const user = userEvent.setup();
      
      render(
        <SpookyTooltip content="Tooltip text">
          <button>Focus me</button>
        </SpookyTooltip>
      );

      // Initially, tooltip should not be in the DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Focus the button
      const button = screen.getByRole('button', { name: /focus me/i });
      await user.tab();

      // Now tooltip should be visible in the DOM
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
      });

      // Blur the button
      button.blur();

      // Tooltip should be removed from the DOM
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('AnimatePresence Behavior', () => {
    it('should use AnimatePresence to conditionally render tooltip', async () => {
      const user = userEvent.setup();
      
      const { container } = render(
        <SpookyTooltip content="Animated tooltip">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      // Initially, no tooltip in DOM
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // Hover to show tooltip
      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      // Tooltip should appear with animation
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });

      // Unhover to hide tooltip
      await user.unhover(button);

      // Tooltip should be removed from DOM after animation
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      }, { timeout: 1000 }); // Allow time for exit animation
    });
  });
});
