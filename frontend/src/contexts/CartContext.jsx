import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart reducer for state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        itemCount: action.payload.itemCount || 0,
        isLoading: false
      };
    
    case 'ADD_ITEM':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.itemCount,
        isLoading: false
      };
    
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.itemCount,
        isLoading: false
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.itemCount,
        isLoading: false
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        isLoading: false
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
};

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false,
    error: null
  });

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include cookies for session management
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      return await response.json();
    } catch (error) {
      console.error('Cart API error:', error);
      throw error;
    }
  };

  // Fetch cart data
  const fetchCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiCall('/');
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiCall('/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      dispatch({ type: 'ADD_ITEM', payload: response.data });
      return { success: true, message: response.message };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiCall(`/update/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
      dispatch({ type: 'UPDATE_ITEM', payload: response.data });
      return { success: true, message: response.message };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiCall(`/remove/${itemId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'REMOVE_ITEM', payload: response.data });
      return { success: true, message: response.message };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Clear cart
  const clearCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiCall('/clear', {
        method: 'DELETE',
      });
      dispatch({ type: 'CLEAR_CART', payload: response.data });
      return { success: true, message: response.message };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Get cart summary
  const getCartSummary = async () => {
    try {
      const response = await apiCall('/summary');
      return response.data;
    } catch (error) {
      console.error('Get cart summary error:', error);
      return { itemCount: 0, total: 0 };
    }
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 