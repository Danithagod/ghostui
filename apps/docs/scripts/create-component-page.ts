#!/usr/bin/env node

/**
 * Script to create a new component documentation page
 * Usage: npm run docs:new -- <component-name>
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get component name from command line args
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('Usage: npm run docs:new -- <component-name>');
  console.log('Example: npm run docs:new -- spooky-button');
  process.exit(1);
}

// Validate component name format (kebab-case)
if (!/^[a-z]+(-[a-z]+)*$/.test(componentName)) {
  console.error('❌ Error: Component name must be in kebab-case');
  console.log('Example: spooky-button, ghost-toast, moonlight-switch');
  process.exit(1);
}

// Convert kebab-case to PascalCase for component name
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const componentPascalCase = toPascalCase(componentName);

// Define paths
const componentDir = path.join(__dirname, '..', 'app', 'docs', 'components', componentName);
const pageFile = path.join(componentDir, 'page.tsx');

// Check if component directory already exists
if (fs.existsSync(componentDir)) {
  console.error(`❌ Error: Component directory already exists: ${componentDir}`);
  process.exit(1);
}

// Create component directory
fs.mkdirSync(componentDir, { recursive: true });

// Template for the component page
const pageTemplate = `import { ComponentPlayground } from '@/components/ComponentPlayground';
import { PropsTable } from '@/components/PropsTable';

const propsData = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'ghost'",
    required: false,
    default: "'primary'",
    description: 'Visual style variant of the component',
  },
  // Add more props here
];

export default function ${componentPascalCase}Page() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
          ${componentPascalCase}
        </h1>
        <p className="lead text-ghost-white/90">
          Brief description of the ${componentPascalCase} component and its key features.
        </p>
      </div>

      {/* Basic Usage */}
      <ComponentPlayground
        preview={
          <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
            {/* TODO: Add component demo */}
            <div className="text-ghost-white/70 text-center">
              Add your ${componentPascalCase} component here
            </div>
          </div>
        }
        code={\`import { ${componentPascalCase} } from 'ghostui-react';

export default function Example() {
  return (
    <${componentPascalCase} variant="primary" />
  );
}\`}
        api={<PropsTable props={propsData} />}
      />

      {/* Variants Section */}
      <section className="space-y-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
          Variants
        </h2>
        <p className="text-ghost-white/80 leading-relaxed">
          The ${componentPascalCase} component supports multiple visual variants.
        </p>
        
        {/* TODO: Add variant examples */}
      </section>

      {/* Additional Examples Section */}
      <section className="space-y-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
          Examples
        </h2>
        
        <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">
          Example Title
        </h3>
        <p className="text-ghost-white/80 leading-relaxed">
          Description of what this example demonstrates.
        </p>
        
        <ComponentPlayground
          preview={
            <div className="bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8">
              {/* TODO: Add example */}
            </div>
          }
          code={\`// Add example code here\`}
        />
      </section>

      {/* Accessibility Section (if applicable) */}
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
    </div>
  );
}
`;

// Write the page file
fs.writeFileSync(pageFile, pageTemplate);

console.log('✅ Component page created successfully!');
console.log('');
console.log('📁 Location:', pageFile);
console.log('');
console.log('📝 Next steps:');
console.log('  1. Open the file and fill in the component details');
console.log('  2. Add the component to the sidebar navigation');
console.log('  3. Update the props data with actual component props');
console.log('  4. Add interactive examples and demos');
console.log('  5. Run: npm run audit:component', componentName);
console.log('  6. Run: npm run dev to preview');
console.log('');
console.log('📚 Resources:');
console.log('  - Style Guide: apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md');
console.log('  - Adding Guide: apps/docs/ADDING_NEW_COMPONENTS.md');
console.log('  - VS Code Snippets: Type "ghostui-" for available snippets');
