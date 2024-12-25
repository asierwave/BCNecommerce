import React from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';
import { QuantitySelector } from './QuantitySelector';
import { stripePromise } from '../config/stripe';

interface CartProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isVisible, onClose }) => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    try {
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: state.items }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Error:', error);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md">
        <div className="h-full bg-white shadow-xl flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
                          onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {state.items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};