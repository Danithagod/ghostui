# Design Document

## Overview

This design document outlines the approach for standardizing documentation and styling across all GhostUI component pages. The solution involves creating a documentation style guide, implementing reusable patterns, and systematically updating all component pages to follow consistent standards.

The design focuses on three main areas:
1. **Content Standardization**: Ensuring all components have complete API documentation and comprehensive usage examples
2. **Visual Consistency**: Applying uniform spacing, typography, and styling across all pages
3. **Maintainability**: Creating templates and patterns that make it easy to add new components or update existing ones

## Architecture

### Component Structure

The documentation site follows a Next.js App Router structure with component pages located at:
```
apps/docs/app/docs/components/[component-name]/page.tsx
```

Each component page is a client-side React component that uses shared documentation components:
- `ComponentPlayground`: Interactive preview with code and API tabs
- `PropsTable`: Standardized table for displaying component props
- `CodeBlock`: Syntax-highlighted code examples

### Documentation Pattern

All component pages will follow this structure:

```tsx
export default function ComponentPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
          Component Name
        </h1>
        <p className="lead text-ghost-white/90">
          Brief description of the component's purpose and key features.
        </p>
      </div>

      {/* 2. Basic Usage */}
      <ComponentPlayground
        preview={/* Interactive demo */}
        code={/* Code example */}
        api={<PropsTable props={propsData} />}
      />

      {/* 3. Additional Sections */}
      <section className="space-y-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
          Section Title
        </h2>
        <p className="text-ghost-white/80 leading-relaxed">
          Section content...
        </p>
        {/* More examples */}
      </section>
    </div>
  );
}
```

### Style System

The design uses Tailwind CSS utility classes with a consistent pattern:

**Spacing:**
- Between major sections: `mt-12` or `space-y-12`
- Between subsections: `mt-8` or `space-y-8`
- Between headers and content: `space-y-4`
- Between paragraphs: `space-y-6`
- Within preview containers: `p-6` or `p-8`

**Typography:**
- H1 headers: `text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide`
- H2 headers: `text-2xl md:text-3xl font-display text-ghost-orange tracking-wide`
- H3 headers: `text-xl md:text-2xl font-semibold text-ghost-white`
- Lead paragraphs: `lead text-ghost-white/90`
- Body text: `text-ghost-white/80 leading-relaxed`
- Code: `font-mono text-ghost-green`

**Containers:**
- Preview containers: `bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8`
- Code blocks: `bg-ghost-black border border-ghost-orange/30 rounded-lg p-4`
- Info boxes: `bg-ghost-orange/10 border border-ghost-orange/30 rounded-lg p-6`

## Components and Interfaces

### Documentation Components

#### ComponentPlayground
Already exists. Used for interactive component demonstrations with preview, code, and API tabs.

```tsx
interface ComponentPlaygroundProps {
  preview: React.ReactNode;
  code: string;
  api?: React.ReactNode;
}
```

#### PropsTable
Already exists. Used for displaying component API documentation.

```tsx
interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
}
```

### Style Guide Component (New)

Create a reusable style guide that documents the standard patterns:

```tsx
// apps/docs/lib/doc-styles.ts
export const docStyles = {
  page: {
    container: "space-y-12",
  },
  headers: {
    h1: "text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide",
    h2: "text-2xl md:text-3xl font-display text-ghost-orange tracking-wide",
    h3: "text-xl md:text-2xl font-semibold text-ghost-white",
  },
  text: {
    lead: "lead text-ghost-white/90",
    body: "text-ghost-white/80 leading-relaxed",
    code: "font-mono text-ghost-green",
  },
  spacing: {
    section: "mt-12",
    subsection: "mt-8",
    content: "space-y-6",
    headerContent: "space-y-4",
  },
  containers: {
    preview: "bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8",
    code: "bg-ghost-black border border-ghost-orange/30 rounded-lg p-4",
    info: "bg-ghost-orange/10 border border-ghost-orange/30 rounded-lg p-6",
  },
};
```

## Data Models

### Component Documentation Data

Each component page should maintain structured data for its props:

