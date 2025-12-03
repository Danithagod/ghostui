# Manual Test Plan: Cursor Tracking Accuracy

## Overview
This document provides a comprehensive manual testing checklist for verifying the cursor tracking accuracy of the HauntedVignette component's inverse vignette effect.

## Prerequisites
- Component implementation must be complete (Tasks 1.2 and 1.3)
- Component must be integrated into a test page or documentation page
- Browser DevTools should be available for performance monitoring

## Test Environment Setup

### 1. Create Test Page
Ensure you have a test page with:
- HauntedVignette component rendered
- Sufficient content to move cursor around
- Different viewport sizes available for testing

### 2. Browser DevTools Setup
- Open Performance tab for FPS monitoring
- Open Console for any error messages
- Enable "Paint flashing" in Rendering settings (optional)

---

## Test Cases

### TC-1: Basic Cursor Tracking
**Objective:** Verify that the clear area follows cursor movement accurately

**Steps:**
1. Load the test page with HauntedVignette component
2. Move cursor slowly across the screen in various directions:
   - Left to right
   - Top to bottom
   - Diagonal movements
   - Circular patterns
3. Observe the clear circular area

**Expected Results:**
- ✓ Clear area center aligns with cursor position
- ✓ No visible lag or delay in following cursor
- ✓ Movement is smooth and continuous
- ✓ No jittering or stuttering

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-2: Rapid Cursor Movement
**Objective:** Verify tracking accuracy during fast cursor movements

**Steps:**
1. Move cursor rapidly across the screen
2. Make quick directional changes
3. Perform rapid back-and-forth movements
4. Check FPS in DevTools Performance tab

**Expected Results:**
- ✓ Clear area keeps up with rapid movements
- ✓ No visual artifacts or tearing
- ✓ Maintains 60fps (or close to it)
- ✓ RAF throttling prevents performance issues

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-3: Edge and Corner Tracking
**Objective:** Verify accurate tracking near viewport edges

**Steps:**
1. Move cursor to each corner of the viewport:
   - Top-left
   - Top-right
   - Bottom-left
   - Bottom-right
2. Move cursor along each edge:
   - Top edge
   - Right edge
   - Bottom edge
   - Left edge
3. Observe gradient rendering at edges

**Expected Results:**
- ✓ Clear area follows cursor to edges accurately
- ✓ Gradient renders correctly at viewport boundaries
- ✓ No clipping or visual glitches
- ✓ Effect remains smooth at edges

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-4: Initial Position Handling
**Objective:** Verify component behavior on initial load

**Steps:**
1. Refresh the page without moving cursor
2. Note the initial position of the clear area
3. Move cursor for the first time
4. Observe the transition

**Expected Results:**
- ✓ Component handles unknown initial position gracefully
- ✓ First cursor movement updates position correctly
- ✓ No console errors on mount
- ✓ Smooth transition from initial to first tracked position

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-5: Cursor Position Accuracy
**Objective:** Verify pixel-perfect alignment between cursor and clear area center

**Steps:**
1. Move cursor to a specific location
2. Visually inspect alignment between cursor tip and clear area center
3. Test at multiple locations across the viewport
4. Use browser DevTools to inspect computed gradient center if needed

**Expected Results:**
- ✓ Clear area center aligns with cursor position (within 1-2px tolerance)
- ✓ Alignment is consistent across all viewport positions
- ✓ No offset or drift over time
- ✓ Gradient center matches cursor coordinates

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-6: Different Radius Sizes
**Objective:** Verify tracking accuracy with different radius prop values

**Steps:**
1. Test with `radius={100}` (small)
2. Test with `radius={200}` (default)
3. Test with `radius={400}` (large)
4. Move cursor in each configuration

**Expected Results:**
- ✓ Tracking accuracy is consistent regardless of radius
- ✓ Clear area size changes but center remains aligned with cursor
- ✓ No performance degradation with larger radii

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-7: Viewport Resize Handling
**Objective:** Verify tracking continues accurately after viewport changes

**Steps:**
1. Start with full-screen browser window
2. Move cursor to verify tracking
3. Resize browser window to smaller size
4. Move cursor again
5. Resize to larger size
6. Move cursor again

**Expected Results:**
- ✓ Tracking remains accurate after resize
- ✓ No coordinate offset after viewport changes
- ✓ Component adapts to new viewport dimensions
- ✓ No console errors during resize

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-8: Multiple Component Instances
**Objective:** Verify tracking when multiple HauntedVignette instances exist

**Steps:**
1. Render multiple HauntedVignette components (if applicable)
2. Move cursor across the page
3. Observe each instance's behavior

**Expected Results:**
- ✓ All instances track cursor independently
- ✓ No interference between instances
- ✓ Performance remains acceptable
- ✓ Each instance updates correctly

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-9: Smooth Transitions
**Objective:** Verify smooth visual transitions during cursor movement

**Steps:**
1. Move cursor at varying speeds (slow, medium, fast)
2. Observe the gradient transition quality
3. Look for any visual discontinuities
4. Check for smooth interpolation between positions

**Expected Results:**
- ✓ Gradient transitions are smooth at all speeds
- ✓ No visible "jumping" or discrete steps
- ✓ RAF implementation provides smooth updates
- ✓ Visual quality is consistent

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

### TC-10: Performance Under Load
**Objective:** Verify tracking accuracy doesn't degrade under system load

**Steps:**
1. Open DevTools Performance tab
2. Start recording performance
3. Move cursor continuously for 30 seconds
4. Stop recording and analyze results
5. Check for:
   - Frame rate consistency
   - Memory usage
   - CPU usage

**Expected Results:**
- ✓ Maintains 60fps (or close) throughout test
- ✓ No memory leaks (memory usage stable)
- ✓ CPU usage is reasonable
- ✓ No performance degradation over time

**Pass/Fail:** ___________

**Notes:** ___________________________________________

---

## Cross-Browser Testing

### Browser: Chrome
- **Version:** ___________
- **TC-1 through TC-10 Results:** ___________
- **Overall Pass/Fail:** ___________
- **Notes:** ___________________________________________

### Browser: Firefox
- **Version:** ___________
- **TC-1 through TC-10 Results:** ___________
- **Overall Pass/Fail:** ___________
- **Notes:** ___________________________________________

### Browser: Safari
- **Version:** ___________
- **TC-1 through TC-10 Results:** ___________
- **Overall Pass/Fail:** ___________
- **Notes:** ___________________________________________

### Browser: Edge
- **Version:** ___________
- **TC-1 through TC-10 Results:** ___________
- **Overall Pass/Fail:** ___________
- **Notes:** ___________________________________________

---

## Known Issues / Limitations

Document any issues discovered during testing:

1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

---

## Test Summary

**Total Test Cases:** 10
**Passed:** ___________
**Failed:** ___________
**Blocked:** ___________

**Overall Assessment:** ___________

**Tester Name:** ___________
**Test Date:** ___________
**Component Version:** ___________

---

## Recommendations

Based on test results, document any recommendations for:
- Performance improvements
- Bug fixes
- Feature enhancements
- Documentation updates

___________________________________________
___________________________________________
___________________________________________

