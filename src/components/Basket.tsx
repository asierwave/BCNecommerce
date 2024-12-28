import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { BasketItem } from '../types/stripe';

interface BasketProps {
  items: BasketItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function Basket({ items, onRemoveItem, onCheckout }: BasketProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart />
          Your Basket
        </h2>
        <span className="text-gray-600">
          {items.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: item.currency,
                }).format(item.price / 100)} × {item.quantity}
              </p>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: items[0]?.currency || 'USD',
            }).format(total / 100)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}