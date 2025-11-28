# GhostUI Code Review Infrastructure

This directory contains the foundational infrastructure for conducting comprehensive code reviews of the GhostUI component library.

## Overview

The review infrastructure provides tools for:
- **File Discovery**: Scanning and cataloging components, tests, types, and configuration files
- **Issue Collection**: Creating, organizing, and managing review findings
- **Report Generation**: Producing structured markdown reports with findings and recommendations

## Architecture

### Core Components

1. **FileScanner** (`fileScanner.ts`)
   - Discovers all relevant files in the codebase
   - Extracts exports from components and type files
   - Identifies test coverage gaps
   - Locates configuration files

2. **IssueCollector** (`issueCollector.ts`)
   - Creates issues with unique IDs
   - Sorts and filters issues by severity and category
   - Groups issues by location
   - Provides issue statistics

3. **ReportGenerator** (`reportGenerator.ts`)
   - Creates structured review reports
   - Generates markdown documentation
   - Manages findings by category
   - Tracks passed checks and metrics

## Data Structures

### Issue
```typescript
interface Issue {
  id: string;              // Unique identifier (e.g., "ISSUE-0001")
  severity: Severity;      // 'critical' | 'high' | 'medium' | 'low'
  category: string;        // Category name (e.g., "TypeScript", "Testing")
  requirement: string;     // Requirement reference (e.g., "1.1")
  title: string;           // Short description
  description: string;     // Detailed description
  location: string;        // File or component name
  codeSnippet?: string;    // Optional code example
  recommendation: string;  // How to fix the issue
  effort: Effort;          // 'low' | 'medium' | 'high'
}
```

### ReviewReport
```typescript
interface ReviewReport {
  summary: ReviewSummary;           // High-level statistics
  findings: FindingsByCategory;     // Issues organized by category
  recommendations: Recommendation[]; // Prioritized recommendations
  metrics: CodeMetrics;             // Code quality metrics
}
```

## Usage

### Basic Review Workflow

```typescript
import { FileScanner, ReportGenerator, IssueCollector } from './review';

// 1. Initialize
const scanner = new FileScanner('/path/to/workspace');
const collector = new IssueCollector();
const report = ReportGenerator.createEmptyReport();

// 2. Discover files
const components = scanner.scanComponents();
const tests = scanner.scanTests();

// 3. Analyze and collect issues
for (const component of components) {
  if (!component.hasTest) {
    const issue = collector.createIssue({
      severity: 'medium',
      category: 'Testing',
      requirement: '3.1',
      title: `Missing test for ${component.name}`,
      description: 'Component lacks test coverage',
      location: component.name,
      recommendation: 'Create test file',
      effort: 'medium'
    });
    ReportGenerator.addIssue(report, 'testing', issue);
  }
}

// 4. Generate report
ReportGenerator.updateSummary(report);
const markdown = ReportGenerator.generateMarkdown(report);
```

### File Discovery

```typescript
const scanner = new FileScanner();

// Scan for components
const components = scanner.scanComponents();
// Returns: ComponentFile[]

// Scan for tests
const tests = scanner.scanTests();
// Returns: TestFile[]

// Scan for type definitions
const types = scanner.scanTypes();
// Returns: TypeFile[]

// Scan for configuration files
const configs = scanner.scanConfig();
// Returns: ConfigFile[]
```

### Issue Management

```typescript
const collector = new IssueCollector();

// Create an issue
const issue = collector.createIssue({
  severity: 'high',
  category: 'TypeScript',
  requirement: '1.1',
  title: 'Missing interface',
  description: 'Component lacks interface definition',
  location: 'MyComponent.tsx',
  recommendation: 'Add MyComponentProps interface',
  effort: 'low'
});

// Sort issues by severity
const sorted = collector.sortBySeverity(issues);

// Group issues by location
const grouped = collector.groupByLocation(issues);

// Get statistics
const stats = collector.getStatistics(issues);
```

### Report Generation

```typescript
const report = ReportGenerator.createEmptyReport();

// Add issues
ReportGenerator.addIssue(report, 'typeScript', issue);

// Add passed checks
ReportGenerator.addPassedCheck(report, 'testing', 'All components have tests');

// Update summary
ReportGenerator.updateSummary(report);

// Generate markdown
const markdown = ReportGenerator.generateMarkdown(report);
```

## Review Categories

The infrastructure supports 12 review categories:

1. **typeScript** - Type definitions and TypeScript usage
2. **componentAPI** - Component API consistency
3. **testing** - Test coverage and quality
4. **accessibility** - Accessibility compliance
5. **codeStyle** - Code style and organization
6. **performance** - Performance optimization
7. **errorHandling** - Error handling patterns
8. **architecture** - Code architecture and structure
9. **documentation** - Documentation completeness
10. **dependencies** - Dependency management
11. **animations** - Animation consistency
12. **tooling** - Build and development tooling

## Testing

Run tests with:
```bash
npm test -- src/review
```

## Examples

See `example.ts` for complete usage examples:
- Basic review workflow
- Multi-category issue collection
- Report generation

## Next Steps

This infrastructure provides the foundation for implementing specific analysis tasks:
- TypeScript analysis (Task 2)
- Component API consistency checks (Task 3)
- Testing coverage analysis (Task 4)
- Accessibility checks (Task 5)
- And more...

Each analysis task will use these core components to discover files, collect issues, and generate reports.
