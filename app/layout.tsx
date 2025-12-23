import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
            <div className="w-full border-b flex items-center gap-3 border-neutral-700/50 px-5 py-3 bg-neutral-950">
              <Image alt="" src="/logo.png" width={32} height={32} />
              <h1 className="text-xl font-bold font-mono">JarJar Coin</h1>
            </div>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
