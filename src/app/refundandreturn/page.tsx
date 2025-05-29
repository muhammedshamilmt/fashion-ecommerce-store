import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl font-bold text-[#2B3972] mb-4">Return and Refund Policy</h1>
            <p className="text-[#2B3972]/60">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            {/* Return and Refund Policy Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3972] mb-4">Return and Refund Policy</h2>
              <div className="prose prose-[#2B3972]">
                <p className="text-[#2B3972]/80 mb-4">
                  We want you to be completely satisfied with your purchase from FashionFit. If you are not satisfied with your purchase, you may be eligible for a return or refund under the following conditions:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                  <section>
                    <h3 className="text-lg font-medium text-[#2B3972] mb-2">Return Eligibility</h3>
                    <p className="text-[#2B3972]/80">
                      Returns are accepted within 30 days of the delivery date. Items must be unused, in the original packaging, and in the same condition as when you received them.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-lg font-medium text-[#2B3972] mb-2">Refund Process</h3>
                    <p className="text-[#2B3972]/80">
                      Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to the original method of payment within 7 business days.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-lg font-medium text-[#2B3972] mb-2">Non-Returnable Items</h3>
                    <p className="text-[#2B3972]/80">
                      Some items such as personalized products, gift cards, and final sale items are not eligible for return or refund.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-lg font-medium text-[#2B3972] mb-2">Exchanges</h3>
                    <p className="text-[#2B3972]/80">
                      We currently do not offer direct exchanges. If you would like a different item, please return the original item for a refund and place a new order.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-lg font-medium text-[#2B3972] mb-2">Contact Us</h3>
                    <p className="text-[#2B3972]/80">
                      If you have any questions or concerns about returns or refunds, please contact our customer service team at support@fashionfit.com.
                    </p>
                  </section>
                </div>
              </div>
            </div>

            {/* You can continue with more sections if needed */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
