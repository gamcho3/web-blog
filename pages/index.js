import { Fragment } from "react";
import Hero from "../component/home-page/Hero";
import FeaturedPosts from "../component/home-page/FeaturedPosts";
const homePage = () => {
  const DUMMY_POST = [
    {
      title: "getting started with nextJS",
      image: "getting-started-nextjs.png",
      excerpt:
        "nextjs is a the react framework for production  - it makes building fullstack react app and sites a breeze",
      date: "2022-10-22",
      slug: "getting-started-with-nextjs",
    },
  ];
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POST} />
    </Fragment>
  );
};

export default homePage;
