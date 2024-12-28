import React, { useEffect, useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { Basket } from './components/Basket';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Product, BasketItem } from './types/stripe';
import { stripePromise, createCheckoutSession, fetchProducts } from './lib/stripe';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const addToBasket = (product: Product, quantity: number) => {
    setBasketItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeFromBasket = (productId: string) => {
    setBasketItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const sessionId = await createCheckoutSession(
      basketItems.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      }))
    );

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToBasket={addToBasket}
              />
            ))}
          </div>
        )}

        <Basket
          items={basketItems}
          onRemoveItem={removeFromBasket}
          onCheckout={handleCheckout}
        />
      </main>
    </div>
  );
}

export default App;