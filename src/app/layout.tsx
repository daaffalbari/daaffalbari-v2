import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daffa Albari | AI Engineer & LLM Specialist",
  description:
    "Building intelligent systems at the intersection of AI and infrastructure. Specializing in LLM agents, RAG architectures, and scalable ML deployments.",
  keywords: [
    "AI Engineer",
    "LLM Specialist",
    "Machine Learning",
    "RAG",
    "LLM Agents",
    "Kubernetes",
    "Python",
    "TensorFlow",
  ],
  authors: [{ name: "Daffa Albari", url: "https://daaffalbari.dev" }],
  creator: "Daffa Albari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://daaffalbari.dev",
    siteName: "Daffa Albari",
    title: "Daffa Albari | AI Engineer & LLM Specialist",
    description:
      "Building intelligent systems at the intersection of AI and infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daffa Albari - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daffa Albari | AI Engineer & LLM Specialist",
    description:
      "Building intelligent systems at the intersection of AI and infrastructure.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
