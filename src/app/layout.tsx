import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Micheal Adisa",
  description: `I am a softwarevengineer, highly skilled with webperformance, accessibility & UI Engineering. Focused on creating solutions on the web, working with brands and industry leaders such as TLScontact, Kafene, Enyata, Piggyvest amongst others to achieve this.`,
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
  return (
    <html lang="en">
      <body className={`${openSans.variable}`}>{children}</body>
    </html>
  );
}
