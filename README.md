# sarath-ai

Sarath is a work assistant agent built on the [eve](https://eve.dev) framework: it drafts and polishes writing, summarizes documents and meetings, plans tasks, and keeps notes via a persistent local notepad tool.

## Run it locally

Prerequisites: **Node.js 24+** and **pnpm** (`npm i -g pnpm`).

```bash
# 1. Install dependencies
pnpm install

# 2. Configure local secrets and model credentials
cp env.example .env.local
#    then set AI_GATEWAY_API_KEY in .env.local
#    (create a key at https://vercel.com/dashboard/ai/api-keys)

# 3. Start the agent + web chat
pnpm dev
```

Open http://localhost:3000 and chat with Sarath. The same server also exposes
the agent API under `/eve/v1/*` (`/eve/v1/health` for a health check).

No key yet? Just send any message: when the agent has no model credentials,
the chat shows an inline **"Save API key"** form — paste your Vercel AI Gateway
key there and retry. The key is applied to the running server immediately and
persisted to `.env.local`.

Other ways to run:

```bash
pnpm dev:eve          # eve dev: terminal UI (TUI) session
pnpm build:eve        # compile the agent + host server into .output/
PORT=3000 pnpm start:eve -- --host 0.0.0.0   # serve the built app
```

Work notepad entries persist under `.eve/data/` (git-ignored).

## Getting started (authoring)

First, run the development server:

```bash
eve dev
```

The development TUI opens an interactive session where you can send messages to your agent.

Start by editing `agent/instructions.md` to define the agent's identity, purpose, tone, and response guidelines. Configure its model and runtime behavior in `agent/agent.ts`.

Add capabilities under `agent/`, including tools, connections, channels, skills, subagents, and schedules. eve reloads your changes as you work.

## Learn more

To learn more about eve, explore these resources:

- [eve documentation](https://eve.dev/docs) — learn about eve's features and authoring APIs.
- [Build an Agent tutorial](https://eve.dev/docs/tutorial/first-agent) — build and deploy an agent step by step.
- [eve on GitHub](https://github.com/vercel/eve) — view the source and contribute.

## Deploy on Vercel

Deploy your agent to [Vercel](https://vercel.com) from the project root:

```bash
eve deploy
```

`eve deploy` links a Vercel project if needed and deploys the agent to production. See the [eve deployment documentation](https://eve.dev/docs/guides/deployment/vercel) for authentication, environment variables, and deployment options.
