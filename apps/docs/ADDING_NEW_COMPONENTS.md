# Adding New Components to GhostUI Documentation

This guide walks you through the complete workflow for adding a new component to the GhostUI documentation site.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [Using VS Code Snippets](#using-vs-code-snippets)
5. [Validation and Testing](#validation-and-testing)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before adding a new component, ensure you have:

- [ ] The component implemented in `packages/ghostui/src/components/`
- [ ] Component exported from `packages/ghostui/src/index.ts`
- [ ] Basic understanding of the component's props and behavior
- [ ] Access to the GhostUI documentation repository

---

## Quick Start

The fastest way to create a new component page:

```bash
# 1. Navigate to the docs directory
cd apps/docs

# 2. Use the VS Code snippet (type 'ghostui-page' in a new .tsx file)
# OR copy the template manually:
cp COMPONENT_TEMPLATE.tsx app/docs/components/your-component/page.tsx

# 3. Fill in the component details

# 4. Validate your documentation
npm run docs:validate

# 5. Apply automated fixes if needed
npm run audit:fix:dry  # Preview changes
npm run audit:fix      # Apply changes
```

---

## Step-by-Step Guide

### Step 1: Create Component Directory

Create a new directory for your component in the docs structure:

```bash
mkdir -p apps/docs/app/docs/components/your-component
```

**Naming Convention:**
- Use kebab-case for directory names
- Match the component's npm package name (e.g., `gooey-button`, `ghost-toast`)

### Step 2: Create the Page File

Create `page.tsx` in your component directory:

```bash
touch apps/docs/app/docs/components/your-component/page.tsx
```

### Step 3: Use the Template

Open the file in VS Code and use the snippet:

1. Type `ghostui-page` and press Tab
2. Fill in the placeholders:
   - Component name
   - Description
   - Props
   - Examples

**OR** manually copy from `COMPONENT_TEMPLATE.tsx`:

```tsx
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';

const propsData = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'ghost'",
    required: false,
    default: "'primary'",
    description: 'Visual style variant of the component',
  },
  // Add more props...
];

export default function YourComponentPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
          Your Component
        </h1>
        <p className="lead text-ghost-white/90">
          Brief description of what your component does and its key features.
        </p>
      </div>

      {/* Basic Usage */}
      <ComponentPlayground
        preview={
          <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
            {/* Your component demo */}
          </div>
        }
        code={`import { YourComponent } from 'ghostui-react';

export default function Example() {
  return (
    <YourComponent variant="primary" />
  );
}`}
        api={<PropsTable props={propsData} />}
      />

      {/* Additional Examples */}
      <section className="space-y-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
          Variants
        </h2>
        {/* More examples */}
      </section>
    </div>
  );
}
```

### Step 4: Fill in Component Details

#### 4.1 Header Section

- **H1**: Component name (user-facing, Title Case)
- **Lead paragraph**: 1-2 sentences explaining the component's purpose
- **Key features** (optional): Bullet list of main features

#### 4.2 Props Documentation

Create the `propsData` array with complete information:

```tsx
const propsData = [
  {
    name: 'propName',           // Exact prop name
    type: 'string',             // TypeScript type
    required: false,            // Is it required?
    default: "'default'",       // Default value (as string)
    description: 'Clear description of what this prop does',
  },
];
```

**Tips:**
- Check the component's TypeScript definition for accurate types
- Use `undefined` for props without defaults
- Be specific in descriptions (explain behavior, not just what it is)

#### 4.3 Basic Usage Example

The first `ComponentPlayground` should show:
- **Preview**: Minimal working example
- **Code**: Copy-paste ready code with imports
- **API**: PropsTable with all props

```tsx
<ComponentPlayground
  preview={
    <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
      <YourComponent />
    </div>
  }
  code={`import { YourComponent } from 'ghostui-react';

export default function Example() {
  return <YourComponent />;
}`}
  api={<PropsTable props={propsData} />}
/>
```

#### 4.4 Additional Examples

Add at least 2 more examples showing:
- Different prop combinations
- Variants (if applicable)
- Common use cases
- Advanced patterns

Each example should have:
- Descriptive H2 or H3 header
- Brief explanation
- ComponentPlayground with preview and code

### Step 5: Add Navigation Entry

Update the sidebar navigation in `apps/docs/components/Sidebar.tsx`:

```tsx
const navigation = [
  // ... existing items
  {
    name: 'Your Component',
    href: '/docs/components/your-component',
  },
];
```

**Alphabetical Order**: Insert your component in alphabetical order within its category.

### Step 6: Validate Documentation

Run the audit tool to check compliance:

```bash
cd apps/docs

# Check your specific component
npm run audit:component your-component

# Or check all components
npm run audit
```

The audit will check:
- ✅ Typography (H1, H2, H3 styling)
- ✅ Spacing (sections, containers)
- ✅ Structure (required sections, order)
- ✅ API documentation (PropsTable presence)
- ✅ Examples (minimum count)
- ✅ Preview containers (styling)

### Step 7: Fix Issues

If the audit finds issues:

```bash
# Preview automated fixes
npm run audit:fix:dry

# Apply automated fixes
npm run audit:fix

# Check again
npm run audit:component your-component
```

**Manual fixes** may be needed for:
- Missing content (examples, descriptions)
- Structural issues (section order)
- Complex styling problems

### Step 8: Test the Page

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to your component:**
   ```
   http://localhost:3000/docs/components/your-component
   ```

3. **Check:**
   - [ ] Page renders without errors
   - [ ] All examples work correctly
   - [ ] Interactive elements function properly
   - [ ] Responsive design works (mobile, tablet, desktop)
   - [ ] Code examples are copy-paste ready

### Step 9: Run Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch
```

### Step 10: Commit Your Changes

```bash
git add .
git commit -m "docs: add documentation for YourComponent"
```

**Note:** If you've installed the pre-commit hook, it will automatically run the audit before committing.

---

## Using VS Code Snippets

The repository includes helpful snippets for common patterns. Type these prefixes and press Tab:

### Page Structure

- **`ghostui-page`** - Complete component page template
- **`ghostui-section`** - Section with header
- **`ghostui-playground`** - ComponentPlayground with all props

### Typography

- **`ghostui-h1`** - H1 header with correct styling
- **`ghostui-h2`** - H2 header with correct styling
- **`ghostui-h3`** - H3 header with correct styling
- **`ghostui-lead`** - Lead paragraph

### Components

- **`ghostui-preview`** - Preview container
- **`ghostui-props`** - Props data array
- **`ghostui-code`** - Inline code element
- **`ghostui-info`** - Info box
- **`ghostui-feature`** - Feature box
- **`ghostui-a11y`** - Accessibility section

### Example Usage

1. Create a new file: `page.tsx`
2. Type: `ghostui-page`
3. Press: `Tab`
4. Fill in the placeholders using `Tab` to navigate

---

## Common Patterns

### Pattern 1: Component with Variants

```tsx
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Variants
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <ComponentPlayground
      preview={
        <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
          <YourComponent variant="primary" />
        </div>
      }
      code={`<YourComponent variant="primary" />`}
    />
    
    <ComponentPlayground
      preview={
        <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
          <YourComponent variant="secondary" />
        </div>
      }
      code={`<YourComponent variant="secondary" />`}
    />
    
    <ComponentPlayground
      preview={
        <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
          <YourComponent variant="ghost" />
        </div>
      }
      code={`<YourComponent variant="ghost" />`}
    />
  </div>
</section>
```

### Pattern 2: Component Without Props

For components that don't accept props (like `GhostCursor`):

```tsx
<ComponentPlayground
  preview={
    <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
      <YourComponent />
    </div>
  }
  code={`import { YourComponent } from 'ghostui-react';

export default function Example() {
  return <YourComponent />;
}`}
  // No api prop - component has no props
/>

{/* Add Implementation Notes instead */}
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Implementation Notes
  </h2>
  
  <div className="p-6 rounded-lg bg-ghost-orange/10 border border-ghost-orange/30">
    <h3 className="text-lg font-semibold text-ghost-white mb-3">
      No Props Required
    </h3>
    <p className="text-ghost-white/80 text-sm leading-relaxed">
      This component is self-contained and requires no props. 
      Simply add it to your app and it will work automatically.
    </p>
  </div>
</section>
```

### Pattern 3: Accessibility Section

```tsx
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Accessibility
  </h2>
  
  <div className="space-y-4">
    <div className="p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/10">
      <h4 className="text-ghost-orange font-semibold mb-2">
        Keyboard Navigation
      </h4>
      <ul className="space-y-2 text-ghost-white/70 text-sm">
        <li><kbd>Tab</kbd> - Focus the component</li>
        <li><kbd>Enter</kbd> - Activate</li>
        <li><kbd>Escape</kbd> - Close/dismiss</li>
      </ul>
    </div>
    
    <div className="p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/10">
      <h4 className="text-ghost-orange font-semibold mb-2">
        ARIA Attributes
      </h4>
      <p className="text-ghost-white/70 text-sm">
        The component automatically includes appropriate ARIA attributes
        for screen reader support.
      </p>
    </div>
  </div>
</section>
```

### Pattern 4: Advanced Usage

```tsx
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    Advanced Usage
  </h2>
  
  <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
    Composition with Other Components
  </h3>
  
  <ComponentPlayground
    preview={
      <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
        <YourComponent>
          <OtherComponent />
        </YourComponent>
      </div>
    }
    code={`import { YourComponent, OtherComponent } from 'ghostui-react';

export default function Example() {
  return (
    <YourComponent>
      <OtherComponent />
    </YourComponent>
  );
}`}
  />
</section>
```

---

## Validation and Testing

### Automated Validation

The documentation system includes automated validation:

```bash
# Full validation (audit + tests)
npm run docs:validate

# Just audit
npm run audit

# Just tests
npm run test
```

### Manual Checklist

Before submitting your documentation:

#### Content
- [ ] Component name and description are clear
- [ ] Lead paragraph explains the component's purpose
- [ ] At least 3 usage examples provided
- [ ] All props documented in PropsTable
- [ ] Code examples are complete and functional
- [ ] Variants documented (if applicable)
- [ ] Accessibility info included (if applicable)

#### Styling
- [ ] H1 uses correct classes
- [ ] H2 uses correct classes
- [ ] H3 uses correct classes
- [ ] Sections have proper spacing (`mt-12`, `space-y-6`)
- [ ] Preview containers use standard styling
- [ ] Inline code uses correct classes

#### Functionality
- [ ] Page renders without errors
- [ ] All interactive examples work
- [ ] Code is copy-paste ready
- [ ] Responsive design works on all screen sizes
- [ ] Navigation link added to sidebar

### Compliance Scores

The audit tool provides a compliance score (0-100%):

- **100%**: Perfect compliance ✅
- **95-99%**: Minor issues, mostly auto-fixable ⚠️
- **Below 95%**: Significant issues, manual fixes needed ❌

**Goal**: Aim for 100% compliance before committing.

---

## Troubleshooting

### Issue: Audit fails with "Component not found"

**Solution:**
- Check that your directory name matches the component name
- Ensure `page.tsx` exists in the correct location
- Verify the path: `apps/docs/app/docs/components/[component-name]/page.tsx`

### Issue: "Missing PropsTable" error

**Solution:**
- Add the `api` prop to your first ComponentPlayground
- If the component has no props, omit the `api` prop and add an "Implementation Notes" section instead

### Issue: Typography validation fails

**Solution:**
- Use the VS Code snippets for headers (`ghostui-h1`, `ghostui-h2`, `ghostui-h3`)
- Or copy the exact classes from `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- Run `npm run audit:fix` to apply automated fixes

### Issue: Preview containers have wrong styling

**Solution:**
- Use the `ghostui-preview` snippet
- Or ensure you have: `bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8`
- Run `npm run audit:fix` to apply automated fixes

### Issue: Page doesn't appear in navigation

**Solution:**
- Add your component to `apps/docs/components/Sidebar.tsx`
- Ensure the `href` matches your component's path
- Restart the dev server

### Issue: Code examples don't work when copied

**Solution:**
- Include all necessary imports
- Use actual component names (not placeholders)
- Test the code yourself before documenting
- Ensure props match the component's actual API

### Issue: Pre-commit hook blocks commit

**Solution:**
- Run `npm run audit` to see issues
- Fix issues with `npm run audit:fix`
- Manually fix remaining issues
- Or bypass (not recommended): `git commit --no-verify`

---

## Additional Resources

- **Style Guide**: `apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- **Template**: `apps/docs/COMPONENT_TEMPLATE.tsx`
- **Design Document**: `.kiro/specs/docs-component-page-standardization/design.md`
- **Audit Tool**: `apps/docs/scripts/audit/`

---

## Quick Reference Commands

```bash
# Create new component page
mkdir -p apps/docs/app/docs/components/your-component
touch apps/docs/app/docs/components/your-component/page.tsx

# Validate documentation
npm run docs:validate

# Preview fixes
npm run audit:fix:dry

# Apply fixes
npm run audit:fix

# Check specific component
npm run audit:component your-component

# Install pre-commit hook
npm run hooks:install

# Start dev server
npm run dev

# Run tests
npm run test
```

---

## Getting Help

If you encounter issues not covered in this guide:

1. Check the style guide: `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
2. Review existing component pages for examples
3. Run the audit tool for specific guidance
4. Check the design document for detailed specifications

---

**Last Updated**: December 5, 2025  
**Version**: 1.0.0
