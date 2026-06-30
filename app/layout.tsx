import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PocketWize | Your AI Financial Companion",
    description:
      "AI-powered financial guidance for smarter money decisions. Understand your spending, reduce financial stress, and build wealth with confidence.",
    url: "https://getpocketwize.com",
    siteName: "PocketWize",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PocketWize | Your AI Financial Companion",
    description:
      "AI-powered financial guidance for smarter money decisions. Understand your spending, reduce financial stress, and build wealth with confidence.",
  },
};

// NOTE: theme-color is intentionally NOT set here. A media-query themeColor
// only follows the OS preference, so the iOS/Android browser chrome wouldn't
// update when the user flips the in-app theme toggle. Instead we render a
// single <meta name="theme-color"> below and keep it in sync imperatively
// (boot script + ThemeToggle).
export const viewport: Viewport = {
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
        {/* Single source of truth for browser-chrome color (iOS status bar,
            Android toolbar). The boot script + ThemeToggle keep its `content`
            in sync with the active in-app theme, not just the OS preference. */}
        <meta name="theme-color" content="#FBFAF7" />
        <script
          // Apply the saved/system theme before paint to avoid a flash, and
          // sync the theme-color meta so the chrome matches immediately.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',d?'#0d0f14':'#FBFAF7');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <EarlyAccessProvider>{children}</EarlyAccessProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
