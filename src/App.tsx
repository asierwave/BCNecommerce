import React, { useEffect, useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CartButton } from './components/CartButton';
import { CartProvider } from './context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { fetchStripeProducts } from './services/stripeService';
import { Product } from './types/product';
import { useCartVisibility } from './hooks/useCartVisibility';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isCartVisible, toggleCart } = useCartVisibility();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const stripeProducts = await fetchStripeProducts();
        setProducts(stripeProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-blue-600" size={24} />
              <h1 className="text-xl font-bold">Modern Home Store</h1>
            </div>
            <CartButton onClick={toggleCart} />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

        <Cart isVisible={isCartVisible} onClose={toggleCart} />
      </div>
    </CartProvider>
  );
}

export default App;