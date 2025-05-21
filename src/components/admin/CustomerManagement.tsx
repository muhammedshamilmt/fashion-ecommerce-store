'use client'

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Mail, 
  MoreVertical, 
  User as UserIcon,
  UserCog,
  UserMinus,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import CustomerForm from "./CustomerForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Customer {
  _id: string;
  name: string;
  email: string;
  photoURL?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.set('search', searchTerm);

      const response = await fetch(`/api/customers?${queryParams}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch customers");
      }

      if (result.success) {
        setCustomers(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch customers");
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
  }, [searchTerm]);

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      const response = await fetch(`/api/customers?id=${encodeURIComponent(customerId)}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete customer");
      }

      if (result.success) {
        setCustomers(customers.filter(customer => customer._id !== customerId));
        toast.success("Customer deleted successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete customer");
      console.error("Error deleting customer:", error);
    }
  };

  const handleToggleAdminStatus = async (customerId: string) => {
    try {
      const customer = customers.find(c => c._id === customerId);
      if (!customer) return;

      const response = await fetch('/api/customers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: customerId,
          isAdmin: !customer.isAdmin
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update customer");
      }

      if (result.success) {
        setCustomers(customers.map(c => 
          c._id === customerId ? { ...c, isAdmin: !c.isAdmin } : c
        ));
        toast.success(`${customer.name} is now ${customer.isAdmin ? 'a regular user' : 'an admin'}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update customer");
      console.error("Error updating customer:", error);
    }
  };

  const handleAddCustomer = async (data: any) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create customer");
      }

      if (result.success) {
        setCustomers([...customers, result.data]);
        setIsCustomerFormOpen(false);
        toast.success("Customer added successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create customer");
      console.error("Error creating customer:", error);
    }
  };

  const emailCustomer = (email: string) => {
    // In a real app, this would open an email dialog
    toast.info(`Sending email to ${email}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-fashion-primary">Customers</h2>
        <Button
          onClick={() => setIsCustomerFormOpen(true)}
          className="bg-[#4AA79F] hover:bg-[#4AA79F]/90 flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New Customer</span>
        </Button>
      </div>
      
      {/* Search */}
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
      
      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-fashion-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
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
              customers.map((customer) => (
                <TableRow key={customer._id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        {customer.photoURL ? (
                        <img
                            src={customer.photoURL}
                            alt={customer.name}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-500">
                          <UserIcon size={20} />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer._id}</div>
                    </div>
                  </div>
                </TableCell>
                  <TableCell>{customer.email}</TableCell>
                <TableCell>
                    {customer.isAdmin ? (
                    <Badge className="bg-purple-100 hover:bg-purple-100 text-purple-800 border-purple-200">
                      Admin
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 border-blue-200">
                      Customer
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => emailCustomer(customer.email)}>
                        <Mail className="mr-2" size={14} />
                        Email
                      </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleAdminStatus(customer._id)}>
                        <UserCog className="mr-2" size={14} />
                          {customer.isAdmin ? "Remove Admin" : "Make Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                          onClick={() => handleDeleteCustomer(customer._id)}
                        className="text-red-600"
                      >
                        <UserMinus className="mr-2" size={14} />
                        Delete
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
      
      {/* Customer Form Modal */}
      <CustomerForm
        open={isCustomerFormOpen}
        onOpenChange={setIsCustomerFormOpen}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
};

export default CustomerManagement;
