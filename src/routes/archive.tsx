import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { skills, certifications, organizations, volunteering, timeline } from "@/content/archive";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — The Security Journal" },
      { name: "description", content: "Skills, certifications, organizations, volunteering and learning timeline." },
      { property: "og:title", content: "Archive — The Security Journal" },
      { property: "og:description", content: "Skills, certifications, organizations and volunteering." },
    ],
  }),
  component: ArchivePage,
});

const toc = [["skills", "Technical skills"], ["certs", "Certifications"], ["orgs", "Organizations"], ["volunteer", "Volunteer & community"], ["timeline", "Learning timeline"]];

function H({ id, n, title }: { id: string; n: string; title: string }) {
  return <h2 id={id} className="scroll-mt-24 border-t pt-5 text-4xl"><span className="mr-4 font-mono text-xs align-middle text-primary">{n}</span>{title}</h2>;
}

function ArchivePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <p className="label-mono">§ 03 — Archive · all entries are placeholders until replaced</p>
      <h1 className="mt-3 text-5xl md:text-6xl">The record</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <nav className="md:col-span-3" aria-label="Archive sections">
          <ol className="sticky top-24 space-y-2 font-mono text-xs">
            {toc.map(([id, t], i) => <li key={id}><a href={`#${id}`} className="text-muted-foreground hover:text-primary">{String(i + 1).padStart(2, "0")} {t}</a></li>)}
          </ol>
        </nav>
        <div className="space-y-20 md:col-span-9">
          <section><H id="skills" n="A" title="Technical skills" />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {skills.map((s) => <div key={s.group}><p className="label-mono">{s.group}</p><ul className="mt-2 flex flex-wrap gap-1.5">{s.items.map((i) => <li key={i} className="rounded-sm border bg-card px-2 py-1 text-sm">{i}</li>)}</ul></div>)}
            </div>
          </section>
          <section><H id="certs" n="B" title="Certifications & training" />
            <ul className="mt-6 divide-y border-y">{certifications.map((c) => (
              <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <div><p className="font-display text-xl">{c.name}</p><p className="text-sm text-muted-foreground">{c.issuer}</p></div>
                <span className="font-mono text-xs">{c.year}{c.url && <a href={c.url} target="_blank" rel="noreferrer" className="ml-3 inline-flex text-primary" aria-label="View credential"><ExternalLink className="size-3.5" /></a>}</span>
              </li>))}</ul>
          </section>
          <section><H id="orgs" n="C" title="Organizations" />
            <ol className="relative mt-8 space-y-8 border-l pl-8">{organizations.map((o) => (
              <li key={o.name} className="relative">
                <span className="absolute -left-[37px] top-2 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                <div className="paper rounded-sm p-5">
                  <p className="label-mono">{o.period}</p>
                  <h3 className="mt-1 text-2xl">{o.name} <span className="text-base italic text-primary">— {o.role}</span></h3>
                  <p className="mt-2 text-muted-foreground">{o.description}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{o.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              </li>))}</ol>
          </section>
          <section><H id="volunteer" n="D" title="Volunteer & community" />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">{volunteering.map((v) => (
              <div key={v.name} className="rounded-sm border bg-secondary p-5">
                <p className="label-mono">{v.period} · {v.location}</p>
                <h3 className="mt-1 text-2xl">{v.name}</h3>
                <p className="text-sm text-primary">{v.role}, {v.organization}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                <ul className="mt-3 list-disc pl-5 text-sm">{v.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>))}</div>
          </section>
          <section><H id="timeline" n="E" title="Learning timeline" />
            <ol className="mt-6">{timeline.map((t) => (
              <li key={t.year} className="grid grid-cols-[5rem_1fr] gap-4 border-b py-4"><span className="font-display text-3xl italic text-primary">{t.year}</span><span className="self-center">{t.entry}</span></li>))}</ol>
          </section>
        </div>
      </div>
    </div>
  );
}
