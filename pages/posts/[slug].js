import React, { Fragment } from "react";
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
  const postFileNames = getPostFiles(); //md파일 디렉토리 읽기
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, "")); //확장자명만 지우고 이름만 배열로 만들기
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })), //params 전달
    fallback: false,
  };
}

export default PostDetailPage;
