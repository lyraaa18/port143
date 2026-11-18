import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function Lightbox({ src, caption, onClose }: { src: string | null; caption?: string | undefined; onClose: () => void }) {
  return (
    <Dialog.Root open={!!src} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-deep/70" />
        <Dialog.Content className="fixed inset-4 z-50 m-auto flex max-w-5xl flex-col items-center justify-center gap-3">
          <Dialog.Title className="sr-only">{caption ?? "Image"}</Dialog.Title>
          <Dialog.Description className="sr-only">Enlarged image</Dialog.Description>
          {src && <img src={src} alt={caption ?? ""} className="max-h-[80vh] w-auto rounded paper" />}
          {caption && <p className="label-mono text-deep-foreground">{caption}</p>}
          <Dialog.Close aria-label="Close image" className="absolute right-0 top-0 rounded bg-background p-2"><X className="size-4" /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
