import React from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import FormForgot from "../components/auth/FormForgot";

const ForgotPassword = () => {
  return (
    <AuthLayouts title={"Kamu Lupa Password?"} type={"forgot"}>
      <FormForgot />
    </AuthLayouts>
  );
};

export default ForgotPassword;
