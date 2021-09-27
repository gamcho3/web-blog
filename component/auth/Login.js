import React, { useState } from "react";
import classes from "./auth.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
const Login = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result);
    router.replace("/");
  };

  return (
    <div className={classes.container}>
      <section className={classes["content-box"]}>
        <h1>Login to blog</h1>
        <form className={classes.form} onSubmit={formHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" onChange={changeHandler} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={changeHandler} />
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
