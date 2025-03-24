import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";

const FormOTP = () => {
  const [otp, setOtp] = useState(null);

  const otpRef = useRef();

  useEffect(() => {
    otpRef.current.focus();
  }, []);

  return (
    <form>
      <InputForm
        ref={otpRef}
        label="OTP"
        type="text"
        name="otp"
        id="otp"
        placeholder="Masukan 6 digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold">
        Verifikasi
      </button>
      <p className="text-xs lg:text-sm text-white text-center mt-5">
        Belum menerima kode?{" "}
        <span className="text-white hover:text-seventh font-bold cursor-pointer">
          Kirim Ulang OTP
        </span>
      </p>
    </form>
  );
};

export default FormOTP;
