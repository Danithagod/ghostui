import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpookyTooltip } from './SpookyTooltip';
import { GooeyButton } from './GooeyButton';

/**
 * Test suite for complex tooltip content rendering
 * Requirements: 4.2, 4.3, 4.4
 * 
 * This test suite verifies that SpookyTooltip correctly handles:
 * - React nodes (formatted text, icons, etc.)
 * - Multiline content
 * - Layout and styling preservation
 */
describe('SpookyTooltip - Complex Content Rendering', () => {
  describe('React Node Content', () => {
    it('should render formatted text with strong tags', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div>
          <strong>Important:</strong> This is bold text
        </div>
      );

      render(
        <SpookyTooltip content={complexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        
        // Verify the strong tag is preserved
        const strongElement = tooltip.querySelector('strong');
        expect(strongElement).toBeInTheDocument();
        expect(strongElement).toHaveTextContent('Important:');
      });
    });

    it('should render formatted text with em tags', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div>
          <em>Emphasized</em> content here
        </div>
      );

      render(
        <SpookyTooltip content={complexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const emElement = tooltip.querySelector('em');
        expect(emElement).toBeInTheDocument();
        expect(emElement).toHaveTextContent('Emphasized');
      });
    });

    it('should render nested HTML structure', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div className="custom-tooltip">
          <h4>Title</h4>
          <p>Description text</p>
          <span>Additional info</span>
        </div>
      );

      render(
        <SpookyTooltip content={complexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        
        // Verify all nested elements are present
        expect(tooltip.querySelector('h4')).toHaveTextContent('Title');
        expect(tooltip.querySelector('p')).toHaveTextContent('Description text');
        expect(tooltip.querySelector('span')).toHaveTextContent('Additional info');
        
        // Verify custom class is preserved
        expect(tooltip.querySelector('.custom-tooltip')).toBeInTheDocument();
      });
    });

    it('should render content with inline styles', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div style={{ color: 'rgb(255, 0, 0)', fontWeight: 'bold' }}>
          Styled content
        </div>
      );

      render(
        <SpookyTooltip content={complexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const styledDiv = tooltip.querySelector('div[style]');
        
        expect(styledDiv).toBeInTheDocument();
        // Browsers normalize color values to rgb format
        expect(styledDiv).toHaveStyle({ color: 'rgb(255, 0, 0)', fontWeight: 'bold' });
      });
    });

    it('should render content with multiple CSS classes', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div className="class-one class-two class-three">
          Multi-class content
        </div>
      );

      render(
        <SpookyTooltip content={complexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const multiClassDiv = tooltip.querySelector('.class-one.class-two.class-three');
        
        expect(multiClassDiv).toBeInTheDocument();
        expect(multiClassDiv).toHaveClass('class-one', 'class-two', 'class-three');
      });
    });
  });

  describe('Multiline Content', () => {
    it('should render multiline string content', async () => {
      const user = userEvent.setup();
      const multilineContent = `Line 1
Line 2
Line 3`;

      render(
        <SpookyTooltip content={multilineContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip.textContent).toContain('Line 1');
        expect(tooltip.textContent).toContain('Line 2');
        expect(tooltip.textContent).toContain('Line 3');
      });
    });

    it('should render multiline content with br tags', async () => {
      const user = userEvent.setup();
      const multilineContent = (
        <div>
          Line 1<br />
          Line 2<br />
          Line 3
        </div>
      );

      render(
        <SpookyTooltip content={multilineContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const brTags = tooltip.querySelectorAll('br');
        
        expect(brTags).toHaveLength(2);
        expect(tooltip.textContent).toContain('Line 1');
        expect(tooltip.textContent).toContain('Line 2');
        expect(tooltip.textContent).toContain('Line 3');
      });
    });

    it('should render multiline content with paragraph tags', async () => {
      const user = userEvent.setup();
      const multilineContent = (
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <p>Paragraph 3</p>
        </div>
      );

      render(
        <SpookyTooltip content={multilineContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const paragraphs = tooltip.querySelectorAll('p');
        
        expect(paragraphs).toHaveLength(3);
        expect(paragraphs[0]).toHaveTextContent('Paragraph 1');
        expect(paragraphs[1]).toHaveTextContent('Paragraph 2');
        expect(paragraphs[2]).toHaveTextContent('Paragraph 3');
      });
    });

    it('should handle long multiline content without breaking layout', async () => {
      const user = userEvent.setup();
      const longContent = (
        <div>
          <p>This is a very long line of text that should wrap properly within the tooltip container without breaking the layout or causing overflow issues.</p>
          <p>Another long paragraph that tests the tooltip's ability to handle extended content gracefully.</p>
        </div>
      );

      render(
        <SpookyTooltip content={longContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        
        // Verify content is present
        const paragraphs = tooltip.querySelectorAll('p');
        expect(paragraphs).toHaveLength(2);
        
        // Verify tooltip has proper structure
        expect(tooltip).toHaveClass('absolute');
      });
    });
  });

  describe('Layout and Styling Preservation', () => {
    it('should preserve flexbox layout in tooltip content', async () => {
      const user = userEvent.setup();
      const flexContent = (
        <div style={{ display: 'flex', gap: '8px' }}>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </div>
      );

      render(
        <SpookyTooltip content={flexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const flexContainer = tooltip.querySelector('div[style*="flex"]');
        
        expect(flexContainer).toBeInTheDocument();
        expect(flexContainer).toHaveStyle({ display: 'flex' });
        
        const spans = flexContainer?.querySelectorAll('span');
        expect(spans).toHaveLength(3);
      });
    });

    it('should preserve grid layout in tooltip content', async () => {
      const user = userEvent.setup();
      const gridContent = (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div>Cell 1</div>
          <div>Cell 2</div>
          <div>Cell 3</div>
          <div>Cell 4</div>
        </div>
      );

      render(
        <SpookyTooltip content={gridContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const gridContainer = tooltip.querySelector('div[style*="grid"]');
        
        expect(gridContainer).toBeInTheDocument();
        expect(gridContainer).toHaveStyle({ display: 'grid' });
        
        const cells = gridContainer?.querySelectorAll('div');
        expect(cells).toHaveLength(4);
      });
    });

    it('should preserve list structure in tooltip content', async () => {
      const user = userEvent.setup();
      const listContent = (
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      );

      render(
        <SpookyTooltip content={listContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const list = tooltip.querySelector('ul');
        const listItems = tooltip.querySelectorAll('li');
        
        expect(list).toBeInTheDocument();
        expect(listItems).toHaveLength(3);
        expect(listItems[0]).toHaveTextContent('Item 1');
        expect(listItems[1]).toHaveTextContent('Item 2');
        expect(listItems[2]).toHaveTextContent('Item 3');
      });
    });

    it('should preserve complex nested structure with mixed elements', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div className="tooltip-wrapper">
          <header style={{ fontWeight: 'bold' }}>
            <strong>Header</strong>
          </header>
          <section>
            <p>Paragraph with <em>emphasis</em></p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </section>
          <footer style={{ fontSize: '12px' }}>
            Footer text
          </footer>
        </div>
      );

      render(
        <SpookyTooltip content={complexContent} position="top">
          <button>Hover me</button>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /hover me/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        
        // Verify all structural elements are present
        expect(tooltip.querySelector('header')).toBeInTheDocument();
        expect(tooltip.querySelector('section')).toBeInTheDocument();
        expect(tooltip.querySelector('footer')).toBeInTheDocument();
        expect(tooltip.querySelector('strong')).toHaveTextContent('Header');
        expect(tooltip.querySelector('em')).toHaveTextContent('emphasis');
        expect(tooltip.querySelectorAll('li')).toHaveLength(2);
        
        // Verify styles are preserved
        expect(tooltip.querySelector('header')).toHaveStyle({ fontWeight: 'bold' });
        expect(tooltip.querySelector('footer')).toHaveStyle({ fontSize: '12px' });
      });
    });
  });

  describe('Integration with GooeyButton', () => {
    it('should render complex tooltip content on GooeyButton with manual wrapping', async () => {
      const user = userEvent.setup();
      const complexTooltip = (
        <div>
          <strong>Action:</strong> Click to submit
          <br />
          <em>Shortcut: Ctrl+Enter</em>
        </div>
      );

      render(
        <SpookyTooltip content={complexTooltip} position="top">
          <GooeyButton>
            Submit
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /submit/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip.querySelector('strong')).toHaveTextContent('Action:');
        expect(tooltip.querySelector('em')).toHaveTextContent('Shortcut: Ctrl+Enter');
      });
    });

    it('should render multiline tooltip content on GooeyButton with manual wrapping', async () => {
      const user = userEvent.setup();
      const multilineTooltip = (
        <div>
          <p>Line 1: First instruction</p>
          <p>Line 2: Second instruction</p>
          <p>Line 3: Third instruction</p>
        </div>
      );

      render(
        <SpookyTooltip content={multilineTooltip} position="bottom">
          <GooeyButton>
            Help
          </GooeyButton>
        </SpookyTooltip>
      );

      const button = screen.getByRole('button', { name: /help/i });
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const paragraphs = tooltip.querySelectorAll('p');
        
        expect(paragraphs).toHaveLength(3);
        expect(paragraphs[0]).toHaveTextContent('Line 1: First instruction');
        expect(paragraphs[1]).toHaveTextContent('Line 2: Second instruction');
        expect(paragraphs[2]).toHaveTextContent('Line 3: Third instruction');
      });
    });
  });
});
