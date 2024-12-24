import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const fetchItemsFromStripe = async () => {
    // Replace with your actual API call to fetch items from Stripe
    const response = await fetch('/api/stripe/items');
    const items = await response.json();
    setCartItems(items);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });
    const session = await response.json();

    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error(result.error.message);
      }
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <button onClick={fetchItemsFromStripe}>Cargar Artículos</button>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Pagar</button>
    </div>
  );
};

export default Cart;