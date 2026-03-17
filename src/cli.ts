#!/usr/bin/env node

import { Command } from "commander";
import { searchCLIs, searchByTag, searchByCategory } from "./search.js";
import { getCLIById, getAllCLIs, getCategories } from "./registry.js";
import { formatSearchResults, formatInfo, formatList } from "./format.js";

const program = new Command();

program
  .name("clihub")
  .description(
    "CLI discovery service for AI Agents — find the right CLI tool for any task"
  )
  .version("1.0.0");

// search
program
  .command("search <query>")
  .description("Search for CLI tools by keyword or intent")
  .option("--tag <tag>", "Filter by tag")
  .option("--category <cat>", "Filter by category")
  .option("--json", "Output as JSON")
  .action((query: string, opts: { tag?: string; category?: string; json?: boolean }) => {
    let results;
    if (opts.tag) {
      results = searchByTag(opts.tag);
    } else if (opts.category) {
      results = searchByCategory(opts.category);
    } else {
      results = searchCLIs(query);
    }

    if (opts.json) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(formatSearchResults(results));
    }
  });

// info
program
  .command("info <id>")
  .description("Get detailed info about a CLI tool")
  .option("--json", "Output as JSON")
  .action((id: string, opts: { json?: boolean }) => {
    const cli = getCLIById(id);
    if (!cli) {
      const all = getAllCLIs();
      // fuzzy match suggestion
      const similar = all.filter(
        (c) =>
          c.id.includes(id) ||
          id.includes(c.id) ||
          c.name.toLowerCase().includes(id.toLowerCase())
      );
      if (similar.length > 0) {
        console.error(
          `[error] "${id}" not found. Did you mean: ${similar.map((c) => c.id).join(", ")}?`
        );
      } else {
        console.error(
          `[error] "${id}" not found. Run: clihub list`
        );
      }
      process.exit(1);
    }

    if (opts.json) {
      console.log(JSON.stringify(cli, null, 2));
    } else {
      console.log(formatInfo(cli));
    }
  });

// list
program
  .command("list")
  .description("List all indexed CLI tools")
  .option("--category <cat>", "Filter by category")
  .option("--official", "Only official CLIs")
  .option("--json", "Output as JSON")
  .action((opts: { category?: string; official?: boolean; json?: boolean }) => {
    let clis = getAllCLIs();

    if (opts.category) {
      clis = clis.filter(
        (c) => c.category.toLowerCase() === opts.category!.toLowerCase()
      );
    }
    if (opts.official) {
      clis = clis.filter((c) => c.official);
    }

    if (opts.json) {
      console.log(JSON.stringify(clis, null, 2));
    } else {
      console.log(formatList(clis));
    }
  });

// install
program
  .command("install <id>")
  .description("Show install command for a CLI tool")
  .option("--method <method>", "Preferred install method (brew, npm, pip, curl...)")
  .action((id: string, opts: { method?: string }) => {
    const cli = getCLIById(id);
    if (!cli) {
      console.error(`[error] "${id}" not found. Run: clihub search <query>`);
      process.exit(1);
    }

    if (opts.method && cli.install[opts.method]) {
      console.log(cli.install[opts.method]);
    } else if (opts.method) {
      console.error(
        `[error] Install method "${opts.method}" not available for ${cli.name}. Available: ${Object.keys(cli.install).join(", ")}`
      );
      process.exit(1);
    } else {
      console.log(`Install ${cli.name}:\n`);
      for (const [method, cmd] of Object.entries(cli.install)) {
        console.log(`  ${method}: ${cmd}`);
      }
    }
  });

// categories
program
  .command("categories")
  .description("List all categories")
  .action(() => {
    const cats = getCategories();
    console.log(cats.join("\n"));
  });

// Handle no args — show help
if (process.argv.length <= 2) {
  program.help();
}

program.parse();
