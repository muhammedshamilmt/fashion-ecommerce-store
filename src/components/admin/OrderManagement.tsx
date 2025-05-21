'use client'

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Package, 
  CheckCircle2, 
  TruckIcon, 
  Clock,
  MoreHorizontal,
  Eye,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import OrderDetailsOverlay from "./OrderDetailsOverlay";

interface Order {
  _id: string;
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
  updatedAt: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/orders');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch orders");
      }

      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch orders");
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter orders
  const filteredOrders = orders
    .filter(order => 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || order.status === statusFilter)
    )
    .sort((a, b) => {
      return dateSort === "desc" 
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  
  const handleUpdateStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update order status");
      }

      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, status: newStatus } 
          : order
      ));
      
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update order status");
      console.error("Error updating order status:", error);
    }
  };
  
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-gray-600" />;
      case "processing":
        return <Package size={16} className="text-yellow-600" />;
      case "shipped":
        return <TruckIcon size={16} className="text-blue-600" />;
      case "delivered":
        return <CheckCircle2 size={16} className="text-green-600" />;
      default:
        return null;
    }
  };
  
  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-fashion-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header and filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-fashion-primary">Order Management</h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search order ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-primary/20 w-full"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-primary/20 appearance-none bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <button
            onClick={() => setDateSort(dateSort === "desc" ? "asc" : "desc")}
            className="flex items-center justify-center space-x-1 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
          >
            <span>Date</span>
            <ChevronDown className={`transition-transform ${dateSort === "asc" ? "transform rotate-180" : ""}`} size={16} />
          </button>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fashion-primary">
                  # Order{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fashion-primary">
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fashion-primary/70">
                    {new Date(order.createdAt).toLocaleDateString()} 
                    <span className="text-fashion-primary/50 ml-1">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fashion-primary">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="inline-flex items-center">
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-1"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={18} />
                      </button>
                      <div className="relative ml-2 group">
                        <button className="text-gray-600 hover:text-gray-800 p-1">
                          <MoreHorizontal size={18} />
                        </button>
                        
                        {/* Dropdown menu */}
                        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-fashion-primary hover:bg-gray-100"
                            onClick={() => handleUpdateStatus(order._id, "pending")}
                          >
                            Mark as Pending
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-fashion-primary hover:bg-gray-100"
                            onClick={() => handleUpdateStatus(order._id, "processing")}
                          >
                            Mark as Processing
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-fashion-primary hover:bg-gray-100"
                            onClick={() => handleUpdateStatus(order._id, "shipped")}
                          >
                            Mark as Shipped
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-fashion-primary hover:bg-gray-100"
                            onClick={() => handleUpdateStatus(order._id, "delivered")}
                          >
                            Mark as Delivered
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-fashion-primary/60">
                    <div className="flex flex-col items-center">
                      <Search size={36} className="mb-2 opacity-20" />
                      <p>No orders found matching your search criteria.</p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-2 text-blue-600 hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-fashion-primary/60">
          Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
          <span className="font-medium">{orders.length}</span> orders
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-fashion-primary hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-fashion-primary text-white rounded-md text-sm">
            1
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-fashion-primary hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Order Details Overlay */}
      {selectedOrder && (
        <OrderDetailsOverlay
          order={{
            ...selectedOrder,
            orderNumber: filteredOrders.findIndex(order => order._id === selectedOrder._id) + 1
          }}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderManagement;
