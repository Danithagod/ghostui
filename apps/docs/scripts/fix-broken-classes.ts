#!/usr/bin/env node

/**
 * Script to fix broken class names from automated fixes
 * Removes invalid "py-12 or p-8 p-6" patterns and other broken fixes
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

const componentsDir = path.join(__dirname, '..', 'app', 'docs', 'components');

async function fixBrokenClasses() {
  // Find all component page files
  const files = await glob('**/page.tsx', { cwd: componentsDir, absolute: true });
  
  let totalFixed = 0;
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;
    
    // Fix 1: Remove "py-12 or p-8 p-6" and replace with just "p-8"
    const badPaddingPattern = /py-12 or p-8 p-6/g;
    if (badPaddingPattern.test(content)) {
      content = content.replace(badPaddingPattern, 'p-8');
      modified = true;
      console.log(`Fixed padding classes in: ${path.basename(path.dirname(file))}`);
    }
    
    // Fix 2: Remove typography classes from table cells
    const badTableCellPattern = /(<td[^>]*className="[^"]*)(text-xl md:text-2xl font-semibold text-ghost-white)([^"]*")/g;
    if (badTableCellPattern.test(content)) {
      content = content.replace(badTableCellPattern, '$1$3');
      modified = true;
      console.log(`Fixed table cell classes in: ${path.basename(path.dirname(file))}`);
    }
    
    // Fix 3: Remove duplicate/conflicting classes from ComponentPlayground
    const badPlaygroundPattern = /(className="[^"]*)(text-2xl md:text-3xl font-display text-ghost-orange tracking-wide md:text-2xl space-y-12 py-12 or p-8 p-6 border-ghost-orange\/30 text-xl font-semibold text-ghost-white)([^"]*")/g;
    if (badPlaygroundPattern.test(content)) {
      content = content.replace(badPlaygroundPattern, '$1$3');
      modified = true;
      console.log(`Fixed ComponentPlayground classes in: ${path.basename(path.dirname(file))}`);
    }
    
    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      totalFixed++;
    }
  }
  
  console.log(`\n✅ Fixed ${totalFixed} files`);
}

fixBrokenClasses().catch(console.error);
