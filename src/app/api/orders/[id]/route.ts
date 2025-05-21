import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { z } from "zod";
import { ObjectId } from "mongodb";

const updateOrderSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered"]),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateOrderSchema.parse(body);

    const { db } = await connectToDatabase();
    
    // Update order status
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: {
          status: validatedData.status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully"
    });
  } catch (error) {
    console.error("Error updating order:", error);
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
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
} 