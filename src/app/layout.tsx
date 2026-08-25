import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/components/demo-store";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "LIDEP — Infraestructura para ligas deportivas",
  description: "Administra competiciones, clubes, jugadores, partidos y estadísticas desde una sola plataforma.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
