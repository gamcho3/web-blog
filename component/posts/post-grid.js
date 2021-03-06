import React from "react";
import classes from "./post-grid.module.css";
import PostItem from "./post-item";
const PostGrid = (props) => {
  const { posts } = props;
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </ul>
  );
};

export default PostGrid;
