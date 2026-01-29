const rateLimit = require('express-rate-limit');
const config = require('../config/security.config');

const rateLimiter = rateLimit(config.rateLimit);

module.exports = rateLimiter;