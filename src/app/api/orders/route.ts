import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { z } from "zod";

const orderItemSchema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    images: z.array(z.string()),
  }),
  quantity: z.number(),
  size: z.string(),
  color: z.string(),
});

const orderSchema = z.object({
  customerInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  items: z.array(orderItemSchema),
  subtotal: z.number(),
  shipping: z.number(),
  tax: z.number(),
  total: z.number(),
  paymentMethod: z.string(),
  status: z.string().default("pending"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    const { db } = await connectToDatabase();
    
    // Create new order
    const result = await db.collection("orders").insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      data: {
        orderId: result.insertedId,
      }
    });
  } catch (error) {
    console.error("Error creating order:", error);
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
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const { db } = await connectToDatabase();
    
    // Build query
    const query = email ? { "customerInfo.email": email } : {};
    
    // Get orders
    const orders = await db.collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
} 