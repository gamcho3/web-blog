import React, { Fragment, useState } from "react";
import Login from "../component/auth/Login";
import Signup from "../component/auth/Signup";
import { getSession } from "next-auth/client";
import Head from "next/head";
const LoginPage = (props) => {
  const [convert, setConvert] = useState(false);

  const switchHandler = () => {
    setConvert((prev) => !prev);
  };

  return (
    <Fragment>
      <Head>
        <title>auth page</title>
        <meta name="description" content="login and signup" />
      </Head>

      {!convert ? (
        <Login onClick={switchHandler} />
      ) : (
        <Signup onClick={switchHandler} />
      )}
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default LoginPage;
