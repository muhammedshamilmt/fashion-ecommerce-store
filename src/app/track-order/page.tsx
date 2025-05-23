'use client'

import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TrackingInfo {
  orderId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery: string;
  currentLocation: string;
  history: {
    status: string;
    location: string;
    timestamp: string;
  }[];
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast.error("Please enter your order number");
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
        setTrackingInfo(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch order information");
      }
    } catch (error) {
      console.error("Error fetching order info:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch order information");
      setTrackingInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600';
      case 'shipped':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'processing':
        return <Package className="w-6 h-6 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Track Your Order
              </h1>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Enter your order number to get real-time updates on your order status and delivery progress.
              </p>
            </div>
          </div>
        </section>

        {/* Tracking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number"
                    className="pl-10 w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Track Order"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Tracking Results */}
        {trackingInfo && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">Order Status</h2>
                      <p className="text-gray-600">Order Number: {trackingInfo.orderNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(trackingInfo.status)}
                      <span className={`font-medium ${getStatusColor(trackingInfo.status)}`}>
                        {trackingInfo.status.charAt(0).toUpperCase() + trackingInfo.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h3>
                      <p className="text-gray-900">{trackingInfo.estimatedDelivery}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Current Location</h3>
                      <p className="text-gray-900">{trackingInfo.currentLocation}</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
                    <div className="space-y-4">
                      {trackingInfo.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                          <div>
                            <p className="font-medium text-gray-900">{item.status}</p>
                            <p className="text-sm text-gray-600">{item.location}</p>
                            <p className="text-sm text-gray-500">{item.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder; 