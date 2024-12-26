const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    console.log('Raw Event Body:', event.body);
    const { items } = JSON.parse(event.body);
    console.log('Parsed Items:', items);

    // Validate items
    if (!items || items.length === 0) {
      throw new Error('No items provided');
    }

    items.forEach(item => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error('Item is missing required fields');
      }
      if (isNaN(item.price) || item.price <= 0) {
        throw new Error('Item price must be a positive number');
      }
      if (isNaN(item.quantity) || item.quantity <= 0) {
        throw new Error('Item quantity must be a positive integer');
      }
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Ensure price is in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    console.log('Stripe Session Created:', session);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
