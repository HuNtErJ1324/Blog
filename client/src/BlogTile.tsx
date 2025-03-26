export type BlogTileProps = {
	id: bigint
	title: string,
	description: string,
	image: string,
	link: string,
	date: Date
}

const BlogTile = ({ title, description, image, link, date }: BlogTileProps) => {
	return (
		<div className="blog-tile">
			<a href={link} target="_blank" rel="noopener noreferrer">
				<img className="blog-image" src={image} alt={title} />
				<div className="blog-content">
					<h3 className="blog-title">{title}</h3>
					<time className="blog-date">{date.toDateString()}</time>
					<p className="blog-description">{description}</p>
				</div>
			</a>
		</div>
	);
};

export default BlogTile;
