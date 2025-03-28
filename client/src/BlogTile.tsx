import { Link } from "react-router-dom"

function toSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/\s+/g, '-') //replace spaces with dash
		.replace(/[^\w-]+/g, ''); //remove special chars
}

export type BlogTileProps = {
	id: bigint
	title: string,
	description: string,
	image: string,
	date: Date
}

const BlogTile = ({ title, description, image, date }: BlogTileProps) => {
	console.log(title, toSlug(title))
	return (
		<div className="blog-tile">
			<Link to={`/${toSlug(title)}`}>
				<button>
					<img className="blog-image" src={image} alt={title} />
					<div className="blog-metadata">
						<h3 className="blog-title">{title}</h3>
						<time className="blog-date">{date.toDateString()}</time>
						<p className="blog-description">{description}</p>
					</div>
				</button>
			</Link>
		</div>
	);
};

export default BlogTile;
