const logger = require('../config/logging.config');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack, url: req.url, method: req.method });

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  res.status(500).json({ error: 'Internal server error' });
};

const notFoundHandler = (req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not found' });
};

module.exports = { errorHandler, notFoundHandler };