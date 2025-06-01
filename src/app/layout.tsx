import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingNavDemo } from "@/components/navigation/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Critical Points Analyzer",
  description: "A mathematical tool for analyzing critical points of 2-variable functions with visualizations, educational content, and interactive features",
  keywords: ["mathematics", "calculus", "critical points", "visualization", "education", "multivariable calculus"],
  authors: [{ name: "Critical Points Analyzer Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FloatingNavDemo />
        {children}
      </body>
    </html>
  );
}
