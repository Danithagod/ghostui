# Implementation Plan

- [x] 1. Set up component structure and basic rendering





  - Create WhisperBox.tsx file with component skeleton
  - Define TypeScript interface extending React.TextareaHTMLAttributes
  - Implement forwardRef for textarea element
  - Add basic textarea with label rendering
  - Set up internal state (text, isFocused, energy)
  - Add RUNES constant array
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 1.1 Write property test for component rendering
  - **Property 1: Component renders with label and textarea**
  - **Validates: Requirements 1.3**

- [ ]* 1.2 Write property test for attribute forwarding
  - **Property 2: Standard textarea attributes are forwarded**
  - **Validates: Requirements 1.4**

- [ ]* 1.3 Write property test for ref forwarding
  - **Property 3: Ref forwarding works correctly**
  - **Validates: Requirements 1.5**
-

- [x] 2. Implement energy system mechanics




  - Create energy state (0-100) with useState
  - Implement handleChange to increase energy by 15 per keystroke
  - Add useEffect with interval for energy decay (5 points per 100ms)
  - Add lastTypeTime ref to track typing activity
  - Calculate glowOpacity and distortionScale from energy
  - Ensure energy is clamped between 0 and 100
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 2.1 Write property test for energy increase
  - **Property 4: Energy increases with typing**
  - **Validates: Requirements 2.1**

- [ ]* 2.2 Write property test for energy decay
  - **Property 5: Energy decays over time**
  - **Validates: Requirements 2.2**

- [ ]* 2.3 Write property test for glow opacity scaling
  - **Property 6: Glow opacity scales with energy**
  - **Validates: Requirements 2.3**

- [ ]* 2.4 Write property test for distortion scale
  - **Property 7: Distortion scale increases with energy**
  - **Validates: Requirements 2.4, 6.3**

- [x] 3. Implement SVG ectoplasm filter



  - Create inline SVG with filter definition
  - Add feTurbulence with fractal noise
  - Add animate element for baseFrequency animation (15s loop)
  - Add feDisplacementMap with dynamic scale prop
  - Position SVG absolutely with w-0 h-0
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 4. Implement ectoplasm border and whisper glow





  - Create ectoplasm border div with -inset-1 positioning
  - Apply SVG filter via inline style
  - Add opacity transition based on focus state and energy
  - Create whisper glow div with blur-xl effect
  - Set glow opacity dynamically based on energy
  - Add purple background colors with appropriate opacity
  - _Requirements: 3.1, 3.5, 6.4, 6.5_

- [ ]* 4.1 Write property test for focus state effects
  - **Property 9: Focus state applies correct effects**
  - **Validates: Requirements 3.1, 3.2, 3.3, 6.4**

- [ ]* 4.2 Write property test for blur state effects
  - **Property 10: Blur state removes focus effects**
  - **Validates: Requirements 3.4, 3.5**
-

- [x] 5. Implement floating runic symbols




  - Add conditional rendering when energy > 10
  - Use AnimatePresence from Framer Motion
  - Render 6 motion.div elements with random runes
  - Apply random positioning (10-90% width/height)
  - Apply random rotation transforms (0-360 degrees)
  - Set initial, animate, and exit states for fade/scale effects
  - Add Cinzel font class and purple coloring
  - _Requirements: 2.5, 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 5.1 Write property test for rune appearance threshold
  - **Property 8: Runes appear above energy threshold**
  - **Validates: Requirements 2.5, 4.1**

- [ ]* 5.2 Write property test for rune positioning
  - **Property 11: Rune positions are within bounds**
  - **Validates: Requirements 4.5**

- [ ]* 5.3 Write property test for rune rotations
  - **Property 12: Rune rotations are applied**
  - **Validates: Requirements 4.3**

- [x] 6. Implement animated label




  - Position label absolutely at left-4 top-4
  - Add conditional transform based on focus or text presence
  - Implement upward translation (-translate-y-7)
  - Add font size transition (text-xs to text-[10px])
  - Add color transition (purple-200/50 to purple-400)
  - Use Cinzel font with uppercase and tracking-widest
  - Add 300ms transition duration
  - _Requirements: 3.2, 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ]* 6.1 Write property test for label animation
  - **Property 21: Label animates based on state**
  - **Validates: Requirements 12.1, 12.2, 12.3, 12.4**

