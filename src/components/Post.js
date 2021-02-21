import React from "react";
import { useParams } from "react-router-dom";
import { SendMessage } from "./Posts";

const Post = ({ posts, token }) => {
  const { postId } = useParams();
  const post = posts.find((post) => postId === post._id);

  return (
    <>
      <h2>Post</h2>
      <div key={post._id} style={{ border: "1px solid black" }}>
        <h5>{post.title}</h5>
        <div>Posted by : {post.author.username}</div>
        <div>Description : {post.description}</div>
        <div>Price: {post.price}</div>
        <div>Location: {post.location}</div>
        <div>Delivers: {post.willDeliver ? "Yes" : " no "}</div>
      </div>
      <div>
        <SendMessage token={token} post={post} />
      </div>
    </>
  );
};

export default Post;
