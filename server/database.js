const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

// Singleton promise to ensure only one database connection is opened.
let dbInstance = null;

async function connect() {
	if (!dbInstance) {
		// The `open` function returns a promise that resolves to the database instance.
		// Use absolute path to ensure consistency across different working directories
		const dbPath = path.join(__dirname, "blog.db");
		dbInstance = open({
			filename: dbPath,
			driver: sqlite3.Database,
		});
	}
	// Subsequent calls will return the same promise,
	// ensuring the database is opened only once.
	return dbInstance;
}

module.exports = { connect };
