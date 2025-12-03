# Requirements Document

## Introduction

This feature refactors the CrackTransition documentation page to align with established documentation patterns across the GhostUI docs app. The refactor includes updating color classes for consistency and simplifying the demo to focus on the component's core functionality as a transition effect trigger.

## Glossary

- **CrackTransition Component**: A full-screen overlay component that creates an animated screen-cracking effect with random crack lines and a shatter overlay
- **Documentation Page**: The Next.js page component located at `apps/docs/app/docs/components/crack-transition/page.tsx`
- **Color Classes**: Tailwind CSS utility classes that define text colors following the GhostUI theme system
- **Demo Section**: The interactive preview area within ComponentPlayground that demonstrates component usage
- **ComponentPlayground**: A reusable component that displays preview, code, and API sections for component documentation

## Requirements

### Requirement 1

**User Story:** As a documentation reader, I want consistent color styling across all component documentation pages, so that the documentation feels cohesive and professional.

#### Acceptance Criteria

1. WHEN the documentation page renders the main heading (h1) THEN the system SHALL apply the `text-ghost-white` class instead of `text-ghost-purple`
2. WHEN the documentation page renders section headings (h2, h3) THEN the system SHALL apply the `text-ghost-white` class with `font-display` font family
3. WHEN the documentation page renders prop names in the API table THEN the system SHALL apply the `text-ghost-green` class with `font-mono` font family
4. WHEN the documentation page renders type information in the API table THEN the system SHALL apply appropriate monospace styling consistent with other component pages
5. WHEN the documentation page renders inline code elements THEN the system SHALL apply color classes consistent with the theme (purple/green variants)

### Requirement 2

**User Story:** As a documentation reader, I want a simple, focused demo of the CrackTransition component, so that I can quickly understand its core functionality without unnecessary narrative elements.

#### Acceptance Criteria

1. WHEN the demo section renders THEN the system SHALL display only a single trigger button without narrative text
2. WHEN the trigger button is clicked THEN the system SHALL activate the CrackTransition effect
3. WHEN the CrackTransition effect completes THEN the system SHALL reset the component state to allow re-triggering
4. WHEN the demo section renders THEN the system SHALL NOT include any narrative elements such as "You are safe here" or "Enter the darkness" text
5. WHEN the demo section renders THEN the system SHALL use a clear, descriptive button label that indicates the action (e.g., "Trigger Crack Effect")

### Requirement 3

**User Story:** As a documentation maintainer, I want the CrackTransition documentation to follow the same structure and patterns as other component pages, so that maintenance is easier and the codebase is more consistent.

#### Acceptance Criteria

1. WHEN comparing the CrackTransition page structure to other component pages THEN the system SHALL use the same section ordering (title, description, playground, API)
2. WHEN the page uses the ComponentPlayground component THEN the system SHALL pass preview, code, and api props following established patterns
3. WHEN the page defines the code example THEN the system SHALL show minimal, practical usage without unnecessary complexity
4. WHEN the page renders the API documentation THEN the system SHALL use consistent table structure and styling with other component pages
5. WHEN the page applies CSS classes THEN the system SHALL use the same utility class patterns found in other component documentation pages
