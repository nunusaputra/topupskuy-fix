import React from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import FormRegister from "../components/auth/FormRegister";

const Register = () => {
  return (
    <div>
      <AuthLayouts title={"Register"} type={"register"}>
        <FormRegister />
      </AuthLayouts>
    </div>
  );
};

export default Register;
