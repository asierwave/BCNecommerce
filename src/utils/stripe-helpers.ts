import { CartItem } from '../types';

export const formatLineItems = (items: CartItem[]) => {
  return items.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));
};

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};