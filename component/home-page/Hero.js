import React from "react";
import classes from "./Hero.module.css";
import Image from "next/image";
import profile from "../../public/images/site/profile.jpeg";
const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src={profile} alt="image showing max" width={300} height={300} />
      </div>
      <h1>my blog by name</h1>
      <p>I blog about web development</p>
    </section>
  );
};

export default Hero;
