import { useState } from "react";
import { LoginFrom } from "../Components";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  return <LoginFrom loginInfo={loginInfo} setLoginInfo={setLoginInfo} />;
};

export default Login;
