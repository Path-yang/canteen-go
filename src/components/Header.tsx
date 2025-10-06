import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🍽️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CanteenGo</h1>
              <p className="text-xs text-gray-500">Reduce queues at campus canteen</p>
            </div>
          </Link>
          
          <Link 
            to="/cart" 
            className="relative flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="font-medium">Cart</span>
            {state.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {state.itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
