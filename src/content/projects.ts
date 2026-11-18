import network from "@/assets/cover-network.jpg";
import forensics from "@/assets/cover-forensics.jpg";
import crypto from "@/assets/cover-crypto.jpg";
import cloud from "@/assets/cover-cloud.jpg";

export const categories = [
  "Network Security",
  "Digital Forensics",
  "Cryptography",
  "Cloud Security",
  "Security Governance",
  "Research and Experiments",
] as const;
export type Category = (typeof categories)[number];
export type Status = "Completed" | "Ongoing experiment" | "Learning exercise" | "Research interest";

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: Category;
  tools: string[];
  coverImage: string;
  notionUrl: string;
  githubUrl?: string;
  date: string;
  status: Status;
  featured: boolean;
  placeholder: boolean;
  problem: string;
  objectives: string[];
  activities: string[];
  evidence: { src: string; caption: string }[];
};

// Placeholder entries — replace with your real projects and public Notion URLs.
// Paste each project's published Notion link (Share → Publish → *.notion.site). Empty = "coming soon".
const NOTION_DEMO = "";

export const projects: Project[] = [
  {
    slug: "home-network-segmentation-lab",
    title: "Home Network Segmentation Lab",
    description: "A practice lab for separating devices into VLANs and observing traffic between zones.",
    category: "Network Security",
    tools: ["Wireshark", "pfSense", "VLANs"],
    coverImage: network,
    notionUrl: NOTION_DEMO,
    githubUrl: "",
    date: "2026-03",
    status: "Learning exercise",
    featured: true,
    placeholder: true,
    problem: "Placeholder — describe the problem this project explores.",
    objectives: ["Placeholder objective one", "Placeholder objective two"],
    activities: ["Placeholder activity — what you actually did"],
    evidence: [{ src: network, caption: "Placeholder evidence image" }],
  },
  {
    slug: "disk-image-analysis-notes",
    title: "Disk Image Analysis Walkthrough",
    description: "Working through a public practice disk image to learn a forensic examination workflow.",
    category: "Digital Forensics",
    tools: ["Autopsy", "FTK Imager", "Sleuth Kit"],
    coverImage: forensics,
    notionUrl: NOTION_DEMO,
    date: "2026-02",
    status: "Ongoing experiment",
    featured: true,
    placeholder: true,
    problem: "Placeholder — describe the investigation scenario.",
    objectives: ["Placeholder objective"],
    activities: ["Placeholder activity"],
    evidence: [{ src: forensics, caption: "Placeholder evidence image" }],
  },
  {
    slug: "lightweight-cryptography-study",
    title: "Lightweight Cryptography Study",
    description: "Reading and comparing lightweight ciphers proposed for constrained IoT devices.",
    category: "Cryptography",
    tools: ["Python", "PyCryptodome"],
    coverImage: crypto,
    notionUrl: NOTION_DEMO,
    githubUrl: "",
    date: "2026-01",
    status: "Research interest",
    featured: true,
    placeholder: true,
    problem: "Placeholder — describe the research question.",
    objectives: ["Placeholder objective"],
    activities: ["Placeholder activity"],
    evidence: [{ src: crypto, caption: "Placeholder evidence image" }],
  },
  {
    slug: "cloud-iam-review",
    title: "Cloud IAM Policy Review",
    description: "Reviewing identity and access policies in a sandbox cloud account against least privilege.",
    category: "Cloud Security",
    tools: ["AWS IAM", "CIS Benchmarks"],
    coverImage: cloud,
    notionUrl: NOTION_DEMO,
    date: "2025-11",
    status: "Learning exercise",
    featured: false,
    placeholder: true,
    problem: "Placeholder — describe the problem.",
    objectives: ["Placeholder objective"],
    activities: ["Placeholder activity"],
    evidence: [{ src: cloud, caption: "Placeholder evidence image" }],
  },
];

export function filterProjects(list: Project[], query: string, category: Category | "All") {
  const q = query.trim().toLowerCase();
  return list.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (!q) return true;
    return [p.title, p.description, p.category, ...p.tools].join(" ").toLowerCase().includes(q);
  });
}
