import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "OpenMapKit — Free Map Tools & Printable Blank Maps",
    template: "%s | OpenMapKit",
  },
  description:
    "Free browser-based map tools and printable blank maps. Radius circles, distance calculators, elevation lookup, coordinate converters, and more. No sign-up, no API key required.",
  keywords: [
    "free map tools",
    "printable blank maps",
    "radius map",
    "distance calculator",
    "elevation finder",
    "latitude longitude",
    "open data maps",
  ],
  openGraph: {
    title: "OpenMapKit — Free Map Tools & Printable Blank Maps",
    description:
      "Free browser-based geographic tools and blank maps. No account needed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
