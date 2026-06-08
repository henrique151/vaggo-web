// "use client";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/component/header";
// import VLibras from "vlibras-nextjs";
// import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeProvider";
import VLibrasPlugin from "./VLibras.component";
// import VLibras from "vlibras-nextjs/dist/types";

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
      <head>
        <title>Vaggo</title>
      </head>
      <body className={`${ubuntu.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/*<Header showSearch />*/}
          {children}
          {/*<VLibrasPlugin />*/}
        </ThemeProvider>
      </body>
    </html>
  );
}
