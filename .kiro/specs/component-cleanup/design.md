# Component Cleanup Design

## Architecture

### Removal Strategy
This is a straightforward deletion task with dependency cleanup. The approach is:
1. Delete component source files
2. Remove exports from index files
3. Delete documentation pages
4. Update navigation and search
5. Replace usage in homepage
6. Update README
7. Verify no broken references

### Component Dependencies
Analysis of the components being removed:

- **GhostFloatLoader**: Standalone component, no dependencies on other components
- **SpiderWeb**: Standalone SVG component, no dependencies
- **GlitchText**: Standalone text effect component, no dependencies
- **FogBackground**: Standalone background effect component, no dependencies
- **BatToggle**: Uses BatIcon component (which is staying), no other dependencies

### Impact Analysis
- **Low Risk**: These are leaf components with no other components depending on them
- **Documentation Impact**: 5 documentation pages need removal
- **Navigation Impact**: Sidebar and search need updates
- **Homepage Impact**: GhostFloatLoader is used on homepage, needs replacement

## Correctness Properties

### P1: Complete File Removal
**Property**: All component files for removed components are deleted  
**Verification**: File system check confirms files don't exist  
**Covers**: AC1

### P2: Export Consistency
**Property**: No exports exist for removed components in any index file  
**Verification**: Grep search for component names in index files returns no results  
**Covers**: AC2

### P3: Documentation Completeness
**Property**: No documentation pages exist for removed components  
**Verification**: Directory listing shows no folders for removed components  
**Covers**: AC3

### P4: Navigation Integrity
**Property**: Sidebar contains no links to removed component pages  
**Verification**: Sidebar.tsx contains no references to removed component names  
**Covers**: AC4

### P5: Search Index Integrity
**Property**: Search index contains no entries for removed components  
**Verification**: Search.tsx contains no references to removed component names  
**Covers**: AC5

### P6: Homepage Functionality
**Property**: Homepage renders without using removed components  
**Verification**: page.tsx imports and uses only available components  
**Covers**: AC6

### P7: Documentation Accuracy
**Property**: README lists only available components  
**Verification**: README contains no references to removed components  
**Covers**: AC7

### P8: Import Integrity
**Property**: No broken imports exist in the codebase  
**Verification**: Grep search for removed component imports returns no results  
**Covers**: AC8

## Implementation Notes

### Replacement for Homepage
The homepage currently uses `GhostFloatLoader`. Suitable replacements:
- **SkullLoader**: Similar loading animation, well-built
- **CauldronLoader**: Another loading animation option
- **Remove entirely**: The loader is in a decorative background position

Recommendation: Use SkullLoader as it's thematically similar and well-tested.

### Component Count References
The README currently lists specific components but doesn't mention a total count. We should:
- Keep the component list format
- Simply remove the deleted components from the list
- No need to add/update any count numbers

### Verification Steps
After implementation:
1. Run `npm run build -w packages/ghostui` to ensure library builds
2. Run `npm run build -w apps/docs` to ensure docs build
3. Search codebase for component names to verify no references remain
4. Manually check homepage renders correctly

## File Modification Plan

### Files to Delete (10 files)
1. `packages/ghostui/src/components/GhostFloatLoader.tsx`
2. `packages/ghostui/src/components/SpiderWeb.tsx`
3. `packages/ghostui/src/components/GlitchText.tsx`
4. `packages/ghostui/src/components/FogBackground.tsx`
5. `packages/ghostui/src/components/BatToggle.tsx`
6. `apps/docs/app/docs/components/ghost-float-loader/` (directory)
7. `apps/docs/app/docs/components/spider-web/` (directory)
8. `apps/docs/app/docs/components/glitch-text/` (directory)
9. `apps/docs/app/docs/components/fog-background/` (directory)
10. `apps/docs/app/docs/components/bat-toggle/` (directory)

### Files to Modify (5 files)
1. `packages/ghostui/src/components/index.ts` - Remove 5 export lines
2. `apps/docs/components/Sidebar.tsx` - Remove 5 navigation items
3. `apps/docs/components/Search.tsx` - Remove 5 search entries
4. `apps/docs/app/page.tsx` - Replace GhostFloatLoader with SkullLoader
5. `README.md` - Remove 5 components from list

## Risk Assessment

### Low Risk
- Components are standalone with no dependents
- Clear file boundaries
- Well-defined removal scope

### Mitigation
- Verify build succeeds after each major step
- Use grep to confirm no remaining references
- Test homepage renders correctly
