import "./BlogApp.css";
import BlogGrid from "./BlogGrid";
import logo from "./assets/Hunter_J.png";

const BlogApp = () => {
	return (
		<>
			<header>
				<div>
					<h1>Justin Blog</h1>
					<img src={logo} />
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
