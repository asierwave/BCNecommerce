const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // Log the raw event body for debugging purposes
    console.log('Raw Event Body:', event.body);
    
    // Check if the event body is not empty
    if (!event.body) {
      throw new Error('Request body is empty');
    }

    // Parse the incoming request body to extract the items
    const { items } = JSON.parse(event.body);
    
    // Log parsed items for debugging
    console.log('Parsed Items:', items);

    // Validate items
    if (!items || items.length === 0) {
      throw new Error('No items provided');
    }

    // Validate each item to ensure it has the required fields
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

    // Log URLs to verify if they are correct
    console.log('Success URL:', `${process.env.URL}/success`);
    console.log('Cancel URL:', `${process.env.URL}/cancel`);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Ensure rounding
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    // Log the created session for debugging
    console.log('Created Session:', session);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error:', error);
    console.error('Stripe Error Details:', error.raw); // Log Stripe error details for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
