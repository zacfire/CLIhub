#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { searchCLIs, searchByTag } from "./search.js";
import { getCLIById, getAllCLIs } from "./registry.js";
import { formatSearchResults, formatInfo, formatList } from "./format.js";

const server = new McpServer({
  name: "clihub",
  version: "1.0.0",
});

server.tool(
  "clihub_search",
  "Search for CLI tools that AI agents can use. Returns matching CLIs with install commands and key usage.",
  {
    query: z.string().describe("Search query — describe what you need, e.g. 'send email', 'crypto trading', 'browser automation'"),
    tag: z.string().optional().describe("Optional tag filter"),
  },
  async ({ query, tag }) => {
    const results = tag ? searchByTag(tag) : searchCLIs(query);
    return {
      content: [{ type: "text" as const, text: formatSearchResults(results) }],
    };
  }
);

server.tool(
  "clihub_info",
  "Get detailed info about a specific CLI tool — install commands, key commands, agent features.",
  {
    id: z.string().describe("CLI tool ID, e.g. 'resend-cli', 'gh', 'kraken-cli'"),
  },
  async ({ id }) => {
    const cli = getCLIById(id);
    if (!cli) {
      return {
        content: [
          {
            type: "text" as const,
            text: `[error] "${id}" not found. Use clihub_search to find the right CLI.`,
          },
        ],
      };
    }
    return {
      content: [{ type: "text" as const, text: formatInfo(cli) }],
    };
  }
);

server.tool(
  "clihub_install",
  "Get the install command for a CLI tool.",
  {
    id: z.string().describe("CLI tool ID"),
    method: z.string().optional().describe("Preferred install method: brew, npm, pip, curl, etc."),
  },
  async ({ id, method }) => {
    const cli = getCLIById(id);
    if (!cli) {
      return {
        content: [{ type: "text" as const, text: `[error] "${id}" not found.` }],
      };
    }
    if (method && cli.install[method]) {
      return {
        content: [{ type: "text" as const, text: cli.install[method] }],
      };
    }
    const lines = Object.entries(cli.install)
      .map(([m, cmd]) => `${m}: ${cmd}`)
      .join("\n");
    return {
      content: [{ type: "text" as const, text: lines }],
    };
  }
);

server.tool(
  "clihub_list",
  "List all CLI tools indexed in CLIHub.",
  {},
  async () => {
    return {
      content: [{ type: "text" as const, text: formatList(getAllCLIs()) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
