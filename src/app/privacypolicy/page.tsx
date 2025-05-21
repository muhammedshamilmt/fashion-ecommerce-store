import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl font-bold text-fashion-primary mb-8">Privacy Policy</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-fashion-primary/80 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-6">
              At FashionFit, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2 className="text-xl font-semibold mb-4">2. Collection of Your Information</h2>
            <p className="mb-4">
              We may collect information about you in a variety of ways. The information we may collect via the Site includes:
            </p>
            <h3 className="text-lg font-medium mb-2">Personal Data</h3>
            <p className="mb-4">
              Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
            </p>
            <h3 className="text-lg font-medium mb-2">Derivative Data</h3>
            <p className="mb-4">
              Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
            <h3 className="text-lg font-medium mb-2">3D Body Scan Data</h3>
            <p className="mb-6">
              When you use our virtual try-on feature, we collect 3D body scan data to provide accurate size recommendations. This data is used solely for the purpose of enabling our service features and is stored securely.
            </p>

            <h2 className="text-xl font-semibold mb-4">3. Use of Your Information</h2>
            <p className="mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Create and manage your account.</li>
              <li>Process your orders and provide accurate size recommendations.</li>
              <li>Email you regarding your account or order.</li>
              <li>Send you a newsletter.</li>
              <li>Enable user-to-user communications.</li>
              <li>Administer sweepstakes, promotions, and contests.</li>
              <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">4. Disclosure of Your Information</h2>
            <p className="mb-4">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <h3 className="text-lg font-medium mb-2">By Law or to Protect Rights</h3>
            <p className="mb-6">
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>

            <h2 className="text-xl font-semibold mb-4">5. Security of Your Information</h2>
            <p className="mb-6">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2 className="text-xl font-semibold mb-4">6. Policy for Children</h2>
            <p className="mb-6">
              We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
            </p>

            <h2 className="text-xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new policy on this page.
            </p>

            <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
            <p className="mb-4">
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at privacy@fashionfit.com or by mail using the details provided below:
            </p>
            <p className="mb-6">
              FashionFit<br />
              123 Fashion Street, Design District<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
