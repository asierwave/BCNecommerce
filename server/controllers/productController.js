import { stripe } from '../config/stripe.js';

export const getProducts = async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
    });

    const products = prices.data.map(price => ({
      id: price.id,
      name: price.product.name,
      description: price.product.description,
      price: price.unit_amount,
      currency: price.currency,
      image: price.product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    }));

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};