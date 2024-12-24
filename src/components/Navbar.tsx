import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { state } = useCart();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ModernShop</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/cart"
              className="group -m-2 flex items-center p-2 relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};