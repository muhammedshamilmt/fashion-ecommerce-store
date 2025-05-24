"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User as BaseUser, users } from "../utils/data";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

// Extend the User type to include photoURL and role
interface User extends BaseUser {
  photoURL?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      const adminSession = document.cookie.includes('adminSession=true');
      if (adminSession) {
        setUser({
          id: '1',
          name: 'Admin User',
          email: 'nawafmanammal@gmail.com',
          role: 'admin',
          isAdmin: true
        });
        setIsAuthenticated(true);
        setIsAdmin(true);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Check admin credentials
      if (email === "nawafmanammal@gmail.com" && password === "200200200") {
        // Set cookie with expiration (7 days)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        document.cookie = `adminSession=true; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;
      
        // Set user state
        setUser({
          id: '1',
          name: 'Admin User',
          email: 'nawafmanammal@gmail.com',
          role: 'admin',
          isAdmin: true
        });
        setIsAuthenticated(true);
        setIsAdmin(true);
        
        // Store in localStorage as backup
        localStorage.setItem('adminSession', 'true');
        
        router.push('/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulating API call with timeout
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const userExists = users.some(u => u.email === email);
      
      if (userExists) {
        toast.error("Email already in use");
        return false;
      }
      
      // In a real app, this would save to a database
      const newUser: User = {
        id: `user${users.length + 1}`,
        name,
        email,
        role: 'user',
        isAdmin: false
      };
      
      // Add to our local "database"
      users.push(newUser);
      
      setUser(newUser);
      localStorage.setItem("fashionfit_user", JSON.stringify(newUser));
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      toast.error("Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear cookie
      document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
      
      // Clear localStorage
      localStorage.removeItem('adminSession');
      
      // Clear state
    setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
