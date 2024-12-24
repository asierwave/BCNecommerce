import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';
import { formatPrice } from '../utils/stripe-helpers';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-4 text-gray-500">Add some products to your cart to get started.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {state.items.map(item => (
          <div key={item.id} className="flex items-center py-6 border-b border-gray-200 last:border-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="ml-6 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="mt-1 text-gray-500">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8 flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            Total: {formatPrice(state.total)}
          </span>
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
};