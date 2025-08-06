import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Post } from "./interfaces/Post";

function BlogPost() {
	const { slug } = useParams<{ slug: string }>();
	const [post, setPost] = useState<Post | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!slug) {
			setError(new Error("No post slug provided."));
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${slug}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setPost(data);
			})
			.catch((err) => {
				console.error("Post load error: ", err);
				setError(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [slug]);

	if (isLoading) {
		return <section className="blog-content">Loading post...</section>;
	}

	if (error) {
		return (
			<section className="blog-content">
				Error loading post: {error.message}
			</section>
		);
	}

	//TODO: finish setting up tailwind
	return (
		<article className="prose lg:prose-xl blog-content">
				<ReactMarkdown>{post?.content ?? ""}</ReactMarkdown>
			</article>
	);
}

export default BlogPost;
