import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          index={index} 
        />
      ))}
    </div>
  );
};

export default ProductGrid; 