# Agent Guidelines for Blog Repository

This document outlines the conventions and commands for agents operating within this repository.

## Build/Lint/Test Commands

### Client (React/TypeScript)
- **Install Dependencies**: `npm install`
- **Build**: `npm run build` (compiles TypeScript and bundles for production)
- **Lint**: `npm run lint` (checks for code style and potential errors)
- **Run Development Server**: `npm run dev`
- **Preview Production Build**: `npm run preview`
- **Single Test**: This project does not have explicit unit tests configured. If adding tests, use a framework like Vitest or Jest and configure `package.json` scripts accordingly.

### Server (Node.js)
- **Install Dependencies**: `npm install`
- **Start Server**: `node index.js`
- **Upload Posts**: `node upload-posts.js`
- **Setup Database**: `node setup-database.js`
- **Delete Post**: `node delete-post.js`
- **Single Test**: No explicit test runner configured.

## Code Style Guidelines

### General
- **Formatting**: Adhere to existing Prettier/ESLint configurations.
- **Naming Conventions**:
    - Files: `kebab-case` (e.g., `blog-post.tsx`, `delete-post.js`)
    - Components/Interfaces (Client): `PascalCase` (e.g., `BlogPost`, `Post`)
    - Variables/Functions: `camelCase`
- **Error Handling**: Implement `try...catch` blocks for asynchronous operations and API calls, providing informative error messages.

### Client (React/TypeScript)
- **Imports**: Use relative paths for local modules. Group imports: React/library imports first, then absolute imports, then relative imports.
- **Types**: Utilize TypeScript interfaces for data structures (e.g., `Post.ts`).
- **Components**: Prefer functional components with hooks.
- **Styling**: Use Tailwind CSS and PostCSS as configured.

### Server (Node.js)
- **Imports**: Use `require()` for module imports.
- **Asynchronous Operations**: Use `async/await` for database interactions and other asynchronous tasks.
- **Database**: Interact with SQLite using the `sqlite` and `sqlite3` libraries.
