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
      // Try using the Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(orderNumber);
      } else {
        // Fallback for non-secure contexts or when Clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = orderNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
        } catch (err) {
          console.error('Fallback copy failed:', err);
          textArea.remove();
          throw new Error('Copy failed');
        }
      }
      
      setCopied(true);
      toast.success('Order number copied to clipboard!');
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error('Failed to copy order number. Please try selecting and copying manually.');
      
      // Create a temporary input for manual copy
      const tempInput = document.createElement('input');
      tempInput.value = orderNumber;
      tempInput.style.position = 'fixed';
      tempInput.style.left = '-999999px';
      tempInput.style.top = '-999999px';
      document.body.appendChild(tempInput);
      tempInput.select();
      tempInput.focus();
      
      // Remove the temporary input after a short delay
      setTimeout(() => {
        document.body.removeChild(tempInput);
      }, 100);
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
            <span className="text-lg font-semibold text-gray-900 select-all">{orderNumber}</span>
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