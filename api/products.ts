import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
    });

    const formattedProducts = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;
      return {
        id: product.id,
        name: product.name,
        price: price.unit_amount,
        image: product.images[0],
        description: product.description,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
}