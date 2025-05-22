import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import Navbar from "@/components/layout/Navbar";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/utils/data";
import { WithId, Document } from "mongodb";

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
          <div className="h-80 bg-gray-200"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

async function getKidsThobas(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase();
    
    const products = await db.collection("products")
      .find({
        category: "Kids Thobas"
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Convert MongoDB documents to Product type
    return products.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      category: product.category,
      sizes: product.sizes,
      colors: product.colors,
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));
  } catch (error) {
    console.error("Error fetching kids' thobas:", error);
    return [];
  }
}

const KidsThobasPage = async () => {
  const kidsThobasProducts = await getKidsThobas();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="container mx-auto py-16 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-fashion-primary mb-4">Kids' Thobas Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of premium kids' thobas, featuring traditional designs with modern elegance.
          </p>
        </div>
        
        <React.Suspense fallback={<LoadingSkeleton />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kidsThobasProducts.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                index={index} 
              />
            ))}
          </div>
        </React.Suspense>
      </div>
    </div>
  );
};

export default KidsThobasPage;
