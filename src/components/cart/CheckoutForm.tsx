'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  CreditCard,
  Check,
  MapPin,
  Truck,
  ShieldCheck,
  DollarSign,
  Wallet,
  Phone,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import OrderNumberOverlay from "./OrderNumberOverlay";
import { handleRazorpayPayment, createRazorpayOrder } from '@/utils/razorpay';

interface CheckoutFormProps {
  subtotal: number;
  isDirectPurchase?: boolean;
  directPurchaseDetails?: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  subtotal, 
  isDirectPurchase = false,
  directPurchaseDetails 
}) => {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderNumber, setShowOrderNumber] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [pendingOrderData, setPendingOrderData] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Fetch product details for direct purchase
  useEffect(() => {
    if (isDirectPurchase && directPurchaseDetails) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${directPurchaseDetails.productId}`);
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch product');
          }

          if (!result.success) {
            throw new Error(result.error || 'Failed to fetch product');
          }

          setProduct(result.data);
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error(error instanceof Error ? error.message : 'Failed to fetch product');
        }
      };

      fetchProduct();
    }
  }, [isDirectPurchase, directPurchaseDetails]);

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp.slice(-6)}-${random}`;
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const shipping = 10;
      const tax = subtotal * 0.07;
      const total = subtotal + shipping + tax;
      const generatedOrderNumber = generateOrderNumber();

      if (paymentMethod === "online_payment") {
        // Create Razorpay order
        const orderResponse = await createRazorpayOrder(total);
        
        if (!orderResponse.success) {
          throw new Error('Failed to create payment order');
        }

        // Handle Razorpay payment
        await handleRazorpayPayment(
          orderResponse.data.id,
          total,
          async (response) => {
            try {
              // Payment successful, create order
              const orderData = {
                orderNumber: generatedOrderNumber,
                customerInfo: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  phone: data.phone,
                  address: data.address,
                  city: data.city,
                  state: data.state,
                  zipCode: data.zipCode,
                  country: data.country,
                },
                paymentDetails: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
                items: isDirectPurchase && product ? [{
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: directPurchaseDetails?.quantity || 1,
                  size: directPurchaseDetails?.size || '',
                  color: directPurchaseDetails?.color || '',
                  image: product.images[0],
                }] : items.map(item => ({
                  productId: item.product._id,
                  name: item.product.name,
                  price: item.product.price,
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color,
                  image: item.product.images[0],
                })),
                subtotal,
                shipping,
                tax,
                total,
                paymentMethod,
                status: 'confirmed',
                currentLocation: 'Processing at warehouse',
                estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                trackingHistory: [
                  {
                    status: 'Payment Confirmed',
                    location: 'Processing at warehouse',
                    timestamp: new Date().toISOString()
                  }
                ]
              };

              // Save the order to database
              const saveResponse = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
              });

              const result = await saveResponse.json();

              if (!saveResponse.ok || !result.success) {
                throw new Error(result.error || 'Failed to create order');
              }

              // Show success message
              toast.success('Payment successful! Order placed.');
              
              // Clear cart and reset state
              if (!isDirectPurchase) {
                clearCart();
              }
              setPendingOrderData(null);
              
              // Redirect to order confirmation
              router.push(`/order-confirmation?orderNumber=${generatedOrderNumber}`);
            } catch (error) {
              toast.error('Payment successful but failed to create order. Please contact support.');
              console.error('Error creating order after payment:', error);
            }
          },
          (error) => {
            toast.error('Payment failed: ' + error);
            setIsSubmitting(false);
          }
        );
      } else {
        // Handle cash on delivery
        const orderData = {
          orderNumber: generatedOrderNumber,
          customerInfo: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country,
          },
          items: isDirectPurchase && product ? [{
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: directPurchaseDetails?.quantity || 1,
            size: directPurchaseDetails?.size || '',
            color: directPurchaseDetails?.color || '',
            image: product.images[0],
          }] : items.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.product.images[0],
          })),
          subtotal,
          shipping,
          tax,
          total,
          paymentMethod,
          status: 'pending',
          currentLocation: 'Processing at warehouse',
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          trackingHistory: [
            {
              status: 'Order Placed',
              location: 'Processing at warehouse',
              timestamp: new Date().toISOString()
            }
          ]
        };

        // Store the order data and show overlay
        setPendingOrderData(orderData);
        setOrderNumber(generatedOrderNumber);
        setShowOrderNumber(true);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to process order");
      console.error("Error processing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseOrderNumber = async () => {
    try {
      if (!pendingOrderData) return;

      // Save the order to database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pendingOrderData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error || result.details || "Failed to create order";
        throw new Error(errorMessage);
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to create order");
      }

      // Show success message
      toast.success("Order placed successfully!");
      
      // Clear cart and reset state
      if (!isDirectPurchase) {
        clearCart();
      }
      setPendingOrderData(null);
      setShowOrderNumber(false);
      
      // Use setTimeout to ensure state updates are complete before navigation
      setTimeout(() => {
        router.push(`/order-confirmation?orderNumber=${orderNumber}`);
      }, 100);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save order");
      console.error("Error saving order:", error);
    }
  };

  const shipping = 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <>
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-fashion-primary">Shipping Information</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName", { required: true })}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">First name is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName", { required: true })}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">Last name is required</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Valid email is required</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              {...register("phone", { required: true })}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">Phone number is required</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="123 Fashion Street"
              {...register("address", { required: true })}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">Address is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                {...register("city", { required: true })}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">City is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="NY"
                {...register("state", { required: true })}
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">State is required</p>
              )}
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                {...register("zipCode", { required: true })}
                className={errors.zipCode ? "border-red-500" : ""}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">ZIP code is required</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="United States"
              {...register("country", { required: true })}
              className={errors.country ? "border-red-500" : ""}
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">Country is required</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="pt-6 space-y-4">
            <h3 className="text-md font-semibold text-gray-700">Payment Method</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex flex-col space-y-2"
            >
              <div className={`flex items-center justify-between p-4 border rounded-lg ${paymentMethod === "cash_on_delivery" ? "border-fashion-secondary bg-fashion-secondary/5" : "border-gray-200"}`}>
                <div className="flex items-center">
                  <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                  <Label htmlFor="cash_on_delivery" className="ml-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-fashion-primary" />
                    <span>Cash on Delivery</span>
                  </Label>
                </div>
              </div>

              <div className={`flex items-center justify-between p-4 border rounded-lg ${paymentMethod === "online_payment" ? "border-fashion-secondary bg-fashion-secondary/5" : "border-gray-200"}`}>
                <div className="flex items-center">
                  <RadioGroupItem value="online_payment" id="online_payment" />
                  <Label htmlFor="online_payment" className="ml-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-fashion-primary" />
                    <span>Online Payment</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {paymentMethod === "cash_on_delivery" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  You will pay the amount at the time of delivery. Please have the exact amount ready.
                </p>
              </div>
            )}

            {paymentMethod === "online_payment" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  You will be redirected to our secure payment gateway to complete your payment.
                </p>
              </div>
            )}
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-fashion-secondary hover:bg-fashion-secondary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                paymentMethod === "cash_on_delivery" ? "Place Order" : `Pay Now (₹${total.toFixed(2)})`
              )}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-fashion-primary/70">Secure Payment</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-fashion-primary/70">Fast Shipping</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <Check className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-xs text-fashion-primary/70">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
      
      {showOrderNumber && (
        <OrderNumberOverlay
          orderNumber={orderNumber}
          onClose={handleCloseOrderNumber}
        />
      )}
    </>
  );
};

export default CheckoutForm;
