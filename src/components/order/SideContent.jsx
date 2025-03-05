import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dataList } from "../../services/index";
import { ImHeadphones } from "react-icons/im";
import { IoMdInformationCircle } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import Modal from "../Modal";

const SideContent = () => {
  const { id } = useParams();
  const data = dataList.find((item) => item.id === parseInt(id));

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 lg:w-[35%] lg:h-screen lg:overflow-auto lg:sticky lg:top-32">
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
        className="w-full h-10 bg-slate-800 rounded-lg flex items-center px-4 gap-2 hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <IoMdInformationCircle className="text-xl text-white" />
        <p className="text-sm text-white">Tata cara topup</p>
      </div>

      {/* Order Section */}
      <div className="w-full min-h-20 bg-slate-800 rounded-lg flex flex-col gap-2 px-4 py-3">
        <div className="w-full h-20 flex gap-4 items-center">
          <div className="w-24 h-14 rounded-md overflow-hidden">
            <img
              src={data.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-14 flex flex-col justify-center">
            <h1 className="text-white text-md font-bold">{data.name}</h1>
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
      <button className="w-full py-2 bg-orange-500 text-white font-semibold shadow-md shadow-slate-900 rounded-lg flex items-center justify-center gap-2">
        <FiShoppingBag className="text-white text-xl" />
        <p>Pesan Sekarang!</p>
      </button>

      {/* Modal Section */}
      <Modal open={open} close={() => setOpen(false)}>
        <div className="w-full min-h-[7.5rem] flex flex-col gap-2 rounded-lg">
          <div className="w-full h-8 bg-slate-600/30 backdrop-blur-xl rounded-lg px-3 py-1">
            <h1 className="text-white text-sm font-semibold">CARA TOP UP</h1>
          </div>
          <div className="text-white px-4 text-sm">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Masukkan User ID Kamu</li>
              <li>Pilih produk yang kamu inginkan</li>
              <li>Selesaikan pembayaran</li>
              <li>Top up produk akan ditambahkan ke akun Free Fire kamu </li>
            </ol>
          </div>
          <div className="mt-5">
            <div className="w-full h-8 bg-slate-600/30 backdrop-blur-xl shadow-black rounded-lg px-3 py-1">
              <h1 className="text-white text-sm font-semibold">
                INFORMASI PENTING!
              </h1>
            </div>
            <div className="text-white px-4 text-sm mt-2">
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Pastikan akun sudah sesuai aplikasi di device masing-masing
                </li>
                <li>Proses Topup selama 0-20 Menit</li>
                <li>Input no whatsapp jangan ada spasi</li>
              </ol>
            </div>
          </div>
          <div className="mt-5">
            <div className="w-full h-8 bg-slate-600/30 backdrop-blur-xl shadow-black rounded-lg px-3 py-1">
              <h1 className="text-white text-sm font-semibold">NOTE</h1>
            </div>
            <div className="text-white px-4 text-sm mt-2">
              Pembelian weekly maksimal 10x atau 70 hari (lebih dari itu weekly
              tidak masuk atau hangus)
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SideContent;
