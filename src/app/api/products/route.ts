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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);

    const { db } = await connectToDatabase();
    
    const product = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json({
      success: true,
      data: { ...product, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating product:", error);
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
    const featured = searchParams.get('featured');

    const { db } = await connectToDatabase();
    
    // Build query
    const query: any = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const products = await db.collection("products")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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