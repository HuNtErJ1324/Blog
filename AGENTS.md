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
- **Start Server**: `npm start` (or `node index.js`)
- **Setup Database**: `npm run setup` (runs migrations)
- **Seed Admin User**: `npm run seed-admin`
- **Create Backup**: `npm run backup`
- **Upload Posts**: `node upload-posts.js`
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

## Security Features

### Implemented Security Measures

1. **Helmet.js** - Security headers including Content Security Policy (CSP)
2. **CORS Configuration** - Restricted to specific origins (`blog.justin-chae.org`, `localhost:5173`)
3. **Rate Limiting** - 100 requests per 15 minutes using express-rate-limit
4. **Input Validation** - Joi schemas for all API inputs with comprehensive validation
5. **XSS Protection** - DOMPurify sanitization for all user-generated HTML content
6. **Session-based Authentication** - Secure session management with httpOnly cookies
7. **Password Hashing** - bcrypt for admin password storage (10 rounds)
8. **Error Handling** - Sanitized error responses, no stack traces in production
9. **File Upload Security** - MIME type validation, file size limits, secure file storage

### Backup Strategy

- Weekly automatic backups configured (`npm run backup` in server directory)
- 30-day retention policy (keeps 4 backups)
- Backups stored in `server/backups/` as JSON files
- Includes all posts with metadata

### Logging

- Winston structured logging with daily rotation
- 7-day retention for log files
- Separate files: `combined.log`, `error.log`
- Request tracking with timestamps and request IDs
- Console logging in development, file-only in production

## Admin Features

### Authentication

- Session-based authentication with secure cookies
- Single admin user with password from `.env`
- 24-hour session duration
- Automatic logout on session expiry
- Login endpoint: `POST /api/admin/login`

### Post Management

- Full CRUD operations for blog posts
- Draft vs Published status support
- Auto-generated slugs from titles
- Image upload support (stored in `server/public/uploads/`)
- Live markdown editor with preview
- Post creation, editing, and deletion
- Status toggling between draft and published

### Admin UI Routes

- `/admin/login` - Admin login page
- `/admin/posts` - Post dashboard (list all posts)
- `/admin/posts/new` - Create new post
- `/admin/posts/:id/edit` - Edit existing post

### API Endpoints

**Public:**
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:slug` - Get single published post by slug
- `GET /health` - Health check endpoint

**Admin (requires authentication):**
- `POST /api/admin/login` - Authenticate admin
- `POST /api/admin/logout` - Logout admin
- `GET /api/admin/status` - Check auth status
- `GET /api/admin/posts` - Get all posts (including drafts)
- `GET /api/admin/posts/:id` - Get single post by ID
- `POST /api/admin/posts` - Create new post
- `PUT /api/admin/posts/:id` - Update existing post
- `DELETE /api/admin/posts/:id` - Delete post
- `POST /api/admin/upload` - Upload image file
