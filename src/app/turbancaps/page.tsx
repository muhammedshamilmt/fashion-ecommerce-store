import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import Navbar from "@/components/layout/Navbar";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/utils/data";
import Footer from "@/components/layout/Footer";

// Constants
const ITEMS_PER_PAGE = 12;

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
        <div className="h-80 bg-gray-200" />
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// Optimized product mapping function
const mapProduct = (product: any): Product => ({
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
});

async function getTurbanCaps(page: number = 1): Promise<{ products: Product[], total: number }> {
  try {
    const { db } = await connectToDatabase();
    
    const skip = (page - 1) * ITEMS_PER_PAGE;
    
    const [products, total] = await Promise.all([
      db.collection("products")
        .find({ category: "Turban & Caps" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(ITEMS_PER_PAGE)
        .toArray(),
      db.collection("products")
        .countDocuments({ category: "Turban & Caps" })
    ]);

    return {
      products: products.map(mapProduct),
      total
    };
  } catch (error) {
    console.error("Error fetching turban & caps:", error);
    return { products: [], total: 0 };
  }
}

const TurbancapsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = Number(searchParams.page) || 1;
  const { products: turbancapsProducts, total } = await getTurbanCaps(page);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
          <h1 className="text-4xl font-bold text-fashion-primary mb-4 font-['Adelone-Serial-Extrabold-Regular']">
            Turban & Caps Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of premium Turban & Caps, featuring traditional designs with modern elegance.
          </p>
        </div>
        
        <React.Suspense fallback={<LoadingSkeleton />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {turbancapsProducts.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                index={index} 
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  asChild
                >
                  <Link href={`/turbancaps?page=${i + 1}`}>
                    {i + 1}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </React.Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default TurbancapsPage;
