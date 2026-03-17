import type { CLIEntry } from "./registry.js";

export function formatSearchResult(cli: CLIEntry): string {
  const badge = cli.official ? " (official)" : "";
  const stack = cli.claude_code_stack ? " ★" : "";
  const install = Object.values(cli.install)[0] || "see repo";
  const quickCmd = cli.key_commands[0] || "";

  return [
    `${cli.name}${badge}${stack}`,
    `  ${cli.description}`,
    `  Install: ${install}`,
    quickCmd ? `  Quick:   ${quickCmd}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatSearchResults(clis: CLIEntry[]): string {
  if (clis.length === 0) {
    return "[no results] Try different keywords or run: clihub list";
  }

  const results = clis.map(formatSearchResult).join("\n\n");
  const footer = `\n[${clis.length} result${clis.length > 1 ? "s" : ""} | clihub info <id> for details]`;
  return results + footer;
}

export function formatInfo(cli: CLIEntry): string {
  const lines: string[] = [];

  lines.push(`Name:        ${cli.name}`);
  lines.push(`ID:          ${cli.id}`);
  lines.push(`Repo:        ${cli.repo}`);
  lines.push(`Official:    ${cli.official ? "yes" : "no (community)"}`);
  lines.push(`Commands:    ${cli.commands_count}`);
  if (cli.claude_code_stack) {
    lines.push(`Claude Stack: yes ★`);
  }

  lines.push("");
  lines.push("Install:");
  for (const [method, cmd] of Object.entries(cli.install)) {
    lines.push(`  ${method}: ${cmd}`);
  }

  lines.push("");
  lines.push("Key Commands:");
  for (const cmd of cli.key_commands) {
    lines.push(`  ${cmd}`);
  }

  lines.push("");
  const af = cli.agent_features;
  lines.push(
    `Agent Features:  SKILL.md: ${af.skill_md ? "yes" : "no"} | MCP: ${af.mcp_server ? "yes" : "no"} | JSON output: ${af.json_output ? "yes" : "no"}`
  );

  lines.push("");
  lines.push(`Tags: ${cli.tags.join(", ")}`);
  lines.push(`Category: ${cli.category}`);

  return lines.join("\n");
}

export function formatList(clis: CLIEntry[]): string {
  const maxId = Math.max(...clis.map((c) => c.id.length));
  const lines = clis.map((cli) => {
    const badge = cli.official ? "" : " *";
    const stack = cli.claude_code_stack ? " ★" : "";
    return `  ${cli.id.padEnd(maxId + 1)}${badge}${stack} ${cli.description.slice(0, 70)}`;
  });
  return lines.join("\n") + `\n\n[${clis.length} CLIs | ★ = Claude Code Stack | * = community]`;
}
