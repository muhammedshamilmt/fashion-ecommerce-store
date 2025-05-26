'use client';

import { useEffect, useState } from 'react';
import { Loader2, Heart, ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
  stock: number;
  sku: string;
  brand: string;
  sizes: string[];
  colors: string[];
  ratings: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
}

const ProductCard = ({ product, animationDelay }: { product: Product; animationDelay: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart functionality here
  };

  return (
    <Link
      href={`/products/${product._id}`}
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

        {/* Low stock warning */}
        {product.stock <= 5 && product.inStock && (
          <div className="absolute top-2 left-2 bg-[#3FB185] text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-sm text-fashion-primary/60 mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <h3 className="font-medium text-fashion-primary text-lg mb-2 transition-colors duration-300 group-hover:text-fashion-primary/80">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="font-bold text-fashion-primary">₹{product.price.toFixed(2)}</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={`${color}-${i}`}
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
        {product.ratings > 0 && (
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{product.ratings.toFixed(1)}</span>
            <span className="text-gray-400 ml-1">({product.reviews.length} reviews)</span>
          </div>
        )}
      </div>
    </Link>
  );
};

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const response = await fetch('/api/products/latest');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch latest products");
      }

      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Error fetching latest products:", error);
      setError(error instanceof Error ? error.message : "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4AA79F]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={fetchLatestProducts}
          className="mt-4 px-4 py-2 bg-[#4AA79F] text-white rounded-md hover:bg-[#3d8c85] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fashion-primary mb-4">New Arrivals</h2>
          <p className="text-gray-600">Discover our latest collection of fashion products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No new products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals; 