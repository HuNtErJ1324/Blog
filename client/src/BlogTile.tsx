export type BlogTileProps = {
	id: bigint
	title: string,
	description: string,
	image: string,
	link: string,
	date: Date
}

const BlogTile = ({ title, description, image, link, date }: BlogTileProps) => {
	return <>
		<a href={link}>
			<img src={image} />
			<strong>{title}</strong>
			<p>{date.toDateString()}</p>
			<p>{description}</p>
		</a>
	</>
}

export default BlogTile;
