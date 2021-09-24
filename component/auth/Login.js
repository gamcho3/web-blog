import React from "react";
import classes from "./auth.module.css";

const Login = (props) => {
  return (
    <div className={classes.container}>
      <section className={classes["content-box"]}>
        <h1>Login to blog</h1>
        <form className={classes.form}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
          </div>
          <div className={classes.actions}>
            <button>Log In</button>
          </div>
        </form>
      </section>
      <div className={classes.footer} onClick={props.onClick}>
        <a>create an account</a>
      </div>
    </div>
  );
};

export default Login;
