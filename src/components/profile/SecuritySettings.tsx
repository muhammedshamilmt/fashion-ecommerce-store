
import React, { useState } from "react";
import { Lock, Smartphone, Shield, Eye, EyeOff, Laptop, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Sample devices
const devices = [
  {
    id: 1,
    type: "MacBook Pro",
    browser: "Chrome",
    location: "New York, USA",
    status: "Current session",
    lastActive: "Now"
  },
  {
    id: 2,
    type: "iPhone 13",
    browser: "Safari",
    location: "New York, USA",
    status: "Last active",
    lastActive: "2 hours ago"
  }
];

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const handleUpdatePassword = () => {
    // In a real application, you would validate passwords and submit
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled");
  };
  
  const handleSignOutDevice = (deviceId: number) => {
    toast.success(`Signed out device ${deviceId}`);
  };
  
  const handleSignOutAllDevices = () => {
    toast.success("Signed out all devices");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
      
      {/* Change Password */}
      <div className="mb-10">
        <h3 className="text-xl font-medium text-gray-900 mb-6">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <Button 
              onClick={handleUpdatePassword} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
      
      {/* Two-Factor Authentication */}
      <div className="mb-10 pb-10 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-medium text-gray-900">Two-Factor Authentication</h3>
            <p className="text-gray-600 mt-1">Add an extra layer of security to your account.</p>
          </div>
          <Button 
            variant={twoFactorEnabled ? "default" : "outline"}
            onClick={handleToggleTwoFactor} 
            className={twoFactorEnabled ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}
          >
            {twoFactorEnabled ? "Enabled" : "Enable"}
          </Button>
        </div>
      </div>
      
      {/* Devices & Sessions */}
      <div>
        <h3 className="text-xl font-medium text-gray-900 mb-6">Devices & Sessions</h3>
        <div className="space-y-4">
          {devices.map(device => (
            <div key={device.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-md">
                  {device.type.includes("MacBook") ? (
                    <Laptop className="text-gray-700" size={20} />
                  ) : (
                    <Smartphone className="text-gray-700" size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900">{device.type} - {device.browser}</h4>
                    {device.status === "Current session" && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        {device.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {device.status !== "Current session" && `${device.status} • `}{device.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {device.lastActive}
                  </p>
                </div>
              </div>
              {device.status !== "Current session" && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSignOutDevice(device.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOutAllDevices}
          >
            <LogOut size={16} className="mr-2" />
            Sign Out All Devices
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
