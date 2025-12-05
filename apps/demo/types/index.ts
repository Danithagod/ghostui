// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  category: 'potions' | 'elixirs' | 'ingredients' | 'cursed';
  image: string;
  ingredients: string[];
  effects: string[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Checkout types
export interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  paymentMethod: string;
}

export type OrderStatus = 'brewing' | 'bottling' | 'shipping' | 'delivered';

// Component prop interfaces
export interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export interface CartDrawerProps {
  cart: Cart;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export interface CheckoutModalProps {
  cart: Cart;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (formData: CheckoutForm) => void;
}

export interface OrderProgressProps {
  status: OrderStatus;
}

export interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

export interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  cartItemCount: number;
}
