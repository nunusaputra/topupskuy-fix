import React from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import FormOTP from "../components/auth/FormOTP";

const OTP = () => {
  return (
    <AuthLayouts title={"OTP Verification"} type="otp">
      <FormOTP />
    </AuthLayouts>
  );
};

export default OTP;
