import React from "react";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import coverBottom from "../assets/images/cover-bottom.png";

const Transaction = () => {
  return (
    <div className="container">
      <section className="">
        <div className="relative w-full min-h-30 bg-slate-600/50 px-4 py-10 rounded-2xl flex items-center justify-center overflow-hidden">
          <div className="w-full min-h-20 flex flex-col items-center gap-10 z-20">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl text-center xl:text-left xl:text-3xl text-white font-bold">
                Cek Invoice Kamu dengan Mudah dan Cepat.
              </h1>
              <p className="text-xs text-center xl:text-left xl:text-md text-white">
                Lihat detail pembelian kamu menggunakan nomor handphone.
              </p>
            </div>
            <div className="w-[100%] md:w-[80%] xl:w-[55%] min-h-30 bg-slate-900/60 ring-2 ring-slate-400 shadow-xl shadow-slate-900 rounded-lg p-6 flex flex-col gap-4">
              <h1 className="text-md text-white font-semibold">
                Cari detail pembelian kamu disini
              </h1>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="w-full h-10 rounded-md px-4 border-2 border-slate-400 text-white text-sm"
                  placeholder="Masukan nomer whatsapp kamu (Contoh: 083815499134)"
                />
                <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:cursor-pointer">
                  <MdOutlineContentPasteSearch className="text-white text-xl" />
                  <p>Cari Pesanan</p>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-full absolute z-10">
            <img
              src={coverBottom}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transaction;
