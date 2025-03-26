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
			<div className="main-content">
				<BlogGrid />
			</div>
			<footer>
				<p>&copy; 2024 Justin Chae</p>
			</footer>
		</>
	);
}

export default BlogApp;
