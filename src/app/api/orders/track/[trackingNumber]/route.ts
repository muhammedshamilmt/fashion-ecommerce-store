import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;
    
    if (!trackingNumber) {
      return NextResponse.json(
        { success: false, error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Try to find order by orderNumber (as string or number)
    const order = await db.collection("orders").findOne({
      $or: [
        { orderNumber: trackingNumber },
        { orderNumber: parseInt(trackingNumber) }
      ]
    });

    if (!order) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Order not found",
          message: "Please check your order number and try again"
        },
        { status: 404 }
      );
    }

    // Format the response
    const trackingInfo = {
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status || 'Processing',
      estimatedDelivery: order.estimatedDelivery || 'Not available',
      currentLocation: order.currentLocation || 'Processing at warehouse',
      history: order.trackingHistory || [
        {
          status: 'Order Placed',
          timestamp: order.createdAt || new Date().toISOString(),
          location: 'Online Store'
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: trackingInfo
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to track order",
        message: error instanceof Error ? error.message : "An unexpected error occurred"
      },
      { status: 500 }
    );
  }
} 