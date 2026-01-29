import "./BlogApp.css";
import BlogGrid from "./BlogGrid";
import BlogPost from "./BlogPost";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import PostEditor from "./admin/PostEditor";
import ProtectedRoute from "./admin/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BlogApp = () => {
	return (
		<Router>
			<div className="app-container">
				<header>
					<div className="profile-container">
						<div className="profile-text">
							<h1>Justin Yang Chae <span className="korean-name">(채정인)</span></h1>
							<p>Undergraduate @ University of Washington</p>
						</div>
					</div>
				</header>
				<nav role="navigation" aria-label="Main navigation">
					<a href="https://justin-chae.org">Home</a>
					<a href="https://justin-chae.org/papers">Papers</a>
					<a href="https://justin-chae.org/projects">Projects</a>
					<a href="https://justin-chae.org/awards">Achievements</a>
					<a href="https://justin-chae.org/contact">Contact</a>
					<a href="https://justin-chae.org/music.html">Violin</a>
				</nav>
				<div className="main-content">
					<Routes>
						<Route path="/" element={<BlogGrid />} />
						<Route path="/:slug" element={<BlogPost />} />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
					<Route path="/admin/posts" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
					<Route path="/admin/posts/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
					<Route path="/admin/posts/:id/edit" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
					</Routes>
				</div>
				<footer>
					<p>&copy; 2025 Justin Yang Chae</p>
				</footer>
			</div>
		</Router>
	);
}

export default BlogApp;
