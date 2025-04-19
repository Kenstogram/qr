import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import HubSpotChat from "@/components/HubSpotChat";
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // Import Head to add custom meta tags

let title = 'QR Experiences - QR Click Analyics Platform';
let description = 'Create QR Experiences with Click Analytics in seconds';
let url = 'https://www.QRExperiences.com';
let ogimage = 'https://www.QRExperiences.com/og-image.png';
let sitename = 'QRExperiences.com';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Ensure the font swaps with a fallback quickly
  preload: true, // Preload to reduce render-blocking
});

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Add custom meta tags in the <head> */}
        <Head>
          {/* Meta tag for mobile devices */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Ensure the website is added to home screen for mobile devices */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content={description} />
          
          {/* Additional custom meta tags for SEO */}
          <meta property="article:author" content="QRExperiences Team" />
          <meta name="robots" content="index, follow" />
          <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        </Head>

        <Providers>
          {children}
          <Analytics />
        </Providers>
        <HubSpotChat />
        <Footer />
      </body>
    </html>
  );
}
