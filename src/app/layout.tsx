import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
