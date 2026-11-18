import { createFileRoute } from "@tanstack/react-router";
import { notes } from "@/content/notes";
import { NoteRow } from "@/components/journal/NoteRow";

export const Route = createFileRoute("/field-notes")({
  head: () => ({
    meta: [
      { title: "Field Notes — The Security Journal" },
      { name: "description", content: "Short technical observations and learning notes on security topics." },
      { property: "og:title", content: "Field Notes — The Security Journal" },
      { property: "og:description", content: "Short technical observations and learning notes." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <p className="label-mono">§ 02 — Field notes</p>
      <h1 className="mt-3 text-5xl md:text-6xl">Observations, <em className="text-primary">in brief</em></h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Shorter entries written while learning. Each opens in place.</p>
      <ul className="mt-12 border-t">{notes.map((n, i) => <NoteRow key={n.slug} note={n} index={i} />)}</ul>
    </div>
  ),
});
