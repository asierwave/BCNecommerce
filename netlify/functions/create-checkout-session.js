const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // Verificar que el método de la solicitud sea POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: {
          'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
        },
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Log del cuerpo de la solicitud
    console.log('Raw Event Body:', event.body);

    // Verificar que el cuerpo de la solicitud no esté vacío
    if (!event.body) {
      throw new Error('Request body is empty');
    }

    // Parsear el cuerpo de la solicitud
    const { items } = JSON.parse(event.body);

    // Validar que `items` exista y no esté vacío
    if (!items || items.length === 0) {
      throw new Error('No items provided');
    }

    // Validar los campos de cada item
    items.forEach(item => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error('Item is missing required fields (name, price, quantity)');
      }
      if (isNaN(item.price) || item.price <= 0) {
        throw new Error('Item price must be a positive number');
      }
      if (isNaN(item.quantity) || item.quantity <= 0) {
        throw new Error('Item quantity must be a positive integer');
      }
    });

    // Crear la sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd', // Cambia la moneda si es necesario
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convertir dólares a centavos
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL || 'http://localhost:8888'}/success`,
      cancel_url: `${process.env.URL || 'http://localhost:8888'}/cancel`,
    });

    // Responder con el ID de la sesión
    console.log('Created Session:', session);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error:', error);

    // Responder con un error
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
