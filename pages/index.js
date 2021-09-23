import { Fragment } from "react";
import Hero from "../component/home-page/Hero";
import FeaturedPosts from "../component/home-page/FeaturedPosts";

import { getFeaturedPosts } from "../lib/posts-util";
const homePage = (props) => {
  const { posts } = props;

  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const featuredPosts = getFeaturedPosts();
  return {
    props: { posts: featuredPosts, revalidate: 60 },
  };
}

export default homePage;
