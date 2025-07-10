-- Up
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    content TEXT NOT NULL,
    date TEXT NOT NULL
);

-- Down
DROP TABLE posts;
