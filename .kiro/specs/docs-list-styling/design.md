# Design Document

## Overview

This design implements consistent styling for unordered list (`<ul>`) and list item (`<li>`) elements across the GhostUI documentation system. The solution leverages Tailwind CSS utilities within the global stylesheet to ensure automatic application across all documentation pages without requiring manual class additions to individual components.

The design focuses on visual consistency with the existing GhostUI theme, proper spacing hierarchy, and maintaining accessibility standards. All styling will be centralized in `apps/docs/app/globals.css` within the `@layer base` section to ensure proper cascade and inheritance.

## Architecture

### Component Structure

The documentation system uses a consistent structure:
```
<div className="prose prose-invert max-w-none">
  <h2>Section Title</h2>
  <p>Description paragraph</p>
  <ComponentPlayground />
  <ul>
    <li><strong>variant</strong> - Description</li>
    <li><strong>variant</strong> - Description</li>
  </ul>
</div>
```

### Styling Approach

1. **Global Base Styles**: Define list styles in `globals.css` using Tailwind's `@layer base` directive
2. **Automatic Inheritance**: All documentation pages automatically inherit styles through the prose container
3. **No Component Changes**: Existing component pages require no modifications
4. **Theme Integration**: Styles use existing CSS custom properties for theme consistency

## Components and Interfaces

### Affected Files

**Primary File:**
- `apps/docs/app/globals.css` - Contains all list styling definitions

**Documentation Pages (No Changes Required):**
- All files in `apps/docs/app/docs/components/*/page.tsx`
- Lists will automatically inherit new styles

### CSS Structure

The list styling will be added to the existing `@layer base` section in `globals.css`:

```css
@layer base {
  /* Existing styles... */
  
  /* List Styling */
  ul, ol {
    @apply mb-6 text-ghost-white/80 text-base leading-relaxed;
  }

  ul {
    @apply list-none pl-0 space-y-3;
  }

  li {
    @apply mb-0 pl-6 relative;
  }

  li::before {
    content: "•";
    @apply absolute left-0 text-ghost-orange font-bold text-lg;
  }

  li strong {
    @apply text-ghost-orange font-semibold;
  }

  /* Nested lists */
  li ul {
    @apply mt-3 mb-0;
  }

  li ul li::before {
    content: "◦";
    @apply text-ghost-orange/70;
  }
}
```

## Data Models

No data models are required for this feature. All changes are purely presentational CSS.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Typography Consistency
*For any* list item rendered in the documentation system, the text color and opacity should match the paragraph text styling (ghost-white at 80% opacity).
**Validates: Requirements 1.2**

### Property 2: Strong Tag Styling
*For any* `<strong>` tag within a list item, the text color should be ghost-orange to match the accent color system.
**Validates: Requirements 1.3**

### Property 3: Spacing Consistency
*For any* two consecutive list items, the vertical spacing between them should be consistent across all documentation pages.
**Validates: Requirements 1.4, 2.3**

### Property 4: Bullet Color Consistency
*For any* list item bullet point, the color should be ghost-orange matching the design system accent color.
**Validates: Requirements 4.1**

### Property 5: Automatic Style Application
*For any* new documentation page created with a prose container, list styles should be automatically applied without requiring additional classes.
**Validates: Requirements 3.2**

## Error Handling

### CSS Specificity Conflicts

**Issue**: Existing component-specific styles might override global list styles.

**Solution**: Use `@layer base` to ensure proper cascade order. Base layer has lower specificity than component styles, allowing intentional overrides while providing sensible defaults.

### Theme Switching

**Issue**: List styles must work with both spectral (orange) and blood (red) themes.

**Solution**: Use CSS custom properties (`--ghost-orange`, `--ghost-white`) that automatically update based on the active theme via `[data-theme]` attribute.

### Prose Plugin Conflicts

**Issue**: Tailwind's prose plugin may have its own list styling that conflicts.

**Solution**: The `prose-invert` class is already in use. Our base styles will override prose defaults while maintaining compatibility with prose typography utilities.

## Testing Strategy

### Unit Testing

Unit tests will verify specific styling scenarios:

1. **List Item Text Color**: Verify computed color matches `ghost-white` at 80% opacity
2. **Strong Tag Color**: Verify `<strong>` elements within lists use `ghost-orange`
3. **Bullet Point Rendering**: Verify `::before` pseudo-element renders with correct content and color
4. **Spacing Values**: Verify margin and padding values match design specifications
5. **Theme Switching**: Verify styles update correctly when theme changes

### Visual Regression Testing

Since this is primarily a visual feature, manual visual inspection is recommended:

1. Review gooey-button page lists (variants, fluidity, accessibility)
2. Review moonlight-switch page lists (accessibility)
3. Review spectral-tabs page lists (tooltip positioning, accessibility)
4. Verify consistent appearance across all component documentation pages
5. Test both spectral and blood themes
6. Test responsive behavior on mobile, tablet, and desktop viewports

### Accessibility Testing

1. **Screen Reader Testing**: Verify list structure is properly announced
2. **Keyboard Navigation**: Ensure list content is accessible via keyboard
3. **High Contrast Mode**: Verify text remains readable
4. **Color Contrast**: Verify text meets WCAG AA standards (4.5:1 ratio)

### Browser Compatibility

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Implementation Notes

### Spacing Scale

The design uses Tailwind's spacing scale:
- `mb-6`: 1.5rem (24px) bottom margin for lists
- `space-y-3`: 0.75rem (12px) between list items
- `pl-6`: 1.5rem (24px) left padding for list items (accommodates bullet)

### Bullet Point Positioning

The bullet point uses absolute positioning:
- `left-0`: Aligns bullet to the left edge of the list item
- `pl-6`: Creates space for the bullet within the list item
- `text-lg`: Makes bullet slightly larger for visual prominence

### Strong Tag Enhancement

List items commonly use `<strong>` tags for variant names or feature labels. These receive special styling to create visual hierarchy and draw attention to key terms.

### Performance Considerations

All styles are static CSS with no JavaScript required. Performance impact is negligible as styles are parsed once during page load and applied via the browser's rendering engine.
