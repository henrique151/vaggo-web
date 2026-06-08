// import { Ubuntu } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";

// const ubuntu = Ubuntu({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
//   variable: "--font-ubuntu",
// });

// export const metadata: Metadata = {
//   title: "Vaggo",
//   description: "Sistema de vagas",
// };

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
