'use client'
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/utils/data";
import { Filter, Sliders, ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Products = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") || null;
  const featuredParam = searchParams?.get("featured") || null;
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [onlyInStock, setOnlyInStock] = useState(true);
  const [onlyFeatured, setOnlyFeatured] = useState(featuredParam === "true");
  
  // Get unique categories, sizes, and colors from filtered products
  const categories = ["all", ...Array.from(new Set(filteredProducts.map(p => p.category)))];
  const allSizes = Array.from(new Set(filteredProducts.flatMap(p => p.sizes))).sort();
  const allColors = Array.from(new Set(filteredProducts.flatMap(p => p.colors)));
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.append("category", selectedCategory);
        }
        if (onlyFeatured) {
          params.append("featured", "true");
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch products');
        }

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch products');
        }
        
        setFilteredProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch products');
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, onlyFeatured]);
  
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setOnlyInStock(true);
    setOnlyFeatured(false);
    setSortBy("featured");
  };

  // Filter components that will be used in both desktop and mobile views
  const FilterComponents = () => (
    <>
      {/* Category filter */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h4 className="font-medium text-fashion-primary mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="w-4 h-4 text-fashion-primary focus:ring-fashion-primary/20 border-gray-300 rounded"
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm text-fashion-primary capitalize"
              >
                {category === "all" ? "All Categories" : category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Size filter */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h4 className="font-medium text-fashion-primary mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-fashion-primary text-white"
                  : "bg-gray-100 text-fashion-primary hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Color filter */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h4 className="font-medium text-fashion-primary mb-3">Color</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map(color => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-colors ${
                selectedColors.includes(color)
                  ? "border-fashion-primary"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            >
              {selectedColors.includes(color) && (
                <span className="flex items-center justify-center text-white">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Price range filter */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h4 className="font-medium text-fashion-primary mb-3">Price Range</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-fashion-primary/70">${priceRange[0]}</span>
            <span className="text-sm text-fashion-primary/70">${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      {/* Availability filters */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h4 className="font-medium text-fashion-primary mb-3">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="in-stock"
              checked={onlyInStock}
              onChange={() => setOnlyInStock(!onlyInStock)}
              className="w-4 h-4 text-fashion-primary focus:ring-fashion-primary/20 border-gray-300 rounded"
            />
            <label htmlFor="in-stock" className="ml-2 text-sm text-fashion-primary">
              In Stock Only
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={onlyFeatured}
              onChange={() => setOnlyFeatured(!onlyFeatured)}
              className="w-4 h-4 text-fashion-primary focus:ring-fashion-primary/20 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-fashion-primary">
              Featured Items
            </label>
          </div>
        </div>
      </div>
    </>
  );

  // Sort selector component
  const SortSelector = () => (
    <div className="flex items-center">
      <span className="text-sm text-fashion-primary/70 mr-2">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none bg-white border border-gray-300 text-fashion-primary rounded-md py-1 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-fashion-primary/20 text-sm"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-fashion-primary mb-2 font-['Adelone-Serial-Extrabold-Regular']">Shop Our Collection</h1>
            <p className="text-fashion-primary/70">
              Discover our curated selection of high-quality fashion items.
            </p>
          </div>
          
          {/* Mobile filter toggle and drawer */}
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2 text-fashion-primary/70" />
                    <span className="font-medium">Filters & Sort</span>
                  </div>
                  <ChevronDown size={18} />
                </button>
              </DrawerTrigger>
              <DrawerContent className="px-4 max-h-[85vh] overflow-y-auto">
                <DrawerHeader className="flex items-center justify-between border-b pb-4">
                  <DrawerTitle className="text-fashion-primary font-bold">Filters & Sort</DrawerTitle>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-fashion-primary hover:text-fashion-primary/80"
                    >
                      Clear All
                    </button>
                    <DrawerClose asChild>
                      <button className="rounded-full p-1 hover:bg-gray-100">
                        <X size={20} className="text-fashion-primary" />
                      </button>
                    </DrawerClose>
                  </div>
                </DrawerHeader>
                <div className="mt-4 pb-20 space-y-4">
                  <div className="mb-6">
                    <h4 className="font-medium text-fashion-primary mb-3">Sort By</h4>
                    <SortSelector />
                  </div>
                  <FilterComponents />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Filter size={18} className="mr-2 text-fashion-primary/70" />
                  <span className="font-medium">Filters & Sort</span>
                </div>
                {filtersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar - Desktop */}
            <div 
              className={`lg:w-1/4 xl:w-1/5 space-y-6 ${
                filtersOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              {/* Clear all filters button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-fashion-primary flex items-center">
                  <Sliders size={16} className="mr-2" />
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>
              
              <FilterComponents />
            </div>
            
            {/* Products grid */}
            <div className="lg:w-3/4 xl:w-4/5">
              {/* Sort & results count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-fashion-primary/70 mb-4 sm:mb-0">
                  Showing <span className="font-medium">{filteredProducts.length}</span> products
                </p>
                
                {!isMobile && <SortSelector />}
              </div>
              
              {/* Active filters */}
              {(selectedCategory !== "all" || selectedSizes.length > 0 || selectedColors.length > 0 || !onlyInStock || onlyFeatured) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory !== "all" && (
                    <div className="inline-flex items-center bg-gray-100 text-fashion-primary rounded-full px-3 py-1 text-sm">
                      <span>Category: {selectedCategory}</span>
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-1 text-fashion-primary/70 hover:text-fashion-primary"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {selectedSizes.map(size => (
                    <div key={size} className="inline-flex items-center bg-gray-100 text-fashion-primary rounded-full px-3 py-1 text-sm">
                      <span>Size: {size}</span>
                      <button
                        onClick={() => toggleSize(size)}
                        className="ml-1 text-fashion-primary/70 hover:text-fashion-primary"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {selectedColors.map(color => (
                    <div key={color} className="inline-flex items-center bg-gray-100 text-fashion-primary rounded-full px-3 py-1 text-sm">
                      <span>Color: {color}</span>
                      <button
                        onClick={() => toggleColor(color)}
                        className="ml-1 text-fashion-primary/70 hover:text-fashion-primary"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {onlyFeatured && (
                    <div className="inline-flex items-center bg-gray-100 text-fashion-primary rounded-full px-3 py-1 text-sm">
                      <span>Featured</span>
                      <button
                        onClick={() => setOnlyFeatured(false)}
                        className="ml-1 text-fashion-primary/70 hover:text-fashion-primary"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Products */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                      <div className="h-80 bg-gray-200"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                    <X size={24} className="text-fashion-primary/50" />
                  </div>
                  <h3 className="text-lg font-medium text-fashion-primary mb-2">No products found</h3>
                  <p className="text-fashion-primary/70 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="btn-secondary inline-flex"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
