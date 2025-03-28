import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function BlogPost() {
  const { slug } = useParams(); //get post name from URL
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`src/posts/${slug}.md`) //load md file
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Post load error: ", error));
  }, [slug]); //refetch post when slug updates

  return (
    <section className="blog-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  )
}

export default BlogPost;
