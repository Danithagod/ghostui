#!/usr/bin/env node

/**
 * CLI Interface for Documentation Audit Tool
 *
 * Provides command-line interface for running audits, generating reports,
 * and applying automated fixes to component documentation pages.
 *
 * Requirements: 7.1, 8.1
 */

import { CLIOptions } from './types';

/**
 * Parses command-line arguments and returns CLI options
 * @param args - Command-line arguments (typically process.argv.slice(2))
 * @returns Parsed CLI options
 */
export function parseArguments(args: string[]): CLIOptions {
  const options: CLIOptions = {
    report: false,
    fix: false,
    component: undefined,
    format: 'json',
    dryRun: false,
    outputDir: './audit-reports',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--report':
      case '-r':
        options.report = true;
        break;

      case '--fix':
      case '-f':
        options.fix = true;
        break;

      case '--dry-run':
      case '-d':
        options.dryRun = true;
        break;

      case '--component':
      case '-c':
        if (i + 1 < args.length) {
          options.component = args[++i];
        } else {
          throw new Error('--component flag requires a component name');
        }
        break;

      case '--format':
        if (i + 1 < args.length) {
          const format = args[++i];
          if (format !== 'json' && format !== 'markdown' && format !== 'html') {
            throw new Error(
              `Invalid format: ${format}. Must be one of: json, markdown, html`
            );
          }
          options.format = format;
        } else {
          throw new Error('--format flag requires a format type (json, markdown, html)');
        }
        break;

      case '--output':
      case '-o':
        if (i + 1 < args.length) {
          options.outputDir = args[++i];
        } else {
          throw new Error('--output flag requires a directory path');
        }
        break;

      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;

      case '--version':
      case '-v':
        printVersion();
        process.exit(0);
        break;

      default:
        if (arg.startsWith('-')) {
          throw new Error(`Unknown flag: ${arg}. Use --help for usage information.`);
        }
        break;
    }
  }

  // Validate option combinations
  validateOptions(options);

  return options;
}

/**
 * Validates CLI options for logical consistency
 * @param options - CLI options to validate
 * @throws Error if options are invalid
 */
function validateOptions(options: CLIOptions): void {
  // If --fix is used, --report should be implied
  if (options.fix) {
    options.report = true;
  }

  // --dry-run only makes sense with --fix
  if (options.dryRun && !options.fix) {
    throw new Error('--dry-run can only be used with --fix');
  }

  // If no action is specified, default to report
  if (!options.report && !options.fix) {
    options.report = true;
  }
}

/**
 * Prints help text with usage examples
 */
export function printHelp(): void {
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                   Documentation Audit Tool - Help                          ║
╚════════════════════════════════════════════════════════════════════════════╝

USAGE:
  npm run audit:docs [options]

OPTIONS:
  -r, --report              Generate an audit report (default action)
  -f, --fix                 Apply automated fixes to component pages
  -d, --dry-run             Preview fixes without applying them (requires --fix)
  -c, --component <name>    Audit only a specific component
  --format <type>           Report format: json, markdown, or html (default: json)
  -o, --output <dir>        Output directory for reports (default: ./audit-reports)
  -h, --help                Display this help message
  -v, --version             Display version information

EXAMPLES:
  # Run audit and generate JSON report
  npm run audit:docs --report

  # Run audit and generate Markdown report
  npm run audit:docs --report --format markdown

  # Audit a specific component
  npm run audit:docs --component gooey-button

  # Apply automated fixes
  npm run audit:docs --fix

  # Preview fixes without applying
  npm run audit:docs --fix --dry-run

  # Generate HTML report in custom directory
  npm run audit:docs --report --format html --output ./reports

REPORT FORMATS:
  json      Machine-readable JSON format for programmatic processing
  markdown  Human-readable Markdown format for documentation
  html      Interactive HTML format with filtering and sorting

EXIT CODES:
  0         All pages are compliant or operation succeeded
  1         Issues found or operation failed
  2         Invalid arguments or configuration error

For more information, see: apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md
`);
}

/**
 * Prints version information
 */
export function printVersion(): void {
  console.log('Documentation Audit Tool v1.0.0');
}

/**
 * Prints an error message in a formatted way
 * @param message - Error message to display
 */
export function printError(message: string): void {
  console.error(`\n❌ Error: ${message}\n`);
  console.error('Use --help for usage information.\n');
}

/**
 * Prints a success message in a formatted way
 * @param message - Success message to display
 */
export function printSuccess(message: string): void {
  console.log(`\n✅ ${message}\n`);
}

/**
 * Prints a warning message in a formatted way
 * @param message - Warning message to display
 */
export function printWarning(message: string): void {
  console.warn(`\n⚠️  Warning: ${message}\n`);
}

/**
 * Prints an info message in a formatted way
 * @param message - Info message to display
 */
export function printInfo(message: string): void {
  console.log(`\nℹ️  ${message}\n`);
}
