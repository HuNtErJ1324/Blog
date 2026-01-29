-- Up
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL DEFAULT 'admin',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Update posts table to support drafts and updated timestamps
-- Check if columns exist before adding them
PRAGMA foreign_keys = OFF;
BEGIN;

-- Add status column if it doesn't exist
ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'published';

-- Add updated_at column if it doesn't exist
ALTER TABLE posts ADD COLUMN updated_at TEXT;

-- Add created_at column if it doesn't exist
ALTER TABLE posts ADD COLUMN created_at TEXT;

-- Add index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);

COMMIT;
PRAGMA foreign_keys = ON;

-- Down
DROP INDEX IF EXISTS idx_posts_status;
DROP TABLE IF EXISTS admin_users;