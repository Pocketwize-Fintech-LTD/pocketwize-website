import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EarlyAccessProvider from "./components/early-access/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pocketwize — Honest answers about your money",
  description:
    "Pocketwize is an AI-powered financial clarity platform for young Nigerians. Understand where your money goes, find spending leaks, and make calmer decisions.",
  metadataBase: new URL("https://pocketwize.co"),
  openGraph: {
    title: "Pocketwize — Honest answers about your money",
    description:
      "Calm, intelligent insights about your spending. Built for young Nigerians who want to stop ending the month confused.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <EarlyAccessProvider>{children}</EarlyAccessProvider>
      </body>
    </html>
  );
}
