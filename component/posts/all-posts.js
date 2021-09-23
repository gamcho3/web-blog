import React from "react";
import classes from "./all-posts.module.css";
import PostGrid from "./post-grid";
const AllPosts = (props) => {
  const { posts } = props;
  return (
    <section className={classes.posts}>
      <h1>all Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
