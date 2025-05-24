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
    let { name, value } = e.target;

    if (name === "telpon") {
      value = value.replace(/\D/g, "");
    }

    if (value.startsWith("62")) {
      value = value.slice(2);
    }

    if (value.startsWith("0")) {
      value = value.slice(1);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitRegister = () => {
    const object = {
      name: input.nama,
      password: input.password,
      phoneNumber: `+62${input.telpon}`,
    };

    axios
      .post(`${API_URL}/user/registration`, JSON.stringify(object), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
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
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="telp" className=" text-sm font-bold text-white mb-2">
          Nomor WhatsApp
        </label>
        <div className="flex items-center bg-white rounded p-2 w-full overflow-hidden">
          <span className="text-sm mr-2">+62</span>
          <input
            type="telp"
            className="outline-none flex-1 bg-transparent text-sm"
            name="telpon"
            id="telpon"
            placeholder="81234567890"
            value={input.telpon}
            onChange={handleInput}
          />
        </div>
      </div>
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
