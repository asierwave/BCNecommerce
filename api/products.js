import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data: prices } = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
    });

    const products = prices.map((price: any) => ({
      id: price.id,
      name: price.product.name,
      description: price.product.description,
      price: price.unit_amount,
      currency: price.currency,
      image: price.product.images[0],
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
}