- [x] 7. Implement textarea styling and corner accents




  - Style textarea with dark background (#0a0510/80)
  - Add backdrop-blur-sm for frosted glass effect
  - Apply purple border and text colors
  - Add ghost-text class with custom text-shadow
  - Use serif font with text-lg and leading-relaxed
  - Set min-h-[160px] and resize-y
  - Add dynamic box shadow based on focus and energy
  - Create 4 corner accent divs with purple borders
  - Position corner accents absolutely at each corner
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 11.1, 11.2, 11.3, 11.4, 11.5_
-

- [x] 8. Implement status indicator


  - Position indicator at bottom-4 right-4
  - Add conditional rendering based on energy level
  - Show Sparkles icon with animate-spin when energy > 50
  - Show Ghost icon when energy ≤ 50
  - Apply color based on focus state (purple-400, purple-700, purple-900/40)
  - Add 500ms transition duration
  - Set icon size to w-5 h-5
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 8.1 Write property test for status indicator states
  - **Property 13: Status indicator reflects energy level**
  - **Validates: Requirements 5.1, 5.2, 5.3**

- [x] 9. Implement custom styles and embedded CSS




  - Create style tag with Google Fonts import
  - Add ghost-text CSS class definition
  - Add font-rune CSS class definition
  - Ensure cn utility is imported from lib/utils
  - Merge custom className prop with default styles
  - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [ ]* 9.1 Write property test for className merging
  - **Property 14: Custom className is merged**
  - **Validates: Requirements 7.1**

- [ ]* 9.2 Write property test for custom label
  - **Property 15: Custom label is displayed**
  - **Validates: Requirements 7.2**

- [x] 10. Implement event handlers and form support





  - Preserve user's onChange handler while updating internal state
  - Preserve user's onFocus handler while setting isFocused
  - Preserve user's onBlur handler while setting isFocused
  - Ensure textarea supports standard form submission
  - Forward placeholder prop to textarea
  - Test form integration with name attribute
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 10.1 Write property test for onChange handler
  - **Property 16: onChange handler is invoked**
  - **Validates: Requirements 10.1**

- [ ]* 10.2 Write property test for onFocus handler
  - **Property 17: onFocus handler is preserved**
  - **Validates: Requirements 10.2**

- [ ]* 10.3 Write property test for onBlur handler
  - **Property 18: onBlur handler is preserved**
  - **Validates: Requirements 10.3**

- [ ]* 10.4 Write property test for form integration
  - **Property 19: Form integration works**
  - **Validates: Requirements 10.4**

- [ ]* 10.5 Write property test for placeholder display
  - **Property 20: Placeholder text displays**
  - **Validates: Requirements 10.5**
-

- [x] 11. Add component to library exports


  - Export WhisperBox from packages/ghostui/src/components/index.ts
  - Ensure TypeScript types are exported
  - Verify component is available in package build
  - _Requirements: 1.1, 1.2_

- [x] 12. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
-

- [x] 13. Create documentation page structure




  - Create apps/docs/app/docs/components/whisper-box/page.tsx
  - Import WhisperBox, ComponentPlayground, and PropsTable
  - Add page title and description
  - Set up basic page layout with prose styling
  - _Requirements: 9.1, 9.2, 9.3_
-

- [x] 14. Add basic usage examples to documentation



  - Create basic example with ComponentPlayground
  - Add code snippet for simple usage
  - Create props table with all WhisperBox properties
  - Document label, className, and textarea attributes
  - Include default values and descriptions
  - _Requirements: 9.2, 9.3_
-

- [x] 15. Add energy system demonstration to documentation



  - Create interactive example showing energy response to typing
  - Add explanation of energy increase (15 per keystroke)
  - Add explanation of energy decay (5 per 100ms)
  - Show visual effects scaling with energy
  - Include code example with energy system usage
  - _Requirements: 9.4_

- [x] 16. Add focus state examples to documentation



  - Create example demonstrating ectoplasm border on focus
  - Show label animation on focus
  - Demonstrate box shadow intensity changes
  - Add code snippet for focus behavior
  - Include explanation of focus visual effects
  - _Requirements: 9.1_

- [x] 17. Add floating runes demonstration to documentation




  - Create example with high energy to show runes
  - Explain energy threshold (> 10) for rune appearance
  - Show rune positioning and rotation
  - Add code snippet demonstrating rune effects
  - Include tips for triggering rune animations
  - _Requirements: 9.4_

- [x] 18. Add status indicator examples to documentation



  - Create examples showing Ghost icon at low energy
  - Create example showing Sparkles icon at high energy
  - Explain energy threshold (> 50) for Sparkles
  - Show color changes based on focus state
  - Add code snippets for different states
  - _Requirements: 9.1_
-

- [x] 19. Add custom styling examples to documentation




  - Create example with custom className
  - Show custom width and height variations
  - Demonstrate custom label text
  - Add example with custom background styling
  - Include code snippets for customization
  - _Requirements: 9.2_

- [x] 20. Add form integration example to documentation




  - Create working form example with WhisperBox
  - Show controlled component pattern with useState
  - Demonstrate form submission handling
  - Add validation example if applicable
  - Include complete code snippet
  - _Requirements: 9.1_
- [x] 21. Add accessibility and usage notes to documentation




- [ ] 21. Add accessibility and usage notes to documentation

  - Document keyboard navigation support
  - Add notes on screen reader compatibility
  - Include performance considerations
  - Add browser compatibility notes
  - Document best practices for usage
  - Include tips for optimal energy system experience
  - _Requirements: 9.1, 9.2_
-

- [x] 22. Final checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
