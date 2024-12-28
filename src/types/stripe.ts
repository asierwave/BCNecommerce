export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  currency: string;
}

export interface BasketItem extends Product {
  quantity: number;
}