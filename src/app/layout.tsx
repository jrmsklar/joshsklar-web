import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Josh Sklar — Product & Engineering Leader",
  description:
    "Product and engineering leader with 14+ years building and scaling consumer apps. Based in New York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased ${geist.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
