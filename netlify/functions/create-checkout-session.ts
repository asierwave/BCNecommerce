import { Handler } from '@netlify/functions';
import { stripe } from './stripe-client';
import { formatLineItems } from '../../src/utils/stripe-helpers';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body || '');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: formatLineItems(items),
      mode: 'payment',
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cart`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session' }),
    };
  }
};