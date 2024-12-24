import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '../utils/stripe-helpers';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}