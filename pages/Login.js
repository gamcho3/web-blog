import React, { Fragment, useState } from "react";
import Login from "../component/auth/Login";
import Signup from "../component/auth/Signup";
import { getSession } from "next-auth/client";

const LoginPage = (props) => {
  //const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       window.location.href = "/";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);
  // if (isLoading) {
  //   return <Spinner />;
  // }

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

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}

export default LoginPage;
