const { connect } = require('./database.js');

async function setup() {
    const db = await connect();

    console.log('Running migrations...');
    await db.migrate({ force: 'last' });

    console.log('Database setup complete.');
    await db.close();
}

setup().catch(err => {
    console.error('Database setup failed:', err);
    process.exit(1);
});