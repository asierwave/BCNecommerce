export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}