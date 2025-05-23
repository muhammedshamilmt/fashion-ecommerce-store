'use client'

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Mail, 
  MoreVertical, 
  User as UserIcon,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Customer {
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
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Fetch customers from orders
  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/orders');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch orders");
      }

      if (result.success) {
        // Process orders to get unique customers
        const customerMap = new Map();
        
        result.data.forEach((order: any) => {
          const customerKey = order.customerInfo.email;
          
          if (!customerMap.has(customerKey)) {
            customerMap.set(customerKey, {
              _id: order._id,
              customerInfo: order.customerInfo,
              totalOrders: 1,
              totalSpent: order.total,
              lastOrderDate: order.createdAt
            });
          } else {
            const customer = customerMap.get(customerKey);
            customer.totalOrders += 1;
            customer.totalSpent += order.total;
            if (new Date(order.createdAt) > new Date(customer.lastOrderDate)) {
              customer.lastOrderDate = order.createdAt;
            }
          }
        });

        setCustomers(Array.from(customerMap.values()));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch customers");
      console.error("Error fetching customers:", error);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch customers on mount and when search changes
  useEffect(() => {
    fetchCustomers();
  }, []);

  const emailCustomer = (email: string) => {
    // In a real app, this would open an email dialog
    toast.info(`Sending email to ${email}`);
  };

  // Filter customers
  const filteredCustomers = customers
    .filter(customer => 
      customer.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header and search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-fashion-primary">Customers</h2>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
      
      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-fashion-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : currentCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <Search size={36} className="mb-2 opacity-20" />
                    <p className="text-gray-500">No customers found matching your search criteria.</p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-2 text-blue-600 hover:underline"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentCustomers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-500">
                          <UserIcon size={20} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{customer.customerInfo.firstName} {customer.customerInfo.lastName}</div>
                        <div className="text-sm text-gray-500">
                          {customer.customerInfo.city}, {customer.customerInfo.country}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{customer.customerInfo.email}</div>
                    <div className="text-sm text-gray-500">{customer.customerInfo.phone}</div>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>₹{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{new Date(customer.lastOrderDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => emailCustomer(customer.customerInfo.email)}>
                          <Mail className="mr-2" size={14} />
                          Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-fashion-primary/60">
          Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastCustomer, filteredCustomers.length)}
          </span> of{" "}
          <span className="font-medium">{filteredCustomers.length}</span> customers
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
                  ? 'bg-fashion-primary text-white'
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
  );
};

export default CustomerManagement;
