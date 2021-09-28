import React, { useState, useEffect } from "react";
import classes from "./auth.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Notification from "../ui/notification";
const Login = (props) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [requestStatus, setRequestStatus] = useState({
    title: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [requestStatus]);

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
    setShowAlert(true);
    setRequestStatus({
      title: "wait...",
      message: "wait a second...",
      status: "pending",
    });
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setRequestStatus({
        title: "error!",
        message: result.error,
        status: "error",
      });
    } else {
      setRequestStatus({
        title: "success",
        message: "login success",
        status: "success",
      });
      router.replace("/");
    }
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
      {showAlert && (
        <Notification
          title={requestStatus.title}
          message={requestStatus.message}
          status={requestStatus.status}
        />
      )}
    </div>
  );
};

export default Login;
