import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/component/header";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Vaggo",
  description: "Sistema de vagas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${ubuntu.variable} font-sans antialiased bg-gradient-to-b from-white via-white to-gray-50 text-gray-900 min-h-screen`}
      >
        <Header showSearch />

        {children}
      </body>
    </html>
  );
}
