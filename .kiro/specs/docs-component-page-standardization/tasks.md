# Implementation Plan

## Overview

This implementation plan breaks down the documentation standardization system into discrete, manageable tasks. Each task builds incrementally on previous work, with checkpoints to ensure quality and correctness throughout the process.

---

## Phase 1: Foundation and Core Infrastructure

- [ ] 1. Set up project structure and dependencies
  - Create `apps/docs/scripts/audit/` directory for audit tooling
  - Install dependencies: `@babel/parser`, `@babel/traverse`, `@babel/types`
  - Set up TypeScript configuration for the audit scripts
  - Create base types file: `apps/docs/scripts/audit/types.ts`
  - _Requirements: 7.1, 8.1_

- [ ] 2. Implement File Scanner
  - [ ] 2.1 Create FileScanner class with component page discovery
    - Implement `scanComponentPages()` to find all `apps/docs/app/docs/components/*/page.tsx` files
    - Implement `readPageContent()` to read file contents
    - Extract component name from file path
    - Return array of ComponentPage objects
    - _Requirements: 7.1_

  - [ ]* 2.2 Write property test for file scanner
    - **Property: File scanner finds all component pages**
    - **Validates: Requirements 7.1**
    - Generate random directory structures with component pages
    - Verify scanner finds all pages and none are missed
    - Verify component names are extracted correctly

- [ ] 3. Implement TSX Parser
  - [ ] 3.1 Create TSXParser class with AST extraction
    - Implement `parse()` to convert TSX content to AST using @babel/parser
    - Implement `extractElements()` to find elements by type
    - Extract headers (H1, H2, H3) with line numbers and classes
    - Extract sections and their boundaries
    - _Requirements: 7.2, 7.3, 7.4_

  - [ ] 3.2 Add ComponentPlayground and PropsTable extraction
    - Implement logic to find ComponentPlayground JSX elements
    - Extract props from ComponentPlayground instances
    - Find PropsTable components and extract props arrays
    - Extract code blocks and inline code elements
    - _Requirements: 7.5_

  - [ ]* 3.3 Write unit tests for TSX parser
    - Test parsing valid TSX files
    - Test extracting headers with correct classes
    - Test finding ComponentPlayground instances
    - Test extracting PropsTable components
    - Test handling malformed TSX gracefully
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 4. Checkpoint - Verify parsing infrastructure
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 2: Validation Rules Engine

