import React from "react";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenders= {}
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
