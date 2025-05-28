import Razorpay from 'razorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number) => {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const handleRazorpayPayment = async (
  orderId: string,
  amount: number,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  const res = await initializeRazorpay();

  if (!res) {
    onError('Razorpay SDK failed to load');
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    name: 'Fashion E-commerce',
    description: 'Payment for your order',
    order_id: orderId,
    handler: function (response: any) {
      onSuccess(response);
    },
    prefill: {
      name: 'Customer Name',
      email: 'customer@example.com',
      contact: '9999999999',
    },
    theme: {
      color: '#4AA79F',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}; 