- [ ] 5. Create StyleGuideConfig and base validation infrastructure
  - [ ] 5.1 Define StyleGuideConfig interface and default configuration
    - Create configuration object with typography, spacing, colors, structure rules
    - Load configuration from `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
    - Export as reusable constant
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 2.1, 2.2, 2.3, 2.5_

  - [ ] 5.2 Create ValidationRule base interface and ValidationIssue type
    - Define ValidationRule interface with id, category, description, validate method
    - Define ValidationIssue type with all required fields
    - Create helper functions for creating issues
    - _Requirements: 8.2, 8.3_

- [ ] 6. Implement Typography Validation Rules
  - [ ] 6.1 Create H1TypographyRule
    - Validate H1 elements have required classes: `text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide`
    - Generate issues with line numbers and recommendations
    - Mark as auto-fixable
    - _Requirements: 1.1_

  - [ ]* 6.2 Write property test for H1 typography rule
    - **Property 1: H1 Typography Consistency**
    - **Validates: Requirements 1.1**
    - Generate random pages with H1 elements
    - Verify rule correctly identifies non-compliant H1 elements
    - Verify compliant H1 elements pass validation

  - [ ] 6.3 Create H2TypographyRule
    - Validate H2 elements have required classes: `text-2xl md:text-3xl font-display text-ghost-orange tracking-wide`
    - Generate issues for each non-compliant H2
    - Mark as auto-fixable
    - _Requirements: 1.2_

  - [ ]* 6.4 Write property test for H2 typography rule
    - **Property 2: H2 Typography Consistency**
    - **Validates: Requirements 1.2**

  - [ ] 6.5 Create H3TypographyRule
    - Validate H3 elements have required classes: `text-xl md:text-2xl font-semibold text-ghost-white`
    - Generate issues for each non-compliant H3
    - Mark as auto-fixable
    - _Requirements: 1.3_

  - [ ]* 6.6 Write property test for H3 typography rule
    - **Property 3: H3 Typography Consistency**
    - **Validates: Requirements 1.3**

  - [ ] 6.7 Create LeadParagraphRule
    - Validate first paragraph after H1 has `lead text-ghost-white/90` classes
    - Generate issue if lead paragraph is missing or incorrectly styled
    - Mark as auto-fixable
    - _Requirements: 1.5_

  - [ ]* 6.8 Write property test for lead paragraph rule
    - **Property 4: Lead Paragraph Styling**
    - **Validates: Requirements 1.5**

  - [ ] 6.9 Create InlineCodeRule
    - Validate inline code elements have required classes: `px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs`
    - Generate issues for non-compliant inline code
    - Mark as auto-fixable
    - _Requirements: 10.1_

  - [ ]* 6.10 Write property test for inline code rule
    - **Property 19: Inline Code Styling**
    - **Validates: Requirements 10.1**

- [ ] 7. Implement Spacing Validation Rules
  - [ ] 7.1 Create PageContainerSpacingRule
    - Validate root container div has `space-y-12` class
    - Generate issue if spacing is incorrect
    - Mark as auto-fixable
    - _Requirements: 2.1_

  - [ ]* 7.2 Write property test for page container spacing rule
    - **Property 5: Page Container Spacing**
    - **Validates: Requirements 2.1**

  - [ ] 7.3 Create SectionContainerSpacingRule
    - Validate section elements have `space-y-6 mt-12` classes
    - Generate issues for each non-compliant section
    - Mark as auto-fixable
    - _Requirements: 2.2_

  - [ ]* 7.4 Write property test for section container spacing rule
    - **Property 6: Section Container Spacing**
    - **Validates: Requirements 2.2**

  - [ ] 7.5 Create HeaderContentSpacingRule
    - Validate header-content wrapper divs have `space-y-4` class
    - Generate issues for incorrect spacing
    - Mark as auto-fixable
    - _Requirements: 2.3_

  - [ ]* 7.6 Write property test for header-content spacing rule
    - **Property 7: Header-Content Group Spacing**
    - **Validates: Requirements 2.3**

  - [ ] 7.7 Create PreviewContainerPaddingRule
    - Validate preview containers have `py-12` or `p-8` class
    - Generate issues if padding is missing or incorrect
    - Mark as auto-fixable
    - _Requirements: 2.5_

  - [ ]* 7.8 Write property test for preview container padding rule
    - **Property 8: Preview Container Padding**
    - **Validates: Requirements 2.5**

- [ ] 8. Implement Structure Validation Rules
  - [ ] 8.1 Create MinimumExamplesRule
    - Count ComponentPlayground instances in page
    - Generate issue if fewer than 3 examples exist
    - Mark as not auto-fixable (requires content creation)
    - _Requirements: 3.1_

  - [ ]* 8.2 Write property test for minimum examples rule
    - **Property 9: Minimum Example Count**
    - **Validates: Requirements 3.1**

  - [ ] 8.3 Create BasicUsageStructureRule
    - Validate first ComponentPlayground has preview, code, and api props
    - Generate issue if any prop is missing
    - Mark as not auto-fixable
    - _Requirements: 3.2_

  - [ ]* 8.4 Write property test for basic usage structure rule
    - **Property 10: Basic Usage ComponentPlayground Structure**
    - **Validates: Requirements 3.2**

  - [ ] 8.5 Create PageStructureOrderRule
    - Validate sections appear in correct order: Header, Basic Usage, Additional sections
    - Generate issue if order is incorrect
    - Mark as not auto-fixable (requires manual restructuring)
    - _Requirements: 6.1_

  - [ ]* 8.6 Write property test for page structure order rule
    - **Property 13: Page Structure Order**
    - **Validates: Requirements 6.1**

  - [ ] 8.7 Create HeaderSectionStructureRule
    - Validate page starts with H1 followed by lead paragraph
    - Generate issue if structure is incorrect
    - Mark as not auto-fixable
    - _Requirements: 6.2_

  - [ ]* 8.8 Write property test for header section structure rule
    - **Property 14: Header Section Structure**
    - **Validates: Requirements 6.2**

  - [ ] 8.9 Create FirstPlaygroundPositionRule
    - Validate first ComponentPlayground appears before any H2 headers
    - Generate issue if positioned incorrectly
    - Mark as not auto-fixable
    - _Requirements: 6.3_

  - [ ]* 8.10 Write property test for first playground position rule
    - **Property 15: First ComponentPlayground Position**
    - **Validates: Requirements 6.3**

- [ ] 9. Implement API Documentation Validation Rules
  - [ ] 9.1 Create PropsTablePresenceRule
    - Validate page contains at least one PropsTable component
    - Generate issue if PropsTable is missing
    - Mark as not auto-fixable
    - _Requirements: 4.1_

  - [ ]* 9.2 Write property test for PropsTable presence rule
    - **Property 11: PropsTable Presence**
    - **Validates: Requirements 4.1**

  - [ ] 9.3 Create PropObjectStructureRule
    - Validate each prop object has name, type, default, description fields
    - Generate issues for incomplete prop definitions
    - Mark as not auto-fixable (requires content)
    - _Requirements: 4.2_

  - [ ]* 9.4 Write property test for prop object structure rule
    - **Property 12: Prop Object Structure**
    - **Validates: Requirements 4.2**

- [ ] 10. Implement Preview Container Validation Rules
  - [ ] 10.1 Create PreviewContainerBorderRule
    - Validate preview containers have `border-ghost-orange/30` class
    - Generate issues for incorrect borders
    - Mark as auto-fixable
    - _Requirements: 9.2_

  - [ ]* 10.2 Write property test for preview container border rule
    - **Property 16: Preview Container Border Styling**
    - **Validates: Requirements 9.2**

  - [ ] 10.3 Create PreviewContainerRadiusRule
    - Validate preview containers have `rounded-lg` class
    - Generate issues for missing border radius
    - Mark as auto-fixable
    - _Requirements: 9.3_

  - [ ]* 10.4 Write property test for preview container radius rule
    - **Property 17: Preview Container Border Radius**
    - **Validates: Requirements 9.3**

  - [ ] 10.5 Create ThemeVariableUsageRule
    - Validate nested elements use CSS variables for colors (var(--ghost-*))
    - Generate issues for hardcoded colors
    - Mark as auto-fixable
    - _Requirements: 9.5_

  - [ ]* 10.6 Write property test for theme variable usage rule
    - **Property 18: Theme Variable Usage**
    - **Validates: Requirements 9.5**

  - [ ] 10.7 Create CodeBlockScrollingRule
    - Validate code block containers have `overflow-x-auto` class
    - Generate issues for missing overflow handling
    - Mark as auto-fixable
    - _Requirements: 10.4_

  - [ ]* 10.8 Write property test for code block scrolling rule
    - **Property 20: Code Block Scrolling**
    - **Validates: Requirements 10.4**

- [ ] 11. Checkpoint - Verify all validation rules
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 3: Audit Engine and Report Generation

- [ ] 12. Implement Audit Engine
  - [ ] 12.1 Create AuditEngine class
    - Implement `audit()` method to process all pages
    - Implement `applyRules()` to run all validation rules on a page
    - Collect and categorize issues by type and severity
    - Calculate compliance scores (0-100) for each page
    - Generate summary statistics
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 12.2 Write unit tests for audit engine
    - Test applying multiple rules to a page
    - Test issue collection and categorization
    - Test compliance score calculation
    - Test summary statistics generation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 13. Implement Report Generator
  - [ ] 13.1 Create ReportGenerator class with JSON export
    - Implement `generateReport()` to create Report object
    - Implement `exportJSON()` to write JSON report file
    - Include summary, page reports, and recommendations
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 13.2 Add Markdown report export
    - Implement `exportMarkdown()` to create human-readable report
    - Format with tables, lists, and sections
    - Include links to files and line numbers
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 13.3 Add HTML report export
    - Implement `exportHTML()` to create interactive HTML report
    - Include styling and navigation
    - Add filtering and sorting capabilities
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 13.4 Write unit tests for report generator
    - Test JSON report generation
    - Test Markdown report generation
    - Test HTML report generation
    - Test report summary calculations
    - Test recommendation prioritization
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 14. Create CLI interface
  - [ ] 14.1 Implement command-line argument parsing
    - Add support for `--report`, `--fix`, `--component`, `--format` flags
    - Implement help text and usage examples
    - Validate arguments and provide clear error messages
    - _Requirements: 7.1, 8.1_

  - [ ] 14.2 Wire up CLI to audit engine and report generator
    - Connect CLI commands to audit engine
    - Connect CLI commands to report generator
    - Add progress indicators for long-running operations
    - Display summary statistics after completion
    - _Requirements: 7.1, 8.1_

  - [ ]* 14.3 Write integration tests for CLI
    - Test running audit on test directory
    - Test generating reports in all formats
    - Test filtering by component
    - Test error handling for invalid arguments
    - _Requirements: 7.1, 8.1_

- [ ] 15. Checkpoint - Verify audit and reporting
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 4: Documentation Fixer

- [ ] 16. Implement Documentation Fixer
  - [ ] 16.1 Create DocumentationFixer class with basic fix application
    - Implement `fix()` method to apply fixes to a page
    - Implement `applyFix()` to modify content for a single issue
    - Handle class name replacements
    - Handle adding missing classes
    - _Requirements: 8.5_

  - [ ] 16.2 Add fix validation and rollback
    - Implement `validateFix()` to check syntax after fixes
    - Parse fixed content to ensure it's still valid TSX
    - Rollback changes if validation fails
    - Track which fixes were applied successfully
    - _Requirements: 8.5_

  - [ ] 16.3 Implement complex fix strategies
    - Handle structural changes (adding wrappers, reordering)
    - Handle multi-line fixes
    - Handle fixes that affect multiple elements
    - Preserve formatting and indentation
    - _Requirements: 8.5_

  - [ ]* 16.4 Write property test for fix preservation
    - **Property 21: Fix Preservation**
    - **Validates: Requirements 8.5**
    - Generate random pages with issues
    - Apply automated fixes
    - Verify fixed pages still parse without errors
    - Verify fixes actually resolve the issues

  - [ ]* 16.5 Write unit tests for documentation fixer
    - Test applying simple fixes (class changes)
    - Test applying complex fixes (structural changes)
    - Test fix validation
    - Test rollback on syntax errors
    - Test preserving functionality after fixes
    - _Requirements: 8.5_

- [ ] 17. Integrate fixer with CLI
  - [ ] 17.1 Add `--fix` flag support to CLI
    - Run audit first to identify issues
    - Apply fixes to pages with auto-fixable issues
    - Generate report showing what was fixed
    - Prompt for confirmation before writing files
    - _Requirements: 8.5_

  - [ ] 17.2 Add dry-run mode
    - Implement `--dry-run` flag to preview fixes without applying
    - Show diff of changes that would be made
    - Allow user to review before committing
    - _Requirements: 8.5_

  - [ ]* 17.3 Write integration tests for fixer CLI
    - Test fixing pages with known issues
    - Test dry-run mode
    - Test confirmation prompts
    - Test error handling
    - _Requirements: 8.5_

- [ ] 18. Checkpoint - Verify fixer functionality
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 5: Initial Audit and Analysis

- [ ] 19. Run initial audit on all component pages
  - Execute audit script on `apps/docs/app/docs/components/*/page.tsx`
  - Generate comprehensive report in all formats
  - Review report and identify patterns
  - Categorize issues by priority and complexity
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4_

- [ ] 20. Analyze audit results and create fix plan
  - Review all identified issues
  - Determine which issues can be auto-fixed
  - Identify issues requiring manual intervention
  - Create prioritized list of pages to fix
  - Document edge cases and special considerations
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

---

## Phase 6: Apply Fixes and Validate

- [ ] 21. Apply automated fixes to component pages
  - Run fixer on pages with auto-fixable issues
  - Review diffs before committing
  - Apply fixes in batches by category
  - Verify pages still render correctly after fixes
  - _Requirements: 8.5_

- [ ] 22. Manually fix remaining issues
  - Address structural issues requiring manual intervention
  - Add missing content (examples, API docs, accessibility info)
  - Improve existing content based on recommendations
  - Follow style guide for all changes
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 2.1, 2.2, 2.3, 2.5, 3.1, 3.2, 4.1, 4.2, 6.1, 6.2, 6.3_

- [ ] 23. Run final audit and verify compliance
  - Execute audit on all pages after fixes
  - Verify 100% compliance with style guide
  - Generate final report showing improvements
  - Document any remaining exceptions or edge cases
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4_

- [ ] 24. Final Checkpoint - Verify all pages are standardized
  - Ensure all tests pass, ask the user if questions arise.

---

## Phase 7: Documentation and Maintenance

- [ ] 25. Update documentation
  - Update COMPONENT_DOCUMENTATION_STYLE_GUIDE.md with learnings
  - Document audit tool usage and CLI commands
  - Create maintenance guide for keeping docs compliant
  - Add examples of common issues and fixes
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 26. Set up CI/CD integration
  - Add audit script to package.json
  - Create GitHub Actions workflow for audit checks
  - Configure compliance threshold for builds
  - Set up automated reporting
  - _Requirements: 7.1, 8.1_

- [ ] 27. Create developer tooling
  - Add VS Code snippets for common patterns
  - Create pre-commit hook for validation
  - Add npm scripts for common operations
  - Document workflow for adding new components
  - _Requirements: 8.1_

---

## Notes

- **Auto-fixable issues**: Typography, spacing, and styling issues can be automatically fixed
- **Manual issues**: Structural changes, missing content, and complex refactoring require manual intervention
- **Testing**: Each major component has both unit tests and property-based tests
- **Checkpoints**: Regular checkpoints ensure quality and allow for course correction
- **Incremental approach**: Fixes are applied in batches to minimize risk
