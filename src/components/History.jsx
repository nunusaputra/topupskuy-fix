import React from "react";
import pattern from "../assets/images/pattern.png";
import { MdHistory } from "react-icons/md";
import { historyPayment } from "../services";

const History = () => {
  return (
    <div className="container">
      <section>
        <div className="w-full mb-5 flex items-center gap-2">
          <MdHistory className="text-2xl text-white" />
          <h1 className="text-xl font-bold text-white">Riwayat Pesanan</h1>
        </div>
        {historyPayment.map((item) => (
          <div
            className="relative w-full min-h-30 bg-purple-500/40 rounded-lg ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:ring-offset-[#060911] flex flex-col xl:flex-row px-4 py-2 gap-2 mb-8 hover:cursor-pointer overflow-hidden"
            key={item.id}
          >
            <div className="flex items-center gap-6 md:gap-8 border-b-2 border-white pb-2 xl:pb-0 xl:border-none z-20">
              <div className="w-30 h-20 lg:w-50 lg:h-30 xl:w-30 xl:h-20 bg-red-500 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-55 h-20 lg:w-full xl:w-55 rounded-lg flex flex-col justify-center gap-2 md:gap-4">
                <h1 className="text-sm md:text-lg lg:text-3xl xl:text-lg font-bold text-white">
                  {item.name}
                </h1>
                <p className="text-xs md:text-sm lg:text-xl xl:text-sm lg:font-semibold text-white">
                  {item.paket}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 md:gap-8 z-20">
              <div className="w-40 h-20 xl:w-25 2xl:w-35 rounded-lg flex flex-col justify-center gap-4">
                <h1 className="text-sm md:text-lg lg:text-xl xl:text-lg font-bold text-white">
                  Harga
                </h1>
                <p className="text-xs md:text-sm lg:text-md xl:text-sm font-semibold text-white">
                  {item.price}
                </p>
              </div>
              <div className="w-55 h-20 rounded-lg flex flex-col justify-center items-end xl:items-start gap-4">
                <h1 className="text-sm md:text-lg lg:text-xl xl:text-lg font-bold text-white">
                  Metode Pembayaran
                </h1>
                <p className="text-xs md:text-sm lg:text-md xl:text-sm font-semibold text-white">
                  {item.paymentMethod}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 md:gap-8">
              <div className="w-65 h-20 xl:w-35 2xl:w-45 rounded-lg flex flex-col justify-center gap-4 z-10">
                <h1 className="text-sm md:text-lg lg:text-xl xl:text-lg font-bold text-white">
                  Tanggal
                </h1>
                <p className="text-xs md:text-sm lg:text-md xl:text-sm font-semibold text-white">
                  {item.date}
                </p>
              </div>
              <div className="w-40 h-20 rounded-lg flex flex-col justify-center items-end xl:items-start gap-2 z-10">
                <h1 className="text-sm md:text-lg lg:text-xl xl:text-lg font-bold text-white">
                  Status
                </h1>
                <span className="px-4 py-2 bg-purple-300 rounded-lg text-xs lg:text-sm text-center font-semibold">
                  {item.status}
                </span>
              </div>
            </div>

            {/* Pattern Background */}
            <div className="absolute w-full h-full top-0 left-0 opacity-40">
              <img
                src={pattern}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default History;
