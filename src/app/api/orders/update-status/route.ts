import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { orderId, status, paymentId, errorCode, errorDescription } = await request.json();

    const { db } = await connectToDatabase();

    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (paymentId) {
      updateData.paymentId = paymentId;
    }

    if (errorCode) {
      updateData.paymentError = {
        code: errorCode,
        description: errorDescription,
      };
    }

    // Add to tracking history
    updateData.$push = {
      trackingHistory: {
        status,
        timestamp: new Date().toISOString(),
        details: errorDescription || 'Payment status updated',
      },
    };

    const result = await db.collection('orders').updateOne(
      { orderNumber: orderId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { success: false, message: "Error updating order status" },
      { status: 500 }
    );
  }
} 