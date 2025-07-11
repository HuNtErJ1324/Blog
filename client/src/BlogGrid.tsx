import { useState, useEffect } from "react";
import BlogTile from "./BlogTile";
import { Post } from "./interfaces/Post";

const BlogGrid = () => {
	const [tiles, setTiles] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data: Post[]) => {
				// Convert date strings back to Date objects
				const formattedData = data.map((post) => ({
					...post,
					date: new Date(post.date),
				}));
				setTiles(formattedData);
			})
			.catch((err) => {
				console.error("Error fetching posts:", err);
				setError(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <div className="blog-grid">Loading posts...</div>;
	}

	if (error) {
		return <div className="blog-grid">Error loading posts: {error.message}</div>;
	}

	return (
		<div className="blog-grid">
			{tiles.map((post) => (
				<BlogTile
					key={post.id}
					id={post.id}
					title={post.title}
					slug={post.slug}
					description={post.description}
					image={post.image}
					date={post.date}
				/>
			))}
		</div>
	);
};

export default BlogGrid;
