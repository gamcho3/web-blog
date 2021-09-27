import React, { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const { email, name, message } = formData;

  const [requestStatus, setRequestStatus] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timeout = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [requestStatus]);

  const changeHandler = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setRequestStatus("pending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await res.json();

      setRequestStatus("success");
      setFormData({ email: "", name: "", message: "" });
    } catch (error) {
      setRequestStatus("error");
    }
  };

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "sending message...",
      message: "your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "success",
      message: "your message is success",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "error!",
      message: "빈 공간 없이 전부 기입해 주세요",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              onChange={changeHandler}
              value={email}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              onChange={changeHandler}
              value={name}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">description</label>
          <textarea
            id="message"
            row="5"
            onChange={changeHandler}
            required
            value={message}
          />
        </div>
        <div className={classes.actions}>
          <button>SEND</button>
        </div>
      </form>
      {notification ? (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default ContactForm;
