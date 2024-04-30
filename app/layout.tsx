import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <header className="w-full py-3 pl-3 font-bold flex justify-start  ">
          <Link href="/" className="border-2 border-slate-100 rounded-xl p-2">
            Swordly
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
