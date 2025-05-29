import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";

const orderItemSchema = z.object({
  productId: z.string().transform(val => {
    try {
      return new ObjectId(val);
    } catch (error) {
      return val; // Keep the original string if not a valid ObjectId
    }
  }),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  size: z.string(),
  color: z.string(),
  image: z.string(),
});

const orderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
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
  status: z.enum(["pending", "processing", "shipped", "delivered"]).default("pending"),
  currentLocation: z.string(),
  estimatedDelivery: z.string(),
  trackingHistory: z.array(z.object({
    status: z.string(),
    location: z.string(),
    timestamp: z.string()
  }))
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    const { db } = await connectToDatabase();
    
    // Build query
    const query: any = {};
    if (email) {
      query["customerInfo.email"] = email;
    }
    if (status) {
      query.status = status;
    }

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
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch orders',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received order data:', body); // Debug log

    const validatedData = orderSchema.parse(body);
    console.log('Validated order data:', validatedData); // Debug log

    const { db } = await connectToDatabase();
    
    // Check if order number already exists
    const existingOrder = await db.collection("orders").findOne({
      orderNumber: validatedData.orderNumber
    });

    if (existingOrder) {
      return NextResponse.json(
        { success: false, error: "Order number already exists" },
        { status: 400 }
      );
    }
    
    // Create new order
    const order = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Saving order:', order); // Debug log

    const result = await db.collection("orders").insertOne(order);

    // Fetch the created order
    const createdOrder = await db.collection("orders").findOne({
      _id: result.insertedId
    });

    console.log('Created order:', createdOrder); // Debug log

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      data: createdOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors); // Debug log
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