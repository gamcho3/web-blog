import { Fragment } from "react";
import spinner from "./spinner.gif";
import Image from "next/image";
import classes from "./Spinner.module.css";
const Spinner = () => {
  return (
    <Fragment>
      <Image src={spinner} className={classes.spinner} alt="Loading..."></Image>
    </Fragment>
  );
};

export default Spinner;
