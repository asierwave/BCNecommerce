import React from 'react';
import { useCartStore } from '../lib/store';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  
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
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 hover:bg-gray-100 rounded text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${(total / 100).toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;