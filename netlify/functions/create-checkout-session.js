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
          unit_amount: item.price * 100, // Ensure price is in cents (for dollars, multiply by 100)
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    // Log session creation for debugging
    console.log('Stripe Session Created:', session);

    // Return the session ID in the response to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    // Log full error stack for debugging
    console.error('Error:', error.stack);

    // Return error response with status 500
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
