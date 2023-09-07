'use client'
import { ExpandContextProvider } from "@/components/contexts/expandNavBarContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageContextProvider } from "@/components/contexts/langueContext";
import TraductionProvider from "@/lib/Traduction";
import { SessionProvider } from "next-auth/react"
// import TraductionProvider from "@/app/lib/Traduction"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "test app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider >
          <LocalizationProvider dateAdapter={AdapterDayjs}>

        <ExpandContextProvider>
          <LanguageContextProvider>
            <TraductionProvider>{children}</TraductionProvider>
          </LanguageContextProvider>
        </ExpandContextProvider>
          </LocalizationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
