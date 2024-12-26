require('dotenv').config(); // Asegúrate de cargar las variables de entorno

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY); // Log para verificar (eliminar en producción)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Inicializa Stripe AQUÍ

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    if (!event.body) {
      throw new Error('Request body is empty');
    }

    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      throw new Error('No items provided');
    }

    items.forEach(item => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error('Item is missing required fields (name, price, quantity)');
      }
    });

    // Crear la sesión de pago con Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe espera el precio en centavos
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.SITE_URL}/success`,
      cancel_url: `${process.env.SITE_URL}/cancel`,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ id: session.id }),
    };

  } catch (error) {
    console.error("Error en la función:", error); // Log más descriptivo
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};