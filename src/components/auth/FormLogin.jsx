import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";
import axios from "axios";
import { API_URL } from "../../env";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FormLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const submitLogin = () => {
    const object = {
      username: !input.email.startsWith("+62")
        ? `+62${input.email}`
        : input.email,
      password: input.password,
    };

    axios
      .post(`${API_URL}/user/authentication/member`, JSON.stringify(object), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem("unique-code", response.data.data.id);
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error(
          "terjadi kesalahan pada saat order, silahkan kontak admin"
        );
      });
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-1">
        <label htmlFor="telp">Nomor Telp</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full overflow-hidden">
          <span className="text-white text-sm mr-2">+62</span>
          <input
            type="telp"
            className="outline-none flex-1 bg-transparent text-white text-sm"
            name="email"
            id="email"
            placeholder="81234567890"
            value={input.email}
            onChange={handleInput}
            ref={emailRef}
          />
        </div>
      </div>
      <div className="relative">
        <InputPassword
          label={"Password"}
          name={"password"}
          id={"password"}
          margin={"mt-6 mb-6"}
          value={input.password}
          onChange={handleInput}
        />
        <p className="absolute -top-5 md:-top-[18px] right-0 text-tm md:text-xs xl:text-tm text-white text-end mt-5">
          Lupa Password?{" "}
          <Link
            to={"/forgot-password"}
            className="text-white hover:text-seventh font-bold"
          >
            Klik disini
          </Link>
        </p>
      </div>
      <button
        onClick={() => submitLogin()}
        className="bg-seventh text-white w-full px-4 py-1 h-10 rounded-md font-semibold"
      >
        Masuk
      </button>
    </div>
  );
};

export default FormLogin;
