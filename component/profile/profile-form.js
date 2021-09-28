import React, { useState, useEffect } from "react";
import classes from "./profile-form.module.css";
import Notification from "../ui/notification";
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [requestStatus, setRequestStatus] = useState(null);

  const { oldPassword, newPassword } = formData;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setRequestStatus(null);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [requestStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setRequestStatus({
      title: "wait...",
      message: "잠시만 기다려주세요",
      status: "pending",
    });
    const res = await fetch("/api/user/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setRequestStatus({
      title: data.status,
      message: data.msg,
      status: data.status,
    });
    setFormData({
      oldPassword: "",
      newPassword: "",
    });
  };

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          id="oldPassword"
          onChange={changeHandler}
          value={oldPassword}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          onChange={changeHandler}
          value={newPassword}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {requestStatus && (
        <Notification
          title={requestStatus.title}
          message={requestStatus.message}
          status={requestStatus.status}
        />
      )}
    </form>
  );
};

export default ProfileForm;
