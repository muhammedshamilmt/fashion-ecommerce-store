'use client';

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Package, ChevronRight, DollarSign } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, subtotal } = useCart();
  const paymentMethod = searchParams?.get('payment') || 'credit-card';
  
  if (items.length === 0) {
    router.push('/');
    return null;
  }

  // Calculate order details
  const shipping = 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  // Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  });

  const isCashOnDelivery = paymentMethod === 'cash-on-delivery';
  
  // Get payment method display name
  const getPaymentMethodDisplay = () => {
    switch(paymentMethod) {
      case 'phonepe': return 'PhonePe';
      case 'gpay': return 'Google Pay';
      case 'paytm': return 'Paytm';
      case 'amazonpay': return 'Amazon Pay';
      case 'paypal': return 'PayPal';
      case 'credit-card': return 'Credit Card (•••• 4242)';
      case 'cash-on-delivery': return 'Cash on Delivery';
      default: return 'Credit Card (•••• 4242)';
    }
  };
  
  // Check if it's a UPI payment
  const isUPIPayment = ['phonepe', 'gpay', 'paytm', 'amazonpay'].includes(paymentMethod);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-fashion-primary mb-2">Order Placed Successfully!</h1>
              <p className="text-fashion-primary/70 text-lg">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              
              {isCashOnDelivery && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg inline-block">
                  <div className="flex items-center">
                    <DollarSign className="text-blue-600 mr-2" size={20} />
                    <p className="text-blue-700 font-medium">Cash on Delivery selected</p>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">
                    Please have ₹{total.toFixed(2)} ready at the time of delivery.
                  </p>
                </div>
              )}
              
              {isUPIPayment && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg inline-block">
                  <div className="flex items-center">
                    <p className="text-blue-700 font-medium">
                      {getPaymentMethodDisplay()} payment successful
                    </p>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">
                    Transaction ID: UPI{Math.floor(100000000 + Math.random() * 900000000)}
                  </p>
                </div>
              )}
            </div>
            
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-fashion-primary">Order Details</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-fashion-primary/70">Order Number</p>
                  <p className="font-medium text-fashion-primary">#{orderNumber}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-fashion-primary/70">Order Date</p>
                  <p className="font-medium text-fashion-primary">{new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-fashion-primary/70">Estimated Delivery</p>
                  <p className="font-medium text-fashion-primary">{formattedDeliveryDate}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-fashion-primary/70">Payment Method</p>
                  <p className="font-medium text-fashion-primary">
                    {getPaymentMethodDisplay()}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between mb-2">
                    <p className="text-fashion-primary/70">Subtotal</p>
                    <p className="font-medium text-fashion-primary">₹{subtotal.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <p className="text-fashion-primary/70">Shipping</p>
                    <p className="font-medium text-fashion-primary">₹{shipping.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <p className="text-fashion-primary/70">Tax</p>
                    <p className="font-medium text-fashion-primary">₹{tax.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <p className="font-semibold text-fashion-primary">Total</p>
                    <p className="font-bold text-fashion-primary">₹{total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-fashion-primary">Shipping Information</h2>
              </div>
              
              <div className="p-6">
                <p className="font-medium text-fashion-primary">John Doe</p>
                <p className="text-fashion-primary/70">123 Fashion Street</p>
                <p className="text-fashion-primary/70">New York, NY 10001</p>
                <p className="text-fashion-primary/70">United States</p>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-fashion-primary">Order Summary</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="p-6 flex">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-fashion-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-fashion-primary">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-fashion-primary/60 mt-1">
                        Size: {item.size} • Color: {item.color}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-fashion-primary/60">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-medium text-fashion-primary">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-fashion-primary">What's Next?</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-fashion-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-fashion-secondary font-medium">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-fashion-primary">Order Processing</h3>
                    <p className="text-fashion-primary/70 text-sm">
                      Your order is being processed. You will receive an email confirmation shortly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-fashion-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-fashion-secondary font-medium">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-fashion-primary">Order Shipment</h3>
                    <p className="text-fashion-primary/70 text-sm">
                      We'll notify you when your order ships, and provide tracking information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-fashion-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-fashion-secondary font-medium">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-fashion-primary">Order Delivery</h3>
                    <p className="text-fashion-primary/70 text-sm">
                      Your order should arrive by {formattedDeliveryDate}. Enjoy your new items!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-fashion-secondary hover:bg-fashion-secondary/90 flex items-center justify-center gap-2">
                <Link href="/profile">
                  <Package size={18} />
                  Track Your Order
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-fashion-secondary text-fashion-secondary hover:bg-fashion-secondary/5 flex items-center justify-center gap-2">
                <Link href="/">
                  Continue Shopping
                  <ChevronRight size={18} />
                </Link>
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
