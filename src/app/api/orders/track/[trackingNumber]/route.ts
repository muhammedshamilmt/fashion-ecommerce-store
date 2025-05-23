import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const orderNumber = params.trackingNumber; // We're reusing the parameter name for compatibility

    // Find the order with the given order number
    const order = await db.collection("orders").findOne({ orderNumber });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Format the response
    const trackingInfo = {
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      currentLocation: order.currentLocation,
      history: order.trackingHistory || []
    };

    return NextResponse.json({
      success: true,
      data: trackingInfo
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track order" },
      { status: 500 }
    );
  }
} 