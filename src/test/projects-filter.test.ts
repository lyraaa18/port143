import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "@/content/projects";

describe("project filter", () => {
  it("filters by category", () => {
    expect(filterProjects(projects, "", "Cryptography").every((p) => p.category === "Cryptography")).toBe(true);
  });
  it("searches tools case-insensitively", () => {
    expect(filterProjects(projects, "wireshark", "All").map((p) => p.slug)).toEqual(["home-network-segmentation-lab"]);
  });
  it("returns empty for no match", () => {
    expect(filterProjects(projects, "zzzz", "All")).toHaveLength(0);
  });
});
