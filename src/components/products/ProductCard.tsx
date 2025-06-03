"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/utils/data";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <Link
        href={`/products/${product._id}`}
        className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          {/* Quick actions */}
          <motion.div 
            className="absolute top-0 right-0 p-3 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleLikeToggle}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-fashion-primary hover:text-white transition-colors duration-300"
              aria-label="Add to wishlist"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />
            </motion.button>
            
            <motion.button
              onClick={handleAddToCart}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-fashion-primary hover:text-white transition-colors duration-300"
              aria-label="Add to cart"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={18} />
            </motion.button>
          </motion.div>
          
          {/* "View" button that appears on hover */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={16} />
              <span className="text-sm font-medium">Quick View</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Product Info */}
        <motion.div 
          className="p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm text-fashion-primary/60 mb-1">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </div>
          <h3 className="font-medium text-fashion-primary text-lg mb-2 transition-colors duration-300 group-hover:text-fashion-primary/80">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="font-bold text-fashion-primary">₹{product.price.toFixed(2)}</span>
            <motion.div 
              className="flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {product.colors.slice(0, 3).map((color, i) => (
                <motion.div
                  key={`${color}-${i}`}
                  className="w-3 h-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
              {product.colors.length > 3 && (
                <motion.div 
                  className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-500"
                  whileHover={{ scale: 1.2 }}
                >
                  +{product.colors.length - 3}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
