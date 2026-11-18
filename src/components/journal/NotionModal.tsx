import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, X, Loader2 } from "lucide-react";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; title: string; url: string; label?: string };

export function NotionModal({ open, onOpenChange, title, url, label = "Write-up" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    setSlow(false);
    const t = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(t);
  }, [open, url]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-deep/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-50 m-auto flex h-[100dvh] w-full flex-col overflow-hidden bg-background paper sm:h-[88vh] sm:w-[94vw] sm:max-w-[1150px] sm:rounded-lg data-[state=open]:animate-in data-[state=open]:zoom-in-95">
          <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-6">
            <span className="label-mono hidden sm:inline">{label} /</span>
            <Dialog.Title className="min-w-0 flex-1 truncate font-display text-lg">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">Embedded Notion write-up for {title}</Dialog.Description>
            {url && <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
              <ExternalLink className="size-3.5" /> <span className="hidden sm:inline">Open in Notion</span>
            </a>}
            <Dialog.Close aria-label="Close write-up" className="rounded border p-1.5 hover:bg-secondary">
              <X className="size-4" />
            </Dialog.Close>
          </header>
          <div className="relative flex-1 bg-card">
            {!url ? (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-sm paper rounded-md p-6 text-center">
                  <p className="label-mono text-primary">Draft in progress</p>
                  <p className="mt-2 font-display text-2xl">This write-up hasn't been published yet.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Check back soon — the full notes will open right here.</p>
                </div>
              </div>
            ) : !loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <Loader2 className="size-6 animate-spin text-primary" />
                <p className="label-mono">Loading write-up…</p>
                {slow && (
                  <div className="mt-4 max-w-sm paper rounded-md p-5">
                    <p className="text-sm">This page is taking a while, or Notion may not allow it to be shown here.</p>
                    <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline">
                      Read it in Notion instead <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
            {open && url && (
              <iframe
                key={url}
                src={url}
                title={`${title} — Notion write-up`}
                onLoad={() => setLoaded(true)}
                className="absolute inset-0 h-full w-full"
                style={{ opacity: loaded ? 1 : 0 }}
              />
            )}
          </div>
          {url && <footer className="border-t px-4 py-2 text-center text-xs text-muted-foreground sm:px-6">
            Content looks blank? Some Notion pages can't be embedded — use <a href={url} target="_blank" rel="noreferrer" className="text-primary underline">Open in Notion</a>.
          </footer>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
