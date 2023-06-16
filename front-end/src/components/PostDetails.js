import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div className="post-detail">
      <h4>{post.userName}</h4>
      <p>{post.description}</p>
      <p>{post.likes}</p>
      <p>{post.created_at}</p>
    </div>
  );
};

export default PostDetails;
