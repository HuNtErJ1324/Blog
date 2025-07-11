import { Link } from "react-router-dom";
import { Post } from "./interfaces/Post";

export type BlogTileProps = Omit<Post, "content">;

const BlogTile = ({ slug, title, description, image, date }: BlogTileProps) => {
	return (
		<div className="blog-tile">
			<Link to={`/${slug}`}>
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

