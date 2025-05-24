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
import { toast } from "sonner";

interface Settings {
  _id?: string;
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  storeAddress: string;
  currency: string;
  adminProfile: {
    fullName: string;
    email: string;
    role: string;
    phone: string;
  };
}

const defaultSettings: Settings = {
  storeName: "",
  contactEmail: "",
  contactPhone: "",
  storeAddress: "",
  currency: "usd",
  adminProfile: {
    fullName: "",
    email: "",
    role: "",
    phone: ""
  }
};

const SettingsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      const result = await response.json();

      if (result.success && result.data) {
        // Merge fetched data with default settings to ensure all fields exist
        setSettings({
          ...defaultSettings,
          ...result.data,
          adminProfile: {
            ...defaultSettings.adminProfile,
            ...(result.data.adminProfile || {})
          }
        });
      } else {
        toast.error('Failed to fetch settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle for general settings
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle for admin profile changes
  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      adminProfile: {
        ...prev.adminProfile,
        [name]: value
      }
    }));
  };

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      currency: value
    }));
  };

  // Handle save all changes
  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);

      // Validate required fields
      if (!settings.storeName || !settings.contactEmail || !settings.contactPhone) {
        toast.error('Please fill in all required fields');
        return;
      }

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Settings saved successfully');
        // Merge the response data with default settings to ensure all fields exist
        setSettings({
          ...defaultSettings,
          ...result.data,
          adminProfile: {
            ...defaultSettings.adminProfile,
            ...(result.data.adminProfile || {})
          }
        });
      } else {
        throw new Error(result.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h2 className="text-2xl font-bold text-fashion-primary">Settings</h2>
        <p className="text-muted-foreground">Manage your store configuration</p>
      </div>
      
      {/* General Settings */}
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
                value={settings.storeName || ""} 
                onChange={handleGeneralChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input 
                id="contactEmail" 
                name="contactEmail" 
                type="email" 
                value={settings.contactEmail || ""} 
                onChange={handleGeneralChange} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input 
                id="contactPhone" 
                name="contactPhone" 
                value={settings.contactPhone || ""} 
                onChange={handleGeneralChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={settings.currency || "usd"} 
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹) </SelectItem>
                  
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
              value={settings.storeAddress || ""} 
              onChange={handleGeneralChange} 
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName"
                value={settings.adminProfile?.fullName || ""}
                onChange={handleAdminChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={settings.adminProfile?.email || ""}
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
                value={settings.adminProfile?.role || ""}
                onChange={handleAdminChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone"
                value={settings.adminProfile?.phone || ""}
                onChange={handleAdminChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Save Button */}
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={fetchSettings}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsManagement;
