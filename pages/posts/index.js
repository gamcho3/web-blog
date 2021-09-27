import React, { Fragment } from "react";
import AllPosts from "../../component/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head";
const AllPostsPage = (props) => {
  const { allPosts } = props;
  return (
    <Fragment>
      <Head>
        <title>All Post</title>
        <meta name="description" content="show all post"></meta>
      </Head>
      <AllPosts posts={allPosts} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();

  return { props: { allPosts: posts } };
}

export default AllPostsPage;
