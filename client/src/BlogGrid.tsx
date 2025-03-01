import { useState, useEffect } from "react";
import { BlogTileProps } from './BlogTile'
import BlogTile from './BlogTile'

const BlogGrid = () => {
	const [grid, setGrid] = useState<BlogTileProps[]>([]);
	useEffect(() => {
		const init: BlogTileProps[] =
			[
				{
					id: 1n,
					title: "Understanding React",
					description: "Learn the fundamentals of React and how to build dynamic web applications.",
					image: "https://via.placeholder.com/300",
					link: "https://reactjs.org",
					date: new Date("2023-12-01"),
				},
				{
					id: 2n,
					title: "JavaScript ES6 Features",
					description: "Explore modern JavaScript features and how to use them effectively.",
					image: "https://via.placeholder.com/300",
					link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
					date: new Date("2023-12-02"),
				},
				{
					id: 3n,
					title: "CSS Grid Layout",
					description: "Master the CSS Grid layout for creating complex web designs.",
					image: "https://via.placeholder.com/300",
					link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
					date: new Date("2023-12-03"),
				},
			];
		setGrid(init);
	}, []);

	return <>
		{grid.map((post: BlogTileProps) => (
			<BlogTile
				key={post.id}
				id={post.id}
				title={post.title}
				description={post.description}
				image={post.image}
				link={post.link}
				date={post.date}
			/>
		))}
	</>
}

export default BlogGrid;
