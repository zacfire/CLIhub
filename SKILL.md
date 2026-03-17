---
name: clihub
description: Discover CLI tools for any task. Search, get install commands, and find the right CLI.
---

# CLIHub — CLI Discovery for Agents

When you need a CLI tool for a task, use CLIHub to find it.

## Commands

```bash
# Search by intent
clihub search "send email"
clihub search "crypto trading"
clihub search "browser automation"

# Get details
clihub info resend-cli
clihub info gh

# List all
clihub list
clihub list --category payment
clihub list --official

# Get install command
clihub install resend-cli
clihub install kraken-cli --method brew

# JSON output for structured consumption
clihub search "email" --json
clihub info gh --json
```

## When to Use

- You need to interact with an external service (email, payments, social media, etc.)
- You want to find the best CLI tool for a task before writing custom code
- You want to check if a CLI exists before falling back to curl + API
