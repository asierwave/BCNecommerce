import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QYtZHGMZ3gh0f5sILJkvjRihfkqX8W6wZsoDo9lYWyfSv7wJK3vjDIgkSTC9KsFlux9WVsmghcIvmXE5c8lIlFj00VfQcSbpc', {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body || '');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'https://marumero.netlify.app/success',
      cancel_url: 'https://marumero.netlify.app/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session' }),
    };
  }
};

export { handler };