```typescript
interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface ComponentVariant {
  name: string;
  description: string;
  example: React.ReactNode;
  code: string;
}

interface ComponentDocumentation {
  name: string;
  description: string;
  props: ComponentProp[];
  variants?: ComponentVariant[];
  examples: {
    title: string;
    description: string;
    preview: React.ReactNode;
    code: string;
  }[];
  accessibility?: {
    features: string[];
    notes?: string;
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Complete API Documentation
*For any* component page, the page should contain a PropsTable component with all props having non-empty name, type, and description fields
**Validates: Requirements 1.1, 6.1**

### Property 2: Minimum Example Count
*For any* component page, the page should contain at least 2 ComponentPlayground instances or code examples
**Validates: Requirements 1.2, 10.1**

### Property 3: Basic Usage Section Presence
*For any* component page, the page should contain a heading matching "Basic Usage" followed by a ComponentPlayground or code example
**Validates: Requirements 1.3**

### Property 4: Variant Coverage
*For any* component page with variants, the number of variant examples should equal the number of variants defined in the component source
**Validates: Requirements 1.4, 3.4, 10.2**

### Property 5: Consistent Section Spacing
*For any* component page, major sections (identified by h2 headings) should have mt-12 or be within a space-y-12 container
**Validates: Requirements 2.1, 5.4, 8.3**

### Property 6: Header-Content Spacing
*For any* component page, headers (h1, h2, h3) should be followed by content with space-y-4 or similar spacing classes
**Validates: Requirements 2.2, 8.1**

### Property 7: Typography Consistency
*For any* component page, all h1 elements should use text-3xl or larger, all h2 elements should use text-2xl or larger, and all h3 elements should use text-xl or larger
**Validates: Requirements 2.3, 5.1**

### Property 8: Preview Container Padding
*For any* ComponentPlayground preview prop, the root element should have p-6, p-8, py-6, py-8, or similar padding classes
**Validates: Requirements 2.4, 7.4**

### Property 9: Preview Container Styling
*For any* ComponentPlayground preview prop, the root element should have consistent background, border, and rounded classes
**Validates: Requirements 2.5, 7.1, 7.2, 7.3**

### Property 10: Multiple Prop Examples
*For any* component page with props, there should be at least 2 ComponentPlayground instances demonstrating different prop values
**Validates: Requirements 3.3, 6.5, 10.4**

### Property 11: Section Order
*For any* component page, if sections exist for "Basic Usage", "API", "Examples", and "Variants", they should appear in that order
**Validates: Requirements 4.1**

### Property 12: ComponentPlayground Usage
*For any* component page, interactive examples should use ComponentPlayground rather than raw code blocks
**Validates: Requirements 4.2**

### Property 13: PropsTable Usage
*For any* component page with an API section, the section should contain a PropsTable component
**Validates: Requirements 4.3**

### Property 14: Consistent Spacing Classes
*For any* component page, the page should use standard spacing classes (space-y-4, space-y-6, space-y-8, space-y-12, mt-8, mt-12)
**Validates: Requirements 4.4, 5.2**

### Property 15: Lead Paragraph Presence
*For any* component page, the page should contain a paragraph with the "lead" class within the first 3 elements
**Validates: Requirements 4.5**

### Property 16: Text Color Consistency
*For any* component page, headers should use ghost-orange or ghost-white colors, body text should use ghost-white with opacity, and code should use ghost-green
**Validates: Requirements 5.3**

### Property 17: Code Block Styling
*For any* component page, code blocks and preview areas should use consistent border and background classes
**Validates: Requirements 5.5**

### Property 18: Props Table Structure
*For any* PropsTable component, all prop objects should have name, type, and description fields
**Validates: Requirements 6.1**

### Property 19: Required Props Indication
*For any* PropsTable component, props should indicate required status either through a "required" field or in the description
**Validates: Requirements 6.2**

### Property 20: Monospace Prop Styling
*For any* PropsTable component, prop names and types should be rendered with font-mono class
**Validates: Requirements 6.3**

### Property 21: Code Block Spacing
*For any* component page, ComponentPlayground components or code blocks should have mt-6 or similar spacing from preceding content
**Validates: Requirements 8.2**

### Property 22: Body Text Line Height
*For any* component page, body text paragraphs should use leading-relaxed or similar line height classes
**Validates: Requirements 8.4**

### Property 23: List Spacing
*For any* component page with lists, list containers should use space-y classes for consistent item spacing
**Validates: Requirements 8.5**

## Error Handling

### Missing Component Data
- If a component's source file cannot be parsed to extract props, log a warning and use manual prop definitions
- If variant information is unavailable, document known variants manually

### Inconsistent Styling
- Create a linting script that checks for common styling inconsistencies
- Provide clear error messages indicating which classes are missing or incorrect

### Build-Time Validation
- Add a build step that validates all component pages have required sections
- Fail the build if critical documentation is missing (API reference, basic example)

## Testing Strategy

### Unit Testing
- Test that the PropsTable component renders all prop fields correctly
- Test that ComponentPlayground handles edge cases (empty code, missing preview)
- Test the style guide utility functions return correct class strings

### Property-Based Testing
We will use `fast-check` for property-based testing in TypeScript/React. Each property test should run a minimum of 100 iterations.

**Property Test Format:**
```typescript
import fc from 'fast-check';

