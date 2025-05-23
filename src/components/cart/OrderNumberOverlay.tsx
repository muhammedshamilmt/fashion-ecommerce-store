'use client'

import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OrderNumberOverlayProps {
  orderNumber: string;
  onClose: () => void;
}

const OrderNumberOverlay: React.FC<OrderNumberOverlayProps> = ({ orderNumber, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      toast.success('Order number copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy order number');
    }
  };

  const handleClose = () => {
    if (!copied) {
      toast.info('Please copy your order number before continuing');
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600">Please save your order number for tracking</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">{orderNumber}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-gray-600 hover:text-gray-900"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            You can use this order number to track your order status
          </p>
          <Button
            onClick={handleClose}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!copied}
          >
            {copied ? 'Continue' : 'Copy Order Number'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderNumberOverlay; 