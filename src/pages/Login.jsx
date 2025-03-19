import React from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import FormLogin from "../components/auth/FormLogin";

const Login = () => {
  return (
    <div>
      <AuthLayouts title="Login" type="login">
        <FormLogin />
      </AuthLayouts>
    </div>
  );
};

export default Login;
