# GooeyDrawer Visual Testing Checklist

This checklist is for manual visual verification of the GooeyDrawer component. Open the documentation page at http://localhost:3000/docs/components/gooey-drawer and follow these steps.

## Prerequisites

- ✅ Development server running on http://localhost:3000
- ✅ Browser: Chrome, Firefox, Edge, or Safari
- ✅ Screen resolution: 1920×1080 or higher recommended

---

## Test 1: Basic Rendering

**Navigate to:** http://localhost:3000/docs/components/gooey-drawer

### Visual Checks:

- [ ] Page loads without errors
- [ ] Component name "GooeyDrawer" visible in header
- [ ] Description text is readable and formatted correctly
- [ ] Four feature cards displayed in grid layout
- [ ] All sections visible (Basic Usage, Placement Options, etc.)

---

## Test 2: Right Placement (Default)

**Action:** Click "Open Right Drawer" button in the Basic Usage demo

### Visual Checks:

- [ ] Drawer slides in from the right edge
- [ ] Drawer positioned near right edge (not touching edge)
- [ ] Drawer is vertically centered
- [ ] Drawer size: approximately 350px wide
- [ ] Drawer height: approximately 70% of viewport height
- [ ] Rounded corners (2rem border-radius) visible
- [ ] Purple/violet color scheme visible
- [ ] Liquid drips hanging from bottom edge
- [ ] Drips animating smoothly (extending and retracting)
- [ ] Backdrop appears behind drawer (semi-transparent black)
- [ ] Backdrop has blur effect
- [ ] Header visible with ghost icon and "Possession" title
- [ ] Close button (X icon) visible in header
- [ ] Content area scrollable if content is long
- [ ] Border overlay creates crisp edges
- [ ] Specular highlights visible on liquid surface

### Animation Checks:

- [ ] Drawer slides in smoothly with spring physics
- [ ] Drawer scales from 0.8 to 1.0 during entrance
- [ ] Drawer fades in from opacity 0 to 1
- [ ] Animation has natural bounce (spring damping)
- [ ] No stuttering or frame drops
- [ ] Drip animations loop infinitely
- [ ] Each drip has different timing (staggered)

### Interaction Checks:

- [ ] Clicking backdrop closes drawer
- [ ] Clicking close button closes drawer
- [ ] Pressing Escape key closes drawer
- [ ] Drawer slides out smoothly when closing
- [ ] Backdrop fades out when closing
- [ ] Close button has hover effect (background lightens, scales up)

---

## Test 3: Left Placement

**Action:** Click "Open Left Drawer" button in the Placement Options demo

### Visual Checks:

- [ ] Drawer slides in from the left edge
- [ ] Drawer positioned near left edge (not touching edge)
- [ ] Drawer is vertically centered
- [ ] Same size as right placement (350px × 70vh)
- [ ] All visual elements same as right placement
- [ ] Drips visible and animating

### Animation Checks:

- [ ] Drawer slides in from left (negative X transform)
- [ ] Spring physics same as right placement
- [ ] Exit animation slides back to left

---

## Test 4: Bottom Placement

**Action:** Click "Open Bottom Drawer" button in the Placement Options demo

### Visual Checks:

- [ ] Drawer slides in from the bottom edge
- [ ] Drawer positioned near bottom edge (not touching edge)
- [ ] Drawer is horizontally centered
- [ ] Drawer width: approximately 80% of viewport width (max 672px)
- [ ] Drawer height: approximately 50% of viewport height
- [ ] All visual elements present
- [ ] Drips visible and animating from bottom edge

### Animation Checks:

- [ ] Drawer slides in from bottom (positive Y transform)
- [ ] Spring physics same as other placements
- [ ] Exit animation slides back to bottom

---

## Test 5: Top Placement

**Action:** Click "Open Top Drawer" button in the Placement Options demo

### Visual Checks:

- [ ] Drawer slides in from the top edge
- [ ] Drawer positioned near top edge (not touching edge)
- [ ] Drawer is horizontally centered
- [ ] Same size as bottom placement (80vw × 50vh)
- [ ] All visual elements present
- [ ] Drips visible and animating from bottom edge (not top!)

### Animation Checks:

- [ ] Drawer slides in from top (negative Y transform)
- [ ] Spring physics same as other placements
- [ ] Exit animation slides back to top

---

## Test 6: Drip Animation Details

**Action:** Open any drawer and observe the drips closely

### Visual Checks:

- [ ] 12 individual drip elements visible
- [ ] Drips positioned randomly across bottom edge (10-90%)
- [ ] Drips have varied widths (some thin, some thick)
- [ ] Drips extend downward and retract in loops
- [ ] Each drip has different animation timing
- [ ] Drips start at different times (staggered delays)
- [ ] Drips merge with main drawer shape (goo effect)
- [ ] Two static bulge elements visible at bottom
- [ ] Bulges provide visual connection for drips
- [ ] No gaps between drips and main shape

### SVG Filter Effects:

- [ ] Liquid appearance looks realistic (not just solid shapes)
- [ ] Highlights visible on liquid surface (specular lighting)
- [ ] Light appears to come from upper-left direction
- [ ] Goo effect causes shapes to merge smoothly
- [ ] No harsh edges where drips meet main shape
- [ ] Filter creates 3D depth perception

---

## Test 7: Content Layer Separation

**Action:** Open drawer with text content

### Visual Checks:

