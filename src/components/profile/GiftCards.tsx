
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Gift, CreditCard, Calendar, ShoppingBag, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Sample gift card
const giftCard = {
  id: "8401",
  balance: 50.00,
  expires: "December 31, 2025",
  status: "Active"
};

// Sample transaction history
const transactions = [
  {
    date: "July 15, 2023",
    cardNumber: "8401",
    type: "Purchase",
    amount: 50.00,
    details: "Card Purchase"
  },
  {
    date: "August 1, 2023",
    cardNumber: "8401",
    type: "Redemption",
    amount: -15.00,
    details: "Order #FF-8545"
  }
];

const GiftCards = () => {
  const [activeTab, setActiveTab] = useState("cards");
  
  const handleAddGiftCard = () => {
    toast.success("Add gift card form opened");
  };
  
  const handlePurchaseGiftCard = () => {
    toast.success("Purchase gift card form opened");
  };
  
  const handleContactSupport = () => {
    toast.info("Connecting to support...");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gift Cards</h2>
          <p className="text-gray-600">Manage your gift cards and view transaction history</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={handleAddGiftCard} 
            className="flex items-center"
          >
            <CreditCard size={16} className="mr-2" />
            Add Gift Card
          </Button>
          <Button 
            onClick={handlePurchaseGiftCard} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
          >
            <Gift size={16} className="mr-2" />
            Purchase Gift Card
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mb-6 bg-gray-100 w-full grid grid-cols-2">
          <TabsTrigger 
            value="cards" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("cards")}
          >
            My Gift Cards
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("history")}
          >
            Transaction History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards" className="space-y-6">
          {/* Gift Card */}
          <div className="max-w-md">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">FashionFit</h3>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {giftCard.status}
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="text-lg font-mono tracking-wider mb-1">
                    •••• •••• •••• {giftCard.id}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-white/90 text-sm">
                  <div>
                    <div className="font-semibold mb-1">Balance</div>
                    <div className="text-xl font-bold text-white">${giftCard.balance.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Expires</div>
                    <div>{giftCard.expires}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gift Card Information */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Gift Card Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <Calendar size={24} />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Never Expires</h4>
                <p className="text-gray-600 text-sm">Our gift cards are valid for 5 years from the date of purchase.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <ShoppingBag size={24} />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Use Online or In-Store</h4>
                <p className="text-gray-600 text-sm">Gift cards can be redeemed online or at any of our retail locations.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <RefreshCw size={24} />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Reloadable</h4>
                <p className="text-gray-600 text-sm">Add more funds to your gift card at any time, up to a maximum balance of $500.</p>
              </div>
            </div>
          </div>
          
          {/* Terms & Conditions */}
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Terms & Conditions</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Gift cards cannot be redeemed for cash or returned for a refund</li>
              <li>Lost, stolen, or damaged gift cards cannot be replaced</li>
              <li>Gift cards may not be used to purchase other gift cards</li>
              <li>We reserve the right to limit gift card purchases or redemptions if fraud is suspected</li>
            </ul>
          </div>
          
          {/* Need Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Need Help?</h4>
            <p className="text-gray-600 mb-4">
              If you have any questions about our gift cards or need assistance, our customer service team is here to help.
            </p>
            <Button
              variant="outline"
              onClick={handleContactSupport}
              className="flex items-center"
            >
              <HelpCircle size={16} className="mr-2" />
              Contact Support
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Gift Card</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Type</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-4 text-sm text-gray-900">{transaction.date}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{transaction.cardNumber}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "Purchase" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {transaction.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GiftCards;
