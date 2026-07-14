import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.ajantacorporategifting.com";
const SITE_NAME = "Ajanta Corporate Gifting";
const SITE_DESCRIPTION =
  "India's trusted partner for corporate gifting — onboarding kits, festive hampers, executive sets, and event merchandise, delivered pan-India on time and on brand.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Corporate Gifting, Built to Specification`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "corporate gifting",
    "corporate gifts India",
    "business gifting",
    "onboarding kits",
    "festive hampers",
    "executive gifts",
    "branded merchandise",
    "promotional products",
    "custom corporate gifts",
    "pan-India gifting",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Business",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/Mainlogo.png", type: "image/png" },
    ],
    apple: [{ url: "/Mainlogo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Corporate Gifting, Built to Specification`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/Mainlogo.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Corporate Gifting, Built to Specification`,
    description: SITE_DESCRIPTION,
    images: ["/Mainlogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
