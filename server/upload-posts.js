const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");
const slugify = require("slugify");
const { connect } = require("./database.js");

const POSTS_DIR = path.join(__dirname, "posts");

async function uploadPosts() {
	try {
		const db = await connect();
		const files = await fs.readdir(POSTS_DIR);

		for (const file of files) {
			if (path.extname(file) === ".md") {
				const filePath = path.join(POSTS_DIR, file);
				const fileContent = await fs.readFile(filePath, "utf8");
				const { data, content } = matter(fileContent);

				if (!data.title) {
					console.warn(`Skipping ${file}: No title found in front matter.`);
					continue;
				}

				const slug = slugify(data.title, { lower: true, strict: true });

				const existingPost = await db.get(
					"SELECT id FROM posts WHERE slug = ?",
					slug,
				);

				if (existingPost) {
					console.log(`Skipping ${file}: Post with slug "${slug}" already exists.`);
					continue;
				}

				await db.run(
					"INSERT INTO posts (title, slug, description, image, content, date) VALUES (?, ?, ?, ?, ?, ?)",
					[
						data.title,
						slug,
						data.description || null,
						data.image || null,
						content,
						new Date().toISOString(),
					],
				);

				console.log(`Successfully inserted post from ${file}`);
			}
		}
		console.log("Finished processing all posts.");
	} catch (err) {
		console.error("Error uploading posts:", err);
	}
}

uploadPosts();
