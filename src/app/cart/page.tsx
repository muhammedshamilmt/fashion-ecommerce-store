'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-fashion-primary mb-2">Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-fashion-primary">
                        Your Items ({items.length})
                      </h2>
                      <button
                        onClick={clearCart}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div key={`${item.product._id}-${item.size}-${item.color}`} className="p-6">
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <Link
                    href="/products"
                    className="text-fashion-primary hover:text-fashion-primary/80 flex items-center space-x-1"
                  >
                    <span>Continue Shopping</span>
                  </Link>
                  
                  <div className="text-fashion-primary/70 text-sm">
                    All prices are calculated including taxes
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-24">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-fashion-primary">Order Summary</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-fashion-primary/70">
                      <span>Subtotal</span>
                      <span className="font-medium text-fashion-primary">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-fashion-primary/70">
                      <span>Shipping</span>
                      <span className="font-medium text-fashion-primary">Calculated at checkout</span>
                    </div>
                    
                    <div className="flex justify-between text-fashion-primary/70">
                      <span>Tax</span>
                      <span className="font-medium text-fashion-primary">Calculated at checkout</span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="font-semibold text-fashion-primary">Estimated Total</span>
                        <span className="font-semibold text-fashion-primary">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="btn-primary w-full flex items-center justify-center space-x-2 mt-6"
                      onClick={() => router.push('/checkout')}
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={18} />
                    </Button>
                    
                    <div className="flex flex-col space-y-4 pt-6">
                      <div className="flex items-center justify-center space-x-2 text-sm text-fashion-primary/70">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Secure Checkout</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-fashion-primary/70">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Multiple Payment Options</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-fashion-primary/70">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 4L8 12L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Free Returns Within 30 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm mt-6">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-6">
                <ShoppingBag size={36} className="text-fashion-primary/40" />
              </div>
              <h2 className="text-2xl font-semibold text-fashion-primary mb-2">Your cart is empty</h2>
              <p className="text-fashion-primary/70 mb-8 text-center max-w-md">
                Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love!
              </p>
              <Link href="/products" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
