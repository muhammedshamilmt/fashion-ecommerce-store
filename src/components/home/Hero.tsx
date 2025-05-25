"use client";

import React from "react";
import { ShoppingBag, ArrowRight, Scan, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const { isAdmin } = useAuth();

  return (
    <section className="relative overflow-hidden  md:pt-24 lg:pt-20 pt-26 min-h-[80vh] flex items-center">
      {/* Background shape/blob */}
      <div className="absolute inset-0 z-0">
        {/* Background image for screens under lg (1024px) */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:hidden bg-[url('https://i.pinimg.com/736x/4d/07/02/4d0702fbd14af18fdfc7e389e96163c8.jpg')]"
        ></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-fashion-primary to-fashion-secondary opacity-10"></div>
        {/* Background image for screens lg (1024px) and above */}
        {/* <img
          src="https://i.pinimg.com/736x/f7/9a/87/f79a8780381223e4e552483d0044641b.jpg"
          alt="Fashion background"
          className="w-full h-full object-cover hidden lg:block"
        /> */}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 sm:mt-10 jpt-20 flex flex-col lg:flex-row items-center">
        <div className="max-w-3xl text-center lg:text-left">
          {/* <div className="inline-block px-3 sm:display-none py-1 bg-primary/10 border border-primary/20 rounded-full mb-4 animate-fade-in">
            <p className="text-sm font-medium text-primary">
              Revolutionizing Fashion Shopping
            </p>
          </div> */}
          <h1 className=" text-[5rem] font-['Adelone-Serial-Extrabold-Regular'] text-fashion-primary tracking-tight  mb-6 pt-20 animate-fade-in animate-duration-700 leading-none ">
            Elevate Your Fashion Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in">
            Say goodbye to returns. Our AI-powered 3D body scanning ensures your clothes fit perfectly before you buy.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <div className="flex flex-col-2 sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <Link href="/virtualytryon">
                <Button className="w-full sm:w-auto">
                  Try Virtual Fitting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link> */}
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
          {/* <div className="mt-12 grid grid-cols-3  animate-fade-in">
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
          </div> */}
        </div>

        {/* Animated Image - Hidden below lg (1024px) */}
        <div className="relative w-[320px] h-[480px] sm:w-[400px] sm:h-[600px] lg:ml-16 mt-12 lg:mt-0 animate-float hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-transparent rounded-3xl -rotate-6 shadow-xl"></div>
          <div className="absolute inset-0 rounded-[2rem] glass-panel rotate-3 overflow-hidden">
            <div className="absolute rounded-3xl inset-0 bg-[url('https://i.pinimg.com/736x/f7/9a/87/f79a8780381223e4e552483d0044641b.jpg')] bg-cover bg-center"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-black">
              <p className="font-medium text-sm text-white">FEATURED COLLECTION</p>
              <h3 className="text-2xl font-bold mb-2 text-white">Summer Essentials</h3>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
