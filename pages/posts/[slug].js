import React from "react";
import { useRouter } from "next/router";
import PostContent from "../../component/posts/post-detail/post-content";
import { getPostFiles, getPostData } from "../../lib/posts-util";

const PostDetailPage = (props) => {
  const { post } = props;
  return <PostContent post={post} />;
};

export async function getStaticProps(context) {
  const path = context.params.slug;
  const post = getPostData(path);
  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const postFileNames = getPostFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
