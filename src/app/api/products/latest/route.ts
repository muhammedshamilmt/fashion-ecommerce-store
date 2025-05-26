import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get latest 8 products, sorted by createdAt in descending order
    const latestProducts = await db.collection("products")
      .find({})
      .project({
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        images: 1,
        inStock: 1,
        createdAt: 1,
        updatedAt: 1,
        stock: 1,
        sku: 1,
        brand: 1,
        sizes: 1,
        colors: 1,
        ratings: 1,
        reviews: 1
      })
      .sort({ createdAt: -1 })
      .limit(8)
      .toArray();

    // Transform the data to ensure proper formatting
    const formattedProducts = latestProducts.map(product => ({
      ...product,
      _id: product._id.toString(), // Convert ObjectId to string
      price: Number(product.price), // Ensure price is a number
      stock: Number(product.stock), // Ensure stock is a number
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString()
    }));

    return NextResponse.json({
      success: true,
      data: formattedProducts
    });
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch latest products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 