"use client";

import Providers from "@/components/Providers";
import Layout from "@/components/layout";
import Header from "@/components/layout/Header";

import "@/styles/globals.css";

import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Providers>
          <Layout>
            <Header />
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
