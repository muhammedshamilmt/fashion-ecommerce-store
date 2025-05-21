
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, ShoppingBag, CreditCard, HelpCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Sample returns data
const returns = [
  {
    id: "RET-1001",
    orderId: "FF-8544",
    date: "Aug 15, 2023",
    status: "In Progress",
    items: [
      {
        id: 1,
        name: "Silk Print Blouse",
        reason: "Wrong size",
        qty: 1,
        price: 89.99,
        image: "https://placehold.co/80x80/f0f0f0/909090"
      }
    ]
  }
];

const Returns = () => {
  const [activeTab, setActiveTab] = useState("current");
  
  const handleInitiateReturn = () => {
    toast.success("Return request initiated");
  };
  
  const handleViewDetails = (returnId: string) => {
    toast.info(`Viewing details for return ${returnId}`);
  };
  
  const handlePrintLabel = (returnId: string) => {
    toast.success(`Printing return label for ${returnId}`);
  };
  
  const handleContactSupport = () => {
    toast.info("Connecting to support...");
  };
  
  const handleReadPolicy = () => {
    toast.info("Opening return policy...");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Returns & Refunds</h2>
          <p className="text-gray-600">View and manage your returns and initiate new return requests</p>
        </div>
        <Button 
          onClick={handleInitiateReturn} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
        >
          <ShoppingBag size={16} className="mr-2" />
          Initiate a Return
        </Button>
      </div>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="mb-6 bg-gray-100 w-full grid grid-cols-3">
          <TabsTrigger 
            value="current" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("current")}
          >
            Current Returns
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("completed")}
          >
            Completed Returns
          </TabsTrigger>
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("all")}
          >
            All Returns
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          {returns.length > 0 ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Return header */}
              <div className="grid grid-cols-5 gap-4 px-4 py-4 bg-gray-50">
                <div>
                  <div className="text-xs text-gray-500">Return</div>
                  <div className="font-medium">{returns[0].id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Order</div>
                  <div>#{returns[0].orderId}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date</div>
                  <div>{returns[0].date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {returns[0].status}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(returns[0].id)}
                    className="text-sm"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePrintLabel(returns[0].id)}
                    className="text-sm"
                  >
                    Print Label
                  </Button>
                </div>
              </div>
              
              {/* Return items */}
              <div className="px-4 py-4 border-t border-gray-200">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Returned Items</h4>
                  {returns[0].items.map(item => (
                    <div key={item.id} className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-xs text-gray-500">
                          Reason: {item.reason} • Qty: {item.qty}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No current returns found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No completed returns found.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-6">
          {/* Same content as "current" tab since we only have one return in our example */}
          {/* In a real application, this would show all returns */}
        </TabsContent>
      </Tabs>
      
      {/* Return Policy Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Return Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <Calendar size={24} />
              </div>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">30-Day Returns</h4>
            <p className="text-gray-600 text-sm">Items can be returned within 30 days of delivery for a full refund.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <ShoppingBag size={24} />
              </div>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Unworn Condition</h4>
            <p className="text-gray-600 text-sm">Items must be unworn, unwashed, and with all original tags and packaging.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <CreditCard size={24} />
              </div>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Free Returns</h4>
            <p className="text-gray-600 text-sm">We provide free return shipping for all orders within the US.</p>
          </div>
        </div>
      </div>
      
      {/* Exceptions */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Exceptions</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Intimate apparel, swimwear, and final sale items cannot be returned</li>
          <li>Items marked as "non-returnable" on the product page cannot be returned</li>
          <li>Damaged or defective items should be reported within 7 days of delivery</li>
        </ul>
      </div>
      
      {/* Need Help */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Need Help?</h4>
        <p className="text-gray-600 mb-4">
          If you have any questions about our return policy or need assistance with a return, our customer service team is here to help.
        </p>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleContactSupport}
            className="flex items-center"
          >
            <Phone size={16} className="mr-2" />
            Contact Support
          </Button>
          <Button
            variant="outline"
            onClick={handleReadPolicy}
            className="flex items-center"
          >
            <HelpCircle size={16} className="mr-2" />
            Read Full Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Returns;
