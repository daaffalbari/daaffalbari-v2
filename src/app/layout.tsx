import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daffa Albari — AI Engineer",
  description:
    "Building AI that works in the real world. LLM frameworks, RAG, knowledge graphs, and the boring infrastructure that keeps it all running.",
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
    title: "Daffa Albari — AI Engineer",
    description:
      "Building AI that works in the real world. LLM frameworks, RAG, knowledge graphs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daffa Albari — AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daffa Albari — AI Engineer",
    description:
      "Building AI that works in the real world. LLM frameworks, RAG, knowledge graphs.",
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
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
