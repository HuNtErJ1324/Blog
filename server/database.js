const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function connect() {
    return open({
        filename: './blog.db',
        driver: sqlite3.Database
    });
}

module.exports = { connect };
