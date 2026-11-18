import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { categories, filterProjects, projects, type Category } from "@/content/projects";
import { ProjectCard } from "@/components/journal/ProjectCard";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — The Security Journal" },
      { name: "description", content: "Searchable archive of cybersecurity projects, experiments and learning exercises." },
      { property: "og:title", content: "Projects — The Security Journal" },
      { property: "og:description", content: "Searchable archive of cybersecurity projects and experiments." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const list = useMemo(() => filterProjects(projects, q, cat), [q, cat]);
  const clear = () => { setQ(""); setCat("All"); };
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <p className="label-mono">§ 01 — Project archive</p>
      <h1 className="mt-3 text-5xl md:text-6xl">The lab bench</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Projects, experiments and learning exercises — each labeled for what it is.</p>

      <div className="mt-10 flex flex-col gap-4 border-y py-4 md:flex-row md:items-center">
        <label className="relative flex-1 md:max-w-xs">
          <span className="sr-only">Search projects</span>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, tool…"
            className="w-full rounded-sm border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] transition ${cat === c ? "border-deep bg-deep text-deep-foreground" : "hover:bg-secondary"}`}>{c}</button>
          ))}
        </div>
        {(q || cat !== "All") && <button onClick={clear} className="inline-flex items-center gap-1 text-sm text-primary md:ml-auto"><X className="size-3.5" /> Clear</button>}
      </div>
      <p className="label-mono mt-4">{list.length} {list.length === 1 ? "entry" : "entries"}</p>

      {list.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}
        </div>
      ) : (
        <div className="mt-10 rounded-sm border border-dashed p-12 text-center">
          <p className="font-display text-2xl">Nothing filed under that yet.</p>
          <button onClick={clear} className="mt-4 text-sm font-medium text-primary hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  );
}
