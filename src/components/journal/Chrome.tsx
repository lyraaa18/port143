import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

const nav = [
  { to: "/", label: "Home", n: "00" },
  { to: "/projects", label: "Projects", n: "01" },
  { to: "/field-notes", label: "Field Notes", n: "02" },
  { to: "/archive", label: "Archive", n: "03" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl italic">The Security Journal</span>
          <span className="label-mono hidden sm:inline">Vol. 01</span>
        </Link>
        <nav className="hidden gap-7 md:flex" aria-label="Main">
          {nav.map((i) => (
            <Link key={i.to} to={i.to} activeOptions={{ exact: i.to === "/" }}
              className="group flex items-baseline gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground">
              <span className="font-mono text-[10px] text-primary">{i.n}</span>{i.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden rounded border p-2" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      {open && (
        <nav className="border-t md:hidden" aria-label="Mobile">
          {nav.map((i) => (
            <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="flex items-baseline gap-3 border-b px-5 py-3 font-display text-lg">
              <span className="font-mono text-xs text-primary">{i.n}</span>{i.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="mt-24 bg-deep text-deep-foreground">
      <div className="">
        <p className="mx-auto max-w-6xl px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">© 2026 {site.name} · Compiled by hand</p>
      </div>
    </footer>
  );
}
