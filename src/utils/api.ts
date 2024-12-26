export async function fetchFromStripe(url: string) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch from Stripe');
  }
  
  return response.json();
}