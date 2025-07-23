import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import LoginModal from "@/components/Auth/LoginModal";
import 'react-photo-view/dist/react-photo-view.css';
import { SOCIAL_LINKS } from "@/constants";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const montserrat = Montserrat({
  variable: "--font-monstrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Greek God",
    template: "%s | Greek God"
  },
  description: "Crafted for every journey, designed for every man. Enduring style, unwavering confidence.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing"),
  keywords: [
    // Original keywords
    'greekgod',
    'GreekGod',
    'greek god',
    'Greek God',
    'clothing',
    'e-commerce',
    'ecommerce',
    'clothing brand',
    'greekgod clothing',
    'Greek god clothing brand',
    'buy clothes',

    // Branded & Niche Keywords
    'greekgod apparel',
    'greekgod fashion',
    'greekgod store',
    'greekgod streetwear',
    'greekgod clothing line',
    'greekgod lifestyle',

    // Product-Specific Keywords
    'unisex streetwear',
    'urban fashion',
    'bold graphic tees',
    'modern greek fashion',
    'gods and goddesses clothing',
    'luxury streetwear',
    'greek god t-shirts',
    'aesthetic clothing brand',

    // Shopping Intent Keywords
    'shop greek god clothing',
    'where to buy streetwear',
    'affordable greek god apparel',
    'trendy clothes online',
    'shop bold statement fashion',
    'unique graphic t-shirts',

    // Audience Targeting Keywords
    'empowering clothing brand',
    'clothing for confident people',
    'streetwear for creatives',
    'express yourself fashion',
    'motivational streetwear',
  ],
  openGraph: {
    title: "Greek God",
    description: "Crafted for every journey, designed for every man. Enduring style, unwavering confidence.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing",
    siteName: "Greek God",
    images: [
      {
        url: "/logo/logo-icon.png",
        width: 1200,
        height: 630,
        alt: "Greek God - Enduring style, unwavering confidence."
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Greek God",
    description: "Crafted for every journey, designed for every man. Enduring style, unwavering confidence.",
    images: [
      {
        url: "/logo/logo-full.png",
        alt: "Greek God - Enduring style, unwavering confidence."
      }
    ],
    creator: "@greekgodbrand"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing"
  }
};

export const viewport = {
  themeColor: "#456d45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Organization JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Greek God",
              "url": process.env.NEXT_PUBLIC_APP_URL || "https://www.greekgod.clothing",
              "logo": "/logo/logo-icon.png",
              "sameAs": [
                SOCIAL_LINKS.instagram,
                SOCIAL_LINKS.tiktok
              ]
            })
          }}
        />
      </head>
      <body
        className={cn(
          'relative h-full antialiased ',
          montserrat.variable
        )}
      >
        <Analytics />
        <SpeedInsights />
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
