## CollabDeck

This repository contains the full-stack implementation of **CollabDeck**, a real-time collaborative Kanban workspace.

### Structure

- `apps/frontend` – Next.js web client (SSR + CSR) for the Kanban UI.
- `apps/backend` – NestJS API & WebSocket gateway.
- `packages/shared` – Shared TypeScript models, DTOs, and utilities.

### Scripts

- `npm run dev` – Start frontend and backend in parallel (once apps are implemented).
- `npm run dev:frontend` – Start only the frontend app.
- `npm run dev:backend` – Start only the backend app.

### Getting Started

1. Install dependencies:
   - `npm install`
2. Start development:
   - `npm run dev`

> The actual Next.js and NestJS apps will be scaffolded in later steps.


