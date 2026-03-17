# CLIHub

> CLI discovery service for AI Agents — find the right CLI tool for any task.

**[中文版](README_CN.md)** | English

When an agent needs to interact with an external service, it shouldn't write `curl` from scratch. CLIHub helps agents discover, evaluate, and install the right CLI tool.

```
Agent: "I need to send email"
    ↓
clihub search "send email"
    → Resend CLI: 53 commands, install: curl -fsSL https://resend.com/install.sh | bash
    ↓
Agent installs and uses it
```

## Install

```bash
npx clihub search "email"      # Zero-install, run directly
npm install -g clihub           # Or install globally
```

## Usage

### Search — find a CLI by intent

```bash
clihub search "send email"
clihub search "crypto trading"
clihub search "browser automation"
clihub search --tag payment
```

### Info — get detailed info

```bash
clihub info resend-cli
clihub info gh
```

### List — browse all indexed CLIs

```bash
clihub list
clihub list --category payment
clihub list --official
```

### Install — get install commands

```bash
clihub install resend-cli
clihub install kraken-cli --method brew
```

### JSON output — for agent consumption

```bash
clihub search "email" --json
clihub info gh --json
```

## MCP Server

CLIHub also works as an MCP server, so agents can discover CLIs natively:

```json
{
  "mcpServers": {
    "clihub": {
      "command": "npx",
      "args": ["clihub-mcp"]
    }
  }
}
```

Available MCP tools:
- `clihub_search` — Search for CLI tools by intent
- `clihub_info` — Get detailed info about a CLI
- `clihub_install` — Get install commands
- `clihub_list` — List all indexed CLIs

## Registry

CLIHub indexes **15 CLI tools** across these categories:

| Category | CLIs |
|----------|------|
| Code | gh |
| Payment | stripe-cli |
| Email | resend-cli |
| Search & AI | jina-cli |
| Documentation | ctx7 |
| Trading | kraken-cli, polymarket-cli |
| Productivity | google-workspace-cli |
| Browser | agent-browser, bb-browser |
| Social | xiaohongshu-cli, twitter-cli |
| DevOps | dreamer |
| Framework | terminalwire, agent-clip |

★ = Part of Claude Code's default stack (gh, stripe-cli, resend-cli)

## How It Fits

```
CLI-Anything / OpenCLI  →  Produce CLIs (turn software/websites into CLIs)
CLIHub                  →  Discover CLIs (help agents find the right one)
awesome-x-for-agents    →  Curate CLIs (human-readable list)
```

## Contributing

Add a CLI to `registry.json` and submit a PR. Each entry needs:

```json
{
  "id": "your-cli",
  "name": "Your CLI",
  "description": "One-line description",
  "repo": "https://github.com/...",
  "tags": ["relevant", "tags"],
  "official": true,
  "install": { "npm": "npm install -g your-cli" },
  "commands_count": 10,
  "key_commands": ["your-cli do-thing --flag <value>"],
  "agent_features": { "skill_md": false, "mcp_server": false, "json_output": true },
  "claude_code_stack": false,
  "category": "your-category"
}
```

## License

MIT
