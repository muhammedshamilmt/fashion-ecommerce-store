'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

interface ContactInfo {
  storeAddress: string;
  phoneNumber: string;
  contactEmail: string;
}

const Footer = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    storeAddress: '',
    phoneNumber: '',
    contactEmail: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const result = await response.json();
        
        if (result.success) {
          setContactInfo(result.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="bg-[#2B3972] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">FashionFit</h3>
            <p className="text-gray-300">
              Your one-stop destination for trendy and affordable fashion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  Admin 
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-2">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  {isLoading ? 'Loading...' : contactInfo.storeAddress || 'Address not available'}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phoneNumber}`} 
                  className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300"
                >
                  {isLoading ? 'Loading...' : contactInfo.phoneNumber || 'Phone not available'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} className="flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.contactEmail}`} 
                  className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300"
                >
                  {isLoading ? 'Loading...' : contactInfo.contactEmail || 'Email not available'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} FashionFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
