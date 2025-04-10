import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import Modal from "../Modal";
import InputPassword from "../element/InputForms/InputPassword";
import axios from "axios";
import { API_URL } from "../../env";
import { toast } from "react-toastify";

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

  const request = () => {
    axios
      .post(`${API_URL}/user/request-otp/${telp}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.message === "Otp refreshed") {
          setShowOtp(true);
        } else {
          toast.error("request otp gagal, silahkan hubungi admin");
        }
      })
      .catch((error) => {
        toast.error("terjadi kesalahan pada saat order, silahkan kontak admin");
      });
  };

  const verification = () => {
    axios
      .post(`${API_URL}/user/verification/${otp}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.message === "Verified") {
          setShowOtp(false);
          setShowReset(true);
        } else {
          toast.error("verifikasi otp gagal, silahkan hubungi admin");
        }
      })
      .catch((error) => {
        toast.error("terjadi kesalahan pada saat order, silahkan kontak admin");
      });
  };

  const process = () => {
    console.log(input.password, input.confPassword);
    if (input.password !== input.confPassword) {
      toast.info("password tidak sesuai");
    }

    if (input.password === "") {
      toast.info("password baru belum diisi");
    }

    if (input.confPassword === "") {
      toast.info("password konfirmasi belum diisi");
    }

    if (
      input.password === input.confPassword &&
      input.password !== null &&
      input.confPassword !== null
    ) {
      const object = {
        username: telp,
        newPassword: input.password,
      };

      console.log(object);

      axios
        .post(`${API_URL}/user/forgot-password`, JSON.stringify(object), {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.message === "Update Berhasil") {
            toast.info("Berhasil mengganti password, silahkan login");
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          }
        })
        .catch((error) => {
          toast.error(
            "terjadi kesalahan pada saat order, silahkan kontak admin"
          );
        });
    }
  };

  const processv2 = () => {
    console.log(1);
  };

  return (
    <div>
      <form>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="telp" className=" text-sm font-bold text-white mb-2">
            Nomor WhatsApp
          </label>
          <div className="flex items-center bg-white rounded p-2 w-full overflow-hidden">
            <span className="text-sm mr-2">+62</span>
            <input
              type="telp"
              className="outline-none flex-1 bg-transparent text-sm"
              name="telp"
              id="telp"
              placeholder="81234567890"
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              ref={telpRef}
            />
          </div>
        </div>
        <button
          type="button"
          className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold"
          onClick={() => request()}
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
              onClick={() => verification()}
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
              value={input.confPassword}
              onChange={handleInput}
            />
            <button
              onClick={() => {
                process();
              }}
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
