/**
 * Shared interface for components that support tooltip functionality.
 * This interface can be extended by any component to add tooltip support.
 */
export interface WithTooltipProps {
  /** Content to display in the tooltip */
  tooltip?: React.ReactNode;
  
  /** Position of the tooltip relative to the component */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /** Additional CSS classes for the tooltip */
  tooltipClassName?: string;
}
