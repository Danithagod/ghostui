# Component Cleanup Requirements

## Overview
Remove deprecated components from the GhostUI library that are not well-built and will not be used going forward.

## Components to Remove
1. **GhostFloatLoader** - Floating ghost loader animation
2. **SpiderWeb** - Decorative spider web corner element
3. **GlitchText** - Text with glitch effect
4. **FogBackground** - Fog/mist background effect
5. **BatToggle** - Toggle switch with bat animation

## Acceptance Criteria

### AC1: Component Files Removed
**Given** the ghostui package source directory  
**When** the cleanup is complete  
**Then** the following component files should be deleted:
- `packages/ghostui/src/components/GhostFloatLoader.tsx`
- `packages/ghostui/src/components/SpiderWeb.tsx`
- `packages/ghostui/src/components/GlitchText.tsx`
- `packages/ghostui/src/components/FogBackground.tsx`
- `packages/ghostui/src/components/BatToggle.tsx`

### AC2: Component Exports Removed
**Given** the component index files  
**When** the cleanup is complete  
**Then** all exports for the removed components should be deleted from:
- `packages/ghostui/src/components/index.ts`
- `packages/ghostui/src/index.ts` (if applicable)

### AC3: Documentation Pages Removed
**Given** the docs app component pages  
**When** the cleanup is complete  
**Then** the following documentation directories should be deleted:
- `apps/docs/app/docs/components/ghost-float-loader/`
- `apps/docs/app/docs/components/spider-web/`
- `apps/docs/app/docs/components/glitch-text/`
- `apps/docs/app/docs/components/fog-background/`
- `apps/docs/app/docs/components/bat-toggle/`

### AC4: Sidebar Navigation Updated
**Given** the docs sidebar component  
**When** the cleanup is complete  
**Then** all references to the removed components should be deleted from:
- `apps/docs/components/Sidebar.tsx`

### AC5: Search Index Updated
**Given** the docs search component  
**When** the cleanup is complete  
**Then** all references to the removed components should be deleted from:
- `apps/docs/components/Search.tsx`

### AC6: Homepage Updated
**Given** the docs homepage  
**When** the cleanup is complete  
**Then** any usage of removed components should be replaced with alternative components from:
- `apps/docs/app/page.tsx`

### AC7: README Updated
**Given** the main README file  
**When** the cleanup is complete  
**Then** the component list should be updated to:
- Remove any mention of the deleted components
- Remove any reference to total component count
- Keep only the remaining core components listed

### AC8: No Broken Imports
**Given** the entire codebase  
**When** the cleanup is complete  
**Then** there should be no remaining imports or references to the removed components

## Out of Scope
- Removing tests for other components
- Modifying component functionality beyond removal
- Updating example apps outside of the docs app

## Success Metrics
- All 5 component files deleted
- All exports removed
- All documentation pages removed
- No broken imports or references
- README accurately reflects remaining components
- Build succeeds without errors
