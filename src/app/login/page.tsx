'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const adminSession = document.cookie.includes('adminSession=true');
    if (adminSession) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check admin credentials
      if (email === "nawafmanammal@gmail.com" && password === "200200200") {
        // Set cookie with expiration (7 days)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        document.cookie = `adminSession=true; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;
        
        // Store in localStorage as backup
        localStorage.setItem("adminSession", "true");
        
        toast.success("Welcome back, Admin!");
        
        // Add 2 second delay before redirecting
        setTimeout(() => {
          router.replace("/admin");
        }, 2000);
      } else {
        toast.error("Invalid email or password");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2B3972] to-[#1a1f4b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Illustration */}
          <div className="hidden md:block md:w-1/2 relative bg-[#2B3972] p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2B3972]/90 to-[#1a1f4b]/90 z-10" />
            <div className="relative z-20 flex flex-col items-center justify-center h-full">
              <svg
                className="w-full h-auto max-w-md"
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shield Base */}
                <path
                  d="M400 100L500 150V250C500 350 450 400 400 450C350 400 300 350 300 250V150L400 100Z"
                  fill="white"
                  fillOpacity="0.1"
                  stroke="white"
                  strokeWidth="4"
                />
                {/* Shield Lock */}
                <rect
                  x="350"
                  y="250"
                  width="100"
                  height="80"
                  rx="10"
                  fill="white"
                  fillOpacity="0.2"
                  stroke="white"
                  strokeWidth="4"
                />
                {/* Lock Circle */}
                <circle
                  cx="400"
                  cy="230"
                  r="15"
                  fill="white"
                  fillOpacity="0.2"
                  stroke="white"
                  strokeWidth="4"
                />
                {/* Lock Keyhole */}
                <path
                  d="M400 245V260"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Decorative Elements */}
                <circle
                  cx="400"
                  cy="150"
                  r="10"
                  fill="white"
                  fillOpacity="0.5"
                />
                <circle
                  cx="350"
                  cy="200"
                  r="8"
                  fill="white"
                  fillOpacity="0.5"
                />
                <circle
                  cx="450"
                  cy="200"
                  r="8"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
              <h2 className="text-3xl font-bold text-white mt-8 mb-4">Welcome Back!</h2>
              <p className="text-center text-white/80">
                Access your admin dashboard to manage your store and products.
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                <p className="text-gray-600">
                  Enter your credentials to access the dashboard
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 block mb-2">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full"
                        placeholder="Enter your email"
                      />
                    </div>
            </div>
            
                  <div>
                    <Label htmlFor="password" className="text-gray-700 block mb-2">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 w-full"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
            </div>
            
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#2B3972] hover:bg-[#2B3972]/90 text-white py-6 text-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  For security reasons, please use the provided admin credentials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
