# GhostUI Documentation Site

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Component Documentation

### Creating New Component Documentation

When adding documentation for a new GhostUI component, use the standardized template to ensure consistency across all component pages.

#### Using the Template

1. **Copy the template file:**
   ```bash
   cp COMPONENT_TEMPLATE.tsx app/docs/components/[component-name]/page.tsx
   ```

2. **Replace placeholders:**
   - `[COMPONENT_NAME]` → Your component name in PascalCase (e.g., `GooeyButton`)
   - `[component-name]` → Your component name in kebab-case (e.g., `gooey-button`)

3. **Update component-specific content:**
   - Props array with all component props
   - Code examples with real, working code
   - Interactive previews using your actual component
   - Variant demonstrations (if applicable)
   - Accessibility information (if applicable)

4. **Follow the standard section order:**
   - Overview (h1 + lead paragraph)
   - Basic Usage (ComponentPlayground with API)
   - Variants (if applicable)
   - Additional Examples (at least 2 more)
   - Advanced Usage
   - Accessibility
   - Composition patterns (if applicable)

#### Documentation Standards

All component documentation must follow these standards:

**Content Requirements:**
- Complete API reference with all props documented
- At least 3 distinct usage examples
- Basic usage section with minimal working example
- All variants and states documented
- Accessibility information where applicable
- Copy-paste ready code examples

**Styling Requirements:**
- Page container: `space-y-12`
- H1 headers: `text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide`
- H2 headers: `text-2xl md:text-3xl font-display text-ghost-orange tracking-wide`
- Lead paragraphs: `lead text-ghost-white/90`
- Body text: `text-ghost-white/80 leading-relaxed`
- Section spacing: `space-y-6 mt-12`
- Preview padding: `py-12` or `p-8`

**Component Usage:**
- Use `ComponentPlayground` for all interactive examples
- Use `PropsTable` for API documentation
- Import styles from `@/lib/doc-styles` for consistency

#### Style Guide

The documentation uses a centralized style guide located at `lib/doc-styles.ts`. This provides:

- **Page styles:** Container and section spacing
- **Typography styles:** Headers, body text, code
- **Spacing utilities:** Consistent gaps between elements
- **Container styles:** Preview areas, code blocks, info boxes
- **Helper functions:** For creating common patterns

Import and use these styles to maintain consistency:

```tsx
import { docStyles, createPageHeader, createSectionHeader } from '@/lib/doc-styles';
```

#### Validation

Before publishing component documentation:

1. **Run the audit script:**
   ```bash
   node scripts/audit-docs.js
   ```

2. **Check for:**
   - All props documented
   - Minimum 2 examples (3 recommended)
   - Consistent styling applied
   - No missing sections
   - Syntactically valid code examples

3. **Visual review:**
   - Test all interactive examples
   - Verify responsive behavior
   - Check accessibility with keyboard navigation
   - Test with screen readers if applicable

#### Reference Examples

Well-documented components to use as reference:
- `gooey-button` - Comprehensive with variants and composition
- `whisper-box` - Detailed with energy system explanation
- `moonlight-switch` - Clean structure with accessibility
- `spooky-skeleton` - Good variant coverage
- `haunted-sidebar` - Excellent composition examples

## Documentation Style Guide

See `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md` for detailed guidelines on writing component documentation, including:
- Content structure and organization
- Code example best practices
- Accessibility documentation
- Common patterns and anti-patterns

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
