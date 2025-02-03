import React from 'react';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { BasketItem } from '../types/stripe';

interface BasketProps {
  items: BasketItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Basket({ 
  items, 
  onRemoveItem, 
  onCheckout, 
  isOpen, 
  onToggle 
}: BasketProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    // h-[calc(100vh-4rem)]
    <div className="fixed inset-0 bg-black bg-opacity-20 z-40">
      <div className="absolute right-[2vw] top-20 h-fit w-full max-w-md bg-background shadow-xl p-6 transform transition-transform rounded-[20px]">
        <div className="flex items-center h-fit justify-between mb-6">
          <h2 className="text-2xl font-staatliches flex h-fit items-center gap-2">
            <ShoppingCart className="text-primary" />
            Tu Carrito
          </h2>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-dark transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="space-y-4 h-[60vh] overflow-auto pr-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-dark">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(item.price / 100)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors ml-4"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="font-staatliches text-lg">Total:</span>
                <span className="font-bold text-dark">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(total / 100)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-primary text-background py-3 rounded-lg font-staatliches hover:bg-opacity-90 transition-all"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}