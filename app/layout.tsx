import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import Link from "next/link";
import { Settings } from "./components/user/settings";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Swordly",
  description: "Generate and manage links easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="../favicon.ico "></link>
      <body className={GeistMono.className}>
        <header className="w-full py-3 px-3 font-bold flex justify-start items-center pl-10">
          <Link
            href="/"
            className="border-2 border-slate-100 rounded-xl p-2 mr-auto"
          >
            Swordly
          </Link>
          <Settings />
        </header>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
