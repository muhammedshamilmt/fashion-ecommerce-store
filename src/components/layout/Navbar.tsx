"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { SearchBar } from "@/components/ui/search-bar";
import CollectionsMenu from "./CollectionsMenu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 z-10 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-['Adelone-Serial-Extrabold-Regular'] text-fashion-primary tracking-tight">
              AL-HAYBA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/products" className="nav-link">Shop</Link>
            <CollectionsMenu />
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/track-order" className="nav-link">Track Order</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {isSearchOpen ? (
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search products..." 
                className="w-64"
              />
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="text-fashion-primary/80 hover:text-fashion-primary transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
            )}

            <Link
              href="/cart"
              className="relative text-fashion-primary/80 hover:text-fashion-primary transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-fashion-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button and Icons */}
          <div className="flex items-center space-x-4 z-50 md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-fashion-primary/80 hover:text-fashion-primary transition-colors"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              <Search size={20} />
            </button>
            <Link
              href="/cart"
              className="relative text-fashion-primary/80 hover:text-fashion-primary transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-fashion-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-fashion-primary focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search products..." 
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)} // Close overlay on click outside
      ></div>

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 w-64 md:w-72 bg-white h-full z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          transition-transform duration-300 ease-in-out pt-6 pb-6 overflow-y-auto`}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex justify-between items-center px-6 pb-4 border-b border-gray-200">
          <span className="text-lg font-bold text-fashion-primary">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-6 px-6 pt-4">
          <Link href="/" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80">Home</Link>
          <Link href="/products" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80">Shop</Link>
          <Link href="/track-order" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80">Track Order</Link>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-fashion-primary/60 uppercase tracking-wider">Collections</p>
            <Link href="/mens-thobas" className="block text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 pl-2">Mens Thobas</Link>
            <Link href="/kids-thobas" className="block text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 pl-2">Kids Thobas</Link>
            <Link href="/turban-caps" className="block text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 pl-2">Turban & Caps</Link>
            <Link href="/pajamas" className="block text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 pl-2">Pajamas</Link>
            <Link href="/emarathi" className="block text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 pl-2">Emarathi</Link>
          </div>

          <Link href="/about" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80">About</Link>
          <Link href="/contact" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80">Contact</Link>

          <div className="border-t border-gray-200 my-4"></div>

          {isAuthenticated ? (
            <>
              {/* <Link href="/profile" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 flex items-center space-x-2">
                <User size={20} /><span>My Profile</span>
              </Link>
              <Link href="/orders" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 flex items-center space-x-2">
                <span>My Orders</span>
              </Link> */}
              <button onClick={logout} className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 text-left">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-lg font-medium text-fashion-primary hover:text-fashion-primary/80 flex items-center space-x-2">
              <User size={20} /><span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;