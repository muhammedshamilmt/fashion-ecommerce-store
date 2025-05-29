export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  stock: number;
  sku: string;
  material: string;
  brand: string;
} 