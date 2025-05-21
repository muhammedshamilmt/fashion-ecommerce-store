// app/admin/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Home,
  FileDown,
  FileText,
  FileImage,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/components/admin/Dashboard";
import ProductManagement from "@/components/admin/ProductManagement";
import OrderManagement from "@/components/admin/OrderManagement";
import CustomerManagement from "@/components/admin/CustomerManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import MessageManagement from "@/components/admin/messagesmanagement";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AdminPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/login");
    }
  }, [isAuthenticated, isAdmin, router]);

  const isActive = (tab: string) => activeTab === tab;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "orders", label: "Orders", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "messages", label: "messages", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between p-4 lg:hidden">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-fashion-primary mr-4"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-xl font-bold text-fashion-primary">
            Admin Dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-fashion-primary/70 hover:text-fashion-primary"
            aria-label="Go to store"
          >
            <Home size={20} />
          </Link>
          <button
            onClick={logout}
            className="text-fashion-primary/70 hover:text-fashion-primary"
            aria-label="Log out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:z-0 flex flex-col h-screen`}
      >
        <div className="p-6 border-b border-gray-200 hidden lg:flex items-center">
          <h1 className="text-xl font-bold text-fashion-primary">FashionFit Admin</h1>
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${
                    isActive(item.id)
                      ? "bg-primary/10 text-primary"
                      : "text-fashion-primary hover:bg-gray-50"
                  }`}
                  aria-current={isActive(item.id) ? "page" : undefined}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-fashion-primary/10 flex items-center justify-center">
                  <Users className="text-fashion-primary" size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-fashion-primary">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-fashion-primary/60">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <button
                  className="text-fashion-primary/70 hover:text-fashion-primary"
                  aria-label="User options"
                >
                  <ChevronDown size={18} />
                </button>
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-fashion-primary hover:bg-gray-100"
                  >
                    View Store
                  </Link>
                  <Separator className="my-1" />
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-fashion-primary hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 overflow-y-auto flex flex-col w-full">
        {/* Desktop Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4 hidden lg:flex items-center justify-between">
          <h1 className="text-xl font-bold text-fashion-primary">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "products" && "Products Management"}
            {activeTab === "orders" && "Orders Management"}
            {activeTab === "Messages" && "Messages Management"}
            {activeTab === "customers" && "Customer Management"}
            {activeTab === "settings" && "Settings"}
          </h1>

          <div className="flex items-center space-x-4">
            {(activeTab === "products" ||
              activeTab === "orders" ||
              activeTab === "customers") && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileDown size={16} className="mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileText size={16} className="mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileImage size={16} className="mr-2" />
                  Export JPG
                </Button>
              </div>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <Home size={16} className="mr-2" />
                View Store
              </Link>
            </Button>
            <Button
              onClick={logout}
              variant="ghost"
              size="icon"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 pt-20 lg:pt-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "orders" && <OrderManagement />}
          {activeTab === "messages" && <MessageManagement />}
          {activeTab === "customers" && <CustomerManagement />}
          {activeTab === "settings" && <SettingsManagement />}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-fashion-primary/60">
          &copy; {new Date().getFullYear()} FashionFit Admin Panel. All rights reserved.
        </footer>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminPage;
