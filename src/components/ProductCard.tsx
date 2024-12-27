import React from 'react';
import { Product } from '../lib/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${(product.price / 100).toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;