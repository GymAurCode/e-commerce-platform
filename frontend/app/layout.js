import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientNavbar from "@/components/ClientNavbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "My Next.js App",
  description: "Next.js Production Setup",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
