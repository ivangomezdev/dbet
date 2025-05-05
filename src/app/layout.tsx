import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import "./globals.css";
import { initDB } from '../lib/init-db.js';
import AllProviders from "./AllProviders"
import DataFetcher from "./DataFetcher";
initDB();



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Winbet420 - Gana con matchbetting",
  description: "Unete",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={` ${geistMono.variable} `}> {/* Apply the font variable */}
      <AllProviders>
        <DataFetcher/>
          {children}
          </AllProviders>
      </body>
    </html>
  );
}
