require('dotenv').config();
const express = require('express');
const config = require('./config/security.config');
const logger = require('./config/logging.config');

// Middleware
const setupSecurity = require('./middleware/security');
const corsMiddleware = require('./middleware/cors');
const rateLimiter = require('./middleware/rateLimit');
const { requireAuth, checkAuthStatus } = require('./middleware/auth');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./admin/authRoutes');
const postRoutes = require('./admin/postRoutes');
const uploadRoutes = require('./admin/uploadRoutes');

// Database
const { connect } = require('./database.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for accurate rate limiting behind Cloudflare
app.set('trust proxy', 1);

// Security middleware
setupSecurity(app);
app.use(corsMiddleware);
app.use(rateLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('public/uploads'));

// Session middleware
const session = require('express-session');
app.use(session(config.session));

// Auth status middleware
app.use(checkAuthStatus);

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const db = await connect();
    await db.get('SELECT 1');
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (err) {
    logger.error('Health check failed:', err);
    res.status(503).json({ status: 'unhealthy', error: 'Database connection failed' });
  }
});

// Public API endpoints (existing)
app.get('/api/posts', async (req, res) => {
  try {
    const db = await connect();
    const posts = await db.all(
      "SELECT id, title, slug, description, image, date FROM posts WHERE status = 'published'"
    );
    res.json(posts);
  } catch (err) {
    logger.error('Failed to fetch posts', err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const db = await connect();
    const post = await db.get("SELECT * FROM posts WHERE slug = ? AND status = 'published'", slug);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    logger.error(`Failed to fetch post: ${req.params.slug}`, err);
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// Admin routes
app.use('/api/admin', authRoutes);
app.use('/api/admin', postRoutes);
app.use('/api/admin', uploadRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  try {
    const db = await connect();
    await db.close();
    logger.info('Database connection closed');
  } catch (err) {
    logger.error('Error closing database:', err);
  }

  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const server = app.listen(PORT, () => {
  logger.info(`API Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
