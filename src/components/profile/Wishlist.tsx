
import React from "react";
import { Heart, ShoppingCart, MoreHorizontal, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Sample wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Leather Biker Jacket",
    price: 199.99,
    originalPrice: 199.99,
    image: "https://placehold.co/300x300/f0f0f0/909090",
    rating: 4,
    reviewCount: 12,
    isNew: true
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 149.99,
    originalPrice: 149.99,
    image: "https://placehold.co/300x300/f0f0f0/909090",
    rating: 5,
    reviewCount: 24,
    isNew: true
  },
  {
    id: 3,
    name: "Pastel Cardigan",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://placehold.co/300x300/f0f0f0/909090",
    rating: 3,
    reviewCount: 36,
    isNew: true,
    isOnSale: true
  }
];

// Sample recently viewed products
const recentlyViewedItems = [
  {
    id: 4,
    name: "Canvas Sneakers",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://placehold.co/300x300/f0f0f0/909090",
    isOnSale: true
  },
  {
    id: 5,
    name: "Floral Summer Dress",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://placehold.co/300x300/f0f0f0/909090",
    isOnSale: true
  },
  {
    id: 6,
    name: "Leather Watch",
    price: 119.99,
    originalPrice: 159.99,
    image: "https://placehold.co/300x300/f0f0f0/909090",
    isOnSale: true
  },
  {
    id: 7,
    name: "Silk Print Blouse",
    price: 89.99,
    originalPrice: 89.99,
    image: "https://placehold.co/300x300/f0f0f0/909090"
  }
];

const Wishlist = () => {
  const handleAddToCart = (itemId: number, itemName: string) => {
    toast.success(`${itemName} added to cart`);
  };
  
  const handleRemoveFromWishlist = (itemId: number, itemName: string) => {
    toast.success(`${itemName} removed from wishlist`);
  };
  
  const handleShareWishlist = () => {
    toast.success("Wishlist link copied to clipboard");
  };
  
  const handleCreateNewList = () => {
    toast.success("New wishlist created");
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">My Wishlist</h2>
          <p className="text-gray-600">{wishlistItems.length} items saved</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCreateNewList} className="flex items-center">
            <Plus size={16} className="mr-1" />
            Create New List
          </Button>
          <Button variant="outline" onClick={handleShareWishlist} className="flex items-center">
            <Share2 size={16} className="mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
              {item.isNew && (
                <span className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 text-xs font-bold rounded">
                  NEW
                </span>
              )}
              <button onClick={() => handleRemoveFromWishlist(item.id, item.name)} 
                      className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </button>
              <img src={item.image} alt={item.name} className="w-full h-60 object-cover" />
            </div>
            
            <div className="p-4">
              <div className="flex text-sm mb-1">{renderStars(item.rating)} <span className="ml-1 text-gray-500">({item.reviewCount})</span></div>
              <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
              
              <div className="flex items-center mb-4">
                {item.isOnSale ? (
                  <>
                    <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                    <span className="ml-2 text-gray-500 line-through text-sm">${item.originalPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex">
                <Button 
                  onClick={() => handleAddToCart(item.id, item.name)} 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
                <Button variant="ghost" className="ml-2 p-0 h-10 w-10">
                  <MoreHorizontal />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recently Viewed</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recentlyViewedItems.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-900 mb-1">{item.name}</h4>
                <div className="flex items-center">
                  {item.isOnSale ? (
                    <>
                      <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                      <span className="ml-2 text-gray-500 line-through text-xs">${item.originalPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
