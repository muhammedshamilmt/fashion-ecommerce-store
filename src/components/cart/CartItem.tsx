'use client';

import React, { useState } from "react";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
    size: string;
    color: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity, size, color } = item;
  const { updateQuantity, removeItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product._id, size, color, newQuantity);
  };

  const handleRemove = () => {
    removeItem(product._id, size, color);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 animate-fade-in">
      {/* Product Image */}
      <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mb-4 sm:mb-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row sm:justify-between">
        <div className="space-y-1">
          <Link
            href={`/products/${product._id}`}
            className="font-medium text-fashion-primary hover:text-fashion-primary/80 transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex items-center text-sm text-fashion-primary/60">
            <span>Size: {size}</span>
            <span className="mx-2">•</span>
            <span>Color: {color}</span>
          </div>
          <div className="font-medium text-fashion-primary">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:flex-col sm:items-end mt-4 sm:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-fashion-primary hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-fashion-primary">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-fashion-primary hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Remove Item */}
          <button
            onClick={handleRemove}
            className="text-fashion-primary/60 hover:text-fashion-primary transition-colors"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
