const { connect } = require('./database.js');

const postContent = `
# My First Blog Post

This is the content of my very first blog post. It's written in **Markdown**.

*   Here is a list item.
*   And another one.

I hope you enjoy it!
`;

async function setup() {
    const db = await connect();

    console.log('Running migrations...');
    await db.migrate({ force: 'last' });

    console.log('Seeding initial data...');
    await db.run(
        `INSERT INTO posts (title, slug, description, image, content, date) VALUES (?, ?, ?, ?, ?, ?)`,
        'My First Post',
        'my-first-post',
        'This is a short description for my very first blog post.',
        'https://static0.colliderimages.com/wordpress/wp-content/uploads/2022/09/Pokemon-Salamence-Hunter-J.jpg',
        postContent,
        new Date().toISOString()
    );

    console.log('Database setup complete.');
    await db.close();
}

setup().catch(err => {
    console.error('Database setup failed:', err);
    process.exit(1);
});
