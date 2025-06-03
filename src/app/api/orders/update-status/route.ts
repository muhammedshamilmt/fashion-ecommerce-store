import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define valid payment statuses
const VALID_PAYMENT_STATUSES = ['success', 'failed', 'pending', 'refunded', 'cancelled'];

export async function POST(request: Request) {
  try {
    const { orderId, status, paymentStatus, paymentId, errorCode, errorDescription } = await request.json();

    // Validate payment status
    if (paymentStatus && !VALID_PAYMENT_STATUSES.includes(paymentStatus.toLowerCase())) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid payment status",
          validStatuses: VALID_PAYMENT_STATUSES 
        },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // First, get the current order to check its status
    const currentOrder = await db.collection('orders').findOne({ orderNumber: orderId });

    if (!currentOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    // Handle payment status update
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus.toLowerCase();
      
      // Add payment-specific details
      if (paymentStatus.toLowerCase() === 'success') {
        updateData.paymentDetails = {
          ...currentOrder.paymentDetails,
          razorpay_payment_id: paymentId,
          paidAt: new Date().toISOString(),
          status: 'success'
        };
        // Clear any previous payment errors
        updateData.paymentError = null;
      } else if (paymentStatus.toLowerCase() === 'failed') {
        updateData.paymentError = {
          code: errorCode || 'PAYMENT_FAILED',
          description: errorDescription || 'Payment failed',
          failedAt: new Date().toISOString()
        };
      }
    }

    // Add to tracking history with more detailed information
    const trackingEntry = {
      status: paymentStatus || status,
      timestamp: new Date().toISOString(),
      location: currentOrder.currentLocation || 'Online Store',
      details: paymentStatus 
        ? `Payment ${paymentStatus.toLowerCase()}: ${errorDescription || 'No additional details'}`
        : errorDescription || 'Status updated'
    };

    updateData.$push = {
      trackingHistory: trackingEntry
    };

    // Update the order
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

    // Get the updated order to return in response
    const updatedOrder = await db.collection('orders').findOne({ orderNumber: orderId });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Failed to retrieve updated order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      data: {
        orderNumber: updatedOrder.orderNumber,
        paymentStatus: updatedOrder.paymentStatus,
        status: updatedOrder.status,
        updatedAt: updatedOrder.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Error updating order status",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 