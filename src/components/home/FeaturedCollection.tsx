import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product, products } from "@/utils/data";
import FeaturedProductsGrid from "./FeaturedProductsGrid";

// Server Component
async function getFeaturedProducts() {
    // Simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 600));
        
  // Ensure we're returning plain objects by mapping over the products
  return products
    .filter(product => product.featured)
    .map(product => ({
      ...product,
      // Ensure all properties are serializable
      price: Number(product.price),
      images: [...product.images],
      sizes: [...product.sizes],
      colors: [...product.colors]
    }));
}

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

// Main Component
const FeaturedCollection = async () => {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="py-24 bg-fashion-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-lg">
            <span className="inline-block px-4 py-1 bg-fashion-peach text-fashion-primary text-sm font-medium rounded-full mb-4">
              Featured Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-fashion-primary mb-4">
              Our Premium Selection
            </h2>
            <p className="text-fashion-primary/70">
              Discover our handpicked selection of premium fashion items, perfect for any occasion and designed for the perfect fit.
            </p>
          </div>
          <Link
            href="/products"
            className="group flex items-center text-fashion-primary mt-4 md:mt-0 hover:opacity-80 transition-opacity"
          >
            <span>View All Collection</span>
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <React.Suspense fallback={<LoadingSkeleton />}>
          <FeaturedProductsGrid products={featuredProducts} />
        </React.Suspense>
      </div>
    </section>
  );
};

export default FeaturedCollection;
