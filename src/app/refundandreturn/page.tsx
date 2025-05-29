import React from "react";
import { ChevronLeft } from "lucide-react";
import  Link  from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-fashion-primary mb-8">Refund and Return Policy</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-fashion-primary/80 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-xl font-semibold mb-4">1. Return Policy Overview</h2>
            <p className="mb-4">
              At FashionFit, we want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a comprehensive return policy to ensure your peace of mind.
            </p>
            <p className="mb-6">
              You have 30 days from the date of delivery to return most items for a full refund or exchange. Items must be in their original condition with all tags attached.
            </p>

            <h2 className="text-xl font-semibold mb-4">2. Eligible Items for Return</h2>
            <ul className="list-disc pl-5 mb-6">
              <li>All clothing items in original condition with tags attached</li>
              <li>Shoes that have not been worn outdoors</li>
              <li>Accessories in original packaging</li>
              <li>Items purchased at full price or on sale</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">3. Non-Returnable Items</h2>
            <p className="mb-4">For hygiene and safety reasons, the following items cannot be returned:</p>
            <ul className="list-disc pl-5 mb-6">
              <li>Underwear, swimwear, and intimate apparel</li>
              <li>Personalized or customized items</li>
              <li>Gift cards</li>
              <li>Items marked as "Final Sale"</li>
              <li>Items damaged by normal wear and tear</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">4. How to Return Items</h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Step 1: Initiate Your Return</h3>
              <p className="mb-4">
                Log into your account and go to "Order History" to start a return request, or contact our customer service team at returns@fashionfit.com with your order number.
              </p>
              
              <h3 className="text-lg font-medium mb-3">Step 2: Package Your Items</h3>
              <p className="mb-4">
                Pack items securely in their original packaging when possible. Include the return form provided with your original shipment.
              </p>
              
              <h3 className="text-lg font-medium mb-3">Step 3: Ship Your Return</h3>
              <p className="mb-4">
                Use the prepaid return label provided with your order. If you don't have the label, contact us for a replacement. Drop off at any authorized shipping location.
              </p>
            </div>

            <h2 className="text-xl font-semibold mb-4">5. Refund Processing</h2>
            <p className="mb-4">
              Once we receive and inspect your returned items, we'll process your refund within 5-7 business days. Refunds will be issued to your original payment method.
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Credit cards: 3-5 business days</li>
              <li>PayPal: 1-2 business days</li>
              <li>Store credit: Immediate upon processing</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">6. Exchanges</h2>
            <p className="mb-6">
              We're happy to exchange items for a different size or color. Exchanges are processed as returns followed by new orders. If there's a price difference, we'll either refund the difference or charge your original payment method.
            </p>

            <h2 className="text-xl font-semibold mb-4">7. International Returns</h2>
            <p className="mb-6">
              International customers are responsible for return shipping costs. We recommend using a tracked shipping service. Please contact our customer service team for specific instructions for your country.
            </p>

            <h2 className="text-xl font-semibold mb-4">8. Damaged or Defective Items</h2>
            <p className="mb-6">
              If you receive a damaged or defective item, please contact us immediately at support@fashionfit.com with photos of the damage. We'll arrange for a replacement or full refund at no cost to you.
            </p>

            <h2 className="text-xl font-semibold mb-4">9. Late or Missing Refunds</h2>
            <p className="mb-4">
              If you haven't received your refund yet, please:
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Check your bank account statement</li>
              <li>Contact your credit card company or bank</li>
              <li>Contact us at support@fashionfit.com if you still need assistance</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For questions about returns and refunds, please contact us:
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Email: returns@fashionfit.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Live Chat: Available on our website 9 AM - 6 PM EST</li>
              <li>Address: 123 Fashion Street, Design District, New York, NY 10001</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800">
                Our customer service team is here to help with any questions about returns or exchanges. 
                We're committed to making the return process as easy as possible for you.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
