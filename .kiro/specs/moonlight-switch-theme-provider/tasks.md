# Implementation Plan

- [x] 1. Create ThemeProvider context and hooks




  - [ ] 1.1 Create ThemeProvider component with context
    - Create `packages/ghostui/src/components/ThemeProvider.tsx`
    - Implement ThemeContext with theme state and setTheme/toggleTheme functions
    - Add local storage persistence for theme preference
    - Add system preference detection via matchMedia

    - Apply CSS variables and data-theme attribute to document.documentElement
    - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3_
  - [ ] 1.2 Create useTheme and useThemeOptional hooks
    - Implement useTheme that throws when used outside ThemeProvider
    - Implement useThemeOptional that returns undefined outside ThemeProvider
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ]* 1.3 Write property test for local storage round-trip
    - **Property 5: Local Storage Round-Trip**
    - **Validates: Requirements 2.1, 2.2**
  - [ ]* 1.4 Write property test for CSS variables match theme
    - **Property 6: CSS Variables Match Theme**
    - **Validates: Requirements 4.1, 4.2, 4.3**




  - [ ]* 1.5 Write property test for data-theme attribute sync
    - **Property 7: Data-Theme Attribute Sync**
    - **Validates: Requirements 4.4**

- [ ] 2. Update MoonlightSwitch for context integration
  - [ ] 2.1 Modify MoonlightSwitch to support uncontrolled mode
    - Update MoonlightSwitch to use useThemeOptional hook
    - When checked/onChange props are omitted, connect to ThemeProvider context
    - Map checked=true to dark theme, checked=false to light theme
    - Maintain backward compatibility with controlled mode
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 2.2 Write property test for theme toggle inverts state
    - **Property 1: Theme Toggle Inverts State**
    - **Validates: Requirements 1.1**
  - [ ]* 2.3 Write property test for context propagation
    - **Property 2: Context Propagation**
    - **Validates: Requirements 1.2, 3.1, 3.4**
  - [ ]* 2.4 Write property test for uncontrolled mode context connection
    - **Property 3: Uncontrolled Mode Context Connection**




    - **Validates: Requirements 1.3**
  - [x]* 2.5 Write property test for controlled mode props override




    - **Property 4: Controlled Mode Props Override**
    - **Validates: Requirements 1.4**


  - [ ]* 2.6 Write property test for stored preference priority
    - **Property 8: Stored Preference Priority**
    - **Validates: Requirements 5.3**



- [x] 3. Export ThemeProvider and hooks from package




  - [ ] 3.1 Update package exports
    - Add ThemeProvider, useTheme, useThemeOptional to `packages/ghostui/src/components/index.ts`
    - Add Theme and ThemeContextValue types to `packages/ghostui/src/types/index.ts`

    - _Requirements: 3.1_





- [ ] 4. Integrate ThemeProvider into docs application
  - [x] 4.1 Wrap docs app with ThemeProvider


    - Update `apps/docs/app/layout.tsx` to include ThemeProvider
    - Set appropriate default theme


    - _Requirements: 1.2, 4.4_
  - [ ] 4.2 Update globals.css with theme-aware CSS variables
    - Add CSS variable definitions that respond to data-theme attribute
    - Define light and dark theme variable sets
    - Update existing styles to use CSS variables where appropriate
    - _Requirements: 4.1, 4.2_
  - [ ] 4.3 Add MoonlightSwitch to docs layout for global theme toggle
    - Add uncontrolled MoonlightSwitch to the docs layout or sidebar
    - Use day-night variant for clear light/dark indication
    - _Requirements: 1.1, 1.3_

- [ ] 5. Update MoonlightSwitch documentation page
  - [ ] 5.1 Update docs page with ThemeProvider examples
    - Add documentation for ThemeProvider usage
    - Add examples showing controlled vs uncontrolled MoonlightSwitch
    - Document useTheme and useThemeOptional hooks
    - _Requirements: 1.3, 1.4, 3.1_

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Build and verify
  - [ ] 7.1 Build ghostui package
    - Run build command for packages/ghostui
    - Verify exports are correct in dist files
    - _Requirements: All_
  - [ ] 7.2 Build docs application
    - Run build command for apps/docs
    - Verify no build errors
    - _Requirements: All_

- [ ] 8. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
