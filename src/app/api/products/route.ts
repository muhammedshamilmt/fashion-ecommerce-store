import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

// Define MongoDB document type
interface ProductDocument {
  _id: ObjectId;
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

// Sample boys' thobas products without _id
const boysThobasProducts: Omit<ProductDocument, '_id'>[] = [
  {
    name: "Classic White Thoba",
    description: "Traditional white thoba with elegant embroidery, perfect for special occasions.",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "boys-thobas",
    sizes: ["6-7", "8-9", "10-11", "12-13"],
    colors: ["White", "Cream", "Beige"],
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stock: 15,
    sku: "BT001",
    material: "Premium Cotton",
    brand: "Al-Hayba"
  },
  {
    name: "Embroidered Black Thoba",
    description: "Stylish black thoba with gold embroidery, ideal for formal events.",
    price: 2999,
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "boys-thobas",
    sizes: ["6-7", "8-9", "10-11", "12-13"],
    colors: ["Black", "Navy", "Gray"],
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stock: 10,
    sku: "BT002",
    material: "Premium Cotton",
    brand: "Al-Hayba"
  },
  {
    name: "Casual Blue Thoba",
    description: "Comfortable blue thoba for daily wear, made with breathable fabric.",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "boys-thobas",
    sizes: ["6-7", "8-9", "10-11", "12-13"],
    colors: ["Blue", "Light Blue", "Navy"],
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stock: 20,
    sku: "BT003",
    material: "Cotton Blend",
    brand: "Al-Hayba"
  },
  {
    name: "Premium Silk Thoba",
    description: "Luxurious silk thoba with intricate patterns, perfect for weddings.",
    price: 3999,
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "boys-thobas",
    sizes: ["6-7", "8-9", "10-11", "12-13"],
    colors: ["White", "Gold", "Silver"],
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stock: 8,
    sku: "BT004",
    material: "Pure Silk",
    brand: "Al-Hayba"
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const product = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: {
        ...product,
        _id: result.insertedId
      }
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...data } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const validatedData = productSchema.parse(data);

    const { db } = await connectToDatabase();
    
    const product = {
      ...validatedData,
      updatedAt: new Date(),
    };

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(_id) },
      { $set: product }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...product, _id },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortDirection = searchParams.get('sortDirection') || 'desc';

    const { db } = await connectToDatabase();
    
    // Try to get products from the database
    let products = await db.collection<ProductDocument>("products").find().toArray();

    // If no products in database, create and insert sample products
    if (products.length === 0) {
      const productsToInsert = boysThobasProducts.map(product => ({
        ...product,
        _id: new ObjectId()
      }));
      
      try {
        const result = await db.collection<ProductDocument>("products").insertMany(productsToInsert);
        products = productsToInsert;
        console.log("Sample products inserted into database");
      } catch (error) {
        console.error("Error inserting sample products:", error);
      }
    }

    // Apply filters
    if (category && category !== 'all') {
      products = products.filter(product => product.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        (product.sku && product.sku.toLowerCase().includes(searchLower)) ||
        (product.colors && product.colors.some((color: string) => color.toLowerCase().includes(searchLower))) ||
        (product.sizes && product.sizes.some((size: string) => size.toLowerCase().includes(searchLower))) ||
        (product.material && product.material.toLowerCase().includes(searchLower)) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    products.sort((a, b) => {
      const aValue = a[sortField as keyof ProductDocument];
      const bValue = b[sortField as keyof ProductDocument];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1)
        : (bValue > aValue ? 1 : -1);
    });

    // Convert ObjectId to string for response
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString()
    }));

    return NextResponse.json({
      success: true,
      data: serializedProducts
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
} 