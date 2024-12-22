import { stripe } from '../config/stripe.js';

export const getProducts = async (req, res) => {
  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
      active: true,
    });

    const formattedProducts = products.data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: product.default_price.unit_amount,
      currency: product.default_price.currency,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};