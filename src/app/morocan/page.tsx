import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/utils/data";
import Footer from "@/components/layout/Footer";

async function getMorocanProducts(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase();
    
    const products = await db.collection("products")
      .find({
        category: "Morocan"
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
      updatedAt: product.updatedAt,
      stock: product.stock || 0,
      sku: product.sku || '',
      material: product.material || '',
      brand: product.brand || ''
    }));
  } catch (error) {
    console.error("Error fetching Morocan products:", error);
    return [];
  }
}

const MorocanCollection = async () => {
  const morocanProducts = await getMorocanProducts();
  
  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-4xl font-bold text-fashion-primary mb-4 font-['Adelone-Serial-Extrabold-Regular']">Morocan Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our premium selection of Morocan thobas, featuring traditional designs with contemporary comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {morocanProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MorocanCollection;
