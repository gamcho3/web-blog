import React from "react";
import { useRouter } from "next/router";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { signOut } from "next-auth/client";
const UserProfile = (props) => {
  const removeHandler = async () => {
    const res = await fetch("/api/auth/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    signOut();
  };

  return (
    <section className={classes.profile}>
      <h1>My Profile</h1>
      <ProfileForm session={props.session} />
      <button className={classes.delete} onClick={removeHandler}>
        Delete Password
      </button>
    </section>
  );
};

export default UserProfile;
