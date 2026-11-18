import { useState } from "react";
import { BookOpen } from "lucide-react";
import type { Note } from "@/content/notes";
import { NotionModal } from "./NotionModal";

export function NoteRow({ note, index }: { note: Note; index: number }) {
  const [open, setOpen] = useState(false);
  const d = new Date(note.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <li className="border-b">
      <button onClick={() => setOpen(true)} className="group grid w-full grid-cols-[2.5rem_1fr] gap-4 py-6 text-left md:grid-cols-[3rem_9rem_1fr_auto] md:items-baseline">
        <span className="font-mono text-xs text-primary">{String(index + 1).padStart(3, "0")}</span>
        <span className="label-mono col-start-2 md:col-start-auto">{d}</span>
        <span className="col-start-2 md:col-start-auto">
          <span className="text-xl font-display transition-colors group-hover:text-primary md:text-2xl">{note.title}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{note.excerpt}</span>
          <span className="label-mono mt-2 block">{note.category}</span>
        </span>
        <span className="col-start-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary md:col-start-auto">Read <BookOpen className="size-4" /></span>
      </button>
      <NotionModal open={open} onOpenChange={setOpen} title={note.title} url={note.notionUrl} label="Field note" />
    </li>
  );
}
