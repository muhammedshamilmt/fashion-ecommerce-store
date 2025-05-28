'use client'

import React, { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Phone, Send, MessageCircle, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high";
  image: File | null;
}

interface Settings {
  storeAddress: string;
  contactEmail: string;
  phoneNumber: string;
  workingHours: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
    image: null
  });
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const result = await response.json();

        if (result.success) {
          setSettings(result.data);
        } else {
          toast.error('Failed to load contact information');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load contact information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      priority: value as "low" | "medium" | "high"
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('priority', formData.priority);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          // Handle validation errors
          const errorMessage = Array.isArray(result.details) 
            ? result.details.map((err: any) => err.message).join(', ')
            : result.error;
          throw new Error(errorMessage);
        }
        throw new Error(result.error || "Failed to send message");
      }

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          priority: "medium",
          image: null
        });
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h1>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                We'd love to hear from you! Whether you have a question about our products,
                need fashion advice, or want to collaborate, our team is ready to assist you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Contact Information */}
                <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">Visit Us</h3>
                        <div className="text-gray-600 mt-1 whitespace-pre-line">
                          {isLoading ? (
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                          ) : settings?.storeAddress || "Address not available"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">Email Us</h3>
                        <div className="text-gray-600 mt-1">
                          {isLoading ? (
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                          ) : (
                            <a href={`mailto:${settings?.contactEmail}`} className="hover:text-primary">
                              {settings?.contactEmail || "Email not available"}
                          </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">Call Us</h3>
                        <div className="text-gray-600 mt-1">
                          {isLoading ? (
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                          ) : (
                            <a href={`tel:${settings?.phoneNumber}`} className="hover:text-primary">
                              {settings?.phoneNumber || "Phone number not available"}
                          </a>
                          )}
                          <br />
                          <span className="text-sm">Monday-Friday: 9AM-6PM EST</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">Live Chat</h3>
                        <div className="text-gray-600 mt-1">
                          Available on our website<br />
                          <span className="text-sm">Monday-Sunday: 8AM-10PM EST</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1 w-full"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-gray-700">Your Email</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1 w-full"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="priority" className="text-gray-700">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={handlePriorityChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-gray-700">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-1 w-full"
                        placeholder="Please provide as much detail as possible..."
                      />
                    </div>

                    \
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-primary text-white flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <span>Send Message</span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Find Us</h2>
              <div className="rounded-xl overflow-hidden h-96 shadow-sm border border-gray-100">
                {/* Placeholder for an actual map */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-12">
                Find answers to some of the most common questions about our services.
              </p>

              <div className="space-y-6 text-left">
                {[
                  {
                    question: "What are your shipping options?",
                    answer: "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days) to most countries."
                  },
                  {
                    question: "What is your return policy?",
                    answer: "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Refunds are processed within 5-7 business days."
                  },
                  {
                    question: "Do you offer size exchanges?",
                    answer: "Yes, we offer free size exchanges for all orders. Simply request an exchange through your account or contact our customer service team."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
