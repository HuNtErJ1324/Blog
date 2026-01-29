const express = require('express');
const bcrypt = require('bcrypt');
const { connect } = require('../database.js');
const logger = require('../config/logging.config');
const { validate } = require('../middleware/validation');
const { checkAuthStatus } = require('../middleware/auth');

const router = express.Router();

router.post('/login', checkAuthStatus, validate('auth', 'login'), async (req, res) => {
  try {
    if (req.isAuthenticated) {
      return res.json({ authenticated: true });
    }

    const { password } = req.validatedBody;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      logger.error('ADMIN_PASSWORD not set in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const isValid = await bcrypt.compare(password, adminPassword);

    if (isValid) {
      req.session.isAuthenticated = true;
      req.session.save((err) => {
        if (err) {
          logger.error('Session save error:', err);
          return res.status(500).json({ error: 'Login failed' });
        }
        logger.info('Admin logged in successfully');
        res.json({ authenticated: true });
      });
    } else {
      logger.warn('Failed admin login attempt');
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (err) {
    logger.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    logger.info('Admin logged out');
    res.json({ authenticated: false });
  });
});

router.get('/status', checkAuthStatus, (req, res) => {
  res.json({ authenticated: req.isAuthenticated });
});

module.exports = router;