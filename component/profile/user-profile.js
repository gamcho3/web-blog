import React from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>My Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
