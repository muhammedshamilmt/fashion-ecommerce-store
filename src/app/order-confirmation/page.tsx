'use client';

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Package, ChevronRight, DollarSign } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items } = useCart();
  const orderNumber = searchParams?.get('orderNumber');

  useEffect(() => {
    // If no order number is provided, redirect to home
    if (!orderNumber) {
      router.push('/');
    }
  }, [orderNumber, router]);

  // Show loading state while checking order number
  if (!orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-[#2B3972] mb-4">Order Confirmed!</h1>
            <p className="text-[#2B3972]/70 mb-8">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#2B3972]/70">Order Number:</span>
                <span className="font-medium text-[#2B3972]">{orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2B3972]/70">Status:</span>
                <span className="font-medium text-green-600">Processing</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={() => router.push('/track-order')}
                className="w-full bg-[#2B3972] hover:bg-[#2B3972]/90"
              >
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </Button>
              
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full"
              >
                  Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
