import React, { useEffect, useRef, useState } from "react";
import InputForm from "../element/InputForms/InputForm";

const FormForgot = () => {
  const [telp, setTelp] = useState("");

  const telpRef = useRef(null);

  useEffect(() => {
    telpRef.current.focus();
  }, []);
  return (
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
      <button className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold">
        Kirim kode reset password
      </button>
    </form>
  );
};

export default FormForgot;
