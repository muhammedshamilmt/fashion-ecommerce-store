'use client'

import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminProfile {
  fullName: string;
  email: string;
  role: string;
  phone: string;
  photoURL?: string;
}

interface Settings {
  _id: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  adminProfile?: {
    photoURL?: string;
    name?: string;
    email?: string;
    role?: string;
    phone?: string;
  };
  currency: string;
}

const SettingsManagement = () => {
  const [settings, setSettings] = useState<Settings>({
    _id: "",
    siteName: "FashionFit",
    siteDescription: "",
    contactEmail: "contact@fashionfit.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Fashion Avenue, Suite 500\nNew York, NY 10001\nUnited States",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: ""
    },
    currency: "usd"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch settings");
      }

      if (result.success) {
        setSettings(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch settings");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle store settings changes
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle admin profile changes
  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      adminProfile: {
        ...settings.adminProfile,
      [e.target.name]: e.target.value
      }
    });
  };
  
  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    setSettings({
      ...settings,
      currency: value
    });
  };

  // Save settings
  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          // Handle validation errors
          const errorMessage = Array.isArray(result.details) 
            ? result.details.map((err: any) => err.message).join(', ')
            : result.error;
          throw new Error(errorMessage);
        }
        throw new Error(result.error || "Failed to save settings");
      }

      if (result.success) {
        toast.success("Settings saved successfully");
        // Update local state with the validated data
        setSettings(result.data);
      } else {
        throw new Error(result.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save settings");
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
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h2 className="text-2xl font-bold text-fashion-primary">Settings</h2>
        <p className="text-muted-foreground">Manage your store configuration</p>
      </div>
      
      {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Store Name</Label>
                  <Input 
                    id="siteName" 
                    name="siteName" 
                value={settings.siteName} 
                onChange={handleStoreChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    type="email" 
                value={settings.contactEmail} 
                onChange={handleStoreChange} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input 
                    id="contactPhone" 
                    name="contactPhone" 
                value={settings.contactPhone} 
                onChange={handleStoreChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      {/* <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Store Address</Label>
                <Textarea 
                  id="address" 
                  name="address" 
                  rows={4} 
              value={settings.address} 
              onChange={handleStoreChange} 
                />
              </div>
            </CardContent>
          </Card>
          
      {/* Administrator Profile */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Administrator Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                  src={settings?.adminProfile?.photoURL || "https://i.pravatar.cc/150?img=3"} 
                      alt="Profile avatar" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Profile Image</p>
                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Upload className="h-3 w-3 mr-1" />
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminProfile.name">Full Name</Label>
              <Input 
                id="adminProfile.name" 
                name="adminProfile.name"
                value={settings?.adminProfile?.name}
                onChange={handleAdminChange}
              />
                </div>
                <div className="space-y-2">
              <Label htmlFor="adminProfile.email">Email</Label>
              <Input 
                id="adminProfile.email" 
                name="adminProfile.email"
                type="email"
                value={settings?.adminProfile?.email}
                onChange={handleAdminChange}
              />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminProfile.role">Role</Label>
                    <Input 
                id="adminProfile.role" 
                name="adminProfile.role"
                value={settings?.adminProfile?.role}
                onChange={handleAdminChange}
                    />
                </div>
                <div className="space-y-2">
              <Label htmlFor="adminProfile.phone">Phone</Label>
                    <Input 
                id="adminProfile.phone" 
                name="adminProfile.phone"
                value={settings?.adminProfile?.phone}
                onChange={handleAdminChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

      {/* Save Button */}
              <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={fetchSettings}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveSettings}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
                      </Button>
                    </div>
    </div>
  );
};

export default SettingsManagement;
