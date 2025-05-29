import React from "react";
import { ChevronLeft } from "lucide-react";
import  Link  from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Terms = () => {
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
            <h1 className="text-3xl font-bold text-fashion-primary mb-8">Terms & Conditions</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-fashion-primary/80 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to FashionFit ("Company", "we", "our", "us")! These Terms & Conditions ("Terms", "Terms & Conditions") govern your use of our website located at fashionfit.com (together or individually "Service") operated by FashionFit.
            </p>
            <p className="mb-6">
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here.
            </p>

            <h2 className="text-xl font-semibold mb-4">2. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="text-xl font-semibold mb-4">3. Use of Our Service</h2>
            <p className="mb-4">
              You must be at least 18 years old to use our Service. By using our Service and by agreeing to these Terms, you warrant and represent that you are at least 18 years of age.
            </p>
            <p className="mb-6">
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>

            <h2 className="text-xl font-semibold mb-4">4. Account Registration</h2>
            <p className="mb-4">
              To use certain features of our Service, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account.
            </p>
            <p className="mb-6">
              You agree to accept responsibility for any and all activities or actions that occur under your account and/or password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="mb-6">
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of FashionFit and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of FashionFit.
            </p>

            <h2 className="text-xl font-semibold mb-4">6. Links to Other Websites</h2>
            <p className="mb-6">
              Our Service may contain links to third-party websites or services that are not owned or controlled by FashionFit. FashionFit has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2 className="text-xl font-semibold mb-4">7. Termination</h2>
            <p className="mb-6">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-6">
              In no event shall FashionFit, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Email: legal@fashionfit.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Address: 123 Fashion Street, Design District, New York, NY 10001</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;