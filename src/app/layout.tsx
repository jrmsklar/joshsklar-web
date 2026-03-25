import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Josh Sklar — Product & Engineering Leader",
  description:
    "Product and engineering leader with 14+ years building and scaling consumer apps. Based in New York.",
  openGraph: {
    title: "Josh Sklar — Product & Engineering Leader",
    description:
      "Product and engineering leader with 14+ years building and scaling consumer apps. Based in New York.",
    images: [
      {
        url: "/images/headshot-square.jpg",
        width: 2407,
        height: 2407,
        alt: "Josh Sklar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josh Sklar — Product & Engineering Leader",
    description:
      "Product and engineering leader with 14+ years building and scaling consumer apps. Based in New York.",
    images: ["/images/headshot-square.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased ${geist.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
