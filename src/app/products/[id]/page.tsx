'use client'

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetailComponent from "@/components/products/ProductDetail";
import { Product } from "@/utils/data";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        
        // Fetch related products
        const relatedResponse = await fetch(`/api/products?category=${data.category}&limit=4`);
        const relatedResult = await relatedResponse.json();

        if (relatedResult.success) {
          // Filter out the current product
          const related = relatedResult.data.filter((p: Product) => p._id !== id);
          setRelatedProducts(related);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleRatingSubmit = (rating: number) => {
    setUserRating(rating);
    toast.success(`Thank you for rating this product ${rating} stars!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-[500px] bg-gray-200 rounded-xl"></div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16 animate-fade-in">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-fashion-primary mb-4">Error</h1>
            <p className="text-fashion-primary/70 mb-8">
              {error || 'Product not found'}
            </p>
            <Button 
              onClick={handleGoBack} 
              className="inline-flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={handleGoBack} 
            className="flex items-center text-fashion-primary/80 hover:text-fashion-primary mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Button>
          
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-fashion-primary/60 mb-8">
            <Link href="/" className="hover:text-fashion-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-fashion-primary transition-colors">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-fashion-primary transition-colors capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-fashion-primary">{product.name}</span>
          </div>
          
          {/* Product Detail */}
          <ProductDetailComponent productId={id as string} />
          
          {/* Rating Section */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-fashion-primary mb-4">Rate this Product</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center">
                <span className="text-fashion-primary/70 mr-4">Your Rating:</span>
                <Rating 
                  initialValue={userRating} 
                  onChange={handleRatingSubmit} 
                />
              </div>
              {userRating > 0 && (
                <p className="text-green-600">
                  Thank you for your feedback!
                </p>
              )}
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-fashion-primary mb-2">
                  You May Also Like
                </h2>
                <p className="text-fashion-primary/70">
                  Check out these similar items that complement your style.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
