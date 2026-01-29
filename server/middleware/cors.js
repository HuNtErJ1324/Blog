const cors = require('cors');
const config = require('../config/security.config');

const corsMiddleware = cors(config.cors);

module.exports = corsMiddleware;