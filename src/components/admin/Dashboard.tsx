'use client';

import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  CreditCard, 
  DollarSign, 
  PackageOpen, 
  Users,
  ArrowUpRight,
  ShoppingBag,
  TrendingUp,
  Calendar,
  Clock,
  Loader2
} from "lucide-react";
import { salesData, categoryData, orders } from "@/utils/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface Order {
  _id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
}

interface DailySales {
  date: string;
  sales: number;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  uniqueCustomers: number;
  pendingOrders: number;
  lastMonthRevenue: number;
  dailySales: DailySales[];
  monthlyRevenue: { month: string; revenue: number }[];
  recentOrders: Order[];
}

interface OrderStats {
  total: number;
  byStatus: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
  };
}

const formatDate = (date: Date): string => {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

const formatTableDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const Dashboard: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    uniqueCustomers: 0,
    pendingOrders: 0,
    lastMonthRevenue: 0,
    dailySales: [],
    monthlyRevenue: [],
    recentOrders: []
  });
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
    setLastUpdated(formatDate(new Date()));
  }, []);

  useEffect(() => {
    fetchOrderStats();
  }, []);

  const fetchOrderStats = async () => {
    try {
      const response = await fetch('/api/orders/stats');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch order statistics");
      }

      if (result.success) {
        setOrderStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching order statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate revenue growth
  const revenueGrowth = stats.lastMonthRevenue > 0 
    ? ((stats.totalRevenue - stats.lastMonthRevenue) / stats.lastMonthRevenue) * 100 
    : 0;

  // Colors for charts
  const COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#ec4899'];
    
  // Revenue trend data (last 7 days)
  const last7DaysData = salesData.slice(-7);
  
  // Transform order stats for the pie chart
  const orderStatusData = orderStats ? [
    { name: 'Pending', value: orderStats.byStatus.pending },
    { name: 'Processing', value: orderStats.byStatus.processing },
    { name: 'Shipped', value: orderStats.byStatus.shipped },
    { name: 'Delivered', value: orderStats.byStatus.delivered }
  ] : [];

  // Format date for display
  const formatChartDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className=" space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-fashion-primary">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome to your dashboard analytics</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <span className={`flex items-center {revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <ArrowUpRight size={16} />
                    {Math.abs(revenueGrowth).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Orders</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight size={16} />
                    {((stats.totalOrders / (stats.totalOrders - stats.pendingOrders)) * 100).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground ml-1">completion rate</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Customers</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight size={16} />
                    {((stats.totalOrders / (stats.totalOrders - stats.pendingOrders)) * 100).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground ml-1">repeat rate</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Pending Orders</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pendingOrders}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-amber-500 flex items-center">
                    <Clock size={16} className="mr-1" />
                    Needs attention
                  </span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <PackageOpen className="text-amber-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily revenue for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-full pt-6">
            <ChartContainer
              config={{
                sales: {
                  label: "Revenue",
                  color: "#4f46e5",
                },
              }}
            >
              <BarChart
                data={stats.dailySales}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatChartDate}
                />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`₹${value}`, "Revenue"]}
                    />
                  }
                />
                <Bar 
                  dataKey="sales" 
                  fill="var(--color-sales, #4f46e5)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Order Status and Revenue Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Current status of all orders</CardDescription>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-[#4AA79F]" />
              </div>
            ) : orderStats ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`status-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} orders`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No order data available
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.monthlyRevenue}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(value) => {
                    const [year, month] = value.split('-');
                    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' });
                  }}
                />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                  labelFormatter={(value) => {
                    const [year, month] = value.split('-');
                    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ fill: '#4f46e5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer transactions</CardDescription>
            </div>
            <button className="text-primary text-sm font-medium hover:underline">
              View All
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">#{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{formatTableDate(new Date(order.createdAt))}</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
