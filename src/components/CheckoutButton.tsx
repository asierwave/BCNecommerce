import React from 'react';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../services/stripe';

export const CheckoutButton: React.FC = () => {
  const { state } = useCart();
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await createCheckoutSession(state.items);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || state.items.length === 0}
      className={`px-6 py-3 bg-indigo-600 text-white rounded-md transition-colors ${
        loading || state.items.length === 0
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-indigo-700'
      }`}
    >
      {loading ? 'Processing...' : 'Checkout with Stripe'}
    </button>
  );
};