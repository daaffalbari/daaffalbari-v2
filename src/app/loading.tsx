export default function Loading() {
  return (
    <div className="flex min-h-screen items-center">
      <div className="page">
        <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
          Loading…
        </p>
        <p className="display mt-[var(--space-md)]" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
          One moment.
        </p>
      </div>
    </div>
  );
}
