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
            <h1 className="text-3xl font-bold text-[#2B3972] mb-4">Terms and Conditions</h1>
            <p className="text-[#2B3972]/60">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">

            {/* 1. Agreement to Terms */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">1. Agreement to Terms</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
              </div>
            </div>

            {/* 2. Intellectual Property Rights */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">2. Intellectual Property Rights</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                All content, trademarks, logos, and service marks displayed on the site are our property or the property of third parties. You are granted a limited license to access and use the site for personal, non-commercial use.
              </div>
            </div>

            {/* 3. User Representations */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">3. User Representations</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                By using the site, you represent that you have the legal capacity to enter into these Terms, and you will comply with these Terms at all times.
              </div>
            </div>

            {/* 4. Prohibited Activities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">4. Prohibited Activities</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                You may not access or use the site for any purpose other than that for which we make the site available. Prohibited activities include but are not limited to: reverse engineering, unauthorized framing, or copying of content.
              </div>
            </div>

            {/* 5. User-Generated Contributions */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">5. User-Generated Contributions</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                You are solely responsible for any content you contribute. By posting, you grant us the right to use and distribute your content in connection with the site.
              </div>
            </div>

            {/* 6. Site Management */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">6. Site Management</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                We reserve the right to monitor the site for violations of these Terms, and take legal action if necessary. We may also restrict or terminate your access without notice.
              </div>
            </div>

            {/* 7. Modifications and Interruptions */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">7. Modifications and Interruptions</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                We reserve the right to change, modify, or remove content at any time. We are not liable for any interruptions or errors in service.
              </div>
            </div>

            {/* 8. Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">8. Governing Law</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                These Terms shall be governed by and defined following the laws of the country in which our company is registered.
              </div>
            </div>

            {/* 9. Contact Us */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">9. Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                If you have any questions or complaints regarding these Terms and Conditions, please contact us at:
                <div className="mt-4">
                  FashionFit<br />
                  123 Fashion Street, Design District<br />
                  New York, NY 10001<br />
                  Email: terms@fashionfit.com
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

export default TermsAndConditions;
