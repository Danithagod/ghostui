/**
 * Documentation Audit Tool - Type Definitions
 *
 * This file contains all TypeScript interfaces and types used by the
 * documentation audit system for analyzing and standardizing component pages.
 *
 * Requirements: 7.1, 8.1
 */

// ============================================================================
// File Scanner Types
// ============================================================================

/**
 * Represents a component documentation page discovered by the file scanner
 */
export interface ComponentPage {
  /** Full path to the page.tsx file */
  filePath: string;
  /** Component name extracted from the path (e.g., 'gooey-button') */
  componentName: string;
  /** Raw file content */
  content: string;
}

// ============================================================================
// TSX Parser Types
// ============================================================================

/**
 * Represents a parsed header element (H1, H2, H3, etc.)
 */
export interface Header {
  /** Header level (1, 2, 3, etc.) */
  level: number;
  /** Text content of the header */
  text: string;
  /** CSS class string applied to the header */
  className: string;
  /** Line number in the source file */
  lineNumber: number;
}

/**
 * Represents a section of the documentation page
 */
export interface Section {
  /** Section type identifier */
  type: 'header' | 'basic-usage' | 'variants' | 'api' | 'accessibility' | 'examples' | 'unknown';
  /** Starting line number */
  startLine: number;
  /** Ending line number */
  endLine: number;
  /** Elements contained within this section */
  elements: Element[];
}

/**
 * Represents a generic JSX element extracted from the page
 */
export interface Element {
  /** Element type/tag name */
  type: string;
  /** CSS class string */
  className: string;
  /** Line number in the source file */
  lineNumber: number;
  /** Element props */
  props?: Record<string, unknown>;
  /** Child elements */
  children?: Element[];
}

/**
 * Represents a ComponentPlayground instance found in the page
 */
export interface ComponentPlaygroundInstance {
  /** Line number where the component starts */
  lineNumber: number;
  /** Whether the preview prop is defined */
  hasPreview: boolean;
  /** Whether the code prop is defined */
  hasCode: boolean;
  /** Whether the api prop is defined */
  hasApi: boolean;
  /** All props passed to the component */
  props: Record<string, unknown>;
}

/**
 * Represents a PropsTable instance found in the page
 */
export interface PropsTableInstance {
  /** Line number where the component starts */
  lineNumber: number;
  /** Props array passed to the PropsTable */
  propsArray: PropDefinition[];
}

/**
 * Represents a single prop definition in a PropsTable
 */
export interface PropDefinition {
  /** Prop name */
  name?: string;
  /** Prop type */
  type?: string;
  /** Default value */
  default?: string;
  /** Description of the prop */
  description?: string;
  /** Whether the prop is required */
  required?: boolean;
}

/**
 * Represents a code block found in the page
 */
export interface CodeBlock {
  /** Line number where the code block starts */
  lineNumber: number;
  /** Language identifier (e.g., 'tsx', 'bash') */
  language?: string;
  /** Code content */
  content: string;
  /** CSS class string */
  className: string;
}

/**
 * Represents an inline code element
 */
export interface InlineCode {
  /** Line number */
  lineNumber: number;
  /** Code content */
  content: string;
  /** CSS class string */
  className: string;
}

/**
 * Result of parsing a TSX file
 */
