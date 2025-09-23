import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SalaProvider } from "@/context/SalaContext";
import { CacheStatus } from "@/components/CacheStatus";
import { MobileNavigation } from "@/components/MobileNavigation";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16 lg:pb-0`}
        suppressHydrationWarning={true}
      >
        <SalaProvider>
          {children}
          <MobileNavigation />
          <CacheStatus />
        </SalaProvider>
      </body>
    </html>
  );
}
