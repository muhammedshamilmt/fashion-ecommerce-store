'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, Truck, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TrackingStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  location: string;
  timestamp: string;
}

interface OrderInfo {
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  currentLocation: string;
  estimatedDelivery: string;
  trackingHistory: TrackingStatus[];
}

const TrackOrder = () => {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast.error("Please enter an order number");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders/track/${orderNumber}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch order information");
      }

      if (result.success) {
        setOrderInfo(result.data);
      } else {
        throw new Error(result.error || "Order not found");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch order information");
      setOrderInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getActiveStatusIndex = (status: string) => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    return statuses.indexOf(status);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-[#2B3972] mb-2">Track Your Order</h1>
            <p className="text-[#2B3972]/70 mb-8">
              Enter your order number to track your package and view its current status.
            </p>

            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter your order number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-[#2B3972] hover:bg-[#2B3972]/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Track
                </Button>
              </div>
            </form>

            {orderInfo && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {/* Tracking Status Line */}
                <div className="p-6 border-b border-gray-100">
                  <div className="relative">
                    <div className="flex justify-between mb-4">
                      {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                        const isActive = getActiveStatusIndex(orderInfo.status) >= index;
                        const isCurrent = orderInfo.status === status;
                        const isLast = status === 'delivered';
                        return (
                          <div key={status} className="flex flex-col items-center relative">
                            {/* Connecting line */}
                            {!isLast && (
                              <div className="absolute top-5 left-[50%] w-[calc(100%+9rem)] h-0.5 bg-gray-200">
                                <div 
                                  className={`h-full transition-all duration-500 ${
                                    isActive ? 'bg-green-500' : 'bg-gray-200'
                                  }`}
                                  style={{
                                    width: isActive ? '100%' : '0%'
                                  }}
                                />
                              </div>
                            )}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                              isActive ? getStatusColor(status) : 'bg-gray-200'
                            } text-white relative z-10`}>
                              {getStatusIcon(status)}
                            </div>
                            <span className={`text-sm font-medium ${
                              isActive ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {getStatusText(status)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium text-[#2B3972]">{orderInfo.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Status:</span>
                      <span className={`font-medium ${getStatusColor(orderInfo.status)} text-white px-3 py-1 rounded-full text-sm`}>
                        {getStatusText(orderInfo.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Location:</span>
                      <span className="font-medium text-[#2B3972]">{orderInfo.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium text-[#2B3972]">
                        {new Date(orderInfo.estimatedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tracking History */}
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-[#2B3972] mb-4">Order History</h3>
                  <div className="space-y-4">
                    {orderInfo.trackingHistory && orderInfo.trackingHistory.length > 0 ? (
                      orderInfo.trackingHistory.map((history, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            getStatusColor(history.status)
                          } text-white`}>
                            {getStatusIcon(history.status)}
                          </div>
                          <div>
                            <p className="font-medium text-[#2B3972]">{getStatusText(history.status)}</p>
                            <p className="text-sm text-gray-600">{history.location}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(history.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No tracking history available yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder; 