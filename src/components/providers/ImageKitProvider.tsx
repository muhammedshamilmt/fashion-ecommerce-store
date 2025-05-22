'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ImageKitProviderComponent = dynamic(
  () => import('@imagekit/next').then((mod) => mod.ImageKitProvider),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
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