export type Note = { slug: string; title: string; excerpt: string; category: string; date: string; notionUrl: string };
const DEMO = ""; // paste published *.notion.site links
// Placeholder notes — replace excerpts and Notion URLs with your own.
export const notes: Note[] = [
  { slug: "mqtt-auth", title: "Understanding MQTT Authentication", excerpt: "Placeholder excerpt — what you observed about how MQTT brokers authenticate clients.", category: "Network Security", date: "2026-04-02", notionUrl: "https://app.notion.com/p/2a6d822e938881bca080fe54c6fba235?v=2a6d822e9388811d9004000c49647a98&source=copy_link" },
  { slug: "tls-iot", title: "Exploring TLS in IoT Communication", excerpt: "Placeholder excerpt — notes on handshakes and certificate handling on small devices.", category: "Cryptography", date: "2026-03-18", notionUrl: DEMO },
  { slug: "lightweight-crypto", title: "Notes on Lightweight Cryptography", excerpt: "Placeholder excerpt — first impressions from reading about constrained ciphers.", category: "Cryptography", date: "2026-02-27", notionUrl: DEMO },
  { slug: "net-troubleshooting", title: "Network Troubleshooting Observations", excerpt: "Placeholder excerpt — a log of small debugging lessons.", category: "Network Security", date: "2026-02-05", notionUrl: DEMO },
  { slug: "forensics-notes", title: "Digital Forensics Learning Notes", excerpt: "Placeholder excerpt — vocabulary and workflow notes while learning forensics.", category: "Digital Forensics", date: "2026-01-14", notionUrl: DEMO },
];
