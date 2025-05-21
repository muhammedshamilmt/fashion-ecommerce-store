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
  storeName: string;
  contactEmail: string;
  phoneNumber: string;
  storeAddress: string;
  currency: string;
  adminProfile: AdminProfile;
}

const SettingsManagement = () => {
  const [settings, setSettings] = useState<Settings>({
    storeName: "FashionFit",
    contactEmail: "contact@fashionfit.com",
    phoneNumber: "+1 (555) 123-4567",
    storeAddress: "123 Fashion Avenue, Suite 500\nNew York, NY 10001\nUnited States",
    currency: "usd",
    adminProfile: {
      fullName: "Alex Johnson",
      email: "alex@fashionfit.com",
      role: "Store Administrator",
      phone: "+1 (555) 987-6543",
      photoURL: "https://i.pravatar.cc/150?img=3"
    }
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
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch settings");
      console.error("Error fetching settings:", error);
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
      setIsSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from Zod
        if (result.error && Array.isArray(result.error)) {
          const errorMessage = result.error.map((err: any) => err.message).join(', ');
          throw new Error(errorMessage);
        }
        // Handle other API errors
        throw new Error(typeof result.error === 'string' ? result.error : "Failed to save settings");
    }

      if (result.success) {
        toast.success("Settings saved successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings");
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
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
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    name="storeName" 
                value={settings.storeName} 
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
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    name="phoneNumber" 
                value={settings.phoneNumber} 
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
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea 
                  id="storeAddress" 
                  name="storeAddress" 
                  rows={4} 
              value={settings.storeAddress} 
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
                  src={settings.adminProfile.photoURL || "https://i.pravatar.cc/150?img=3"} 
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
                  <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName"
                value={settings.adminProfile.fullName}
                onChange={handleAdminChange}
              />
                </div>
                <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={settings.adminProfile.email}
                onChange={handleAdminChange}
              />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                    <Input 
                id="role" 
                name="role"
                value={settings.adminProfile.role}
                onChange={handleAdminChange}
                    />
                </div>
                <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
                    <Input 
                id="phone" 
                name="phone"
                value={settings.adminProfile.phone}
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
