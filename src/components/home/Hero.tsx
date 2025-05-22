"use client";

import React from "react";
import { ShoppingBag, ArrowRight, Scan, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const { isAdmin } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background shape/blob */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div 
          className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-subtle"
        ></div>
        <div 
          className="absolute top-[60%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl animate-pulse-subtle"
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="max-w-3xl text-center lg:text-left">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4 animate-fade-in">
            <p className="text-sm font-medium text-primary">
              Revolutionizing Fashion Shopping
            </p>
          </div>
          <h1 className="text-[5rem] font-bold mb-6 leading-none animate-fade-in">
            Elevate Your Fashion Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in">
            Say goodbye to returns. Our AI-powered 3D body scanning ensures your clothes fit perfectly before you buy.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/virtualytryon">
                <Button className="w-full sm:w-auto">
                  Try Virtual Fitting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full sm:w-auto">
                  Browse Collection
                </Button>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Newly Moved Section */}
          <div className="mt-12 grid grid-cols-3  animate-fade-in">
            <div className="flex flex-col items-center lg:items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Scan className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">3D Body Scanning</p>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Perfect Fit Guarantee</p>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Fashion AI Recommendations</p>
            </div>
          </div>
        </div>

        {/* Animated Image */}
        <div className="relative w-[320px] h-[480px] sm:w-[400px] sm:h-[600px] lg:ml-16 mt-12 lg:mt-0 animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-transparent rounded-3xl -rotate-6 shadow-xl"></div>
          <div className="absolute inset-0 rounded-[2rem] glass-panel rotate-3 overflow-hidden">
            <div className="absolute rounded-3xl inset-0 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fHx8&auto=format&fit=crop&w=720&q=80')] bg-cover bg-center"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-black">
              <p className="font-medium text-sm text-white">FEATURED COLLECTION</p>
              <h3 className="text-2xl font-bold mb-2 text-white">Summer Essentials</h3>
              <div className="flex items-center mt-4">
                <Link href="/virtualytryon">
                  <Button className="bg-white text-fashion-900 hover:bg-white/90 text-sm py-1.5">
                    Try On Virtually
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
