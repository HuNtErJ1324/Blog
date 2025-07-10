import { useState, useEffect } from 'react';
import { BlogTileProps } from './BlogTile'
import BlogTile from './BlogTile'

const BlogGrid = () => {
	const [tiles, setTiles] = useState<BlogTileProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetch('/api/posts')
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				// Convert date strings back to Date objects
				const formattedData = data.map((post: any) => ({
					...post,
					date: new Date(post.date),
					id: BigInt(post.id) // Convert id to BigInt
				}));
				setTiles(formattedData);
			})
			.catch(err => {
				console.error('Error fetching posts:', err);
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
					key={post.id.toString()}
					id={post.id}
					title={post.title}
					description={post.description}
					image={post.image}
					date={post.date}
				/>
			))}
		</div>
	);
}

export default BlogGrid;