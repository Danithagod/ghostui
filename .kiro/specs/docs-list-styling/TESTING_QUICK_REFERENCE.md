# Browser Compatibility Testing - Quick Reference

## 🚀 Quick Start

### 1. Run Automated Tests
```bash
# Open this file in each browser:
.kiro/specs/docs-list-styling/browser-compatibility-test.html

# Click "Run All Tests" button
# Click "Copy Results" to save output
```

### 2. Test Live Documentation
```bash
cd apps/docs
npm run dev
# Visit: http://localhost:3000/docs/components/gooey-button
```

### 3. Document Results
```bash
# Fill out checklist in:
.kiro/specs/docs-list-styling/browser-compatibility-test-plan.md
```

---

## ✅ Browsers to Test

### Desktop
- [ ] Chrome/Edge (Chromium) - Latest
- [ ] Firefox - Latest  
- [ ] Safari - Latest (macOS only)

### Mobile
- [ ] iOS Safari - Latest (iPhone/iPad)
- [ ] Chrome Mobile - Latest (Android)

---

## 👀 What to Check

### Visual Checklist
- [ ] Orange bullets (•) - Color: #FF6F00
- [ ] Orange strong tags - Color: #FF6F00
- [ ] Light purple text - Color: rgba(233, 213, 255, 0.8)
- [ ] Consistent spacing - 0.75rem between items
- [ ] Nested lists use hollow bullets (◦)
- [ ] Text wraps correctly (aligns with first line)
- [ ] No horizontal scrolling
- [ ] Theme switching works (if available)

### Test Pages
1. `/docs/components/gooey-button` - Multiple lists
2. `/docs/components/moonlight-switch` - Accessibility list
3. `/docs/components/spectral-tabs` - Multiple lists
4. `/docs/components/haunted-sidebar` - Features list
5. `/docs/components/spooky-tooltip` - Accessibility list

---

## 🎯 Expected Test Results

All 10 automated tests should pass:
1. ✅ List item text color
2. ✅ Bullet point color  
3. ✅ Bullet point content
4. ✅ Strong tag color
5. ✅ List item padding
6. ✅ Bullet position
7. ✅ List bottom margin
8. ✅ List style type
9. ✅ Font size
10. ✅ Bullet font weight

---

## 📝 Issue Severity

- **Critical:** Content unreadable or broken
- **High:** Significant visual issues
- **Medium:** Minor inconsistencies
- **Low:** Cosmetic issues

---

## 🔧 Common Issues & Fixes

### Issue: Tests fail in older browsers
**Fix:** Update to latest browser version

### Issue: Colors look wrong
**Fix:** Check theme is set correctly, clear cache

### Issue: Bullets not showing
**Fix:** Verify CSS loaded, check DevTools console

### Issue: Mobile layout broken
**Fix:** Test on real device, not just emulator

---

## 📊 Completion Checklist

- [ ] All 5 browsers tested
- [ ] Automated tests run for each
- [ ] Visual verification completed
- [ ] Live documentation tested
- [ ] Mobile browsers tested
- [ ] Results documented in test plan
- [ ] Issues logged with severity
- [ ] Screenshots captured (if issues found)

---

## 📁 Files Reference

| File | Purpose |
|------|---------|
| `browser-compatibility-test-plan.md` | Detailed manual test checklist |
| `browser-compatibility-test.html` | Automated test page |
| `BROWSER_COMPATIBILITY_TESTING.md` | Full implementation guide |
| `TESTING_QUICK_REFERENCE.md` | This quick reference |

---

## ⏱️ Estimated Time

- **Per browser (desktop):** 10-15 minutes
- **Per browser (mobile):** 15-20 minutes  
- **Total:** ~1.5-2 hours for complete testing

---

## 🎓 Pro Tips

1. **Test in order:** Desktop first, then mobile
2. **Use incognito mode:** Avoids extension conflicts
3. **Take screenshots:** Document any issues immediately
4. **Test responsive:** Resize browser window at each breakpoint
5. **Clear cache:** If something looks wrong, try hard refresh first
6. **Real devices:** Always test mobile on real devices when possible

---

## 🆘 Need Help?

1. Check `BROWSER_COMPATIBILITY_TESTING.md` for detailed instructions
2. Review `design.md` for expected behavior
3. Check `requirements.md` for acceptance criteria
4. Ask for clarification if specifications are unclear

---

## ✨ Success Criteria

Task is complete when:
- All browsers tested and documented
- No critical issues remaining
- Test plan signed off
- Ready to proceed to final checkpoint
