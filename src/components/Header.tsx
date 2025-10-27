import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useDarkMode } from '../contexts/DarkModeContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🍽️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CanteenGo</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Reduce queues at campus canteen</p>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            {/* Staff Dashboard Link */}
            <Link
              to="/staff"
              className="hidden md:flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 font-medium"
            >
              <span>Staff</span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Cart Button */}
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
      </div>
    </header>
  );
};

export default Header;
