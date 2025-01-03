import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/stripe';
import { QuantityControl } from './QuantityControl';

interface ProductCardProps {
  product: Product;
  onAddToBasket: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToBasket }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.currency,
            }).format(product.price / 100)}
          </span>
          <div className="flex items-center gap-4">
            <QuantityControl
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <button
              onClick={() => onAddToBasket(product, quantity)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}