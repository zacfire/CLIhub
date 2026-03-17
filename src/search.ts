import Fuse from "fuse.js";
import { getAllCLIs, type CLIEntry } from "./registry.js";

let _fuse: Fuse<CLIEntry> | null = null;

function getFuse(): Fuse<CLIEntry> {
  if (_fuse) return _fuse;

  _fuse = new Fuse(getAllCLIs(), {
    keys: [
      { name: "name", weight: 2 },
      { name: "description", weight: 1.5 },
      { name: "tags", weight: 2 },
      { name: "category", weight: 1 },
      { name: "key_commands", weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
  return _fuse;
}

export function searchCLIs(query: string): CLIEntry[] {
  const results = getFuse().search(query);
  return results.map((r) => r.item);
}

export function searchByTag(tag: string): CLIEntry[] {
  return getAllCLIs().filter((cli) =>
    cli.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function searchByCategory(category: string): CLIEntry[] {
  return getAllCLIs().filter(
    (cli) => cli.category.toLowerCase() === category.toLowerCase()
  );
}
