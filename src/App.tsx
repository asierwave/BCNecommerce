import React from 'react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart'; // Cambiar la importación para que coincida con la exportación
import { useCartStore } from './store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

const App = () => {
  const { products, loading, error } = useProducts();
  const { items, total, removeItem, isOpen, toggleCart } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">BCN Shop</h1>
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart size={24} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Cart items={items} total={total} removeItem={removeItem} />
    </div>
  );
};

export default App;