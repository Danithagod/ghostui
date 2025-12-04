# Git Hooks for GhostUI Documentation

This directory contains Git hooks for maintaining documentation quality.

## Installation

To enable the hooks, run:

```bash
cd apps/docs
npm run hooks:install
```

This will configure Git to use hooks from this directory.

## Available Hooks

### pre-commit

Runs before each commit to validate documentation changes.

**What it does:**
- Detects modified component documentation pages
- Runs the documentation audit on changed files
- Prevents commits if compliance is below threshold
- Provides guidance on fixing issues

**Bypass (not recommended):**
```bash
git commit --no-verify
```

## Manual Hook Management

If you prefer to manage hooks manually:

```bash
# Configure Git to use this hooks directory
git config core.hooksPath .githooks

# Make hooks executable
chmod +x .githooks/pre-commit
```

## Troubleshooting

### Hook not running

1. Check Git configuration:
   ```bash
   git config core.hooksPath
   ```
   Should output: `.githooks`

2. Ensure hook is executable:
   ```bash
   chmod +x .githooks/pre-commit
   ```

### Hook fails unexpectedly

1. Run audit manually:
   ```bash
   cd apps/docs
   npm run audit
   ```

2. Check for issues and fix them

3. Try committing again

### Disable hooks temporarily

```bash
git commit --no-verify
```

**Note:** Only use this when absolutely necessary. The hooks help maintain documentation quality.

## Customization

To modify hook behavior, edit the hook files directly. After changes:

```bash
chmod +x .githooks/pre-commit
```

## Additional Resources

- Documentation Style Guide: `apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- Adding Components Guide: `apps/docs/ADDING_NEW_COMPONENTS.md`
- Audit Tool Documentation: `apps/docs/scripts/README.md`
