// Backend: /netlify/functions/create-checkout-session.js
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  try {
    const { items } = JSON.parse(event.body);

    if (!items || !Array.isArray(items)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid items array" }),
      };
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd', // Puedes hacer esto dinámico si necesitas manejar varias monedas
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe espera valores en centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};