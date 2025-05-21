import React, { useState } from "react";
import { Bell, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const UserPreferences = () => {
  // Notification preferences
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  // Language and currency preferences
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR (₹)");
  
  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
      
      {/* Notification Preferences */}
      <div className="mb-10">
        <h3 className="text-xl font-medium text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Bell className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium text-gray-900">Order Updates</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">Receive notifications about your order status</p>
            </div>
            <Switch 
              checked={orderUpdates}
              onCheckedChange={setOrderUpdates}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium text-gray-900">Promotional Emails</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">Receive emails about sales, new arrivals, and special offers</p>
            </div>
            <Switch 
              checked={promotionalEmails}
              onCheckedChange={setPromotionalEmails}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium text-gray-900">Newsletter</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">Receive our weekly newsletter with fashion tips and trends</p>
            </div>
            <Switch 
              checked={newsletter}
              onCheckedChange={setNewsletter}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Smartphone className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">Receive text messages about your orders and delivery</p>
            </div>
            <Switch 
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div>
      </div>
      
      {/* Language & Currency */}
      <div className="mb-10 pb-10 border-t border-gray-200 pt-10">
        <h3 className="text-xl font-medium text-gray-900 mb-6">Language & Currency</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="INR (₹)">INR (₹)</option>
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
              <option value="JPY (¥)">JPY (¥)</option>
              <option value="CAD (C$)">CAD (C$)</option>
              <option value="AUD (A$)">AUD (A$)</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            onClick={handleSavePreferences} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
