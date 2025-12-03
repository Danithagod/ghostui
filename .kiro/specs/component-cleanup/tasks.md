# Component Cleanup Tasks

## Task 1: Delete Component Source Files
**Depends on**: None  
**Properties**: P1  
**Description**: Delete the 5 component files from the ghostui package

**Steps**:
1. Delete `packages/ghostui/src/components/GhostFloatLoader.tsx`
2. Delete `packages/ghostui/src/components/SpiderWeb.tsx`
3. Delete `packages/ghostui/src/components/GlitchText.tsx`
4. Delete `packages/ghostui/src/components/FogBackground.tsx`
5. Delete `packages/ghostui/src/components/BatToggle.tsx`

**Verification**: Files no longer exist in file system

---

## Task 2: Remove Component Exports
**Depends on**: Task 1  
**Properties**: P2  
**Description**: Remove all export statements for deleted components from index files

**Steps**:
1. Edit `packages/ghostui/src/components/index.ts`:
   - Remove `export { FogBackground, type FogBackgroundProps } from './FogBackground';`
   - Remove `export * from './GlitchText';`
   - Remove `export * from './SpiderWeb';`
   - Remove `export * from './GhostFloatLoader';`
   - Remove `export { BatToggle, type BatToggleProps } from './BatToggle';`

**Verification**: Grep search for component names in index files returns no results

---

## Task 3: Delete Documentation Pages
**Depends on**: None  
**Properties**: P3  
**Description**: Delete all documentation page directories for removed components

**Steps**:
1. Delete directory `apps/docs/app/docs/components/ghost-float-loader/`
2. Delete directory `apps/docs/app/docs/components/spider-web/`
3. Delete directory `apps/docs/app/docs/components/glitch-text/`
4. Delete directory `apps/docs/app/docs/components/fog-background/`
5. Delete directory `apps/docs/app/docs/components/bat-toggle/`

**Verification**: Directories no longer exist

---

## Task 4: Update Sidebar Navigation
**Depends on**: Task 3  
**Properties**: P4  
**Description**: Remove navigation links to deleted component pages

**Steps**:
1. Edit `apps/docs/components/Sidebar.tsx`:
   - Remove line with `{ title: 'FogBackground', href: '/docs/components/fog-background' }`
   - Remove line with `{ title: 'GlitchText', href: '/docs/components/glitch-text' }`
   - Remove line with `{ title: 'SpiderWeb', href: '/docs/components/spider-web' }`
   - Remove line with `{ title: 'GhostFloatLoader', href: '/docs/components/ghost-float-loader' }`
   - Remove line with `{ title: 'BatToggle', href: '/docs/components/bat-toggle' }`

**Verification**: Sidebar.tsx contains no references to removed components

---

## Task 5: Update Search Index
**Depends on**: Task 3  
**Properties**: P5  
**Description**: Remove search entries for deleted components

**Steps**:
1. Edit `apps/docs/components/Search.tsx`:
   - Remove line with `{ title: 'FogBackground', href: '/docs/components/fog-background', category: 'component' }`
   - Remove line with `{ title: 'GlitchText', href: '/docs/components/glitch-text', category: 'component' }`
   - Remove line with `{ title: 'SpiderWeb', href: '/docs/components/spider-web', category: 'component' }`
   - Remove line with `{ title: 'GhostFloatLoader', href: '/docs/components/ghost-float-loader', category: 'component' }`
   - Remove line with `{ title: 'BatToggle', href: '/docs/components/bat-toggle', category: 'component' }`

**Verification**: Search.tsx contains no references to removed components

---

## Task 6: Update Homepage
**Depends on**: Task 1, Task 2  
**Properties**: P6  
**Description**: Replace GhostFloatLoader usage on homepage with SkullLoader

**Steps**:
1. Edit `apps/docs/app/page.tsx`:
   - Change import from `import { GooeyButton, CoffinCard, BatDivider, GhostFloatLoader } from 'ghostui-react';`
   - To: `import { GooeyButton, CoffinCard, BatDivider, SkullLoader } from 'ghostui-react';`
   - Change `<GhostFloatLoader size="lg" />` to `<SkullLoader size="lg" />`

**Verification**: Homepage imports and uses only available components

---

## Task 7: Update README
**Depends on**: None  
**Properties**: P7  
**Description**: Remove deleted components from README component list

**Steps**:
1. Edit `README.md`:
   - Remove any mention of GhostFloatLoader
   - Remove any mention of SpiderWeb
   - Remove any mention of GlitchText
   - Remove any mention of FogBackground
   - Remove any mention of BatToggle
   - Remove any references to component counts

**Verification**: README contains no references to removed components

---

## Task 8: Verify No Broken References
**Depends on**: All previous tasks  
**Properties**: P8  
**Description**: Search entire codebase to ensure no remaining references

**Steps**:
1. Run grep search for "GhostFloatLoader" across all files
2. Run grep search for "SpiderWeb" across all files
3. Run grep search for "GlitchText" across all files
4. Run grep search for "FogBackground" across all files
5. Run grep search for "BatToggle" across all files
6. Verify all results are either in spec files or false positives

**Verification**: No broken imports or references exist

---

## Task 9: Build Verification
**Depends on**: All previous tasks  
**Properties**: All  
**Description**: Verify that both packages build successfully

**Steps**:
1. Run `npm run build -w packages/ghostui`
2. Verify build succeeds with no errors
3. Run `npm run build -w apps/docs`
4. Verify build succeeds with no errors

**Verification**: Both builds complete successfully
