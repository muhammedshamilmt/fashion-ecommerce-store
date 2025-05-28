"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/utils/data';
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number, size: string, color: string) => {
    setItems(currentItems => {
      // Check if item already exists with same size and color
      const existingItemIndex = currentItems.findIndex(
        item => 
          item.product._id === product._id && 
          item.size === size && 
          item.color === color
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        toast.success(`Updated quantity in cart`);
        return updatedItems;
      }

      // Add new item if it doesn't exist
      toast.success(`Added to cart`);
      return [...currentItems, { product, quantity, size, color }];
    });
  };

  const removeItem = (productId: string, size: string, color: string) => {
    setItems(currentItems => 
      currentItems.filter(
        item => 
          !(item.product._id === productId && 
            item.size === size && 
            item.color === color)
      )
    );
    toast.success(`Item removed from cart`);
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.product._id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  const subtotal = totalPrice; // Using totalPrice as subtotal

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
