import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import Modal from "../Modal";
import InputPassword from "../element/InputForms/InputPassword";

const FormForgot = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [otp, setOtp] = useState(null);
  const [telp, setTelp] = useState("");
  const [input, setInput] = useState({
    password: "",
    confPassword: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const telpRef = useRef(null);

  useEffect(() => {
    telpRef.current.focus();
  }, []);
  return (
    <div>
      <form>
        <InputForm
          ref={telpRef}
          label="Nomor whatsapp"
          type="telp"
          name="telp"
          id="telp"
          placeholder="+628123456789"
          value={telp}
          onChange={(e) => setTelp(e.target.value)}
        />
        <button
          type="button"
          className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold"
          onClick={() => setShowOtp(true)}
        >
          Kirim kode reset password
        </button>
      </form>

      {/* Modal OTP */}
      <Modal open={showOtp} close={() => setShowOtp(false)}>
        <div className="relative w-full flex flex-col gap-2">
          <h1 className="text-3xl md:text-2xl lg:text-3xl font-bold text-white">
            OTP
          </h1>
          <p className="text-xs lg:text-sm text-white">
            Silahkan periksa whatsapp kamu, kami sudah mengirimkan kode OTP ke
            nomor whatsapp kamu.
          </p>
          <div className="mt-3">
            <InputForm
              label="OTP"
              type="text"
              name="otp"
              id="otp"
              placeholder="Masukan 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={() => {
                setShowOtp(false);
                setShowReset(true);
              }}
              className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold"
            >
              Verifikasi
            </button>
            <p className="text-xs lg:text-sm text-white text-center mt-5">
              Belum menerima kode?{" "}
              <span className={`text-white font-bold cursor-pointer`}>
                Kirim Ulang OTP
              </span>
            </p>
          </div>
        </div>
        <i
          className="bi bi-x-circle-fill absolute top-5 right-5 text-white text-3xl cursor-pointer hover:scale-125 
        transition-all duration-300"
          onClick={() => setShowOtp(false)}
        />
      </Modal>

      {/* Modal Reset Password */}
      <Modal open={showReset} close={() => setShowReset(false)}>
        <div className="relative w-full flex flex-col gap-2">
          <h1 className="text-3xl md:text-2xl lg:text-3xl font-bold text-white">
            Forgot Password
          </h1>
          <p className="text-xs lg:text-sm text-white">
            Silahkan masukan password baru kamu.
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <InputPassword
              label={"Password"}
              name={"password"}
              id={"password"}
              value={input.password}
              onChange={handleInput}
            />
            <InputPassword
              label={"Confirm Password"}
              name={"confPassword"}
              id={"confPassword"}
              value={input.password}
              onChange={handleInput}
            />
            <button
              onClick={() => submitOtp()}
              className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
        <i
          className="bi bi-x-circle-fill absolute top-5 right-5 text-white text-3xl cursor-pointer hover:scale-125 
        transition-all duration-300"
          onClick={() => setShowReset(false)}
        />
      </Modal>
    </div>
  );
};

export default FormForgot;
