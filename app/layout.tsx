import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infra.nyc"),
  title: {
    default: "infra.nyc | Private Infrastructure Engineering Community",
    template: "%s | infra.nyc",
  },
  description:
    "infra.nyc is a private community for senior systems engineers, engineering leaders, and technical founders working on infrastructure, distributed systems, AI infra, databases, cloud, and developer tools.",
  openGraph: {
    title: "infra.nyc",
    description:
      "A private community of senior infrastructure engineers, engineering leaders, and technical founders.",
    url: "https://infra.nyc",
    siteName: "infra.nyc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "infra.nyc",
    description:
      "A private community for senior systems engineers and technical founders.",
  },
  alternates: {
    canonical: "https://infra.nyc",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, geistMono.variable, "font-sans")}>
        {children}
      </body>
    </html>
  );
}
