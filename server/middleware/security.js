const helmet = require('helmet');
const config = require('../config/security.config');

const setupSecurity = (app) => {
  app.use(helmet(config.helmet));
};

module.exports = setupSecurity;