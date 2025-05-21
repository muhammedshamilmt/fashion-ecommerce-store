'use client'

import React from "react";
import { X, MapPin, Phone, Mail, Package, CreditCard, Calendar } from "lucide-react";
import Image from "next/image";

interface OrderDetailsOverlayProps {
  order: {
    _id: string;
    orderNumber?: number;
    customerInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    items: Array<{
      product: {
        id: string;
        name: string;
        price: number;
        images: string[];
      };
      quantity: number;
      size: string;
      color: string;
    }>;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    paymentMethod: string;
    status: "pending" | "processing" | "shipped" | "delivered";
    createdAt: string;
  };
  onClose: () => void;
}

const OrderDetailsOverlay: React.FC<OrderDetailsOverlayProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-fashion-primary">
            Order #{order.orderNumber || order._id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Shipping Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-fashion-primary mb-4">
              Shipping Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Customer Name</p>
                <p className="font-medium">
                  {order.customerInfo.firstName} {order.customerInfo.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium flex items-center">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  {order.customerInfo.email}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium flex items-center">
                  <Phone size={16} className="mr-2 text-gray-500" />
                  {order.customerInfo.phone}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}, {order.customerInfo.country}
                </p>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-fashion-primary mb-4">
              Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium flex items-center">
                  <CreditCard size={16} className="mr-2 text-gray-500" />
                  {order.paymentMethod}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium flex items-center">
                  <Package size={16} className="mr-2 text-gray-500" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-600 mb-3">Order Items</h4>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white p-3 rounded-lg">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-fashion-primary">{item.product.name}</h5>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} • Size: {item.size} • Color: {item.color}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-fashion-primary">₹{item.product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total: ₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-fashion-primary">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsOverlay; 