import { loadStripe } from '@stripe/stripe-js';
import { Product } from '../types/stripe';

export const stripePromise = loadStripe('pk_test_51QYtZHGMZ3gh0f5sLJxUpkwJ6YQdVrsvFFzzwtRiVjUFePzUH7o33YWer2UR9adevHqtNPLIYfFvH603CiiHxXDO00Um8a1DpC');

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/.netlify/functions/get-products');
  const products = await response.json();
  return products;
}

export async function createCheckoutSession(items: { price: string; quantity: number }[]) {
  const response = await fetch('/.netlify/functions/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  const { sessionId } = await response.json();
  return sessionId;
}