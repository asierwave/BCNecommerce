import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/stripe';
import { QuantityControl } from './QuantityControl';

interface ProductCardProps {
  product: Product;
  onAddToBasket: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToBasket }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="relative aspect-square rounded-lg shadow-md overflow-hidden group">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4">
        <div className="text-background">
          <h3 className="text-xl font-staatliches mb-2">{product.name}</h3>
          <p className="text-sm line-clamp-2 mb-4">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(product.price / 100)}
            </span>
            
            <div className="flex items-center gap-2">
              <QuantityControl
                quantity={quantity}
                onQuantityChange={setQuantity}
                variant="light" // Asegúrate de tener esta prop en tu QuantityControl
              />
              <button
                onClick={() => onAddToBasket(product, quantity)}
                className="bg-primary text-background p-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                <ShoppingCart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}