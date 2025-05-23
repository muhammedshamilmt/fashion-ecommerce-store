import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Fetch 8 featured products from the database
    const featuredProducts = await db
      .collection("products")
      .find({ featured: true })
      .limit(8)
      .toArray();

    return NextResponse.json({
      success: true,
      data: featuredProducts
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
} 