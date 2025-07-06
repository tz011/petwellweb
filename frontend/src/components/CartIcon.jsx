import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartIcon = ({ onCartClick }) => {
  const { itemCount, isLoading } = useCart();

  return (
    <button
      onClick={onCartClick}
      className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
      disabled={isLoading}
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-700 group-hover:text-teal-600 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
        />
      </svg>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {itemCount === 0 ? 'Cart is empty' : `${itemCount} item${itemCount !== 1 ? 's' : ''} in cart`}
      </div>
    </button>
  );
};

export default CartIcon; 