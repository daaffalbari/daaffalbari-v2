import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — Daffa Albari",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <div className="page py-[var(--space-3xl)]">
        <p className="eyebrow">№ 404 · Lost the thread</p>

        <h1 className="display mt-[var(--space-md)]">
          That page isn&apos;t here.
        </h1>

        <p className="lede mt-[var(--space-lg)] max-w-[var(--measure-narrow)]">
          A link broke, or the URL was retired, or you arrived a little ahead of
          schedule. In any case — the home page is one click away, and so am I.
        </p>

        <div className="mt-[var(--space-xl)] flex flex-wrap items-center gap-[var(--space-lg)]">
          <Link href="/" className="pill">
            Return home
            <span aria-hidden>→</span>
          </Link>
          <a
            href="mailto:daffaa.albari@gmail.com"
            className="lnk font-[var(--font-display)] text-lg"
          >
            Tell me what you were looking for →
          </a>
        </div>

        <p className="mt-[var(--space-3xl)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
          — Daffa
        </p>
      </div>
    </main>
  );
}
