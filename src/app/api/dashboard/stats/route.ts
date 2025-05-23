import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get total revenue
    const revenueResult = await db.collection('orders').aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' }
        }
      }
    ]).toArray();
    
    // Get total orders
    const totalOrders = await db.collection('orders').countDocuments();
    
    // Get unique customers
    const uniqueCustomers = await db.collection('orders').distinct('userId');
    
    // Get pending orders
    const pendingOrders = await db.collection('orders').countDocuments({
      status: { $in: ['pending', 'processing'] }
    });
    
    // Get last month's revenue for comparison
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastMonthRevenue = await db.collection('orders').aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]).toArray();

    // Get daily sales for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailySales = await db.collection('orders').aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          sales: { $sum: "$total" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Get monthly revenue for the last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    const monthlyRevenue = await db.collection('orders').aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt"
            }
          },
          revenue: { $sum: "$total" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Get latest 5 orders
    const recentOrders = await db.collection('orders')
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Format daily sales data
    const formattedDailySales = dailySales.map(day => ({
      date: day._id,
      sales: day.sales
    }));

    // Format monthly revenue data
    const formattedMonthlyRevenue = monthlyRevenue.map(month => ({
      month: month._id,
      revenue: month.revenue
    }));

    return NextResponse.json({
      totalRevenue: revenueResult[0]?.totalRevenue || 0,
      totalOrders,
      uniqueCustomers: uniqueCustomers.length,
      pendingOrders,
      lastMonthRevenue: lastMonthRevenue[0]?.total || 0,
      dailySales: formattedDailySales,
      monthlyRevenue: formattedMonthlyRevenue,
      recentOrders
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
} 