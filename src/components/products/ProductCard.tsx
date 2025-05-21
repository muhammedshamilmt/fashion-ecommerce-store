"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/utils/data";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Using first size and color as default
    addItem(product, 1, product.sizes[0], product.colors[0]);
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    if (!isLiked) {
      toast.success("Added to wishlist");
    } else {
      toast.success("Removed from wishlist");
    }
  };

  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in-up"
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick actions */}
        <div 
          className={`absolute top-0 right-0 p-3 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleLikeToggle}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-fashion-primary hover:text-white transition-colors duration-300"
            aria-label="Add to wishlist"
          >
            <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-fashion-primary hover:text-white transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        
        {/* "View" button that appears on hover */}
        <div 
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <Eye size={16} />
            <span className="text-sm font-medium">Quick View</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-sm text-fashion-primary/60 mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <h3 className="font-medium text-fashion-primary text-lg mb-2 transition-colors duration-300 group-hover:text-fashion-primary/80">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="font-bold text-fashion-primary">${product.price.toFixed(2)}</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-500">
                +{product.colors.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
