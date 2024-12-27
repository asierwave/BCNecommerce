import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from './lib/store';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Renderiza los productos aquí */}
      </main>
    </div>
  );
}

export default App;