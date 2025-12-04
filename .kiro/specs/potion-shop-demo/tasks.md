# Implementation Plan

- [ ] 1. Set up demo app project structure
  - [ ] 1.1 Create Next.js app at `apps/demo` with TypeScript configuration
    - Initialize Next.js project with App Router
    - Configure TypeScript and ESLint
    - Set up Tailwind CSS with GhostUI preset
    - Add dependency on `@ghostui/react` package
    - _Requirements: All_

  - [ ] 1.2 Create base layout with ThemeProvider and ambient effects
    - Implement root layout.tsx with ThemeProvider wrapper
    - Add HauntedVignette for ambient edge effects
    - Configure SpookyScrollbar for custom scrolling
    - Add GhostCursor or WispTrail for cursor effects
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 1.3 Create TypeScript interfaces and types
    - Define Product, CartItem, Cart, CheckoutForm interfaces
    - Define OrderStatus type
    - Define component prop interfaces
    - _Requirements: 2.1, 5.2_

- [ ] 2. Implement mock data and state management
  - [ ] 2.1 Create mock product data
    - Create `data/products.ts` with 12+ sample potions
    - Include variety across categories (potions, elixirs, ingredients, cursed)
    - Include variety across rarities
    - _Requirements: 2.1_

  - [ ] 2.2 Implement useCart hook for cart state management
    - Implement addItem, removeItem, updateQuantity, clearCart functions
    - Calculate cart total automatically
    - Persist cart state (optional: localStorage)
    - _Requirements: 5.2, 5.3_

  - [ ]* 2.3 Write property test for cart total calculation
    - **Property 8: Cart total calculation**
    - **Validates: Requirements 5.3**

  - [ ] 2.4 Implement useProducts hook for filtering and search
    - Implement category filtering logic
    - Implement search filtering logic
    - Combine filters when both are active
    - _Requirements: 1.2, 4.2, 4.4_

  - [ ]* 2.5 Write property test for category filtering
    - **Property 1: Category filtering returns only matching products**
    - **Validates: Requirements 1.2, 4.4**

  - [ ]* 2.6 Write property test for search filtering
    - **Property 4: Search filtering returns relevant products**
    - **Validates: Requirements 4.2**

- [ ] 3. Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement layout and navigation components
  - [ ] 4.1 Implement Header component
    - Add SpiritInput for search functionality
    - Add cart icon with item count badge
    - Add MoonlightSwitch for theme toggle
    - Style with GhostUI theme tokens
    - _Requirements: 4.1, 5.1, 8.1_

  - [ ]* 4.2 Write property test for theme toggle
    - **Property 7: Theme toggle round-trip**
    - **Validates: Requirements 8.2**

  - [ ] 4.3 Implement sidebar navigation with GooeySidebar
    - Add navigation items for categories (All, Potions, Elixirs, Ingredients, Cursed, Orders)
    - Wire up category selection to filtering
    - Style active state for selected category
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 5. Implement product display components
  - [ ] 5.1 Implement ProductCard component
    - Use CoffinCard or GooeyCard as base
    - Display product name, image placeholder, price, description
    - Add SpookyTooltip for ingredient/effect preview on hover
    - Add GooeyButton for quick add to cart
    - _Requirements: 2.1, 2.2, 2.3, 10.1_

  - [ ]* 5.2 Write property test for product card content
    - **Property 2: Product cards contain all required fields**
    - **Validates: Requirements 2.2**

  - [ ] 5.3 Implement ProductGrid component
    - Display products in responsive grid layout
    - Integrate with useProducts hook for filtering
    - Add SpectralTabs for category quick-filter
    - Show SpookySkeleton during loading state
    - _Requirements: 2.1, 4.3, 4.4, 7.1, 7.2_

- [ ] 6. Implement drawer components
  - [ ] 6.1 Implement ProductDrawer component
    - Use GooeyDrawer for slide-out panel
    - Display full product details (name, description, ingredients, effects, price)
    - Add GooeyButton for add to cart action
    - _Requirements: 3.1, 3.2, 3.3, 10.1_

  - [ ]* 6.2 Write property test for product drawer content
    - **Property 3: Product drawer displays complete details**
    - **Validates: Requirements 3.2**

  - [ ] 6.3 Implement CartDrawer component
    - Use GooeyDrawer for cart panel
    - Display cart items with name, quantity, price
    - Add quantity controls and remove buttons
    - Display cart total
    - Add GooeyButton for checkout
    - _Requirements: 5.1, 5.2, 5.3, 10.1_

  - [ ]* 6.4 Write property test for cart drawer content
    - **Property 5: Cart displays all items with required details**
    - **Validates: Requirements 5.2**

- [ ] 7. Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement toast notifications
  - [ ] 8.1 Add GhostToast for cart notifications
    - Show toast when item is added to cart
    - Include product name in toast message
    - Configure appropriate duration and styling
    - _Requirements: 5.4_

  - [ ]* 8.2 Write property test for add to cart toast
    - **Property 6: Adding to cart triggers toast notification**
    - **Validates: Requirements 5.4**

- [ ] 9. Implement checkout flow
  - [ ] 9.1 Implement CheckoutModal component
    - Use GraveModal for checkout overlay
    - Create multi-step form (shipping info, payment, confirmation)
    - Use SpiritInput for all form fields
    - Add form validation
    - Add GooeyButton for navigation and submission
    - _Requirements: 6.1, 6.2, 10.1_

  - [ ] 9.2 Implement OrderProgress component
    - Use GooeyProgressBar to show order status
    - Display stages: Brewing → Bottling → Shipping → Delivered
    - Animate progress on checkout completion
    - _Requirements: 6.3_

- [ ] 10. Wire up main page
  - [ ] 10.1 Integrate all components in main page
    - Compose Header, Sidebar, ProductGrid in layout
    - Wire up ProductDrawer to product selection
    - Wire up CartDrawer to cart icon
    - Wire up CheckoutModal to checkout button
    - Connect all state and event handlers
    - _Requirements: All_

  - [ ]* 10.2 Write unit tests for main page integration
    - Test component composition renders correctly
    - Test navigation between views
    - Test cart flow end-to-end
    - _Requirements: All_

- [ ] 11. Final Checkpoint
  - Ensure all tests pass, ask the user if questions arise.
