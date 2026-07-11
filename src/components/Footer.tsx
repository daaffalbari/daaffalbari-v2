import { socialLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-rule)]">
      <div className="page py-[var(--space-2xl)]">
        <div className="grid gap-[var(--space-xl)] md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[36rem]">
            <p
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]"
            >
              Colophon
            </p>
            <p
              className="mt-[var(--space-md)] font-[var(--font-display)] text-[1.75rem] font-medium leading-[1.25] tracking-tight text-[var(--color-ink)]"
            >
              Thanks for reading. If anything here was useful — or you want to
              build something together — write to me.
            </p>
            <p className="mt-[var(--space-md)] text-[var(--color-ink-2)]">
              Set in Caraque and GT America Mono. Written and shipped from
              Bandung, Indonesia. Last revised{" "}
              {new Date().toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
              .
            </p>
            <p className="mt-[var(--space-lg)]">
              <a
                href="mailto:daffaa.albari@gmail.com"
                className="lnk font-[var(--font-display)] text-xl"
              >
                daffaa.albari@gmail.com →
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-[var(--space-md)] md:items-end">
            <p
              className="font-[var(--font-display)] text-base font-medium tracking-tight text-[var(--color-ink)]"
            >
              Daffa Albari
            </p>
            <ul className="flex flex-wrap gap-x-[var(--space-md)] gap-y-[var(--space-2xs)] md:justify-end">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lnk font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)] md:text-right">
              © {year} · Daffa Albari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
