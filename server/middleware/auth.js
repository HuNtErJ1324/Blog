const logger = require('../config/logging.config');

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.isAuthenticated) {
    logger.warn(`Unauthorized access attempt: ${req.method} ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const checkAuthStatus = (req, res, next) => {
  req.isAuthenticated = !!(req.session && req.session.isAuthenticated);
  next();
};

module.exports = { requireAuth, checkAuthStatus };