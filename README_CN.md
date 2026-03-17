# CLIHub

> AI Agent 的 CLI 发现服务 — 为任何任务找到合适的 CLI 工具。

中文 | **[English](README.md)**

当 Agent 需要与外部服务交互时，不该从零写 `curl`。CLIHub 帮助 Agent 发现、评估和安装正确的 CLI 工具。

```
Agent: "我需要发邮件"
    ↓
clihub search "send email"
    → Resend CLI: 53 条命令, 安装: curl -fsSL https://resend.com/install.sh | bash
    ↓
Agent 安装并使用
```

## 安装

```bash
npx clihub search "email"      # 零安装，直接运行
npm install -g clihub           # 或全局安装
```

## 使用

### search — 按意图搜索 CLI

```bash
clihub search "send email"
clihub search "crypto trading"
clihub search "browser automation"
clihub search --tag payment
```

### info — 查看详细信息

```bash
clihub info resend-cli
clihub info gh
```

### list — 浏览所有 CLI

```bash
clihub list
clihub list --category payment
clihub list --official
```

### install — 获取安装命令

```bash
clihub install resend-cli
clihub install kraken-cli --method brew
```

### JSON 输出 — 供 Agent 结构化消费

```bash
clihub search "email" --json
clihub info gh --json
```

## MCP 服务器

CLIHub 同时是一个 MCP 服务器，Agent 可以原生发现 CLI：

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

可用 MCP 工具：
- `clihub_search` — 按意图搜索 CLI
- `clihub_info` — 获取 CLI 详情
- `clihub_install` — 获取安装命令
- `clihub_list` — 列出所有 CLI

## 注册表

CLIHub 目前索引了 **15 个 CLI 工具**：

| 分类 | CLI |
|------|-----|
| 代码 | gh |
| 支付 | stripe-cli |
| 邮件 | resend-cli |
| 搜索 & AI | jina-cli |
| 文档 | ctx7 |
| 交易 | kraken-cli, polymarket-cli |
| 办公 | google-workspace-cli |
| 浏览器 | agent-browser, bb-browser |
| 社交 | xiaohongshu-cli, twitter-cli |
| DevOps | dreamer |
| 框架 | terminalwire, agent-clip |

★ = Claude Code 默认栈（gh, stripe-cli, resend-cli）

## 生态位

```
CLI-Anything / OpenCLI  →  生产 CLI（把软件/网站变成 CLI）
CLIHub                  →  发现 CLI（帮 Agent 找到合适的 CLI）
awesome-x-for-agents    →  策展 CLI（给人浏览的列表）
```

## 贡献

在 `registry.json` 中添加 CLI 并提交 PR。

## License

MIT
