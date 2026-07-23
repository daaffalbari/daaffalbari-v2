import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL, personalInfo, experiences, education } from "@/lib/data";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  authors: [{ name: "Daffa Albari", url: SITE_URL }],
  creator: "Daffa Albari",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
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

const currentJob = experiences.find((exp) => exp.type === "current");

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  description: personalInfo.bio,
  url: SITE_URL,
  image: `${SITE_URL}/images/profile/daffa_2.jpg`,
  email: `mailto:${personalInfo.email}`,
  sameAs: [personalInfo.linkedin, personalInfo.github],
  ...(currentJob && {
    worksFor: {
      "@type": "Organization",
      name: currentJob.company,
    },
  }),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution,
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
      suppressHydrationWarning
      className={`${fraunces.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