- [ ] Text is sharp and readable (not blurred)
- [ ] Text has good contrast against background
- [ ] Interactive elements (buttons, links) clearly visible
- [ ] Content layer appears above liquid layer
- [ ] Border overlay visible above content
- [ ] Subtle backdrop blur on content container
- [ ] Content doesn't have goo filter applied

---

## Test 8: Scrollable Content

**Action:** Open drawer with long content (20+ items)

### Visual Checks:

- [ ] Content area scrolls vertically
- [ ] Scrollbar hidden (no-scrollbar class)
- [ ] Scroll is smooth without lag
- [ ] All content accessible via scrolling
- [ ] Header remains fixed at top (doesn't scroll)
- [ ] Padding consistent around content (p-5)
- [ ] Spacing between items consistent (space-y-3)
- [ ] No content clipping at edges

---

## Test 9: Header Details

**Action:** Open any drawer and examine the header

### Visual Checks:

- [ ] Header at top of drawer
- [ ] Ghost icon visible on left side
- [ ] Icon has purple background (bg-purple-900/40)
- [ ] Icon is rounded (rounded-lg)
- [ ] "Possession" title next to icon
- [ ] Title uses Creepster font (font-creep)
- [ ] Title is large (text-2xl)
- [ ] Title is white color
- [ ] Close button (X icon) on right side
- [ ] Close button has subtle background (bg-white/5)
- [ ] Border below header (border-b border-white/10)

### Close Button Hover:

- [ ] Hover changes background to bg-white/10
- [ ] Hover scales button up (scale-110)
- [ ] Hover changes icon color from white/70 to white
- [ ] Transition is smooth (200ms duration)
- [ ] Cursor changes to pointer

---

## Test 10: Backdrop Details

**Action:** Open any drawer and examine the backdrop

### Visual Checks:

- [ ] Backdrop covers entire viewport
- [ ] Backdrop color: very dark purple/black (#05020a)
- [ ] Backdrop opacity: approximately 60%
- [ ] Backdrop has blur effect (backdrop-blur-sm)
- [ ] Main content behind backdrop is dimmed
- [ ] Main content behind backdrop is slightly blurred
- [ ] Cursor changes to pointer when hovering backdrop
- [ ] Backdrop fades in when drawer opens
- [ ] Backdrop fades out when drawer closes

---

## Test 11: Responsive Behavior

### Desktop (1920×1080):

- [ ] All placements render correctly
- [ ] Drip animations smooth
- [ ] No layout issues

### Laptop (1366×768):

- [ ] Drawer sizes appropriate
- [ ] Content readable
- [ ] Animations smooth

### Tablet (768×1024):

- [ ] Bottom/top placements use 80vw width
- [ ] Side placements maintain 350px width
- [ ] Touch interactions work

### Mobile (375×667):

- [ ] Drawer sizes scale appropriately
- [ ] Content readable on small screen
- [ ] Touch gestures work (tap backdrop to close)
- [ ] Scrolling smooth on touch

---

## Test 12: Multiple Drawers

**Action:** Open multiple drawers simultaneously (if demo allows)

### Visual Checks:

- [ ] Each drawer has unique filter ID
- [ ] No visual conflicts between drawers
- [ ] Each drawer's filter works independently
- [ ] Z-index stacking correct (later drawers on top)
- [ ] Performance remains good with multiple drawers

---

## Test 13: Browser Compatibility

### Chrome:

- [ ] All features working
- [ ] Animations smooth
- [ ] SVG filters render correctly

### Firefox:

- [ ] All features working
- [ ] Animations smooth
- [ ] SVG filters render correctly

### Edge:

- [ ] All features working
- [ ] Animations smooth
- [ ] SVG filters render correctly

### Safari (if available):

- [ ] All features working
- [ ] Animations smooth
- [ ] SVG filters render correctly

---

## Test 14: Documentation Page Quality

### Content Sections:

- [ ] Header section clear and informative
- [ ] Key features section highlights main benefits
- [ ] Basic usage section has working demo
- [ ] Placement options section shows all 4 placements
- [ ] Custom content section has varied examples
- [ ] How it works section explains technical details
- [ ] Accessibility section documents a11y features
- [ ] Real-world examples section shows practical use cases

### Code Examples:

- [ ] Syntax highlighting works
- [ ] Code is properly formatted
- [ ] Examples are complete and runnable
- [ ] Import statements included

### Props Table:

- [ ] All props listed
- [ ] Types shown correctly
- [ ] Default values listed
- [ ] Descriptions clear

### Visual Polish:

- [ ] Typography consistent with style guide
- [ ] Spacing consistent throughout
- [ ] Colors match GhostUI theme
- [ ] No layout issues or overlaps

---

## Test 15: Navigation Integration

### Sidebar:

- [ ] "Gooey Drawer" entry visible in Components section
- [ ] Entry positioned alphabetically
- [ ] Clicking entry navigates to correct page
- [ ] Active state highlights current page

### Search:

- [ ] Component appears in search results
- [ ] Search term "gooey drawer" finds page
- [ ] Search term "drawer" finds page

---

## Issues Found

Document any visual issues found during testing:

1. **Issue:** [Description]
   - **Severity:** [Low/Medium/High]
   - **Steps to Reproduce:** [Steps]
   - **Expected:** [What should happen]
   - **Actual:** [What actually happens]

---

## Sign-off

- [ ] All visual tests completed
- [ ] All issues documented
- [ ] Component ready for production

**Tested by:** ___________________
**Date:** ___________________
**Browser:** ___________________
**Screen Resolution:** ___________________

---

## Notes

Add any additional observations or comments:

