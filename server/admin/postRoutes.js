const express = require('express');
const { connect } = require('../database.js');
const logger = require('../config/logging.config');
const { requireAuth, checkAuthStatus } = require('../middleware/auth');
const { validate, validateParams } = require('../middleware/validation');

const router = express.Router();

router.get('/posts', requireAuth, async (req, res) => {
  try {
    const db = await connect();
    const posts = await db.all('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(posts);
  } catch (err) {
    logger.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/posts/:id', requireAuth, validateParams('id'), async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const db = await connect();
    const post = await db.get('SELECT * FROM posts WHERE id = ?', id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    logger.error('Error fetching post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/posts', requireAuth, validate('post', 'create'), async (req, res) => {
  try {
    const { title, slug, description, image, content, status } = req.validatedBody;
    const db = await connect();

    const now = new Date().toISOString();
    const result = await db.run(
      'INSERT INTO posts (title, slug, description, image, content, status, created_at, updated_at, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, description, image, content, status, now, now, now]
    );

    logger.info(`Post created: ${title} (ID: ${result.lastID})`);
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    logger.error('Error creating post:', err);
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'Post with this slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.put('/posts/:id', requireAuth, validateParams('id'), validate('post', 'update'), async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const { title, slug, description, image, content, status } = req.validatedBody;
    const db = await connect();

    const now = new Date().toISOString();
    const result = await db.run(
      'UPDATE posts SET title = ?, slug = ?, description = ?, image = ?, content = ?, status = ?, updated_at = ? WHERE id = ?',
      [title, slug, description, image, content, status, now, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    logger.info(`Post updated: ID ${id}`);
    res.json({ success: true });
  } catch (err) {
    logger.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/posts/:id', requireAuth, validateParams('id'), async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const db = await connect();

    const result = await db.run('DELETE FROM posts WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    logger.info(`Post deleted: ID ${id}`);
    res.json({ success: true });
  } catch (err) {
    logger.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;