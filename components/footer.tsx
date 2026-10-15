import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="shell flex flex-wrap items-center justify-between gap-4 pb-10 pt-6">
      <span className="eyebrow">{site.location}</span>
      <span className="flex items-center gap-6">
        <span className="eyebrow">© {new Date().getFullYear()} {site.name}</span>
        <a href="#main" className="eyebrow text-ink hover:text-muted">
          Back to top
        </a>
      </span>
    </footer>
  );
}
