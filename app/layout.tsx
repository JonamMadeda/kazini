import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kazini - Discover Your Next Career Opportunity",
    template: "%s | Kazini",
  },
  description:
    "The smartest African-first career opportunity discovery platform. Find internships, jobs, remote work, and graduate programs across Africa and beyond.",
  keywords: [
    "jobs",
    "internships",
    "career",
    "remote work",
    "graduate programs",
    "Africa",
    "career opportunities",
    "job search",
  ],
  authors: [{ name: "Kazini" }],
  creator: "Kazini",
  metadataBase: new URL("https://kazini.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kazini.com",
    title: "Kazini - Discover Your Next Career Opportunity",
    description:
      "The smartest African-first career opportunity discovery platform. Find internships, jobs, remote work, and graduate programs.",
    siteName: "Kazini",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazini - Discover Your Next Career Opportunity",
    description:
      "The smartest African-first career opportunity discovery platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth light">
      <body className={`${inter.className} bg-white text-navy-900`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}