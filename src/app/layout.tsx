import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fed Watch — Vigilancia Monetaria",
  description: "Sistema de vigilancia que documenta 50+ años de manipulación monetaria sistemática por parte de la Reserva Federal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
