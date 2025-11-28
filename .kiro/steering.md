# GhostUI Steering Rules

## Directives
- **RSC Rule**: All interactive components shall include the 'use client' directive.
- **Shape Rule**: The use of basic rectilinear shapes shall be minimized unless structurally necessary.
- **Glow Rule**: Active states shall emit a characteristic spectral glow.
- **Typography Rule**: Inter shall be used for content text; Creepster shall be reserved for headings.
- **Animation Rule**: Framer Motion shall be utilized for physics-based animations; CSS shall be employed for looped/non-physics animations.

## Structural Enforcements
- Only functional components are permitted.
- Components shall utilize named exports exclusively.
- Inline styles are prohibited, with the exception of necessary SVG filter definitions.
