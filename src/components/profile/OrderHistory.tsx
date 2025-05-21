import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Truck } from "lucide-react";

// Sample order data
const orders = [
  {
    id: "FF-8546",
    date: "Aug 12, 2023",
    total: 128.50,
    status: "Shipped",
    items: [
      { id: 1, name: "Floral Summer Dress", size: "M", qty: 1, price: 49.99, image: "https://placehold.co/80x80/f0f0f0/909090" },
      { id: 2, name: "Canvas Sneakers", size: "9", qty: 1, price: 59.99, image: "https://placehold.co/80x80/f0f0f0/909090" }
    ]
  },
  {
    id: "FF-8545",
    date: "Jul 28, 2023",
    total: 89.99,
    status: "Delivered",
    items: [
      { id: 3, name: "Silk Print Blouse", size: "S", qty: 1, price: 89.99, image: "https://placehold.co/80x80/f0f0f0/909090" }
    ]
  }
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });
  
  // Toggle order details visibility
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Order History</h2>
      <p className="text-gray-600 mb-6">View and manage your past orders</p>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-gray-100 w-full grid grid-cols-4">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("all")}
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger 
            value="processing" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("processing")}
          >
            Processing
          </TabsTrigger>
          <TabsTrigger 
            value="shipped" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("shipped")}
          >
            Shipped
          </TabsTrigger>
          <TabsTrigger 
            value="delivered" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("delivered")}
          >
            Delivered
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Order header */}
                  <div className="grid grid-cols-5 gap-4 px-4 py-4 bg-gray-50">
                    <div>
                      <div className="text-xs text-gray-500">Order</div>
                      <div className="font-medium">#{order.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Placed on</div>
                      <div>{order.date}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                        order.status === "Shipped" ? "bg-blue-100 text-blue-800" : 
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      {order.status === "Shipped" && (
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Order details (expanded) */}
                  {expandedOrders[order.id] && (
                    <div className="px-4 py-4 border-t border-gray-200">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items in this order</h4>
                        <div className="space-y-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Size: {item.size} • Qty: {item.qty}
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="processing" className="space-y-6">
          {/* Processing orders content */}
          <div className="text-center py-10">
            <p className="text-gray-500">No processing orders found.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="shipped" className="space-y-6">
          {/* Shipped orders content */}
          {orders.filter(order => order.status === "Shipped").length > 0 ? (
            <div className="space-y-6">
              {orders.filter(order => order.status === "Shipped").map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Order header */}
                  <div className="grid grid-cols-5 gap-4 px-4 py-4 bg-gray-50">
                    <div>
                      <div className="text-xs text-gray-500">Order</div>
                      <div className="font-medium">#{order.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Placed on</div>
                      <div>{order.date}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.status}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                        Track Order
                      </button>
                    </div>
                  </div>
                  
                  {/* Order details (expanded) */}
                  {expandedOrders[order.id] && (
                    <div className="px-4 py-4 border-t border-gray-200">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items in this order</h4>
                        <div className="space-y-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Size: {item.size} • Qty: {item.qty}
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No shipped orders found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="delivered" className="space-y-6">
          {/* Delivered orders content */}
          {orders.filter(order => order.status === "Delivered").length > 0 ? (
            <div className="space-y-6">
              {orders.filter(order => order.status === "Delivered").map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Order header */}
                  <div className="grid grid-cols-5 gap-4 px-4 py-4 bg-gray-50">
                    <div>
                      <div className="text-xs text-gray-500">Order</div>
                      <div className="font-medium">#{order.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Placed on</div>
                      <div>{order.date}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Order details (expanded) */}
                  {expandedOrders[order.id] && (
                    <div className="px-4 py-4 border-t border-gray-200">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items in this order</h4>
                        <div className="space-y-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Size: {item.size} • Qty: {item.qty}
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No delivered orders found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
