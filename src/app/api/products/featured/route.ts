import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = 'force-dynamic'; // Disable caching at the route level

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // First try to fetch featured products
    let featuredProducts = await db
      .collection("products")
      .find({ featured: true })
      .limit(8)
      .toArray();

    // If no featured products found, fetch latest products as fallback
    if (!featuredProducts || featuredProducts.length === 0) {
      featuredProducts = await db
        .collection("products")
        .find()
        .sort({ createdAt: -1 })
        .limit(8)
        .toArray();
    }

    // Format the products to ensure all required fields are present
    const formattedProducts = featuredProducts.map(product => ({
      _id: product._id.toString(),
      name: product.name || 'Unnamed Product',
      description: product.description || '',
      price: product.price || 0,
      images: product.images || [],
      category: product.category || 'Uncategorized',
      sizes: product.sizes || [],
      colors: product.colors || [],
      featured: product.featured || false,
      createdAt: product.createdAt || new Date().toISOString()
    }));

    return NextResponse.json(
      { 
      success: true,
        data: formattedProducts 
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch featured products",
        message: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
} 