import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import EarlyAccessProvider from "./components/early-access/Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PocketWize | Your AI Financial Companion",
  description:
    "AI-powered financial guidance for smarter money decisions. Understand your spending, reduce financial stress, and build wealth with confidence.",
  metadataBase: new URL("https://getpocketwize.com"),
  openGraph: {
    title: "PocketWize | Your AI Financial Companion",
    description:
      "AI-powered financial guidance for smarter money decisions. Understand your spending, reduce financial stress, and build wealth with confidence.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f14" },
  ],
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Apply the saved/system theme before paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <EarlyAccessProvider>{children}</EarlyAccessProvider>
      </body>
    </html>
  );
}
