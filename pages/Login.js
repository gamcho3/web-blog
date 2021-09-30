import React, { Fragment, useState } from "react";
import Login from "../component/auth/Login";
import Signup from "../component/auth/Signup";
import { getSession } from "next-auth/client";

const LoginPage = (props) => {
  const [convert, setConvert] = useState(false);

  const switchHandler = () => {
    setConvert((prev) => !prev);
  };

  return (
    <Fragment>
      {!convert ? (
        <Login onClick={switchHandler} />
      ) : (
        <Signup onClick={switchHandler} />
      )}
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { session },
  };
}

export default LoginPage;
