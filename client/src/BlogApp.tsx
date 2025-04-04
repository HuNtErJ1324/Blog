import "./BlogApp.css";
import BlogGrid from "./BlogGrid";
import BlogPost from "./BlogPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BlogApp = () => {
	return (
		<Router>
			<div className="app-container">
				<header>
					<div>
						<h1>Justin Blog</h1>
					</div>
				</header>
				<div className="main-content">
					<Routes>
						<Route path="/" element={<BlogGrid />} />
						<Route path="/:slug" element={<BlogPost />} />a
					</Routes>
				</div>
				<footer>
					<p>&copy; 2024 Justin Chae</p>
				</footer>
			</div>
		</Router>
	);
}

export default BlogApp;
