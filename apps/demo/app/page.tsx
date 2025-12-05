'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductDrawer } from '@/components/ProductDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrderProgress } from '@/components/OrderProgress';
import { OrderSuccess } from '@/components/OrderSuccess';
import { SidebarSkeleton, HeaderSkeleton, ContentSkeleton } from '@/components/Skeletons';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { products } from '@/data/products';
import { Product, OrderStatus, CheckoutForm, Cart } from '@/types';
import { useGhostToast, useThemeOptional, ShadowCrawl } from 'ghostui-react';
import { RarityFilter } from '@/components/RarityFilter';

export default function Home() {
  const cart = useCart();
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all' | 'orders'>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [orderFormData, setOrderFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  });
  const [orderCart, setOrderCart] = useState<Cart>({ items: [], total: 0 });
  const [activeRarity, setActiveRarity] = useState<Product['rarity'] | 'all'>('all');
  const { addToast } = useGhostToast();
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  
  // Theme-specific border colors matching GooeySidebar
  const borderColor = theme === 'blood' ? 'border-red-500/20' : 'border-purple-500/20';
  
  const filteredProducts = useProducts({
    products,
    category: selectedCategory === 'orders' ? 'all' : selectedCategory,
    rarity: activeRarity,
    searchQuery,
  });

  // Simulate initial loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handler for search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handler for cart icon click
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  // Handler for category selection
  const handleCategorySelect = (category: Product['category'] | 'all' | 'orders') => {
    setSelectedCategory(category);
  };

  // Handler for product selection (opens product drawer)
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDrawerOpen(true);
  };

  // Handler for adding product to cart
  const handleAddToCart = (product: Product) => {
    cart.addItem(product);
    addToast(`${product.name} added to cart!`, 'success');
  };

  // Handler for checkout button click
  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  // Handler for checkout completion
  const handleCheckoutComplete = (formData: CheckoutForm) => {
    // Save cart and form data before clearing
    setOrderCart({ items: [...cart.items], total: cart.total });
    setOrderFormData(formData);
    
    // Start transition
    setIsTransitioning(true);
    setIsCheckoutModalOpen(false);
    
    // After transition covers screen, switch to success page
    setTimeout(() => {
      setShowOrderSuccess(true);
      setOrderStatus('brewing');
      cart.clearCart();
    }, 600);
    
    // End transition after page switch
    setTimeout(() => {
      setIsTransitioning(false);
      addToast('Order placed successfully!', 'success');
    }, 1200);
  };

  // Handler for returning from order success
  const handleContinueShopping = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setShowOrderSuccess(false);
      setOrderStatus(null);
    }, 600);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  // Handler for tracking order
  const handleTrackOrder = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setShowOrderSuccess(false);
      setSelectedCategory('orders');
    }, 600);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  // Show loading skeletons
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[var(--ghost-bg)] gap-3">
        <div className="pl-6 py-8">
          <SidebarSkeleton />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-hidden py-8 pr-6 gap-8">
          <div className="flex-shrink-0">
            <HeaderSkeleton />
          </div>
          <ContentSkeleton />
        </div>
      </div>
    );
  }

  // Show order success page
  if (showOrderSuccess) {
    return (
      <>
        <ShadowCrawl isActive={isTransitioning} />
        <OrderSuccess
          cart={orderCart}
          formData={orderFormData}
          onContinueShopping={handleContinueShopping}
          onTrackOrder={handleTrackOrder}
        />
      </>
    );
  }

  return (
    <>
      <ShadowCrawl isActive={isTransitioning} />
      
      <div className="flex min-h-screen bg-[var(--ghost-bg)] gap-3">
        <div className="pl-6 py-8">
          <Sidebar 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        <div className="flex-1 flex flex-col h-screen overflow-hidden py-8 pr-6 gap-8">
          <div className="flex-shrink-0">
            <Header
              onSearch={handleSearch}
              onCartClick={handleCartClick}
              cartItemCount={cart.items.length}
            />
          </div>

          <main className={`flex-1 overflow-y-auto rounded-2xl bg-[var(--ghost-bg-primary)] border shadow-2xl custom-scrollbar ${borderColor}`}>
            <div className="p-8">
              {/* Header row with title and rarity filter */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[var(--ghost-accent)]">
                  {selectedCategory === 'all' ? 'All Products' : 
                   selectedCategory === 'orders' ? 'Your Orders' :
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </h2>
                
                {selectedCategory !== 'orders' && (
                  <RarityFilter 
                    activeRarity={activeRarity} 
                    onRarityChange={setActiveRarity} 
                  />
                )}
              </div>
              
              {selectedCategory === 'orders' ? (
                <div className="max-w-3xl mx-auto">
                  {orderStatus ? (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Order Status
                        </h3>
                        <p className="text-gray-400">
                          Track your magical order below
                        </p>
                      </div>
                      <OrderProgress status={orderStatus} />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4 opacity-30">📦</div>
                      <p className="text-gray-400 text-lg">No orders yet</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Browse our collection and place your first order!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  onProductSelect={handleProductSelect}
                  onAddToCart={handleAddToCart}
                  isLoading={false}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      <ProductDrawer
        product={selectedProduct}
        isOpen={isProductDrawerOpen}
        onClose={() => setIsProductDrawerOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
      />

      <CheckoutModal
        cart={cart}
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onComplete={handleCheckoutComplete}
      />
    </>
  );
}
