import { useState, useEffect } from 'react';
import { fetchFromStripe } from '../utils/api';
import { STRIPE_PRODUCT_API, STRIPE_PRICE_API } from '../config/stripe';
import { Product } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await fetchFromStripe(`${STRIPE_PRODUCT_API}?active=true`);
        const pricesData = await fetchFromStripe(`${STRIPE_PRICE_API}?active=true`);

        const productsWithPrices = productsData.data.map((product: any) => {
          const price = pricesData.data.find((p: any) => p.product === product.id);
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.images[0],
            price: price ? price.unit_amount / 100 : 0,
          };
        });

        setProducts(productsWithPrices);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}