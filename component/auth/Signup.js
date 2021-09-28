import React, { useState, useEffect } from "react";
import classes from "./auth.module.css";
import Notification from "../ui/notification";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
const Signup = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const { name, email, password, password2 } = formData;
  const [requestStatus, setRequestStatus] = useState({
    title: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    if (
      requestStatus.status === "success" ||
      requestStatus.status === "error"
    ) {
      const timeout = setTimeout(() => {
        setRequestStatus({
          title: "",
          message: "",
          status: "",
        });
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [requestStatus]);

  const changeHandler = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowAlert(true);
    setRequestStatus({
      title: "wait...",
      message: "잠시만 기다려주세요...",
      status: "pending",
    });
    if (password.trim() !== password2.trim()) {
      setShowAlert(true);
      setRequestStatus({
        title: "error!",
        message: "password is not correct",
        status: "error",
      });
      return;
    }
    let data;
    try {
      const res = await fetch("/api/auth/auth", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      data = await res.json();
    } catch (error) {
      console.log(error.message);
      throw new Error("network error");
    }

    if (data.status === "success") {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setRequestStatus({
        title: "success!",
        message: data.msg,
        status: "success",
      });
      router.replace("/");
    } else {
      setRequestStatus({
        title: "error!",
        message: data.msg,
        status: "error",
      });
    }
    setShowAlert(true);
  };

  return (
    <div className={classes.container}>
      <section className={classes["content-box"]}>
        <h1>Sign Up</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="name">Full name</label>
              <input type="text" id="name" onChange={changeHandler} required />
            </div>
            <div className={classes.control}>
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" onChange={changeHandler} required />
            </div>
            <div className={classes["password-controls"]}>
              <div className={classes["password-control"]}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className={classes["password-control"]}>
                <label htmlFor="password2">Password Confirm</label>
                <input
                  type="password"
                  id="password2"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>
          </div>

          <div className={classes.actions}>
            <button>Sign Up</button>
          </div>
        </form>
      </section>
      <div className={classes.footer} onClick={props.onClick}>
        <a>login</a>
      </div>
      {showAlert && requestStatus && (
        <Notification
          title={requestStatus.title}
          message={requestStatus.message}
          status={requestStatus.status}
        />
      )}
    </div>
  );
};

export default Signup;
