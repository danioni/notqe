import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fed Watch — Monetary Surveillance",
  description: "Surveillance system documenting 50+ years of systematic monetary manipulation by the Federal Reserve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
