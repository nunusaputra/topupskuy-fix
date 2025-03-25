import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";

const EditProfile = () => {
  const [input, setInput] = useState({
    nama: "",
    telp: "",
  });

  const [inputPass, setInputPass] = useState({
    currentPassword: "",
    newPassword: "",
    confPassword: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlePass = (e) => {
    setInputPass({
      ...inputPass,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      <div className="bg-secondary/80 min-h-20 rounded-md px-8 py-4">
        <a href="/dashboard/profile">
          <div className="flex items-center gap-4 cursor-pointer">
            <FaArrowLeftLong className="text-xl text-white" />
            <h1 className="text-white text-lg font-semibold">Dashboard</h1>
          </div>
        </a>
        <div className="flex flex-col gap-4">
          {/* Profile */}
          <div className="mt-5 border-b-2 border-white pb-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl text-white font-semibold">Profile</h1>
              <p className="text-sm text-white">
                Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa
                yang kamu bagikan.
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
                  <InputForm
                    label="Nama Lengkap"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Wisnu Saputra"
                    value={input.nama}
                    onChange={handleInput}
                  />
                  <InputForm
                    label="Nomor Handphone"
                    type="telp"
                    name="telp"
                    id="telp"
                    placeholder="+628123456789"
                    value={input.telp}
                    onChange={handleInput}
                  />
                </div>
                <button className="px-4 py-2 bg-seventh text-sm w-full sm:w-40 h-10 text-white rounded-md font-semibold">
                  Ubah Profil
                </button>
              </form>
            </div>
          </div>

          {/* Ubah Password */}
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl text-white font-semibold">
                Ubah Kata Sandi
              </h1>
              <p className="text-sm text-white">
                Pastikan kamu mengingat kata sandi baru kamu sebelum
                mengubahnya.
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <InputPassword
                      label={"Kata Sandi Saat Ini"}
                      name={"currentPassword"}
                      id={"currentPassword"}
                      value={input.currentPassword}
                      onChange={handlePass}
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <InputPassword
                      label={"Kata Sandi Baru"}
                      name={"newPassword"}
                      id={"newPassword"}
                      value={input.newPassword}
                      onChange={handlePass}
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <InputPassword
                      label={"Konfirmasi Kata Sandi Baru"}
                      name={"confirmPassword"}
                      id={"confirmPassword"}
                      value={input.confirmPassword}
                      onChange={handlePass}
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-seventh text-sm w-full sm:w-40 h-10 mt-5 text-white rounded-md font-semibold">
                  Ubah Kata Sandi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
