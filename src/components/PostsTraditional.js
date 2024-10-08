import { useState, useEffect } from "react";
import axios from "axios";

const PostsTraditional = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      setPosts(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error has occurred...</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post-item" key={post.Name}>
          <h3 className="post-title">{post.Name}</h3>
          <p className="post-body">{post.Homeworld}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsTraditional;