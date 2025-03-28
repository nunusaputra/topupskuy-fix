import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";
import axios from "axios";
import { API_URL } from "../../env";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nama: "",
    telpon: "",
    password: "",
    confPassword: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitRegister = () => {
    const object = {
      name: input.nama,
      password: input.password,
      phoneNumber: input.telpon,
    };

    axios
      .post(`${API_URL}/user/registration`, JSON.stringify(object), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "Register Success") {
          sessionStorage.setItem("phone", response.data.data);
          navigate("/otp");
        } else {
          toast.error(response.data.data.message);
        }
      })
      .catch((error) => {
        toast.info("terjadi kesalahan, silahkan kontak admin");
      });
  };

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div>
      <InputForm
        label="Nama Lengkap"
        type="text"
        name="nama"
        id="nama"
        placeholder="Jhon Doe"
        ref={nameRef}
        value={input.nama}
        onChange={handleInput}
      />
      <InputForm
        label="Nomor Telp"
        type="tel"
        name="telpon"
        id="telpon"
        placeholder="+6281322022050"
        value={input.telepon}
        onChange={handleInput}
      />
      <InputPassword
        label={"Password"}
        name={"password"}
        id={"password"}
        margin={"mt-6 mb-6"}
        value={input.password}
        onChange={handleInput}
      />
      <InputPassword
        label={"Konfirmasi Password"}
        name={"confPassword"}
        id={"confPassword"}
        margin={"mt-6 mb-6"}
        value={input.confPassword}
        onChange={handleInput}
      />
      <button
        onClick={() => submitRegister()}
        className="bg-seventh text-white w-full px-4 py-1 h-10 rounded-md font-semibold"
      >
        Daftar
      </button>
    </div>
  );
};

export default FormRegister;
