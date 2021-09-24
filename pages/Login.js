import React, { Fragment, useState } from "react";
import Login from "../component/auth/Login";
import Signup from "../component/auth/Signup";
const LoginPage = () => {
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

export default LoginPage;
