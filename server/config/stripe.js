import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);