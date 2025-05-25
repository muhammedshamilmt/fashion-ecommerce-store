import './globals.css';
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import ClientLayout from './client-layout';
import { ImageKitProvider } from "@/components/providers/ImageKitProvider";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'AL-HAYBA', // Your website title
  description: '🤍 Elevate.Shine.Own White Fashion.', // Your website description
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={<div>hello</div>}>
          <ImageKitProvider>
            <Providers>
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </ImageKitProvider>
        </Suspense>
      </body>
    </html>
  );
}
