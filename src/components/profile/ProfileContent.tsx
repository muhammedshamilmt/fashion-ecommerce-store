
import React, { useState } from "react";
import { User } from "@/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileContentProps {
  user: User | null;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [fullName, setFullName] = useState(user?.name || "John Doe");
  const [email, setEmail] = useState(user?.email || "john.doe@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveChanges = () => {
    // In a real application, you would save these changes to a database
    toast.success("Profile updated successfully");
  };

  const handleUploadPhoto = () => {
    // In a real application, this would open a file picker
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Profile photo updated");
    }, 1500);
  };

  const handleRemovePhoto = () => {
    // In a real application, this would delete the profile photo
    toast.success("Profile photo removed");
  };

  return (
    <div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("security")}
          >
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user?.name || "User"} />
                ) : (
                  <AvatarFallback className="bg-indigo-600 text-white text-3xl">
                    {fullName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>

              <button
                onClick={handleUploadPhoto}
                className="mb-2 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
                disabled={isUploading}
              >
                <Upload size={16} />
                <span>{isUploading ? "Uploading..." : "Upload Photo"}</span>
              </button>

              <button
                onClick={handleRemovePhoto}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 size={16} />
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
