import React from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { loadStripe } from '@stripe/stripe-js';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
}

const stripePromise = loadStripe('pk_test_51QYtZHGMZ3gh0f5sILJkvjRihfkqX8W6wZsoDo9lYWyfSv7wJK3vjDIgkSTC9KsFlux9WVsmghcIvmXE5c8lIlFj00VfQcSbpc');

export function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        console.error('Stripe failed to load');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart size={24} />
          Shopping Cart
        </h2>
        <span className="text-sm text-gray-600">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex gap-1">  
                <h3 className="font-medium">{item.name}</h3>
                <h4 className="font-small">{(item.price / 100).toFixed(2)} €</h4>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(total / 100)}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}