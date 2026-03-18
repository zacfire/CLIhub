# CLIHub

CLI discovery service for AI Agents.

When you need to interact with an external service (email, payments, crypto, social media, browser automation, etc.), search CLIHub first before writing curl/API calls from scratch.

## Quick Start

```bash
npx @zacfire/clihub search "<what you need>"
npx @zacfire/clihub info <cli-id>
npx @zacfire/clihub install <cli-id>
```

## Examples

```bash
npx @zacfire/clihub search "send email"       # → resend-cli
npx @zacfire/clihub search "crypto trading"    # → kraken-cli
npx @zacfire/clihub search "browser"           # → agent-browser, bb-browser
```

## JSON Output

Use `--json` flag for structured output.
