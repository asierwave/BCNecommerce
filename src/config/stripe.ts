import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const STRIPE_PRICE_API = 'https://api.stripe.com/v1/prices';
export const STRIPE_PRODUCT_API = 'https://api.stripe.com/v1/products';