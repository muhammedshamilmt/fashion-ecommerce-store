'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Package, 
  Heart, 
  RotateCcw, 
  Truck, 
  Gift, 
  Shield, 
  Settings,
  LogOut,
  Upload,
  Trash2,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileContent from "@/components/profile/ProfileContent";
import OrderHistory from "@/components/profile/OrderHistory";
import Wishlist from "@/components/profile/Wishlist";
import Returns from "@/components/profile/Returns";
import ShippingInfo from "@/components/profile/ShippingInfo";
import GiftCards from "@/components/profile/GiftCards";
import SecuritySettings from "@/components/profile/SecuritySettings";
import UserPreferences from "@/components/profile/UserPreferences";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    toast.success("Successfully logged out");
  };

  // Helper function to determine active state
  const isActive = (tab: string) => activeTab === tab;

  // Navigation items for the sidebar
  const navItems = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "returns", label: "Returns", icon: RotateCcw },
    { id: "shipping", label: "Shipping Info", icon: Truck },
    { id: "giftcards", label: "Gift Cards", icon: Gift },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600 mb-8">Manage your account settings and preferences</p>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar with fixed position on desktop */}
              <aside className={`md:w-1/4 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-8rem)] bg-white p-6 rounded-lg shadow-sm mb-6 transform transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
              } fixed inset-y-0 left-0 z-50 w-3/4 md:static md:z-auto md:w-1/4`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {user?.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user?.name || "User"} />
                      ) : (
                        <AvatarFallback className="bg-indigo-600 text-white text-xl">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h2 className="text-lg font-medium text-gray-900">{user?.name || "Guest User"}</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="md:hidden" 
                    onClick={toggleSidebar}
                    aria-label="Close sidebar"
                  >
                    <X size={18} />
                  </Button>
                </div>

                <ScrollArea className="h-[calc(100vh-24rem)]">
                  <div className="space-y-1 pr-3">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${
                          isActive(item.id)
                            ? "bg-indigo-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </aside>

              {/* Mobile toggle button */}
              {!isSidebarOpen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSidebar}
                  className="fixed bottom-4 left-4 z-50 md:hidden"
                >
                  <UserIcon className="mr-2" size={16} />
                  Menu
                </Button>
              )}

              {/* Overlay for mobile */}
              {isSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                ></div>
              )}

              {/* Main content area - Scrollable */}
              <div className="md:w-3/4 w-full">
                <div className="bg-white rounded-lg shadow-sm p-6 min-h-[50vh]">
                  {/* Profile Tab */}
                  {activeTab === "profile" && <ProfileContent user={user} />}

                  {/* Orders Tab */}
                  {activeTab === "orders" && <OrderHistory />}

                  {/* Wishlist Tab */}
                  {activeTab === "wishlist" && <Wishlist />}

                  {/* Returns Tab */}
                  {activeTab === "returns" && <Returns />}

                  {/* Shipping Tab */}
                  {activeTab === "shipping" && <ShippingInfo />}

                  {/* Gift Cards Tab */}
                  {activeTab === "giftcards" && <GiftCards />}

                  {/* Security Tab */}
                  {activeTab === "security" && <SecuritySettings />}

                  {/* Preferences Tab */}
                  {activeTab === "preferences" && <UserPreferences />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
