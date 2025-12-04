#!/bin/bash

# GhostUI Documentation Pre-Commit Hook
# This hook runs the documentation audit on staged component pages
# and prevents commits if compliance is below the threshold

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Running GhostUI documentation audit..."

# Check if we're in the docs directory
if [ ! -f "apps/docs/package.json" ]; then
  echo -e "${YELLOW}⚠️  Not in docs directory, skipping audit${NC}"
  exit 0
fi

# Get list of staged component page files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep "apps/docs/app/docs/components/.*/page.tsx" || true)

if [ -z "$STAGED_FILES" ]; then
  echo -e "${GREEN}✓ No component pages modified, skipping audit${NC}"
  exit 0
fi

echo "📄 Checking modified component pages:"
echo "$STAGED_FILES" | sed 's/^/  - /'
echo ""

# Run audit on modified components
FAILED_COMPONENTS=""
COMPLIANCE_THRESHOLD=95

for FILE in $STAGED_FILES; do
  # Extract component name from path
  COMPONENT=$(echo "$FILE" | sed -n 's|apps/docs/app/docs/components/\([^/]*\)/page.tsx|\1|p')
  
  if [ -n "$COMPONENT" ]; then
    echo "Auditing: $COMPONENT"
    
    # Run audit and capture output
    cd apps/docs
    AUDIT_OUTPUT=$(npm run audit -- --component="$COMPONENT" 2>&1 || true)
    cd ../..
    
    # Extract compliance score (looking for pattern like "Score: 85%")
    SCORE=$(echo "$AUDIT_OUTPUT" | grep -oP 'Score: \K\d+' || echo "0")
    
    if [ "$SCORE" -lt "$COMPLIANCE_THRESHOLD" ]; then
      FAILED_COMPONENTS="$FAILED_COMPONENTS\n  - $COMPONENT (Score: $SCORE%)"
    else
      echo -e "${GREEN}✓ $COMPONENT passed (Score: $SCORE%)${NC}"
    fi
  fi
done

# Check if any components failed
if [ -n "$FAILED_COMPONENTS" ]; then
  echo ""
  echo -e "${RED}❌ Documentation audit failed!${NC}"
  echo -e "${RED}The following components are below ${COMPLIANCE_THRESHOLD}% compliance:${NC}"
  echo -e "$FAILED_COMPONENTS"
  echo ""
  echo "To fix these issues:"
  echo "  1. Run: cd apps/docs && npm run audit -- --component=<component-name>"
  echo "  2. Review the issues in the report"
  echo "  3. Apply automated fixes: npm run audit -- --fix --component=<component-name>"
  echo "  4. Manually fix remaining issues"
  echo ""
  echo "To bypass this check (not recommended):"
  echo "  git commit --no-verify"
  exit 1
fi

echo ""
echo -e "${GREEN}✓ All component pages passed documentation audit!${NC}"
exit 0
