import { BlogTileProps } from './BlogTile'
import BlogTile from './BlogTile'

const BlogGrid = () => {
	const tiles: BlogTileProps[] =
		[
			{
				id: 1n,
				title: "post1",
				description: "Learn the fundamentals of React and how to build dynamic web applications.",
				image: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2022/09/Pokemon-Salamence-Hunter-J.jpg",
				date: new Date("2023-12-01"),
			},
		];

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
