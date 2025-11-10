import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "x402 Payment Channels - Micropayments for HTTP APIs on Solana",
  description: "Framework-agnostic payment channel protocol for HTTP APIs on Solana. 99.8% cost savings with TypeScript-first implementation.",
  keywords: ["Solana", "Payment Channels", "Micropayments", "HTTP", "API", "x402", "Blockchain"],
  authors: [{ name: "x402 Team" }],
  openGraph: {
    title: "x402 Payment Channels on Solana",
    description: "Micropayments for HTTP APIs with 99.8% cost savings",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
