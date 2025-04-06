import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";
import axios from "axios";
import { API_URL } from "../../env";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const submitLogin = () => {
    const object = {
      username: input.email,
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
        window.alert("terjadi kesalahan pada saat order, silahkan kontak admin");
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
      <InputForm
        label="Nomor Telp"
        type="telp"
        name="email"
        id="email"
        placeholder="+628123456789"
        ref={emailRef}
        value={input.email}
        onChange={handleInput}
      />
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
