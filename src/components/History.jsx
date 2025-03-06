import React from "react";
import pattern from "../assets/images/pattern.png";
import { MdHistory } from "react-icons/md";
import { historyPayment } from "../services";

const History = () => {
  return (
    <div className="container">
      <section className="">
        <div className="bg-secondary p-4 md:px-8 md:py-6 bg-secondary/80 backdrop-blur-4xl rounded-xl">
          <div className="w-full mb-5 flex items-center gap-2">
            <MdHistory className="text-2xl text-white" />
            <h1 className="text-xl font-bold text-white">Riwayat Pesanan</h1>
          </div>
          {historyPayment.map((item) => (
            <div
              className="relative w-full min-h-[7.5rem] bg-sixth/40 rounded-lg ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:ring-offset-secondary flex flex-col xl:flex-row px-4 py-2 gap-2 mb-8 hover:cursor-pointer overflow-hidden"
              key={item.id}
            >
              <div className="flex items-center gap-6 md:gap-8 border-b-2 border-white pb-2 xl:pb-0 xl:border-none z-20">
                <div className="w-[7.5rem] h-20 lg:w-[12.5rem] lg:h-[7.5rem] xl:w-[7.5rem] xl:h-20 bg-red-500 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[13.7rem] h-20 lg:w-full xl:w-[13.7rem] rounded-lg flex flex-col justify-center gap-2 md:gap-4">
                  <h1 className="text-sm md:text-lg lg:text-3xl xl:text-lg font-bold text-white">
                    {item.name}
                  </h1>
                  <p className="text-xs md:text-sm lg:text-xl xl:text-sm lg:font-semibold text-white">
                    {item.paket}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-6 md:gap-8 z-20">
                <div className="w-40 h-20 xl:w-[6.5rem] 2xl:w-[8.7rem] rounded-lg flex flex-col justify-center gap-4">
                  <h1 className="text-sm md:text-lg lg:text-xl xl:text-lg font-bold text-white">
                    Harga
                  </h1>
                  <p className="text-xs md:text-sm lg:text-md xl:text-sm font-semibold text-white">
                    {item.price}
                  </p>
                </div>
                <div className="w-[13.7rem] h-20 rounded-lg flex flex-col justify-center items-end xl:items-start gap-4">
                  <h1 className="text-sm md:text-lg lg:text-xl xl:text-lg font-bold text-white">
                    Metode Pembayaran
                  </h1>
                  <p className="text-xs md:text-sm lg:text-md xl:text-sm font-semibold text-white">
                    {item.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-6 md:gap-8">
                <div className="w-[16.25rem] h-20 xl:w-[8.7rem] 2xl:w-[11.25rem] rounded-lg flex flex-col justify-center gap-4 z-10">
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
                  <span className="px-4 py-2 bg-third rounded-lg text-xs lg:text-sm text-center font-semibold">
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
        </div>
      </section>
    </div>
  );
};

export default History;
