import React from "react";
import { ChevronLeft, FileText, Shield, Share2, MessageSquare, Cookie, Baby, UserCog, RefreshCcw, Phone } from "lucide-react";
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
            <h1 className="text-3xl font-bold text-[#2B3972] mb-4">Privacy Policy – Al Hayba</h1>
            <p className="text-[#2B3972]/60">
              Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-[#2B3972]/80 leading-relaxed">
                At Al Hayba, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with us via platforms such as WhatsApp, social media, or offline services. By using our services, you agree to the practices described below.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">1. Information We Collect</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <h3 className="font-medium mb-2">a. Personal Information</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>Email address</li>
                  <li>Payment details (UPI, card info, etc.)</li>
                </ul>
                <h3 className="font-medium mb-2">b. Non-Personal Information</h3>
                <ul className="list-disc pl-6">
                  <li>Browser type</li>
                  <li>Device information</li>
                  {/* <li>IP address</li> */}
                  <li>Pages visited on our website</li>
                  <li>Date/time of access</li>
                </ul>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <UserCog className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">2. How We Use Your Information</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">We use your information to:</p>
                <ul className="list-disc pl-6">
                  <li>Process and deliver your orders</li>
                  <li>Provide customer service and support</li>
                  <li>Send order updates, confirmations, and delivery info</li>
                  <li>Manage returns and exchanges</li>
                  <li>Improve our website and services</li>
                  <li>Communicate promotional offers (only with your consent)</li>
                </ul>
              </div>
            </div>

            {/* 3. How We Protect Your Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">3. How We Protect Your Information</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">We use industry-standard security measures to:</p>
                <ul className="list-disc pl-6">
                  <li>Encrypt sensitive data</li>
                  <li>Restrict access to personal information</li>
                  <li>Regularly monitor our systems for potential vulnerabilities</li>
                </ul>
                <p className="mt-4">We do not store your payment credentials on our servers.</p>
              </div>
            </div>

            {/* 4. Sharing Your Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">4. Sharing Your Information</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">We do not sell or rent your personal information to third parties. However, we may share your data with:</p>
                <ul className="list-disc pl-6">
                  <li>Delivery partners to fulfill your orders</li>
                  <li>Payment gateways for secure transactions</li>
                  <li>Legal authorities, if required by law</li>
                </ul>
              </div>
            </div>

            {/* 5. WhatsApp & Communication Consent */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">5. WhatsApp & Communication Consent</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">By placing an order or messaging us on WhatsApp (+91 94968 17220), you consent to receiving order updates, promotional messages, and customer service communication.</p>
                <p>You may opt-out of promotional messages anytime by replying STOP.</p>
              </div>
            </div>

            {/* 6. Cookies and Tracking Technologies */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Cookie className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">6. Cookies and Tracking Technologies</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">We may use cookies or similar technologies to enhance your browsing experience, remember your preferences, and analyze website traffic.</p>
                <p>You can disable cookies in your browser settings if you prefer not to share this information.</p>
              </div>
            </div>

            {/* 7. Children's Privacy */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Baby className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">7. Children's Privacy</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p>Our services are not intended for children under 13. We do not knowingly collect personal data from minors. If a child has provided us with personal information, please contact us to have it removed.</p>
              </div>
            </div>

            {/* 8. Your Rights */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <UserCog className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">8. Your Rights</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access the data we hold about you</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw consent for promotional communication</li>
                </ul>
                <p>To exercise your rights, please contact us at:</p>
                <p className="mt-2">Email: support@alhayba.com</p>
                <p>Phone/WhatsApp: +91 94968 17220</p>
              </div>
            </div>

            {/* 9. Updates to This Policy */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCcw className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">9. Updates to This Policy</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised date. We encourage you to review this policy periodically.</p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="text-[#4AA79F] h-6 w-6" />
                <h2 className="text-2xl font-semibold text-[#2B3972]">Contact Us</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-[#2B3972]/80 leading-relaxed">
                <p className="mb-2">If you have questions about this Privacy Policy, feel free to reach out:</p>
                <p>Email: support@alhayba.com</p>
                <p>WhatsApp: +91 94968 17220</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
