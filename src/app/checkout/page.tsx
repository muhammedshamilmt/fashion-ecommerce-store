'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if this is a direct purchase
  const productId = searchParams?.get('productId');
  const quantity = searchParams?.get('quantity');
  const size = searchParams?.get('size');
  const color = searchParams?.get('color');
  
  useEffect(() => {
    // If no items in cart and no direct purchase params, redirect to cart
    if (items.length === 0 && !productId) {
      router.push('/cart');
    }
  }, [items.length, productId, router]);

  // Fetch product details for direct purchase
  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch product');
          }

          if (!result.success) {
            throw new Error(result.error || 'Failed to fetch product');
          }

          setProduct(result.data);
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error(error instanceof Error ? error.message : 'Failed to fetch product');
          router.push('/products');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId, router]);

  // Show loading state while checking cart or fetching product
  if ((items.length === 0 && !productId) || (productId && isLoading)) {
    return null;
  }

  // Calculate subtotal based on cart items or direct purchase
  const calculateSubtotal = () => {
    if (productId && product) {
      return product.price * (Number(quantity) || 1);
    }
    return subtotal;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <Link
            href={productId ? "/products" : "/cart"}
            className="inline-flex items-center text-[#2B3972] hover:text-[#2B3972]/80 mb-8"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to {productId ? "Products" : "Cart"}</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-[#2B3972] mb-2">Checkout</h1>
          <p className="text-[#2B3972]/70 mb-8">
            Complete your purchase by providing your shipping and payment information.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm 
                subtotal={calculateSubtotal()} 
                isDirectPurchase={!!productId}
                directPurchaseDetails={productId ? {
                  productId,
                  quantity: Number(quantity),
                  size: size || '',
                  color: color || ''
                } : undefined}
              />
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-[#2B3972]">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  {productId && product ? (
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-0 right-0 bg-[#2B3972] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {quantity}
                          </div>
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-[#2B3972] line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#2B3972]/60 mt-1">
                            Size: {size} • Color: {color}
                          </p>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-[#2B3972]/60">
                              Qty: {quantity}
                            </span>
                            <span className="text-sm font-medium text-[#2B3972]">
                              ₹{(product.price * (Number(quantity) || 1)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 divide-y divide-gray-100">
                      {items.map((item, index) => (
                        <div key={`${item.product._id}-${index}`} className={`flex ${index > 0 ? 'pt-4' : ''}`}>
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 right-0 bg-[#2B3972] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {item.quantity}
                            </div>
                          </div>
                          
                          <div className="ml-4 flex-1">
                            <h3 className="text-sm font-medium text-[#2B3972] line-clamp-1">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-[#2B3972]/60 mt-1">
                              Size: {item.size} • Color: {item.color}
                            </p>
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-[#2B3972]/60">
                                Qty: {item.quantity}
                              </span>
                              <span className="text-sm font-medium text-[#2B3972]">
                                ₹{(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2B3972]/70">Subtotal</span>
                      <span className="font-medium text-[#2B3972]">₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2B3972]/70">Shipping</span>
                      <span className="font-medium text-[#2B3972]">₹10.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2B3972]/70">Tax (7%)</span>
                      <span className="font-medium text-[#2B3972]">₹{(calculateSubtotal() * 0.07).toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="font-medium text-[#2B3972]">Total</span>
                        <span className="font-bold text-[#2B3972]">
                          ₹{(calculateSubtotal() + 10 + calculateSubtotal() * 0.07).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
