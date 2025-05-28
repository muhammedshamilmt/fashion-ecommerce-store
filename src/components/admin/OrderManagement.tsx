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
  Loader2,
  Printer,
  Download,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import OrderDetailsOverlay from "./OrderDetailsOverlay";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from "@/components/ui/button";

interface Order {
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
  updatedAt: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  
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
        // Transform the data to match the Order interface
        const transformedOrders = result.data.map((order: any) => ({
          ...order,
          items: order.items.map((item: any) => {
            // Handle different product data structures
            const product = item.product || {};
            return {
              productId: product.id || product._id || item.productId || '',
              name: product.name || item.name || '',
              price: product.price || item.price || 0,
              quantity: item.quantity || 0,
              size: item.size || '',
              color: item.color || '',
              image: (product.images && product.images[0]) || item.image || ''
            };
          })
        }));
        setOrders(transformedOrders);
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
      `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || order.status === statusFilter)
    )
    .sort((a, b) => {
      return dateSort === "desc" 
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
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

  const handlePrintAll = () => {
    window.print();
  };

  const handleExportAll = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Orders Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Create table
    autoTable(doc, {
      startY: 40,
      head: [['Order ID', 'Customer', 'Date', 'Total', 'Status']],
      body: filteredOrders.map(order => [
        order._id,
        `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        new Date(order.createdAt).toLocaleDateString(),
        `₹${order.total.toFixed(2)}`,
        order.status.charAt(0).toUpperCase() + order.status.slice(1)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [74, 167, 159] },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 }
      }
    });
    
    // Add summary
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Summary', 14, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      body: [
        ['Total Orders', filteredOrders.length.toString()],
        ['Total Revenue', `₹${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`],
        ['Pending Orders', filteredOrders.filter(o => o.status === 'pending').length.toString()],
        ['Processing Orders', filteredOrders.filter(o => o.status === 'processing').length.toString()],
        ['Shipped Orders', filteredOrders.filter(o => o.status === 'shipped').length.toString()],
        ['Delivered Orders', filteredOrders.filter(o => o.status === 'delivered').length.toString()]
      ],
      theme: 'plain',
      styles: { fontSize: 12 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 70, halign: 'right' }
      }
    });
    
    // Save the PDF
    doc.save('orders-report.pdf');
  };

  const handleExportShippingAddresses = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Shipping Addresses Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Create table with shipping addresses
    autoTable(doc, {
      startY: 40,
      head: [['Order ID', 'Customer Name', 'Address', 'City', 'State', 'ZIP', 'Country', 'Phone', 'Email']],
      body: filteredOrders.map(order => [
        order._id,
        `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        order.customerInfo.address,
        order.customerInfo.city,
        order.customerInfo.state,
        order.customerInfo.zipCode,
        order.customerInfo.country,
        order.customerInfo.phone,
        order.customerInfo.email
      ]),
      theme: 'grid',
      headStyles: { fillColor: [74, 167, 159] },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 15 },
        6: { cellWidth: 20 },
        7: { cellWidth: 25 },
        8: { cellWidth: 35 }
      }
    });
    
    // Save the PDF
    doc.save(`shipping-addresses-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('Shipping addresses exported successfully');
  };

  const handleExportPDF = async () => {
    try {
      const doc = new jsPDF();
      let yPos = 20;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 14;
      const ordersPerPage = 3;

      // Add generation date
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPos);
      yPos += 20;

      // Process each order
      filteredOrders.forEach((order, index) => {
        // Check if we need a new page
        if (index > 0 && index % ordersPerPage === 0) {
          doc.addPage();
          yPos = 20;
        }

        // Order Information Section Header
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(74, 167, 159);
        doc.text(`Order #${order.orderNumber || index + 1}`, margin, yPos);
        doc.setFont('helvetica', 'normal');
        yPos += 8;

        // Customer Name
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Customer Name', margin, yPos);
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`${order.customerInfo.firstName} ${order.customerInfo.lastName}`, margin, yPos + 5);
        yPos += 15;

        // Email
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Email', margin, yPos);
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(order.customerInfo.email, margin, yPos + 5);
        yPos += 15;

        // Phone
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Phone', margin, yPos);
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(order.customerInfo.phone, margin, yPos + 5);
        yPos += 15;

        // Address
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Shipping Address', margin, yPos);
        doc.setFontSize(12);
        doc.setTextColor(0);
        const fullAddress = `${order.customerInfo.address}, ${order.customerInfo.city}, ${order.customerInfo.state} ${order.customerInfo.zipCode}, ${order.customerInfo.country}`;
        const splitAddress = doc.splitTextToSize(fullAddress, 180);
        doc.text(splitAddress, margin, yPos + 5);
        yPos += (splitAddress.length * 5) + 15;

        // Add a separator line
        doc.setDrawColor(200);
        doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos);
        yPos += 20;
      });

      // Save the PDF
      doc.save(`shipping-addresses-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('Shipping addresses exported successfully');
    } catch (error) {
      console.error('Error exporting shipping addresses:', error);
      toast.error('Failed to export shipping addresses');
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
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-fashion-primary">Order Management</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportShippingAddresses}
              className="flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>Export Shipping Addresses</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search customer name..."
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
        <div className="max-h-[800px] flex flex-col">
          {/* Fixed Header */}
          <div className="flex-none">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
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
            </table>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#4AA79F]" />
                      </div>
                    </td>
                  </tr>
                ) : currentOrders.length === 0 ? (
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
                ) : (
                  currentOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-fashion-primary/70">
                        {indexOfFirstOrder + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fashion-primary">
                        {order.orderNumber}
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
                            <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Fixed Pagination */}
          <div className="flex-none">
            {!isLoading && filteredOrders.length > 0 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <p className="text-sm text-fashion-primary/60">
                    Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastOrder, filteredOrders.length)}
                    </span> of{" "}
                    <span className="font-medium">{filteredOrders.length}</span> orders
                  </p>
                  <div className="flex space-x-1">
                    <button 
                      className={`px-3 py-1 border border-gray-300 rounded-md text-sm text-fashion-primary hover:bg-gray-50 ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`px-3 py-1 rounded-md text-sm ${
                          currentPage === page
                            ? 'bg-[#4AA79F] text-white'
                            : 'bg-white border border-gray-300 text-fashion-primary hover:bg-gray-50'
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button 
                      className={`px-3 py-1 border border-gray-300 rounded-md text-sm text-fashion-primary hover:bg-gray-50 ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Overlay */}
      {selectedOrder && (
        <OrderDetailsOverlay
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderManagement;
