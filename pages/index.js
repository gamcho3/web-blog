import { Fragment } from "react";
import Hero from "../component/home-page/Hero";
import FeaturedPosts from "../component/home-page/FeaturedPosts";
import Head from "next/head";
import { getFeaturedPosts } from "../lib/posts-util";

const homePage = (props) => {
  const { posts } = props;

  return (
    <Fragment>
      <Head>
        <title>Park's Blog</title>
        <meta
          name="description"
          content="I post about programing and web"
        ></meta>
      </Head>
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
