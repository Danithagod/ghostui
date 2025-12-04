#!/usr/bin/env node

/**
 * Documentation Audit CLI Entry Point
 *
 * Executable entry point for the documentation audit tool.
 * This file is the main entry point when running the CLI.
 *
 * Requirements: 7.1, 8.1
 */

import { main } from './audit/runner';

// Get command-line arguments (skip node and script path)
const args = process.argv.slice(2);

// Run the CLI and exit with the appropriate code
main(args)
  .then((exitCode) => {
    process.exit(exitCode);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(2);
  });
