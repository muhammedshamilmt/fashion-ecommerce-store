"use client";

import React from "react";
import { Product } from "@/utils/data";
import ProductCard from "@/components/products/ProductCard";

interface FeaturedProductsGridProps {
  products: Product[];
}

const FeaturedProductsGrid = ({ products }: FeaturedProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index}
        />
      ))}
    </div>
  );
};

export default FeaturedProductsGrid; 