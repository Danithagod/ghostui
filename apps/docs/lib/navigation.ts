import { ReactNode } from 'react';

/**
 * Navigation item structure used in the docs app
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: ReactNode;
}

/**
 * Navigation section structure used in the docs app
 */
export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Menu item structure expected by GooeySidebar
 */
export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

/**
 * Transforms an array of NavSection objects into a flat array of MenuItem objects
 * for use with the GooeySidebar component.
 * 
 * - Maps href to id
 * - Maps title to label
 * - Preserves icon
 * - Flattens all sections into a single array
 * 
 * @param sections - Array of NavSection objects from the docs navigation
 * @returns Flat array of MenuItem objects for GooeySidebar
 */
export function transformNavigationToMenuItems(sections: NavSection[]): MenuItem[] {
  return sections.flatMap(section =>
    section.items.map(item => ({
      id: item.href,
      label: item.title,
      icon: item.icon,
    }))
  );
}
