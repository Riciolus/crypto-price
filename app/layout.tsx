import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JarJarCoin",
  description: "Cryptocurrencies Prices and Charts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav>
          <Link href="/">
            <div className="w-full border-b border-neutral-700/50 px-5 py-3 bg-neutral-950">
              <h1 className="text-xl font-bold font-mono">JarJar Coin</h1>
            </div>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
