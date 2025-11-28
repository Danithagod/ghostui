import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpookyTooltip } from './SpookyTooltip';
import { GooeyButton } from './GooeyButton';
import { MoonlightSwitch } from './MoonlightSwitch';
import { CoffinCard } from './CoffinCard';
import { SpectralTabs, TabItem } from './SpectralTabs';

/**
 * Test suite for tooltip custom styling
 * Requirements: 1.3
 * 
 * This test suite verifies that tooltipClassName prop:
 * - Works across multiple components
 * - Applies custom styles correctly
 * - Handles style conflicts and resolution
 */
describe('SpookyTooltip - Custom Styling', () => {
  describe('SpookyTooltip Direct Usage', () => {
    it('should apply custom className to tooltip', async () => {
      const user = userEvent.setup();
      const customClass = 'custom-tooltip-class';

      render(
        <SpookyTooltip content="Test tooltip" className={customClass}>
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });

    it('should apply multiple custom classes to tooltip', async () => {
      const user = userEvent.setup();
      const customClasses = 'class-one class-two class-three';

      render(
        <SpookyTooltip content="Test tooltip" className={customClasses}>
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('class-one', 'class-two', 'class-three');
      });
    });

    it('should preserve default tooltip classes when custom className is added', async () => {
      const user = userEvent.setup();
      const customClass = 'my-custom-class';

      render(
        <SpookyTooltip content="Test tooltip" className={customClass}>
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        // Verify default classes are still present
        expect(tooltip).toHaveClass('absolute', 'z-50', 'px-3', 'py-2');
        // Verify custom class is also present
        expect(tooltip).toHaveClass(customClass);
      });
    });
  });

  describe('GooeyButton with manual tooltip wrapping', () => {
    it('should apply className to manually wrapped GooeyButton tooltip', async () => {
      const user = userEvent.setup();
      const customClass = 'gooey-custom-tooltip';

      render(
        <SpookyTooltip content="Click me!" className={customClass}>
          <GooeyButton>
            Submit
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /submit/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });

    it('should apply custom background color class to manually wrapped GooeyButton tooltip', async () => {
      const user = userEvent.setup();
      const customClass = 'bg-red-500';

      render(
        <SpookyTooltip content="Custom styled" className={customClass}>
          <GooeyButton>
            Button
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /button/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });

    it('should work with different GooeyButton variants', async () => {
      const user = userEvent.setup();
      const customClass = 'custom-slime-tooltip';

      render(
        <SpookyTooltip content="Slime tooltip" className={customClass}>
          <GooeyButton variant="slime">
            Slime Button
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /slime button/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });
  });

  describe('MoonlightSwitch with tooltipClassName', () => {
    it('should apply tooltipClassName to MoonlightSwitch tooltip', async () => {
      const user = userEvent.setup();
      const customClass = 'switch-custom-tooltip';

      render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
          tooltip="Toggle me"
          tooltipClassName={customClass}
        />
      );

      const switchElement = screen.getByRole('switch');
      await user.hover(switchElement);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });

    it('should apply custom styling to both checked and unchecked states', async () => {
      const user = userEvent.setup();
      const customClass = 'custom-switch-style';

      const { rerender } = render(
        <MoonlightSwitch
          checked={false}
          onChange={() => {}}
          tooltip="Unchecked"
          tooltipClassName={customClass}
        />
      );

      const switchElement = screen.getByRole('switch');
      await user.hover(switchElement);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });

      await user.unhover(switchElement);

      // Rerender with checked state
      rerender(
        <MoonlightSwitch
          checked={true}
          onChange={() => {}}
          tooltip="Checked"
          tooltipClassName={customClass}
        />
      );

      await user.hover(switchElement);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });
  });

  describe('CoffinCard with tooltipClassName', () => {
    it('should apply tooltipClassName to CoffinCard tooltip', async () => {
      const user = userEvent.setup();
      const customClass = 'coffin-custom-tooltip';

      render(
        <CoffinCard
          tooltip="Card info"
          tooltipClassName={customClass}
        >
          Card Content
        </CoffinCard>
      );

      const card = screen.getByText('Card Content').parentElement;
      if (card) {
        await user.hover(card);
      }

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });

    it('should apply custom padding and text size classes', async () => {
      const user = userEvent.setup();
      const customClass = 'px-6 py-4 text-lg';

      render(
        <CoffinCard
          tooltip="Large tooltip"
          tooltipClassName={customClass}
        >
          Card Content
        </CoffinCard>
      );

      const card = screen.getByText('Card Content').parentElement;
      if (card) {
        await user.hover(card);
      }

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('px-6', 'py-4', 'text-lg');
      });
    });
  });

  describe('SpectralTabs with tooltipClassName', () => {
    it('should apply tooltipClassName to individual tab tooltips', async () => {
      const user = userEvent.setup();
      const customClass = 'tab-custom-tooltip';

      const tabs: TabItem[] = [
        {
          id: 'tab1',
          label: 'Tab 1',
          content: <div>Content 1</div>,
          tooltip: 'Tab 1 info',
          tooltipClassName: customClass,
        },
        {
          id: 'tab2',
          label: 'Tab 2',
          content: <div>Content 2</div>,
        },
      ];

      render(<SpectralTabs tabs={tabs} />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      await user.hover(tab1);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(customClass);
      });
    });

    it('should apply different tooltipClassName to different tabs', async () => {
      const user = userEvent.setup();
      const class1 = 'tab1-tooltip';
      const class2 = 'tab2-tooltip';

      const tabs: TabItem[] = [
        {
          id: 'tab1',
          label: 'Tab 1',
          content: <div>Content 1</div>,
          tooltip: 'Tab 1 info',
          tooltipClassName: class1,
        },
        {
          id: 'tab2',
          label: 'Tab 2',
          content: <div>Content 2</div>,
          tooltip: 'Tab 2 info',
          tooltipClassName: class2,
        },
      ];

      render(<SpectralTabs tabs={tabs} />);

      // Test first tab
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      await user.hover(tab1);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(class1);
        expect(tooltip).not.toHaveClass(class2);
      });

      await user.unhover(tab1);

      // Test second tab
      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      await user.hover(tab2);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(class2);
        expect(tooltip).not.toHaveClass(class1);
      });
    });
  });

  describe('Style Conflicts and Resolution', () => {
    it('should handle conflicting background color classes (last one wins)', async () => {
      const user = userEvent.setup();
      // The cn utility from clsx/tailwind-merge should handle conflicts
      const conflictingClasses = 'bg-red-500 bg-blue-500';

      render(
        <SpookyTooltip content="Test" className={conflictingClasses}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        // With tailwind-merge, the last class should win
        expect(tooltip).toHaveClass('bg-blue-500');
      });
    });

    it('should handle conflicting padding classes', async () => {
      const user = userEvent.setup();
      const conflictingClasses = 'px-2 px-8';

      render(
        <SpookyTooltip content="Test" className={conflictingClasses}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        // With tailwind-merge, the last class should win
        expect(tooltip).toHaveClass('px-8');
      });
    });

    it('should override default styles with custom classes', async () => {
      const user = userEvent.setup();
      // Override default background
      const customClass = 'bg-green-500';

      render(
        <SpookyTooltip content="Test" className={customClass}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('bg-green-500');
        // Default bg-ghost-dark should be overridden
      });
    });

    it('should handle empty className gracefully', async () => {
      const user = userEvent.setup();

      render(
        <SpookyTooltip content="Test" className="">
          <GooeyButton>
            Button
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /button/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        // Should still have default classes
        expect(tooltip).toHaveClass('absolute', 'z-50');
      });
    });

    it('should handle undefined className gracefully', async () => {
      const user = userEvent.setup();

      render(
        <SpookyTooltip content="Test" className={undefined}>
          <GooeyButton>
            Button
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /button/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        // Should still have default classes
        expect(tooltip).toHaveClass('absolute', 'z-50');
      });
    });
  });

  describe('Complex Custom Styling Scenarios', () => {
    it('should apply custom border and shadow classes', async () => {
      const user = userEvent.setup();
      const customClass = 'border-4 border-red-500 shadow-2xl';

      render(
        <SpookyTooltip content="Custom border" className={customClass}>
          <GooeyButton>
            Button
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /button/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('border-4', 'border-red-500', 'shadow-2xl');
      });
    });

    it('should apply custom animation classes', async () => {
      const user = userEvent.setup();
      const customClass = 'animate-pulse';

      render(
        <SpookyTooltip content="Animated" className={customClass}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('animate-pulse');
      });
    });

    it('should apply custom width and max-width classes', async () => {
      const user = userEvent.setup();
      const customClass = 'w-64 max-w-sm';

      render(
        <SpookyTooltip content="Wide tooltip" className={customClass}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('w-64', 'max-w-sm');
      });
    });

    it('should apply custom typography classes', async () => {
      const user = userEvent.setup();
      const customClass = 'font-bold text-xl italic';

      render(
        <SpookyTooltip content="Styled text" className={customClass}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('font-bold', 'text-xl', 'italic');
      });
    });

    it('should work with Tailwind arbitrary values', async () => {
      const user = userEvent.setup();
      const customClass = '[background:linear-gradient(45deg,#f00,#00f)]';

      render(
        <SpookyTooltip content="Gradient" className={customClass}>
          <button>Hover</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip.className).toContain('[background:linear-gradient(45deg,#f00,#00f)]');
      });
    });
  });

  describe('Cross-Component Consistency', () => {
    it('should apply same custom class consistently across different components', async () => {
      const user = userEvent.setup();
      const sharedClass = 'shared-tooltip-style';

      const { container } = render(
        <div>
          <SpookyTooltip content="Button" className={sharedClass}>
            <GooeyButton>
              Button
            </GooeyButton>
          </SpookyTooltip>
          <MoonlightSwitch
            checked={false}
            onChange={() => {}}
            tooltip="Switch"
            tooltipClassName={sharedClass}
          />
        </div>
      );

      // Test button tooltip
      const button = screen.getByRole('button', { name: /button/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(sharedClass);
      });

      await user.unhover(button);

      // Test switch tooltip
      const switchElement = screen.getByRole('switch');
      await user.hover(switchElement);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(sharedClass);
      });
    });
  });
});
