const fs = require('fs').promises;
const path = require('path');
const { connect } = require('../database.js');
const logger = require('../config/logging.config');

const BACKUP_DIR = path.join(__dirname, '../backups');
const RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS) || 30;

async function backupDatabase() {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    const db = await connect();
    const posts = await db.all('SELECT * FROM posts');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.json`);

    await fs.writeFile(backupFile, JSON.stringify(posts, null, 2));
    logger.info(`Database backed up to: ${backupFile}`);

    await cleanupOldBackups();

    await db.close();
  } catch (err) {
    logger.error('Backup failed:', err);
    throw err;
  }
}

async function cleanupOldBackups() {
  try {
    const files = await fs.readdir(BACKUP_DIR);
    const now = Date.now();

    for (const file of files) {
      const filePath = path.join(BACKUP_DIR, file);
      const stats = await fs.stat(filePath);
      const fileAge = now - stats.mtimeMs;
      const retentionMs = RETENTION_DAYS * 24 * 60 * 60 * 1000;

      if (fileAge > retentionMs) {
        await fs.unlink(filePath);
        logger.info(`Deleted old backup: ${file}`);
      }
    }
  } catch (err) {
    logger.error('Backup cleanup error:', err);
  }
}

if (require.main === module) {
  backupDatabase()
    .then(() => {
      logger.info('Backup completed successfully');
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { backupDatabase };