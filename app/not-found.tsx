import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <span className="eyebrow mb-6">404</span>
      <h1 className="max-w-[16ch] text-balance text-display font-semibold">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-prose text-lede text-muted">
        Which is its own kind of empty state — and I have opinions about those.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex w-fit items-center gap-2.5 rounded-full bg-ink px-5 py-2.5 text-base font-medium text-canvas transition-opacity hover:opacity-90"
      >
        Back to the work
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="transition-transform duration-500 ease-out group-hover:translate-x-1"
        >
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </Link>
    </div>
  );
}
