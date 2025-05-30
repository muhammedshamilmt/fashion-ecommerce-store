'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919496817220', '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-12 right-16 z-50 w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5C] shadow-lg flex items-center justify-center p-2 transition-all hover:scale-110 hover:shadow-xl"
      aria-label="Contact on WhatsApp"
    >
      <Image
        src="/whatsapp.png"
        alt="WhatsApp"
        width={32}
        height={32}
        className="w-full h-full object-contain"
      />
      <span className="sr-only">Contact on WhatsApp</span>
    </Button>
  );
};

export default WhatsAppButton; 