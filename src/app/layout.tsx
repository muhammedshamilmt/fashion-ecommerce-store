import './globals.css';
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import ClientLayout from './client-layout';
import { ImageKitProvider } from "@/components/providers/ImageKitProvider";

export const metadata: Metadata = {
  title: 'fashion store', // Your website title
  description: 'fashion store', // Your website description
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ImageKitProvider>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </ImageKitProvider>
      </body>
    </html>
  );
}
