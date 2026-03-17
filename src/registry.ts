import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export interface CLIEntry {
  id: string;
  name: string;
  description: string;
  repo: string;
  tags: string[];
  official: boolean;
  install: Record<string, string>;
  commands_count: number;
  key_commands: string[];
  agent_features: {
    skill_md: boolean;
    mcp_server: boolean;
    json_output: boolean;
  };
  claude_code_stack: boolean;
  category: string;
}

interface Registry {
  version: string;
  clis: CLIEntry[];
}

let _registry: Registry | null = null;

export function loadRegistry(): Registry {
  if (_registry) return _registry;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const registryPath = join(__dirname, "..", "registry.json");
  const data = readFileSync(registryPath, "utf-8");
  _registry = JSON.parse(data) as Registry;
  return _registry;
}

export function getAllCLIs(): CLIEntry[] {
  return loadRegistry().clis;
}

export function getCLIById(id: string): CLIEntry | undefined {
  return getAllCLIs().find((cli) => cli.id === id);
}

export function getCategories(): string[] {
  const cats = new Set(getAllCLIs().map((cli) => cli.category));
  return [...cats].sort();
}
