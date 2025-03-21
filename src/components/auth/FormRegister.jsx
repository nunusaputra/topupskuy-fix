import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";

const FormRegister = () => {
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

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  return (
    <form>
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
        label="No Handphone"
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
        label={"Confirm Password"}
        name={"password"}
        id={"confPassword"}
        margin={"mt-6 mb-6"}
        value={input.confPassword}
        onChange={handleInput}
      />
      <button className="bg-seventh text-white w-full px-4 py-1 h-10 rounded-md font-semibold">
        Register
      </button>
    </form>
  );
};

export default FormRegister;
