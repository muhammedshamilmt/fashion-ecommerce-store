'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from "lucide-react";

const ImageKitProviderComponent = dynamic(
  () => import('@imagekit/next').then((mod) => mod.ImageKitProvider),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-[400px] h-[400px] flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <Loader2 className="w-8 h-8 animate-spin text-fashion-primary" />
          <div className="flex flex-col items-center space-y-6">
            <p className="text-fashion-primary font-medium">Loading </p>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-fashion-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-fashion-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-fashion-primary rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export function ImageKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading ImageKit...</div>}>
      <ImageKitProviderComponent 
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/alhaybha"}
      >
        {children}
      </ImageKitProviderComponent>
    </Suspense>
  );
} 