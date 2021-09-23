import React, { Fragment } from "react";
import AllPosts from "../../component/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
const AllPostsPage = (props) => {
  const { allPosts } = props;
  return (
    <Fragment>
      <AllPosts posts={allPosts} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();

  return { props: { allPosts: posts } };
}

export default AllPostsPage;
