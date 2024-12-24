import { loadStripe } from '@stripe/stripe-js';

export const stripeConfig = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  apiVersion: '2023-10-16' as const,
};

export const stripePromise = loadStripe(stripeConfig.publicKey);