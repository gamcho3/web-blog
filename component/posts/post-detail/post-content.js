import React from "react";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => {
            //p태그안에 image가 중첩되어 있으므로 바로아래 태그가 img면 div로 출력

            if (node.children[0].tagName === "img") {
              const image = node.children[0];
              return (
                <div className={classes.image}>
                  <Image
                    width={600}
                    height={300}
                    src={`${image.properties.src}`}
                    alt={image.alt}
                  />
                </div>
              );
            }
            return <p>{props.children}</p>;
          },
          code: ({ node, ...props }) => {
            const { className, children } = props;
            const language = className.split("-")[1];
            return (
              <SyntaxHighlighter
                children={children}
                style={atomDark}
                language={language}
              />
            );
          },
        }}
        children={post.content}
      />
    </article>
  );
};

export default PostContent;
