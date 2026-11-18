import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import { site } from "@/content/site";
import { ProjectCard } from "@/components/journal/ProjectCard";
import { NoteRow } from "@/components/journal/NoteRow";
import { HeroDiagram } from "@/components/journal/HeroDiagram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Security Journal — Cybersecurity Portfolio" },
      { name: "description", content: "An Informatics student's research journal on network security, digital forensics, cryptography, cloud security and governance." },
      { property: "og:title", content: "The Security Journal — Cybersecurity Portfolio" },
      { property: "og:description", content: "Understanding the digital world, one vulnerability at a time." },
    ],
  }),
  component: Index,
});

const interests = [
  { name: "Network Security", note: "packets, protocols, segmentation" },
  { name: "Digital Forensics", note: "evidence, artefacts, timelines" },
  { name: "Cryptography", note: "primitives & constrained devices" },
  { name: "Cloud Security", note: "identity, configuration, posture" },
  { name: "Security Governance", note: "frameworks, risk, policy" },
];

function SectionHead({ n, kicker, title, action }: { n: string; kicker: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 grid gap-4 border-t pt-5 md:grid-cols-[8rem_1fr_auto] md:items-end">
      <span className="font-mono text-xs text-primary">§ {n}</span>
      <div>
        <p className="label-mono">{kicker}</p>
        <h2 className="mt-1 text-4xl md:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Index() {
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero + About + Contact */}
      <section className="grid items-center gap-10 pb-20 pt-12 md:grid-cols-12 md:pt-16">
        <div className="md:col-span-7 animate-rise">
          <p className="label-mono">Cybersecurity Portfolio / 2026</p>
          <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">
            {site.name} <span className="text-3xl italic text-muted-foreground md:text-4xl">({site.nickname})</span>
          </h1>
          <p className="mt-5 font-display text-2xl leading-snug md:text-[1.7rem]">
            Understanding the digital world, <em className="text-primary">one vulnerability</em> at a time.
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Informatics student at <span className="marker text-foreground">Siliwangi University</span> exploring network security, digital forensics, cryptography and the systems that keep our digital world running. I learn by taking things apart and writing down what I find.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <li><b className="text-foreground">{projects.length}</b> projects</li>
            <li><b className="text-foreground">{notes.length}</b> field notes</li>
            <li><b className="text-foreground">5</b> areas of interest</li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-sm bg-deep px-5 py-3 text-sm font-medium text-deep-foreground transition hover:bg-primary">
              Explore Projects <ArrowRight className="size-4" />
            </Link>
            <Link to="/archive" className="text-sm font-medium underline-offset-4 hover:underline">Archive</Link>
            <span className="flex items-center gap-1">
              {[
                { href: site.github, label: "GitHub", Icon: Github },
                { href: site.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} title={label}
                  className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-primary">
                  <Icon className="size-4" />
                </a>
              ))}
            </span>
          </div>
        </div>
        <div className="md:col-span-5">
          <figure className="paper rounded-sm p-3">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
              {site.portrait ? (
                <img src={site.portrait} alt={`Portrait of ${site.name}`} className="h-full w-full object-cover" />
              ) : (
                <div className="relative h-full w-full">
                  <HeroDiagram />
                  <div className="absolute inset-x-6 bottom-6 rounded-sm border border-dashed border-primary bg-background/85 p-3 text-center">
                    <p className="label-mono text-primary">Portrait placeholder</p>
                  </div>
                </div>
              )}
            </div>
          </figure>
          <p className="mt-4 text-sm font-medium">Network security, forensics and evidence-first learning.</p>
          <dl className="mt-3 space-y-1.5 font-mono text-xs">
            <div className="flex gap-4"><dt className="w-14 text-muted-foreground">focus</dt><dd>GRC / Network / IoT</dd></div>
            <div className="flex gap-4"><dt className="w-14 text-muted-foreground">stack</dt><dd> Linux / Wireshark</dd></div>
          </dl>
        </div>
      </section>

      {/* Interests */}
      <section className="pb-20">
        <p className="label-mono mb-4">Areas of interest — still learning</p>
        <ul className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <li key={i.name} title={i.note} className="rounded-full border bg-card px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-secondary">
              {i.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <SectionHead n="01" kicker="Selected projects" title="From the lab bench"
          action={<Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">Full archive <ArrowRight className="size-4" /></Link>} />
        <div className="grid gap-6 md:grid-cols-12">
          {featured.map((p, i) => (
            <div key={p.slug} className={i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}>
              <ProjectCard p={p} index={i} large={i === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="pb-24">
        <SectionHead n="02" kicker="Latest field notes" title="Observations, in brief"
          action={<Link to="/field-notes" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">All notes <ArrowRight className="size-4" /></Link>} />
        <ul className="border-t">{notes.slice(0, 3).map((n, i) => <NoteRow key={n.slug} note={n} index={i} />)}</ul>
      </section>

    </div>
  );
}
