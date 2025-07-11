const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Singleton promise to ensure only one database connection is opened.
let dbInstance = null;

async function connect() {
	if (!dbInstance) {
		// The `open` function returns a promise that resolves to the database instance.
		// We store this promise in our singleton variable.
		dbInstance = open({
			filename: "./blog.db",
			driver: sqlite3.Database,
		});
	}
	// Subsequent calls will return the same promise,
	// ensuring the database is opened only once.
	return dbInstance;
}

module.exports = { connect };
