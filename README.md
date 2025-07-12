# React & Node.js Blog

This is a full-stack blog application built with a React frontend and a Node.js (Express) backend. The server provides a RESTful API for blog posts, which are stored in a SQLite database. The client is a single-page application (SPA) built with Vite and TypeScript.

## Features

-   **Markdown-Based:** Blog posts are written in Markdown with frontmatter for metadata.
-   **Dynamic Frontend:** A responsive grid layout of blog posts and a detailed view for individual posts, rendered using React.
-   **RESTful API:** A simple and clean API for fetching all posts or a single post by its slug.
-   **SQLite Database:** A lightweight, file-based SQL database for storing post content.
-   **Easy Setup:** The project includes scripts for easy database initialization and seeding.

## Technologies Used

**Client (Frontend):**
-   React
-   Vite
-   TypeScript
-   React Router
-   React Markdown
-   ESLint

**Server (Backend):**
-   Node.js
-   Express.js
-   SQLite3
-   CORS
-   `gray-matter` for parsing Markdown frontmatter

## Project Structure

The project is organized into two main directories:

-   `client/`: Contains the complete React frontend application.
-   `server/`: Contains the Node.js backend, including the Express server, database logic, and migrations.

```
.
├── client/         # React Frontend
│   ├── src/
│   └── package.json
└── server/         # Node.js Backend
    ├── migrations/
    ├── posts/
    ├── database.js
    ├── index.js
    └── package.json
```

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Server Setup

First, set up the backend server, which will initialize the database and serve the API.

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Set up the SQLite database and run migrations
npm run setup

# 4. Seed the database with posts from the /posts directory
npm run upload

# 5. Start the server
npm start
```
The API server will now be running on `http://localhost:3000`.

### 2. Client Setup

Next, set up the React frontend application.

```bash
# 1. Open a new terminal and navigate to the client directory
cd client

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
The React application will now be running on `http://localhost:5173` (or another port if 5173 is busy) and will fetch data from your local API server.
