import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";

const FormLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

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
    <form>
      <InputForm
        label="Email"
        type="email"
        name="email"
        id="email"
        placeholder="jhondoe@example.com"
        ref={emailRef}
        value={input.email}
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
      <button className="bg-seventh text-white w-full px-4 py-1 h-10 rounded-md font-semibold">
        Login
      </button>
    </form>
  );
};

export default FormLogin;
