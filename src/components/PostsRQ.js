import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ = () => {
  // /posts --> ["posts"]
  // /posts/1 --> ["posts", post.Id]
  // /posts/1/comments --> ["posts", post.Id, "comments"]

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // staleTime: 30000,
    // refetchInterval: 1000,
    enabled: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="post-list">
      <button onClick={refetch}>Fetch posts</button>
      {data?.data.map((post) => (
        <Link to={`/rq-posts/${post.id}`} key={post.id}>
          <div className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
