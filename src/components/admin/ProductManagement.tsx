import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag, 
  CheckCircle2, 
  XCircle,
  ArrowUpDown,
  ChevronDown,
  Loader2
} from "lucide-react";
import { Product } from "@/utils/data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ProductForm from "./ProductForm";

const ProductManagement: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["all"]);
  
  // Fetch products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        sortField,
        sortDirection
      });

      const response = await fetch(`/api/products?${queryParams}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch products");
      }

      if (result.success) {
        setAllProducts(result.data as Product[]);
        // Update categories
        const uniqueCategories = ["all", ...new Set((result.data as Product[]).map(product => product.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error(result.error || "Failed to fetch products");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch products";
      toast.error(errorMessage);
      console.error("Error fetching products:", error);
      setAllProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, sortField, sortDirection]);
  
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products?id=${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete product");
      }

      if (result.success) {
        setAllProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    toast.success("Product deleted successfully");
      } else {
        throw new Error(result.error || "Failed to delete product");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete product");
      console.error("Error deleting product:", error);
    }
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };
  
  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };
  
  const handleToggleFeatured = async (productId: string) => {
    try {
      const product = allProducts.find(p => p._id === productId);
      if (!product) return;

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          featured: !product.featured
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update product");
      }

      if (result.success) {
        setAllProducts(allProducts.map(p => 
          p._id === productId ? { ...p, featured: !p.featured } : p
        ));
        toast.success(`${product.name} ${product.featured ? 'removed from' : 'added to'} featured products`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
      console.error("Error updating product:", error);
    }
  };
  
  const handleToggleInStock = async (productId: string) => {
    try {
      const product = allProducts.find(p => p._id === productId);
      if (!product) return;

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          inStock: !product.inStock
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update product");
      }

      if (result.success) {
        setAllProducts(allProducts.map(p => 
          p._id === productId ? { ...p, inStock: !p.inStock } : p
        ));
        toast.success(`${product.name} marked as ${product.inStock ? 'out of' : 'in'} stock`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  const handleProductFormSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct ? { ...data, _id: editingProduct._id } : data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save product");
      }

      if (result.success) {
        // Update the products list with the new/updated product
    if (editingProduct) {
          setAllProducts(prevProducts => 
            prevProducts.map(p => p._id === editingProduct._id ? result.data : p)
          );
    } else {
          setAllProducts(prevProducts => [...prevProducts, result.data]);
        }
        setIsProductFormOpen(false);
        toast.success(editingProduct ? "Product updated successfully" : "Product added successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save product");
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-fashion-primary">Products</h2>
        <Button
          onClick={handleAddNewProduct}
          className="bg-[#4AA79F] hover:bg-[#4AA79F]/90 flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </Button>
      </div>
      
      {/* Filters and search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full rounded-md border px-3 py-2"
          />
        </div>
        
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="input-field appearance-none pr-10 w-full rounded-md border px-3 py-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-fashion-primary/70">Sort by:</span>
          <button
            onClick={() => handleSort("name")}
            className={`px-3 py-1 text-sm rounded-md ${
              sortField === "name" ? "bg-[#4AA79F] text-white" : "bg-gray-100 text-fashion-primary"
            }`}
          >
            Name
          </button>
          <button
            onClick={() => handleSort("price")}
            className={`px-3 py-1 text-sm rounded-md ${
              sortField === "price" ? "bg-[#4AA79F] text-white" : "bg-gray-100 text-fashion-primary"
            }`}
          >
            Price
          </button>
          <button
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md"
          >
            <ArrowUpDown 
              size={16}
              className={`transition-transform ${sortDirection === "desc" ? "transform rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-fashion-primary/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="w-8 h-8 animate-spin text-[#4AA79F]" />
                    </div>
                  </td>
                </tr>
              ) : allProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-fashion-primary/60">
                    <div className="flex flex-col items-center">
                      <Search size={36} className="mb-2 opacity-20" />
                      <p>No products found matching your search criteria.</p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-2 text-blue-600 hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                allProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-fashion-primary">{product.name}</div>
                          <div className="text-sm text-fashion-primary/60">ID: {product._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-fashion-primary">
                      <Tag size={12} className="mr-1" />
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-fashion-primary">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                        onClick={() => handleToggleInStock(product._id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.inStock 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle2 size={12} className="mr-1" />
                          In Stock
                        </>
                      ) : (
                        <>
                          <XCircle size={12} className="mr-1" />
                          Out of Stock
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                        onClick={() => handleToggleFeatured(product._id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.featured 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.featured ? "Featured" : "Not Featured"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3 justify-end">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                          onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Product Form Modal */}
      <ProductForm
        open={isProductFormOpen}
        onOpenChange={setIsProductFormOpen}
        onSubmit={handleProductFormSubmit}
        initialData={editingProduct || undefined}
      />
    </div>
  );
};

export default ProductManagement;
