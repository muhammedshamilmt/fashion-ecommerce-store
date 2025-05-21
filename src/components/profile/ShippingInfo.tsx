
import React from "react";
import { Edit2, Trash2, MapPin, Home, Briefcase, Plus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Sample shipping addresses
const addresses = [
  {
    id: 1,
    type: "Home",
    isDefault: true,
    street: "123 Main Street",
    apt: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States"
  },
  {
    id: 2,
    type: "Work",
    isDefault: false,
    street: "456 Business Avenue",
    apt: "Floor 3",
    city: "New York",
    state: "NY",
    zip: "10018",
    country: "United States"
  }
];

// Sample FAQ items
const faqs = [
  {
    question: "What are the shipping costs?",
    answer: "We offer free standard shipping on all orders over $100. For orders under $100, standard shipping costs $5.99. Express shipping is available for $9.99."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days. Express shipping takes 1-2 business days."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also track your order through your account dashboard."
  }
];

const ShippingInfo = () => {
  const handleAddAddress = () => {
    toast.success("Add new address form opened");
  };
  
  const handleEditAddress = (id: number) => {
    toast.info(`Editing address ${id}`);
  };
  
  const handleDeleteAddress = (id: number) => {
    toast.success(`Address ${id} deleted`);
  };
  
  const handleMakeDefault = (id: number) => {
    toast.success(`Address ${id} set as default`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Information</h2>
          <p className="text-gray-600">Manage your shipping addresses</p>
        </div>
        <Button 
          onClick={handleAddAddress} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add New Address
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {addresses.map(address => (
          <div 
            key={address.id} 
            className={`p-6 rounded-lg ${
              address.isDefault 
                ? 'bg-white border-2 border-indigo-600' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-2">
                  {address.type === "Home" ? <Home size={16} /> : <Briefcase size={16} />}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{address.type}</h3>
                {address.isDefault && (
                  <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => handleEditAddress(address.id)}
                  className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                {!address.isDefault && (
                  <button 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="text-gray-600 mb-6">
              <p>{address.street}</p>
              {address.apt && <p>{address.apt}</p>}
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>
            
            {!address.isDefault && (
              <Button 
                variant="outline" 
                onClick={() => handleMakeDefault(address.id)}
                className="text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 w-full"
              >
                Make Default
              </Button>
            )}
          </div>
        ))}
      </div>
      
      {/* Shipping FAQs */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Shipping FAQs</h3>
        <Accordion type="single" collapsible className="border rounded-lg">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ShippingInfo;
