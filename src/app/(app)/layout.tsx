import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import LoginModal from "@/components/Auth/LoginModal";
import 'react-photo-view/dist/react-photo-view.css';


const montserrat = Montserrat({
  variable: "--font-monstrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greek God",
  description: "Crafted for every journey, designed for every man. Enduring style, unwavering confidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative h-full antialiased ',
          montserrat.variable
        )}
      >
        <NuqsAdapter>
          <TRPCReactProvider >
            <main className='relative flex flex-col min-h-screen'>
              <div className='flex-grow flex-1'>{children}</div>
              <LoginModal />
            </main>
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
