import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get total count of orders
    const totalOrders = await db.collection("orders").countDocuments();
    
    // Get count of orders by status
    const statusCounts = await db.collection("orders").aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    // Transform the data into the required format
    const orderStats = {
      total: totalOrders,
      byStatus: {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0
      }
    };

    // Fill in the counts
    statusCounts.forEach(({ _id, count }) => {
      orderStats.byStatus[_id] = count;
    });

    return NextResponse.json({
      success: true,
      data: orderStats
    });
  } catch (error) {
    console.error("Error fetching order statistics:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch order statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 