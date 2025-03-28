import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import axios from "axios";
import { API_URL } from "../../env";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormOTP = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  const otpRef = useRef();
  const navigate = useNavigate();

  const submitOtp = () => {
    axios
      .post(`${API_URL}/user/verification/${otp}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.message === "Verified") {
          toast.info("Berhasil diverifikasi, silahkan login");
          sessionStorage.removeItem("phone")
          navigate("/login")
        } else {
          toast.error("Tidak berhasil melakukan verifikasi");
        }
      })
      .catch((error) => {
        console.log(error)
        toast.info("terjadi kesalahan, silahkan kontak admin");
      });
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60); 
      
      axios
      .post(`${API_URL}/user/request-otp/${sessionStorage.getItem("phone")}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.message === "Otp refreshed") {
          toast.info("Otp berhasil dikirim ulang");
        } else {
          toast.error("Otp tidak berhasil dikirim ulang");
        }
      })
      .catch((error) => {
        toast.info("terjadi kesalahan, silahkan kontak admin");
      });
    }
  };

  useEffect(() => {
    otpRef.current.focus();
  }, []);

  return (
    <div>
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
      <button onClick={() => submitOtp()} className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold">
        Verifikasi
      </button>
      <p className="text-xs lg:text-sm text-white text-center mt-5">
      Belum menerima kode?{" "}
      <span
        className={`text-white font-bold cursor-pointer ${
          countdown > 0 ? "opacity-50 cursor-not-allowed" : "hover:text-seventh"
        }`}
        onClick={handleResend}
      >
        {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : "Kirim Ulang OTP"}
      </span>
    </p>

    </div>
  );
};

export default FormOTP;
