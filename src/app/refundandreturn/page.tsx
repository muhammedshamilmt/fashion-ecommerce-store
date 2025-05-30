"use client";
import React from "react";
import { ChevronLeft, CheckCircle2, XCircle, RefreshCcw, Wallet, Truck, MessageCircle, Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const RefundAndReturn = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/" className="flex items-center text-[#2B3972] hover:text-[#2B3972]/80">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-[#2B3972] mb-4">Return & Refund Policy – Al Hayba</h1>
            <p className="text-[#2B3972]/60">
              Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-[#2B3972]/80 leading-relaxed">
                At Al Hayba, we are committed to ensuring customer satisfaction with every purchase. Please review our return and refund terms before making a purchase.
              </p>
            </div>

            {/* Return Eligibility */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Return Eligibility</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">You may return a product if:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The return request is made within 6 days of delivery.</li>
                  <li>The product is in unused, unwashed, and original condition.</li>
                  <li>The item is returned in the same packaging it was delivered in.</li>
                  <li>Proof of return (courier receipt or tracking number) is provided.</li>
                </ul>
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="text-red-500 h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Non-Returnable Items</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Customized or tailored clothing (e.g., altered Arabic Qamees) cannot be returned or refunded under any circumstances.</li>
                  <li>Items that show signs of wear, use, damage, or washing are not eligible.</li>
                </ul>
              </div>
            </div>

            {/* Exchange Policy */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCcw className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Exchange Policy</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>We offer exchanges for the same product in a different size or style, subject to stock availability.</li>
                  <li>All standard return conditions apply.</li>
                </ul>
              </div>
            </div>

            {/* Refunds */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Refunds</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds will be made through UPI to the original payment account within 7 business days after product approval.</li>
                  <li>Refunds are issued only after inspection and approval of the returned product.</li>
                </ul>
              </div>
            </div>

            {/* Shipping Charges */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Shipping Charges</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>For standard returns or exchanges, the customer bears the cost of both forward and return shipping.</li>
                  <li>If the return is due to a fault from our side (e.g., defective, damaged, or wrong item), Al Hayba will cover the shipping charges and send a replacement at no cost.</li>
                </ul>
              </div>
            </div>

            {/* How to Initiate a Return */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">How to Initiate a Return</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">To initiate a return:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Message us on WhatsApp at +91 94968 17220 within 6 days of receiving your order.</li>
                  <li>Include your order number, a brief explanation, and photos or videos (if relevant).</li>
                  <li>Once approved, you will receive return instructions.</li>
                  <li>After we receive and inspect the item, we will proceed with your refund or exchange.</li>
                </ul>
              </div>
            </div>

            {/* Contact Us */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Contact Us</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-4">For any questions or assistance:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <span>WhatsApp: +91 94968 17220</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#4AA79F]" />
                    <span>Email: support@alhayba.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#4AA79F]" />
                    <span>Phone: +91 94968 17220</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundAndReturn;
