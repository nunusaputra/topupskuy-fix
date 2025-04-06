import React, { useState, useEffect } from "react";
import InputForm from "../element/InputForms/InputForm";
import InputPassword from "../element/InputForms/InputPassword";
import Modal from "../Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchDataMember } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../env";

const EditProfile = () => {
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const uniqueCode = localStorage.getItem("unique-code") ? localStorage.getItem("unique-code") : "";
  const { data: member } = useQuery({
    queryKey: ["uniqueCode", uniqueCode],
    queryFn: () => fetchDataMember(uniqueCode),
    staleTime: 21600000,
    enabled: !!uniqueCode,
  });

  const [input, setInput] = useState({
    nama: member?.name,
    telp: member?.phoneNumber,
  });

  const [inputPass, setInputPass] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const submitProfile = () => {
    const object = {
      uniqueCode: uniqueCode,
      name: input.nama,
      phoneNumber: input.telp
    }

    if (object.phoneNumber !== member?.phoneNumber) {
      axios
        .post(`${API_URL}/user/request-otp/${member?.phoneNumber}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.message === "Otp refreshed") {
            setShow(true)
          } else {
            toast.error("Otp tidak berhasil dikirim");
          }
        })
        .catch((error) => {
          toast.info("terjadi kesalahan, silahkan kontak admin");
        });
    } else {
      axios
        .post(`${API_URL}/user/update-profile/`, JSON.stringify(object), {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.message === "Update Profile Berhasil") {
            toast.info("Update profile berhasil");
          } else {
            toast.error("Update profile gagal");
          }
        })
        .catch((error) => {
          toast.info("terjadi kesalahan, silahkan kontak admin");
        });
    }
  }

  const submitPassword = () => {
    let object = {
      username: uniqueCode,
      oldPassword: inputPass.currentPassword,
      newPassword: inputPass.newPassword
    }

    if (inputPass.newPassword !== inputPass.confirmPassword) {
      toast.error("Password baru dan konfirmasi tidak sesuai");
      return;
    }

    if (inputPass.currentPassword === "") {
      toast.error("Password lama wajib diisi");
      return;
    }

    axios
      .post(`${API_URL}/user/update-password/`, JSON.stringify(object), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.message === "Update Berhasil") {
          toast.info("Berhasil ganti password");
        } else {
          toast.error("Tidak berhasil melakukan penggantian password");
        }
      })
      .catch((error) => {
        toast.info("terjadi kesalahan, silahkan kontak admin");
      });
  }

  const submitOtp = () => {
    const object = {
      uniqueCode: uniqueCode,
      name: input.nama,
      phoneNumber: input.telp
    }

    axios
      .post(`${API_URL}/user/verification/${otp}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.message === "Verified") {
          axios
            .post(`${API_URL}/user/update-profile/`, JSON.stringify(object), {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              if (response.data.message === "Update Profile Berhasil") {
                toast.info("Update profile berhasil");
                window.location.href = "/dashboard/profile";
              } else {
                toast.error("Update profile gagal");
              }
            })
            .catch((error) => {
              toast.info("terjadi kesalahan, silahkan kontak admin");
            });
        } else {
          toast.error("Tidak berhasil melakukan verifikasi");
        }
      })
      .catch((error) => {
        toast.info("terjadi kesalahan, silahkan kontak admin");
      });
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);

      axios
        .post(`${API_URL}/user/request-otp/${member?.phoneNumber}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.message === "Otp refreshed") {
            toast.info("Otp berhasil dikirim ulang");
          } else {
            toast.error("Otp tidak berhasil dikirim ulang");
          }
        })
        .catch((error) => {
          toast.info("terjadi kesalahan, silahkan kontak admin");
        });
    }
  };

  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      <div className="bg-secondary/80 min-h-20 rounded-md px-8 py-4">
        <a href="/dashboard/profile">
          <div className="flex items-center gap-4 cursor-pointer">
            <i className="bi bi-arrow-left text-3xl text-white" />
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
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
                <InputForm
                  label="Nama Lengkap"
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="John Doe"
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
              <button onClick={() => submitProfile()} className="px-4 py-2 bg-seventh text-sm w-full sm:w-40 h-10 text-white rounded-md font-semibold">
                Ubah Profil
              </button>
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
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="col-span-4">
                  <InputPassword
                    label={"Kata Sandi Saat Ini"}
                    name={"currentPassword"}
                    id={"currentPassword"}
                    value={inputPass.currentPassword}
                    onChange={handlePass}
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <InputPassword
                    label={"Kata Sandi Baru"}
                    name={"newPassword"}
                    id={"newPassword"}
                    value={inputPass.newPassword}
                    onChange={handlePass}
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <InputPassword
                    label={"Konfirmasi Kata Sandi Baru"}
                    name={"confirmPassword"}
                    id={"confirmPassword"}
                    value={inputPass.confirmPassword}
                    onChange={handlePass}
                  />
                </div>
              </div>
              <button onClick={() => submitPassword()} className="px-4 py-2 bg-seventh text-sm w-full sm:w-40 h-10 mt-5 text-white rounded-md font-semibold">
                Ubah Kata Sandi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal OTP */}
      <Modal open={show} close={() => setShow(false)}>
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
            <button onClick={() => submitOtp()} className="bg-seventh text-white w-full px-4 py-1 h-10 text-sm rounded-md font-semibold">
              Verifikasi
            </button>
            <p className="text-xs lg:text-sm text-white text-center mt-5">
              Belum menerima kode?{" "}
              <span
                className={`text-white font-bold cursor-pointer ${countdown > 0 ? "opacity-50 cursor-not-allowed" : "hover:text-seventh"
                  }`}
                onClick={handleResend}
              >
                {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : "Kirim Ulang OTP"}
              </span>
            </p>
          </div>
        </div>
        <IoCloseCircleOutline
          className="absolute top-5 right-5 text-white text-3xl cursor-pointer hover:scale-125 
        transition-all duration-300"
          onClick={() => setShow(false)}
        />
      </Modal>
    </div>
  );
};

export default EditProfile;
