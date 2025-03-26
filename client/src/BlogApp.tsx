import "./BlogApp.css";
import BlogGrid from "./BlogGrid";

const BlogApp = () => {
	return (
		<>
			<header>
				<div>
					<h1>Justin Blog</h1>
				</div>
			</header>
			<BlogGrid />
			<footer>
				<p>&copy; 2024 Justin Chae</p>
			</footer>
		</>
	);
}

export default BlogApp;
