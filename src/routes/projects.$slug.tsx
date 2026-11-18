import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { NotionModal } from "@/components/journal/NotionModal";
import { Lightbox } from "@/components/journal/Lightbox";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.project.title} — The Security Journal` : "Project — The Security Journal";
    const d = loaderData?.project.description ?? "Cybersecurity project write-up.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }] };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-24"><h1 className="text-4xl">Project not found</h1><Link to="/projects" className="mt-4 inline-block text-primary">Back to archive</Link></div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState<{ src: string; caption?: string } | null>(null);
  return (
    <article className="mx-auto max-w-6xl px-5 pt-10">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Archive</Link>
      <header className="mt-8 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="label-mono">{p.category} · {p.date} · <span className="text-primary">{p.status}</span>{p.placeholder && " · Placeholder entry"}</p>
          <h1 className="mt-4 text-5xl leading-tight md:text-6xl">{p.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{p.description}</p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end md:justify-end">
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-sm bg-deep px-5 py-3 text-sm font-medium text-deep-foreground transition hover:bg-primary"><BookOpen className="size-4" /> Read Full Write-up</button>
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:underline"><Github className="size-4" /> Repository</a>}
        </div>
      </header>
      <img src={p.coverImage} alt={`${p.title} cover`} width={1200} height={800} className="mt-10 aspect-[21/9] w-full rounded-sm border object-cover" />

      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <aside className="space-y-6 md:col-span-3">
          <div><p className="label-mono">Tools</p><ul className="mt-2 space-y-1 font-mono text-sm">{p.tools.map((t) => <li key={t}>— {t}</li>)}</ul></div>
          <div><p className="label-mono">Category</p><p className="mt-2 text-sm">{p.category}</p></div>
        </aside>
        <div className="space-y-12 md:col-span-8 md:col-start-5">
          <section><h2 className="text-3xl">Problem</h2><p className="mt-3 text-muted-foreground">{p.problem}</p></section>
          <section><h2 className="text-3xl">Objectives</h2><ol className="mt-3 space-y-2">{p.objectives.map((o, i) => <li key={o} className="flex gap-3"><span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>{o}</li>)}</ol></section>
          <section><h2 className="text-3xl">Key activities</h2><ul className="mt-3 list-disc space-y-2 pl-5">{p.activities.map((a) => <li key={a}>{a}</li>)}</ul></section>
          <section>
            <h2 className="text-3xl">Evidence</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {p.evidence.map((e, i) => (
                <button key={i} onClick={() => setImg(e)} className="group text-left">
                  <img src={e.src} alt={e.caption} loading="lazy" className="aspect-[4/3] w-full rounded-sm border object-cover transition group-hover:opacity-90" />
                  <p className="label-mono mt-2">EXHIBIT {String.fromCharCode(65 + i)} — {e.caption}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
      <NotionModal open={open} onOpenChange={setOpen} title={p.title} url={p.notionUrl} />
      <Lightbox src={img?.src ?? null} caption={img?.caption} onClose={() => setImg(null)} />
    </article>
  );
}