// Example property test
test('Property 1: Complete API Documentation', () => {
  fc.assert(
    fc.property(
      componentPageArbitrary(),
      (page) => {
        const propsTable = extractPropsTable(page);
        return propsTable.every(prop => 
          prop.name && prop.type && prop.description
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

Each property-based test will be tagged with:
```typescript
// **Feature: component-docs-standardization, Property 1: Complete API Documentation**
```

### Integration Testing
- Test that updated component pages render correctly in the browser
- Test that all links and navigation work properly
- Test that code examples are syntactically valid

### Manual Testing
- Visual review of each updated component page
- Verify that examples are clear and helpful
- Check that spacing and typography look consistent across pages

## Implementation Approach

### Phase 1: Create Style Guide and Utilities
1. Create `apps/docs/lib/doc-styles.ts` with standardized class definitions
2. Create helper functions for common patterns
3. Document the style guide in a separate markdown file

### Phase 2: Audit Existing Pages
1. Create a script to analyze all component pages
2. Identify pages missing API documentation
3. Identify pages with fewer than 2 examples
4. Identify pages with inconsistent styling
5. Generate a report of components needing updates

### Phase 3: Update Component Pages
1. Start with components that have minimal documentation (skull-loader, glitch-text, spider-web, etc.)
2. Add complete API documentation using PropsTable
3. Add at least 3 usage examples per component
4. Apply consistent styling using the style guide
5. Update one component at a time, testing after each update

### Phase 4: Create Documentation Template
1. Create a template file that new components can copy
2. Include comments explaining each section
3. Add the template to the project documentation

### Phase 5: Validation
1. Run the audit script again to verify all pages meet standards
2. Perform visual review of all updated pages
3. Test that all examples work correctly
4. Update any pages that don't meet standards

## Components Requiring Updates

Based on the audit, the following components need significant documentation improvements:

**Minimal Documentation (Priority 1):**
- skull-loader
- glitch-text
- spider-web
- moon-backdrop
- haunted-vignette
- ghost-float-loader
- veil-fade
- wisp-trail
- shadow-crawl
- cursed-pointer
- ghost-cursor
- crack-transition
- grave-modal
- spectral-tabs
- spectral-river

**Partial Documentation (Priority 2):**
- bat-divider
- bat-toggle
- cauldron-loader
- coffin-card
- fog-background
- cursor-effects

**Well-Documented (Reference Examples):**
- bat-burst
- gooey-button
- ghost-toast
- moonlight-switch
- whisper-box
- spooky-skeleton
- spooky-progress-bar
- spirit-input
- haunted-sidebar
- gooey-card

## Success Criteria

The implementation will be considered successful when:

1. All component pages have complete API documentation with PropsTable
2. All component pages have at least 3 distinct usage examples
3. All component pages follow the standardized section structure
4. All component pages use consistent spacing (mt-12 between sections, space-y-4 for content)
5. All component pages use consistent typography (h1: text-3xl+, h2: text-2xl+, h3: text-xl+)
6. All preview containers use consistent styling (background, border, padding)
7. The audit script reports 100% compliance with documentation standards
8. Visual review confirms consistent appearance across all pages
