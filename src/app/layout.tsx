import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Micheal Adisa",
  description: `I am a software engineer, highly skilled with web performance, accessibility & UI Engineering. Focused on creating solutions on the web, working with brands and industry leaders such as TLScontact, Kafene, Enyata, Piggyvest amongst others to achieve this.`,
  keywords: [
    "web performance",
    "accessibility",
    "UI Engineering",
    "web",
    "Software Engineer",
    "fintech",
    "e-commerce",
    "Healthcare",
    "SaaS",
    "Lisbon",
    "Portugal",
    "Lagos",
    "Nigeria",
    "Frontend Engineer",
    "Software Enginner",
    "Backend Engineer",
    "Fullstack Engineer",
    "TLScontact",
    "Kafene",
    "Enyata",
    "Piggyvest",
  ],
  twitter: {
    site: "@micheallead",
    title: "Micheal Adisa",
    images: [
      {
        url: "https://michellead.netlify.app/img/heroImage.a0548443.png",
        alt: "Micheal Adisa",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const gooleAnalyticsId = process.env.GOOGlE_ANALYTICS_ID || '';
  console.log('gooleAnalyticsId', gooleAnalyticsId);
  return (
    <html lang="en">
      <body className={`${openSans.variable}`}>{children}</body>
      <GoogleAnalytics gaId={gooleAnalyticsId} />
    </html>
  );
}
