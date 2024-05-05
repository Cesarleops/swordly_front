import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Settings } from "./components/user/settings";

const inter = Inter({ subsets: ["latin"] });

const monserrat = Montserrat({ subsets: ["latin"] });
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
      <body className={monserrat.className}>
        <header className="w-full py-3 px-3 font-bold flex justify-start items-center pl-10">
          <Link
            href="/"
            className="border-2 border-slate-100 rounded-xl p-2 mr-auto"
          >
            Swordly
          </Link>
          <Settings />
        </header>
        {children}
      </body>
    </html>
  );
}
