import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = 'force-dynamic'; // Disable caching at the route level

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderStats {
  total: number;
  byStatus: Record<OrderStatus, number>;
  recentOrders: number;
  totalRevenue: number;
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get total count of orders
    const totalOrders = await db.collection("orders").countDocuments();
    
    // Get count of orders by status with proper error handling
    const statusCounts = await db.collection("orders").aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    // Initialize stats with default values
    const orderStats: OrderStats = {
      total: totalOrders || 0,
      byStatus: {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      },
      recentOrders: 0,
      totalRevenue: 0
    };

    // Fill in the counts with validation
    statusCounts.forEach(({ _id, count }) => {
      if (_id && typeof count === 'number') {
        const status = _id.toLowerCase() as OrderStatus;
        if (status in orderStats.byStatus) {
          orderStats.byStatus[status] = count;
        }
      }
    });

    // Get recent orders count (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    orderStats.recentOrders = await db.collection("orders").countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Calculate total revenue
    const revenueResult = await db.collection("orders").aggregate([
      {
        $match: {
          status: { $ne: "cancelled" }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]).toArray();

    orderStats.totalRevenue = revenueResult[0]?.total || 0;

    return NextResponse.json(
      { 
        success: true, 
        data: orderStats 
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error("Error fetching order statistics:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch order statistics",
        message: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
} 