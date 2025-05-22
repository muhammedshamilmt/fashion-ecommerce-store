'use client'
import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  ArrowLeft, 
  ArrowRight,
  Truck, 
  RotateCcw, 
  Shield,
  Scan,
  PanelRight,
  Award,
  Clock,
  Zap
} from "lucide-react";
import { Product } from "@/utils/data";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch product');
        }

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch product');
        }

        setProduct(result.data);
        // Set initial size and color after product is loaded
        if (result.data.sizes?.length > 0) {
          setSelectedSize(result.data.sizes[0]);
        }
        if (result.data.colors?.length > 0) {
          setSelectedColor(result.data.colors[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, quantity, selectedSize, selectedColor);
    router.push("/checkout");
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Added to wishlist");
    } else {
      toast.success("Removed from wishlist");
    }
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard");
  };

  const handleTryOn = () => {
    toast.success("3D Try-on feature initiated");
  };

  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => 
      (prev + 1) % product.images.length
    );
  };

  const handleWriteReview = () => {
    toast.success("Review form opened");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
        <div className="space-y-6">
          <div className="bg-gray-200 rounded-xl h-[500px]"></div>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
      {/* Product Images */}
      <div className="space-y-6">
        {/* Main Image */}
        <div className="relative overflow-hidden bg-gray-50 rounded-xl h-[500px]">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 hover:text-white transition-all duration-300"
            aria-label="Previous image"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 hover:text-white transition-all duration-300"
            aria-label="Next image"
          >
            <ArrowRight size={20} />
          </button>
          
          {/* Try-on Button */}
          <button
            onClick={handleTryOn}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            <Scan size={18} />
            <span className="font-medium">Virtual Try-On</span>
          </button>
        </div>
        
        {/* Thumbnail Images */}
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                currentImageIndex === index
                  ? "border-indigo-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-8">
        <div>
          <p className="text-indigo-600 uppercase tracking-wider text-sm mb-2">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center space-x-4 mb-6">
            <p className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              In Stock
            </div>
          </div>
          
          {/* Product Rating Display */}
          <div className="flex items-center mb-6">
            <Rating readOnly initialValue={4.5} className="mr-2" />
            <span className="text-gray-500 text-sm">(128 reviews)</span>
          </div>
          
          <p className="text-gray-600 mb-8">
            {product.description}
          </p>
        </div>

        {/* Size Selection */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="font-medium text-gray-900">Size</p>
            <button className="text-sm text-indigo-600 hover:underline">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-10 min-w-[40px] px-3 rounded-md border transition-all duration-200 ${
                  selectedSize === size
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-300 hover:border-indigo-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <p className="font-medium text-gray-900 mb-3">Color</p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color
                    ? "border-indigo-600"
                    : "border-transparent"
                }`}
              >
                <span
                  className="block w-full h-full rounded-full"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
                {selectedColor === color && (
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <p className="font-medium text-gray-900 mb-3">Quantity</p>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleAddToCart} 
            className="bg-indigo-600 hover:bg-indigo-700 flex-1 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </Button>
          
          <Button 
            onClick={handleBuyNow} 
            className="bg-purple-600 hover:bg-purple-700 flex-1 flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            Buy Now
          </Button>
          
          <Button
            onClick={handleWishlist}
            variant="outline"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-2"
          >
            <Heart
              size={18}
              className={isWishlisted ? "fill-red-500 text-red-500" : ""}
            />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="h-10 w-10 p-0 rounded-full flex items-center justify-center border border-gray-300"
            aria-label="Share product"
          >
            <Share2 size={18} />
          </Button>
        </div>

        {/* Product Info Tabs */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6 bg-gray-100 w-full grid grid-cols-3">
              <TabsTrigger 
                value="details" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                onClick={() => setActiveTab("details")}
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                onClick={() => setActiveTab("shipping")}
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <PanelRight className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Material</p>
                    <p className="text-sm text-gray-600">
                      100% Premium Cotton, sustainable and eco-friendly fabrics
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Quality Guarantee</p>
                    <p className="text-sm text-gray-600">
                      Crafted to last with premium materials and expert stitching
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">
                      3-5 business days for standard shipping, 1-2 days for express
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">
                      Free standard shipping on orders over $100
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">
                      30-day return policy
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">
                      Your payment information is processed securely
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 mr-2">4.5</span>
                    <Rating readOnly initialValue={4.5} />
                  </div>
                  <p className="text-sm text-gray-600">Based on 128 reviews</p>
                </div>
                <Button 
                  onClick={handleWriteReview}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Write a Review
                </Button>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <p className="text-center text-gray-500">Reviews will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
