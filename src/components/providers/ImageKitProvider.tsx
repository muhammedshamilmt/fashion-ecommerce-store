'use client';

import { ImageKitProvider as IKProvider } from '@imagekit/next';

export function ImageKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <IKProvider 
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/alhaybha"}
    >
      {children}
    </IKProvider>
  );
} 