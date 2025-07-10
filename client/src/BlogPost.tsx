import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
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

    fetch(`/api/posts/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContent(data.content);
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
    return <section className="blog-content">Error loading post: {error.message}</section>;
  }

  return (
    <section className="blog-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}

export default BlogPost;