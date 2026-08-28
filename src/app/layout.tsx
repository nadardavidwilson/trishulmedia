import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000",
  ),
  title: {
    default: "Trishul Media & Films | Cinematic Photography",
    template: "%s | Trishul Media & Films",
  },
  description:
    "Trishul Media & Films captures pre-weddings, maternity sessions and small events with cinematic storytelling.",
  keywords: [
    "Trishul Media & Films",
    "pre-wedding photography",
    "maternity photography",
    "event photography",
    "cinematic photography",
  ],
  authors: [{ name: "Trishul Media & Films" }],
  creator: "Trishul Media & Films",
  icons: {
    icon: [{ url: "/logo.jpg", type: "image/jpeg" }],
    apple: [{ url: "/logo.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Trishul Media & Films | Cinematic Photography",
    description:
      "Cinematic pre-wedding, maternity and small event photography by Trishul Media & Films.",
    siteName: "Trishul Media & Films",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1080, height: 1080, alt: "Trishul Media & Films logo" }],
  },
  twitter: {
    card: "summary",
    title: "Trishul Media & Films | Cinematic Photography",
    description:
      "Cinematic pre-wedding, maternity and small event photography by Trishul Media & Films.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fffaf7]">{children}</body>
    </html>
  );
}
