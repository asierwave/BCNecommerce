interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  variant?: 'dark' | 'light';
}

export function QuantityControl({ 
  quantity, 
  onQuantityChange,
  variant = 'dark' 
}: QuantityControlProps) {
  const textColor = variant === 'dark' ? 'text-dark' : 'text-background';
  const borderColor = variant === 'dark' ? 'border-dark' : 'border-background';

  return (
    <div className={`flex items-center border ${borderColor} rounded-lg`}>
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className={`px-2 py-1 ${textColor} hover:bg-primary/10`}
      >
        -
      </button>
      <span className={`px-3 ${textColor}`}>{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className={`px-2 py-1 ${textColor} hover:bg-primary/10`}
      >
        +
      </button>
    </div>
  );
}