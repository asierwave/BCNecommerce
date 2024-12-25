import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="p-1 rounded-md hover:bg-gray-100"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};