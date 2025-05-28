import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z, type ZodIssue } from "zod";
import { ObjectId } from "mongodb";
import type { NextRequest } from 'next/server';

const updateOrderSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered"]),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(id)
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order
    });
  } catch (error: unknown) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await context.params;
    const body = await request.json();
    
    const validatedData = updateOrderSchema.parse(body);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          status: validatedData.status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const updatedOrder = await db.collection("orders").findOne({
      _id: new ObjectId(id)
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err: ZodIssue) => err.message);
      return NextResponse.json(
        { error: errorMessages },
        { status: 400 }
      );
    }
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const result = await db.collection("orders").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error: unknown) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
} 