import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ p, index, large }: { p: Project; index: number; large?: boolean }) {
  return (
    <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block lift rounded-md border bg-card p-3">
      <div className="relative overflow-hidden rounded-sm bg-secondary">
        <img src={p.coverImage} alt="" loading="lazy" width={1200} height={800}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`} />
        <span className="absolute left-2 top-2 rounded-sm bg-background/90 px-1.5 py-0.5 font-mono text-[10px]">FIG. {String(index + 1).padStart(2, "0")}</span>
        {p.placeholder && <span className="absolute right-2 top-2 rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground">PLACEHOLDER</span>}
      </div>
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="label-mono">{p.category}</span>
          <span className="label-mono text-primary">{p.status}</span>
        </div>
        <h3 className={`mt-2 ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {p.tools.map((t) => <li key={t} className="rounded-sm border px-1.5 py-0.5 font-mono text-[10px]">{t}</li>)}
          </ul>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">View <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </Link>
  );
}
