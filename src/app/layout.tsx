import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

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
      { url: 'https://res.cloudinary.com/dllkefj8m/image/upload/v1746635198/wbet-removebg-preview_fw5m6l.png', type: 'image/x-icon' },
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
      <body className={geistMono.variable}>
        <AllProviders>
          <DataFetcher />
          {children}
        </AllProviders>
      </body>
    </html>
  );
}