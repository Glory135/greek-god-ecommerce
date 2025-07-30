import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Greek God",
  description: "Learn about Greek God, a clothing brand empowering you to express your authentic self with enduring style and confidence.",
  openGraph: {
    title: "About Us | Greek God",
    description: "Learn about Greek God, a clothing brand empowering you to express your authentic self with enduring style and confidence.",
    images: [
      {
        url: "/logo/logo-icon.png",
        width: 1200,
        height: 630,
        alt: "Greek God About Us"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Greek God",
    description: "Learn about Greek God, a clothing brand empowering you to express your authentic self with enduring style and confidence.",
    images: [
      {
        url: "/logo/logo-full.png",
        alt: "Greek God About Us"
      }
    ]
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 