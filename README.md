# LokApp - Arcanelogic

This repository is a monorepo containing both the frontend and backend of the LokApp project.

## Project Structure

- `client/`: Next.js frontend application.
- `server/`: Express.js backend application.
- `.env`: Shared environment variables (used by both client and server).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

Install dependencies for both projects from the root:

```bash
npm install
```

### Development

You can run both the frontend and backend concurrently from the root:

```bash
npm run dev
```

Alternatively, you can run them individually:

- **Frontend only**: `npm run dev:client`
- **Backend only**: `npm run dev:server`

## Scripts

Available scripts in the root `package.json`:

- `npm run dev`: Start both client and server in development mode.
- `npm run dev:client`: Start Next.js development server.
- `npm run dev:server`: Start Express development server with watchers.
- `npm run build`: Build both client and server.
- `npm run build:client`: Build the Next.js application.
- `npm run build:server`: Transpile the backend code.
