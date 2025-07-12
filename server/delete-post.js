const { connect } = require("./database.js");

async function deletePost(title) {
  if (!title) {
    console.error("Please provide a post title to delete.");
    process.exit(1);
  }

  const db = await connect();
  try {
    const result = await db.run("DELETE FROM posts WHERE title = ?", title);
    if (result.changes === 0) {
      console.log(`No post found with title: "${title}"`);
    } else {
      console.log(`Successfully deleted post: "${title}"`);
    }
  } catch (err) {
    console.error(`Error deleting post: "${title}"`, err);
  } finally {
    await db.close();
  }
}

const titleToDelete = process.argv[2];
deletePost(titleToDelete);
