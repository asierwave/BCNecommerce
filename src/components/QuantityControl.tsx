import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantityControl({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99
}: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => quantity > min && onQuantityChange(quantity - 1)}
        disabled={quantity <= min}
        className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={24} />
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={() => quantity < max && onQuantityChange(quantity + 1)}
        disabled={quantity >= max}
        className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}