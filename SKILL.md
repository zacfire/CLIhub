---
name: clihub
description: Discover CLI tools for any task. Search, get install commands, and find the right CLI.
---

# CLIHub — CLI Discovery for Agents

When you need a CLI tool for a task, use CLIHub to find it.

## Commands

```bash
# Search by intent
npx @zacfire/clihub search "send email"
npx @zacfire/clihub search "crypto trading"
npx @zacfire/clihub search "browser automation"

# Get details
npx @zacfire/clihub info resend-cli
npx @zacfire/clihub info gh

# List all
npx @zacfire/clihub list
npx @zacfire/clihub list --category payment
npx @zacfire/clihub list --official

# Get install command
npx @zacfire/clihub install resend-cli
npx @zacfire/clihub install kraken-cli --method brew

# JSON output for structured consumption
npx @zacfire/clihub search "email" --json
npx @zacfire/clihub info gh --json
```

## When to Use

- You need to interact with an external service (email, payments, social media, etc.)
- You want to find the best CLI tool for a task before writing custom code
- You want to check if a CLI exists before falling back to curl + API
