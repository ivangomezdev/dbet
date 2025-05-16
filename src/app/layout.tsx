'use client';

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { useEffect } from "react";

import "./globals.css";
import { initDB } from '../lib/init-db.js';
import AllProviders from "./AllProviders";
import DataFetcher from "./DataFetcher";

initDB();

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Winbet420 - Gana con matchbetting",
  description: "Unete",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      console.info = () => {};
    }
  }, []);

  return (
    <html lang="en">
      <body className={geistMono.variable}>
        <AllProviders>
          <DataFetcher />
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
