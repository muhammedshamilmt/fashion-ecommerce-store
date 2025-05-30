"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const TermsAndConditions = () => {
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
            <h1 className="text-3xl font-bold text-[#2B3972] mb-4">Terms and Conditions – Al Hayba</h1>
            <p className="text-[#2B3972]/60">
              Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            {/* Introduction */}
            <div className="mb-8">
              <div className=" p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                Welcome to Al Hayba. By accessing or using our website, placing an order, or communicating with us via WhatsApp or any other platform, you agree to abide by the following Terms and Conditions.
              </div>
            </div>

            {/* 1. About Us */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">1. About Us</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                Al Hayba is a clothing brand specializing in elegant white dresses, particularly Arabic Qamees, catering especially to students of Dars and Arabic colleges.
              </div>
            </div>

            {/* 2. Eligibility */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">2. Eligibility</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                You must be at least 18 years old to use our services or place an order. If you are under 18, a parent or legal guardian must complete the purchase on your behalf.
              </div>
            </div>

            {/* 3. Orders and Payments */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">3. Orders and Payments</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6">
                  <li>All orders are subject to availability and confirmation.</li>
                  <li>Payments can be made via UPI or other accepted methods shown during checkout.</li>
                  <li>Customized orders cannot be canceled or modified once placed.</li>
                </ul>
              </div>
            </div>

            {/* 4. Shipping */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">4. Shipping</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6">
                  <li>We aim to dispatch orders within the time specified at checkout.</li>
                  <li>Shipping delays due to external factors (weather, courier delays, etc.) are beyond our control.</li>
                </ul>
              </div>
            </div>

            {/* 5. Returns and Refunds */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">5. Returns and Refunds</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6">
                  <li>Returns must be initiated within 6 days of delivery.</li>
                  <li>Items must be unused, unwashed, and in original packaging.</li>
                  <li>Return shipping (to and fro) is the customer's responsibility unless the product is damaged or incorrect, in which case we will cover the return charges.</li>
                  <li>Customized clothing is non-returnable and non-refundable.</li>
                  <li>Refunds (if approved) will be processed via UPI within 7 days of return approval.</li>
                  <li>A proof of return (tracking number or courier receipt) is mandatory.</li>
                  <li>See full Return & Refund Policy for more.</li>
                </ul>
              </div>
            </div>

            {/* 6. Exchange Policy */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">6. Exchange Policy</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <ul className="list-disc pl-6">
                  <li>Exchanges are allowed for size/style changes subject to stock availability.</li>
                  <li>Same return conditions apply as above.</li>
                </ul>
              </div>
            </div>

            {/* 7. Product Descriptions */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">7. Product Descriptions</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                We strive to ensure that product descriptions, images, and pricing are accurate. However, errors may occur, and we reserve the right to correct them without prior notice.
              </div>
            </div>

            {/* 8. Intellectual Property */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">8. Intellectual Property</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                All content on our site (logos, images, designs, text) is the property of Al Hayba. You may not use or reproduce any content without written permission.
              </div>
            </div>

            {/* 9. Limitation of Liability */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">9. Limitation of Liability</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                We are not responsible for:
                <ul className="list-disc pl-6 mt-2">
                  <li>Indirect or consequential loss.</li>
                  <li>Loss due to courier errors.</li>
                  <li>Any unauthorized access to your personal data beyond our control.</li>
                </ul>
              </div>
            </div>

            {/* 10. Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">10. Governing Law</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be handled in the jurisdiction of Kerala.
              </div>
            </div>

            {/* 11. Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">11. Contact</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p>WhatsApp/Phone: +91 94968 17220</p>
                <p>Email: support@alhayba.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