export interface ParsedPage {
  /** The raw AST from babel parser */
  ast: unknown;
  /** All headers found in the page */
  headers: Header[];
  /** Identified sections */
  sections: Section[];
  /** ComponentPlayground instances */
  componentPlaygrounds: ComponentPlaygroundInstance[];
  /** PropsTable instances */
  propsTables: PropsTableInstance[];
  /** Code blocks */
  codeBlocks: CodeBlock[];
  /** Inline code elements */
  inlineCode: InlineCode[];
  /** Root container element info */
  rootContainer?: Element;
  /** Preview container elements */
  previewContainers: Element[];
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Category of validation rule
 */
export type ValidationCategory = 'typography' | 'spacing' | 'structure' | 'api' | 'examples' | 'preview';

/**
 * Severity level of a validation issue
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

/**
 * Represents a validation rule that can be applied to a page
 */
export interface ValidationRule {
  /** Unique identifier for the rule */
  id: string;
  /** Category of the rule */
  category: ValidationCategory;
  /** Human-readable description */
  description: string;
  /** Whether issues from this rule can be auto-fixed */
  autoFixable: boolean;
  /** Validate a parsed page and return any issues found */
  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[];
}

/**
 * Represents an issue found during validation
 */
export interface ValidationIssue {
  /** ID of the rule that generated this issue */
  ruleId: string;
  /** Category of the issue */
  category: ValidationCategory;
  /** Severity level */
  severity: ValidationSeverity;
  /** Human-readable message describing the issue */
  message: string;
  /** Path to the file with the issue */
  filePath: string;
  /** Line number where the issue occurs */
  lineNumber?: number;
  /** Current value that caused the issue */
  currentValue?: string;
  /** Expected value according to the style guide */
  expectedValue: string;
  /** Recommendation for fixing the issue */
  recommendation: string;
  /** Whether this issue can be automatically fixed */
  autoFixable: boolean;
}

/**
 * Context provided to validation rules
 */
export interface ValidationContext {
  /** The parsed page being validated */
  page: ParsedPage;
  /** Path to the file being validated */
  filePath: string;
  /** Component name */
  componentName: string;
  /** Style guide configuration */
  styleGuide: StyleGuideConfig;
}

// ============================================================================
// Style Guide Configuration Types
// ============================================================================

/**
 * Typography configuration from the style guide
 */
export interface TypographyConfig {
  /** Required classes for H1 elements */
  h1: string;
  /** Required classes for H2 elements */
  h2: string;
  /** Required classes for H3 elements */
  h3: string;
  /** Required classes for H4 elements */
  h4: string;
  /** Required classes for lead paragraphs */
  lead: string;
  /** Required classes for body text */
  body: string;
  /** Required classes for inline code */
  inlineCode: string;
}

/**
 * Spacing configuration from the style guide
 */
export interface SpacingConfig {
  /** Required class for page container */
  pageContainer: string;
  /** Required classes for section containers */
  sectionContainer: string;
  /** Required class for header-content groups */
  headerContent: string;
  /** Required class for lists */
  list: string;
  /** Acceptable classes for preview container padding */
  previewContainer: string[];
}

/**
 * Color configuration from the style guide
 */
export interface ColorsConfig {
  /** Accent color class */
  accentColor: string;
  /** Primary text color class */
  textPrimary: string;
  /** Secondary text color class */
  textSecondary: string;
  /** Border color class */
  borderColor: string;
  /** Background color class */
  backgroundColor: string;
}

/**
 * Structure configuration from the style guide
 */
export interface StructureConfig {
  /** Required sections that must be present */
  requiredSections: string[];
  /** Expected order of sections */
  sectionOrder: string[];
  /** Minimum number of examples required */
  minimumExamples: number;
}

/**
 * Complete style guide configuration
 */
export interface StyleGuideConfig {
  typography: TypographyConfig;
  spacing: SpacingConfig;
  colors: ColorsConfig;
  structure: StructureConfig;
}

// ============================================================================
// Audit Engine Types
// ============================================================================

/**
 * Result of auditing a single page
 */
export interface PageAuditResult {
  /** Path to the file */
  filePath: string;
  /** Component name */
  componentName: string;
  /** Number of issues found */
  issueCount: number;
  /** All issues found */
  issues: ValidationIssue[];
  /** Compliance score (0-100) */
  score: number;
  /** Status based on score */
  status: 'compliant' | 'needs-review' | 'needs-fixes';
}

/**
 * Result of auditing all pages
 */
export interface AuditResult {
  /** Total number of pages audited */
  totalPages: number;
  /** Number of pages with at least one issue */
  pagesWithIssues: number;
  /** Total number of issues found */
  totalIssues: number;
  /** Issues grouped by category */
  issuesByCategory: Record<ValidationCategory, number>;
  /** Issues grouped by severity */
  issuesBySeverity: Record<ValidationSeverity, number>;
  /** Individual page results */
  pageResults: PageAuditResult[];
}

// ============================================================================
// Report Types
// ============================================================================

/**
 * Summary statistics for a report
 */
export interface ReportSummary {
  /** Total pages analyzed */
  totalPages: number;
  /** Pages that are fully compliant */
  compliantPages: number;
  /** Pages with at least one issue */
  pagesWithIssues: number;
  /** Total issues found */
  totalIssues: number;
  /** Issues that can be auto-fixed */
  autoFixableIssues: number;
  /** Issues by category */
  issuesByCategory: Record<ValidationCategory, number>;
  /** Average compliance score */
  averageScore: number;
}

/**
 * Report for a single page
 */
export interface PageReport {
  /** Component name */
  componentName: string;
  /** File path */
  filePath: string;
  /** Compliance score */
  score: number;
  /** Issues found */
  issues: ValidationIssue[];
  /** Overall status */
  status: 'compliant' | 'needs-review' | 'needs-fixes';
}

/**
 * A recommendation for improving documentation
 */
export interface Recommendation {
  /** Priority level */
  priority: 'high' | 'medium' | 'low';
  /** Category of the recommendation */
  category: ValidationCategory;
  /** Description of what should be done */
  description: string;
  /** Pages affected by this recommendation */
  affectedPages: string[];
  /** Estimated effort to implement */
  estimatedEffort: string;
}

/**
 * Complete audit report
 */
export interface Report {
  /** Timestamp when the report was generated */
  timestamp: string;
  /** Summary statistics */
  summary: ReportSummary;
  /** Individual page reports */
  pageReports: PageReport[];
  /** Prioritized recommendations */
  recommendations: Recommendation[];
}

// ============================================================================
// Fixer Types
// ============================================================================

/**
 * Result of applying fixes to a page
 */
export interface FixResult {
  /** Path to the file */
  filePath: string;
  /** Issues that were successfully fixed */
  fixedIssues: ValidationIssue[];
  /** Issues that could not be fixed */
  unfixedIssues: ValidationIssue[];
  /** Modified file content */
  modifiedContent: string;
  /** Whether all fixes were applied successfully */
  success: boolean;
}

// ============================================================================
// CLI Types
// ============================================================================

/**
 * Command-line options for the audit tool
 */
export interface CLIOptions {
  /** Generate a report */
  report: boolean;
  /** Apply automatic fixes */
  fix: boolean;
  /** Filter to a specific component */
  component?: string;
  /** Output format for reports */
  format: 'json' | 'markdown' | 'html';
  /** Preview fixes without applying */
  dryRun: boolean;
  /** Output directory for reports */
  outputDir: string;
}
