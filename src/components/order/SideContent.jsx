import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dataList } from "../../services/index";
import { ImHeadphones } from "react-icons/im";
import { IoIosArrowUp, IoMdInformationCircle } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import Modal from "../Modal";
import { IoArrowUp } from "react-icons/io5";

const SideContent = (data) => {
  const [openInstruction, setOpenInstruction] = useState(false);

  return (
    <div className="lg:w-[35%] lg:min-h-screen">
      <div className="flex flex-col gap-5 lg:overflow-auto lg:sticky lg:top-32">
        {/* Contact Center */}
        <div className="w-full h-20 bg-slate-800 rounded-lg flex items-center px-4 gap-2 overflow-hidden">
          <div className="w-14 h-14 flex items-center justify-center">
            <ImHeadphones className="text-4xl text-white" />
          </div>
          <div className="w-full h-14 flex flex-col justify-center">
            <h1 className="text-md text-white font-bold">Butuh Bantuan?</h1>
            <p className="text-sm text-white font-semibold">
              Kamu bisa hubungi admin disini.
            </p>
          </div>
        </div>

        {/* Infromation Section */}
        <div
          className="w-full h-10 bg-slate-800 rounded-lg flex items-center justify-between px-4 gap-2 hover:cursor-pointer"
          onClick={() => setOpenInstruction(!openInstruction)}
        >
          <p className="text-sm text-white">Tata cara topup</p>
          <IoIosArrowUp
            className={`text-xl text-white transition-all duration-300 ${openInstruction ? "rotate-180" : ""
              }`}
          />
        </div>

        {openInstruction && (
          <div className="w-full bg-slate-800 min-h-[7.5rem] flex flex-col gap-2 rounded-lg overflow-hidden">
            <div className="mb-5">
              <div className="w-full h-8 bg-fourth/30 backdrop-blur-xl px-3 py-2">
                <h1 className="text-white text-sm font-semibold">CARA TOP UP</h1>
              </div>
              <div className="text-white px-4 text-sm">
                <ol className="list-decimal space-y-2 pl-5 mt-5" dangerouslySetInnerHTML={{ __html: data.data.description }}>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Order Section */}
        <div className="w-full min-h-20 bg-slate-800 rounded-lg flex flex-col gap-2 px-4 py-3">
          <div className="w-full h-20 flex gap-4 items-center">
            <div className="w-28 h-16 rounded-md overflow-hidden">
              <img
                src={data.data.logo.path}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-14 flex flex-col justify-center">
              {/* <h1 className="text-white text-md font-bold">{data.name}</h1> */}
              <p className="text-white text-sm">Weekly Diamond Pass</p>
            </div>
          </div>
          <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
            <div className="flex justify-between">
              {/* Harga */}
              <h1 className="text-white text-md font-semibold">Harga</h1>
              <p className="text-white text-md">Rp. 15.000</p>
            </div>

            {/* Payment Fee */}
            <div className="flex justify-between">
              <h1 className="text-white text-md font-semibold">Payment Fee</h1>
              <p className="text-white text-md">Rp. 500</p>
            </div>

            {/* Diskon */}
            <div className="flex justify-between">
              <h1 className="text-white text-md font-semibold">Diskon</h1>
              <p className="text-white text-md">30%</p>
            </div>

            <hr className="text-slate-600/60" />
          </div>
          <div className="w-full h-14 flex items-center justify-between">
            <h1 className="text-lg text-white font-bold">Total Pembayaran</h1>
            <p className="text-orange-400 text-md font-bold">Rp. 17.500</p>
          </div>
        </div>

        {/* Button Order */}
        <button className="w-full py-2 bg-seventh text-white font-semibold shadow-md shadow-slate-900 rounded-lg flex items-center justify-center gap-2">
          <FiShoppingBag className="text-white text-xl" />
          <p>Pesan Sekarang!</p>
        </button>
      </div>
    </div>
  );
};

export default SideContent;
