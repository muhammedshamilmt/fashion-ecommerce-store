"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle, Search, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TrackingInfo {
  orderId: string;
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }>;
  paymentInfo: {
    method: string;
    status: string;
    total: number;
    subtotal: number;
    shipping: number;
    tax: number;
  };
  trackingHistory: Array<{
    status: string;
    timestamp: string;
    location: string;
    details: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function TrackOrder() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTrackingInfo(null);

    try {
      const response = await fetch(`/api/orders/track/${trackingNumber}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to track order");
      }

      setTrackingInfo(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to track order");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "processing":
        return <Package className="w-5 h-5" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getActiveStatusIndex = (status: string) => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    return statuses.indexOf(status.toLowerCase());
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
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-[#2B3972] hover:bg-[#2B3972]/90"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Track
                </Button>
              </div>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {trackingInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  {/* Tracking Status Line */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="relative">
                      <div className="flex justify-between mb-4">
                        {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                          const isActive = getActiveStatusIndex(trackingInfo.status) >= index;
                          const isCurrent = trackingInfo.status.toLowerCase() === status;
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="font-medium">{trackingInfo.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Delivery</p>
                        <p className="font-medium">{trackingInfo.estimatedDelivery}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Current Location</p>
                        <p className="font-medium">{trackingInfo.currentLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {new Date(trackingInfo.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 border-t border-gray-100">
                    <h2 className="text-lg font-semibold text-[#2B3972] mb-4">Order Items</h2>
                    <div className="space-y-4">
                      {trackingInfo.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x ${item.price} - {item.size} - {item.color}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="p-6 border-t border-gray-100">
                    <h2 className="text-lg font-semibold text-[#2B3972] mb-4">Payment Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">{trackingInfo.paymentInfo.method}</p>
                      </div>
                      {/* <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className={`font-medium ${
                          trackingInfo.paymentInfo.status.toLowerCase() === 'success' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {trackingInfo.paymentInfo.status.toLowerCase() === 'success' 
                            ? 'Success' 
                            : trackingInfo.paymentInfo.status}
                        </p>
                      </div> */}
                      <div>
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="font-medium">${trackingInfo.paymentInfo.subtotal}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Shipping</p>
                        <p className="font-medium">${trackingInfo.paymentInfo.shipping}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tax</p>
                        <p className="font-medium">${trackingInfo.paymentInfo.tax}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium">${trackingInfo.paymentInfo.total}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tracking History */}
                  <div className="p-6 border-t border-gray-100">
                    <h2 className="text-lg font-semibold text-[#2B3972] mb-4">Tracking History</h2>
                    <div className="space-y-4">
                      {trackingInfo.trackingHistory.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                            {index !== trackingInfo.trackingHistory.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-200 mx-auto"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{event.status}</p>
                            <p className="text-sm text-gray-500">{event.location}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                            {event.details && (
                              <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="p-6 border-t border-gray-100">
                    <h2 className="text-lg font-semibold text-[#2B3972] mb-4">Customer Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{trackingInfo.customerInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{trackingInfo.customerInfo.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{trackingInfo.customerInfo.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {trackingInfo.customerInfo.address}
                          <br />
                          {trackingInfo.customerInfo.city}, {trackingInfo.customerInfo.state}{" "}
                          {trackingInfo.customerInfo.zipCode}
                          <br />
                          {trackingInfo.customerInfo.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 