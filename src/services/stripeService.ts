import { Product } from '../types/product';

const STRIPE_API_URL = 'https://api.stripe.com/v1';

export async function fetchStripeProducts(): Promise<Product[]> {
  const response = await fetch(`${STRIPE_API_URL}/products?expand[]=data.default_price`, {
    headers: {
      'Authorization': `Bearer sk_test_51QYtZHGMZ3gh0f5sILJkvjRihfkqX8W6wZsoDo9lYWyfSv7wJK3vjDIgkSTC9KsFlux9WVsmghcIvmXE5c8lIlFj00VfQcSbpc`,
    },
  });

  const { data } = await response.json();

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.images[0],
    price: item.default_price.unit_amount / 100,
    priceId: item.default_price.id,
  }));
}