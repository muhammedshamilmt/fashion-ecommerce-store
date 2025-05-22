import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/utils/data";
import ProductCard from "@/components/products/ProductCard";
import Navbar from "@/components/layout/Navbar";
const MensThobasPage = () => {
  // Filter products for men's thobas
  const mensThobasProducts = products.filter(product => 
    product.category === "men" && 
    product.name.toLowerCase().includes("thoba")
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-fashion-primary mb-4">Men's Thobas Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of premium men's thobas, featuring traditional designs with modern elegance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mensThobasProducts.map((product, index) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MensThobasPage;
