import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import profile from "../../assets/images/student-3.jpg";
import profile2 from "../../assets/images/student-2.jpg";
import profile3 from "../../assets/images/student-7.jpg";
import { BiLogoBitcoin } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";

const Profile = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      <div className="w-full min-h-30 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-2 sm:gap-4 items-start">
          {/* Profile */}
          <div className="col-span-3 sm:col-span-2 bg-secondary/80 rounded-md p-4">
            <div className="w-full flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4 border-b-2 pb-4">
                <div className="w-[20%] lg:w-[15%]">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full overflow-hidden">
                    <img
                      src={profile}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-[80%] lg:w-[85%] flex justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-sm lg:text-lg text-white font-semibold">
                      Wisnu Saputra
                    </h1>
                    <span
                      className="bg-blue-500/60 backdrop-opacity-10 ring-1 ring-blue-500 hover:ring-offset-2 
                hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0
                text-white font-semibold text-center py-1 rounded-full text-xs lg:text-sm"
                    >
                      Membership
                    </span>
                  </div>
                  <div>
                    <a href="/dashboard/edit-profile">
                      <IoMdSettings className="text-xl text-white cursor-pointer hover:rotate-180 transition-all duration-300" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MdPhone className="text-xl text-white" />
                <p className="text-sm text-white font-semibold">
                  +6283815499134
                </p>
              </div>
            </div>
          </div>

          {/* Upgrade Member */}
          <div className="col-span-3 sm:col-span-1 row-span-2 rounded-md row-start-1 sm:col-start-3">
            <div className="w-full ">
              <div className="relative w-full bg-slate-600/30 backdrop-blur-md rounded-lg p-6 overflow-hidden">
                {/* Lingkaran Blur */}
                <div className="absolute top-0 left-0 w-30 h-30 bg-blue-500/30 blur-xl rounded-full"></div>
                <div className="absolute top-10 right-5 w-32 h-32 bg-purple-500/30 blur-xl rounded-full"></div>
                <div className="absolute bottom-20 left-0 w-28 h-28 bg-purple-400/30 blur-xl rounded-full"></div>
                <div className="absolute bottom-5 right-5 w-30 h-30 bg-blue-400/30 blur-xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-full h-9 bg-[#596BEB]">
                  <div className="flex justify-center items-center gap-2 py-2">
                    <GiTakeMyMoney className="text-lg text-white" />
                    <h1 className="text-sm text-white font-semibold">
                      Upgrade Membership
                    </h1>
                  </div>
                </div>

                {/* Konten Card */}
                <h2 className="relative text-white text-sm font-bold mb-1">
                  topupskuy
                </h2>
                <p className="relative text-white text-xs sm:text-zs md:text-xs mb-5 sm:mb-3 md:mb-5">
                  Ingin dapat harga lebih murah?
                </p>
                <h1 className="relative text-white text-lg sm:text-zs md:text-sm lg:text-lg font-bold tracking-wide mb-4 sm:mb-2 md:mb-4">
                  UPGRADE <span className="lg:block">MEMBERSHIP!</span>
                </h1>
                <div className="flex gap-x-2 mb-2">
                  <img
                    src={profile}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-white"
                  />
                  <img
                    src={profile2}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-white -ml-7"
                  />
                  <img
                    src={profile3}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-white -ml-7"
                  />
                  <div className="w-9 h-9 bg-slate-600 rounded-full border-2 border-white flex items-center justify-center -ml-7">
                    <p className="text-xs text-white">100+</p>
                  </div>
                </div>
                <p className="text-xs text-white mb-8">
                  Sudah lebih dari 100+ pengguna{" "}
                  <span>bergabung bersama kami</span>
                </p>
              </div>
            </div>
          </div>

          {/* Saldo */}
          <div className="col-span-3 sm:col-span-2 h-28 bg-secondary/80 rounded-md p-6">
            <div className="flex items-center gap-3">
              <BiLogoBitcoin className="text-xl text-yellow-500 animate-muter ring-yellow-400 ring-2 ring-offset-2 rounded-full ring-offset-secondary" />
              <h1 className="text-xl text-white font-semibold">Saldo</h1>
            </div>
            <div className="flex justify-between mt-5">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold text-white transition-all duration-300">
                  {show ? "Rp. 10.000" : "*********"}
                </h1>
                {show ? (
                  <BsEyeFill
                    className="text-lg text-white transition-all duration-300 cursor-pointer"
                    onClick={() => setShow(!show)}
                  />
                ) : (
                  <BsEyeSlashFill
                    className="text-lg text-white transition-all duration-300 cursor-pointer"
                    onClick={() => setShow(!show)}
                  />
                )}
              </div>
              <div className="px-4 py-1 bg-seventh ring-2 ring-offset-0 rounded-full text-xs font-semibold text-white ring-seventh transition-all duration-300 hover:ring-offset-4 hover:ring-offset-secondary cursor-pointer">
                Top Up
              </div>
            </div>
          </div>

          {/* Transaksi Saya */}
          <div className="col-span-3 min-h-28 mt-5 lg:mt-0">
            <h1 className="text-xl text-white font-semibold mb-3">
              Transaksi Hari Ini
            </h1>
            <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="col-span-2 h-28 bg-secondary flex flex-col items-center justify-center gap-1">
                <h1 className="text-white text-2xl font-semibold">0</h1>
                <p className="text-white text-sm font-semibold">
                  Total Transaksi
                </p>
              </div>
              <div className="col-span-2 h-28 bg-secondary flex flex-col items-center justify-center gap-1">
                <h1 className="text-white text-2xl font-semibold">0</h1>
                <p className="text-white text-sm font-semibold">
                  Total Penjualan
                </p>
              </div>
              <div
                className="h-28 bg-yellow-500/60 backdrop-opacity-10 ring-1 ring-yellow-500 hover:ring-offset-2 
                hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-md 
                flex flex-col gap-1 justify-center items-center"
              >
                <h1 className="text-white text-2xl font-semibold">0</h1>
                <p className="text-white text-sm font-semibold">Menunggu</p>
              </div>
              <div
                className="h-28 bg-blue-500/60 backdrop-opacity-10 ring-1 ring-blue-500 hover:ring-offset-2 
                hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-md 
                flex flex-col gap-1 justify-center items-center"
              >
                <h1 className="text-white text-2xl font-semibold">0</h1>
                <p className="text-white text-sm font-semibold">Dalam Proses</p>
              </div>
              <div
                className="h-28 bg-green-500/60 backdrop-opacity-10 ring-1 ring-green-500 hover:ring-offset-2 
                hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-md 
                flex flex-col gap-1 justify-center items-center"
              >
                <h1 className="text-white text-2xl font-semibold">0</h1>
                <p className="text-white text-sm font-semibold">Sukses</p>
              </div>
              <div
                className="h-28 bg-red-500/60 backdrop-opacity-10 ring-1 ring-red-500 hover:ring-offset-2 
                hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-md 
                flex flex-col gap-1 justify-center items-center"
              >
                <h1 className="text-white text-2xl font-semibold">0</h1>
                <p className="text-white text-sm font-semibold">Gagal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
