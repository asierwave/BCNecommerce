const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

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

    // Aquí puedes continuar con la lógica para crear la sesión de pago con Stripe
    // ...

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};