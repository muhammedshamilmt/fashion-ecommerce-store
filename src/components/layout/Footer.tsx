import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B3972] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FashionFit</h2>
            <p className="text-gray-300 max-w-xs">
              Revolutionizing online fashion shopping with AI-powered 3D scanning technology for the perfect fit.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-[#3FB185] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-[#3FB185] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-[#3FB185] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-[#3FB185] transition-colors duration-300"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=men" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Men's Collection</Link>
              </li>
              <li>
                <Link href="/products?category=women" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Women's Collection</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">New Arrivals</Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Featured Items</Link>
              </li>
              <li>
                <Link href="/products?discount=true" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Discounts</Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Contact</Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Careers</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-2">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Fashion Street, Design District, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} className="flex-shrink-0" />
                <a href="mailto:info@fashionfit.com" className="text-gray-300 hover:text-[#3FB185] transition-colors duration-300">
                  info@fashionfit.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FFFFFF]/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} FashionFit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#3FB185] text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#3FB185] text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-[#3FB185] text-sm transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
