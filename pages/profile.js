import React from "react";
import UserProfile from "../component/profile/user-profile";
import { getSession } from "next-auth/client";
const Profile = (props) => {
  return <UserProfile session={props.session} />;
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanant: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
};

export default Profile;
