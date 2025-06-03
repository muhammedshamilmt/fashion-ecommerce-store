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

    // Format the response with more detailed information
    const trackingInfo = {
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status || 'pending',
      estimatedDelivery: order.estimatedDelivery || 'Not available',
      currentLocation: order.currentLocation || 'Processing at warehouse',
      customerInfo: {
        name: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        email: order.customerInfo.email,
        phone: order.customerInfo.phone,
        address: order.customerInfo.address,
        city: order.customerInfo.city,
        state: order.customerInfo.state,
        zipCode: order.customerInfo.zipCode,
        country: order.customerInfo.country
      },
      items: order.items.map((item: any) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image
      })),
      paymentInfo: {
        method: order.paymentMethod,
        status: order.paymentStatus,
        total: order.total,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax
      },
      trackingHistory: order.trackingHistory || [
        {
          status: 'Order Placed',
          timestamp: order.createdAt || new Date().toISOString(),
          location: 'Online Store',
          details: 'Your order has been placed successfully'
        }
      ],
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
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