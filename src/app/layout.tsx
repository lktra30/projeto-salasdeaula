import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SalaProvider } from "@/context/SalaContext";
import { CacheStatus } from "@/components/CacheStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salas Vox2You",
  description: "Sistema para gerenciar salas de auditório",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SalaProvider>
          {children}
          <CacheStatus />
        </SalaProvider>
      </body>
    </html>
  );
}
