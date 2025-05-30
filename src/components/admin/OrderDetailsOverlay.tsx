'use client'

import React from "react";
import { X, MapPin, Phone, Mail, Package, CreditCard, Calendar, Printer, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
      productId: string;
      name: string;
      price: number;
      quantity: number;
      size: string;
      color: string;
      image: string;
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
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const doc = new jsPDF();
    let yPos = 20; // Starting Y position

    // Shipping Information Section Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(74, 167, 159); // Use primary color for heading
    doc.text('Shipping Information', 14, yPos);
    doc.setFont('helvetica', 'normal'); // Reset font style
    doc.setTextColor(0); // Reset text color
    yPos += 8; // Space after heading

    // Shipping Information Details
    doc.setFontSize(12);

    // Customer Name
    doc.setFontSize(10);
    doc.setTextColor(100); // Grey color for labels
    doc.text('Customer Name', 14, yPos);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`${order.customerInfo.firstName} ${order.customerInfo.lastName}`, 14, yPos + 5);
    yPos += 15; // Space for name

    // Email
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Email', 14, yPos);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(order.customerInfo.email, 14, yPos + 5);
    yPos += 15; // Space for email

    // Phone
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Phone', 14, yPos);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(order.customerInfo.phone, 14, yPos + 5);
    yPos += 15; // Space for phone

    // Address
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Address', 14, yPos);
    doc.setFontSize(12);
    doc.setTextColor(0);
    const fullAddress = `${order.customerInfo.address}, ${order.customerInfo.city}, ${order.customerInfo.state} ${order.customerInfo.zipCode}, ${order.customerInfo.country}`;
    const splitAddress = doc.splitTextToSize(fullAddress, 180);
    doc.text(splitAddress, 14, yPos + 5);
    yPos += (splitAddress.length * 5) + 10;

    // Save the PDF
    doc.save(`order-${order.orderNumber || order._id}-shipping.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-fashion-primary">
            Order #{order.orderNumber || order._id}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center space-x-2"
            >
              <Printer size={16} />
              <span>Print</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export PDF</span>
            </Button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              <X size={24} />
            </button>
          </div>
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
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-fashion-primary">{item.name}</h5>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} • Size: {item.size} • Color: {item.color}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-fashion-primary">₹{item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
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