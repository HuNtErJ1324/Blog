require('dotenv').config();
const bcrypt = require('bcrypt');
const { connect } = require('../database.js');
const logger = require('../config/logging.config');

async function seedAdmin() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD not set in environment');
    }

    if (adminPassword.length < 8) {
      throw new Error('ADMIN_PASSWORD must be at least 8 characters');
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const db = await connect();

    // Check if table exists
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Tables:', tables.map(t => t.name));

    await db.run(`
      INSERT OR REPLACE INTO admin_users (username, password_hash, created_at)
      VALUES ('admin', ?, datetime('now'))
    `, [passwordHash]);

    logger.info('Admin user seeded successfully');
    await db.close();
  } catch (err) {
    logger.error('Seed admin failed:', err);
    throw err;
  }
}

if (require.main === module) {
  seedAdmin()
    .then(() => {
      logger.info('Admin seeding completed');
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { seedAdmin };