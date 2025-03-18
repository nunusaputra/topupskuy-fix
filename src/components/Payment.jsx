import React, { useState } from "react";
import payment from "../assets/images/payment.gif";
import ml from "../assets/images/ml.jpeg";
import coverBottom from "../assets/images/cover-bottom.png";
import { IoIosArrowUp } from "react-icons/io";
import qr from "../assets/images/qrCode.jpg";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPurchaseDetail } from "../services";

const Payment = () => {
  const { orderId } = useParams();
  const nickname = localStorage.getItem("nickname") ? localStorage.getItem("nickname") : "-";
  const { data: purchase } = useQuery({
    queryKey: ["data", orderId],
    queryFn: orderId ? () => fetchPurchaseDetail(orderId) : () => Promise.resolve(null),
    staleTime: 21600000,
  });

  console.log(purchase?.paymentDTO)

  const [showPayment, setShowPayment] = useState(true);
  const [showInstruction, setShowInstruction] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Timer */}
      <div className="w-full h-110 bg-[#f0e0cf] flex flex-col items-center gap-2">
        <div className="w-[80%] h-80 px-4 py-2">
          <img src={payment} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="w-[80%] h-40">
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-xl xl:text-4xl font-bold text-purple-900/90">
              Menunggu Pembayaran
            </h1>
            <p className="text-sm text-center md:text-start sm:text-md text-purple-900/80 font-medium">
              Silahkan untuk melakukan pembayaran dengan metode yang kamu pilih.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      {purchase?.paymentDTO && (
        <div className="container">
          <section className="flex flex-col gap-4">
            <div className="w-60 h-10 bg-red-500/60 backdrop-opacity-10 ring-2 ring-red-500 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-lg flex items-center justify-center gap-2">
              <h1 className="text-white text-md font-bold">02 Jam</h1>
              <h1 className="text-white text-md font-bold">30 Menit</h1>
              <h1 className="text-white text-md font-bold">12 Detik</h1>
            </div>
            <div className="w-full min-h-32 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                {/* Informasi Akun */}
                <div className="relative w-full min-h-50 rounded-lg flex flex-col gap-4 group hover:cursor-pointer bg-fourth/30 backdrop-blur-2xl ring-2 ring-slate-700 overflow-hidden">
                  <div className="w-full h-full flex gap-2 items-center z-20 p-4">
                    <div className="w-[50%] h-28 sm:w-[40%] sm:h-[7.5rem] rounded-xl overflow-hidden flex flex-col ring-2 ring-slate-600 shadow-lg shadow-slate-950">
                      <div className="w-full h-full bg-amber-400 group-hover:scale-110 transition-all duration-200">
                        <img
                          src={purchase.paymentDTO.path}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full h-full rounded-lg flex flex-col gap-1 sm:gap-2 px-2">
                      <h1 className="text-sm sm:text-lg text-white font-bold mb-2">
                        Informasi Akun
                      </h1>
                      {nickname !== "" ? (
                        <div className="flex items-center">
                          <h1 className="w-[35%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                            Nickname
                          </h1>
                          <h1 className="w-[65%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                            : {nickname}
                          </h1>
                        </div>
                      ) : ""}
                      {purchase.trxFFAttributePurchase[0]?.value_ ? (
                        <div className="flex items-center">
                          <h1 className="w-[35%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                            User ID
                          </h1>
                          <h1 className="w-[65%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                            : {purchase.trxFFAttributePurchase[0].value_}
                          </h1>
                        </div>
                      ) : ""}
                      {purchase.trxFFAttributePurchase[1]?.value_ ? (
                        <div className="flex items-center">
                          <h1 className="w-[35%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                            Zone ID
                          </h1>
                          <h1 className="w-[65%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                            : {purchase.trxFFAttributePurchase[1].value_}
                          </h1>
                        </div>

                      ) : ""}
                    </div>
                  </div>

                  {/* Cover Background */}
                  <div className="w-full h-full absolute z-10">
                    <img
                      src={coverBottom}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Rincian Pembayaran */}
                <div
                  className="w-full h-10 bg-fourth/30 backdrop-blur-2xl rounded-lg flex justify-between items-center px-4 hover:cursor-pointer"
                  onClick={() => setShowPayment(!showPayment)}
                >
                  <h1 className="text-sm sm:text-[15px] text-white font-semibold">
                    Rincian Pembayaran
                  </h1>
                  <IoIosArrowUp
                    className={`text-white ${showPayment && "rotate-180"
                      } transition-all duration-300`}
                  />
                </div>

                {/* Konten Rincian Pembayaran */}
                {showPayment && (
                  <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-2xl rounded-lg flex flex-col p-6 gap-6">
                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Product
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {purchase.paymentDTO.title}
                      </h1>
                    </div>
                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Item
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {purchase.paymentDTO.name}
                      </h1>
                    </div>
                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Price
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(purchase.paymentDTO.price)}
                      </h1>
                    </div>
                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Fee
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(purchase.paymentDTO.fee)}
                      </h1>
                    </div>
                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Unique Code
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(purchase.paymentDTO.uniqueCode)}
                      </h1>
                    </div>
                  </div>
                )}

                {/* Rincian Pembayaran */}
                <div className="w-full h-16 bg-fourth/30 backdrop-blur-2xl rounded-lg flex justify-between items-center px-4">
                  <h1 className="text-sm sm:text-[15px] text-white font-bold">
                    Total Pembayaran
                  </h1>
                  <h1 className="text-sm sm:text-[15px] text-white font-bold">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(purchase.paymentDTO.totalPrice)}
                  </h1>
                </div>
              </div>
              <div className="bg-fourth/30 p-6 backdrop-blur-2xl w-full min-h-50 rounded-lg flex flex-col gap-4">
                <div>
                  <h1 className="text-sm sm:text-[15px] text-white font-semibold">
                    Metode Pembayaran
                  </h1>
                  <h1 className="text-sm sm:text-[15px] text-white font-bold">
                    QRIS (All Payment)
                  </h1>
                </div>

                {/* Informasi Pembayaran */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-center">
                    <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                      Order Number
                    </h1>
                    <h1 className="w-full sm:w-[65%] text-sm sm:text-[15px] text-white font-semibold">
                      ML-0000000424-K8QAYPCBVHGLRJM
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center">
                    <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                      Order Status
                    </h1>
                    <div className="w-full sm:w-[65%]">
                      <span className="px-6 py-1 bg-pink-300 rounded-full text-xs text-red-600 font-bold tracking-wider">
                        UNPAID
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center">
                    <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                      Purcase Date
                    </h1>
                    <h1 className="w-full sm:w-[65%] text-sm sm:text-[15px] text-white font-semibold">
                      15 Mar 2025
                    </h1>
                  </div>
                </div>

                {/* QRIS */}
                <div className="flex flex-col gap-2">
                  <div className="w-[50%] sm:w-[40%] h-40 sm:h-48 bg-white rounded-xl mt-5 overflow-hidden">
                    <img
                      h-60
                      src={qr}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button className="w-[50%] sm:w-[40%] h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-2xl">
                    Unduh Kode QR
                  </button>
                </div>
              </div>
            </div>
            {/* Payment Instruction */}
            <div className="flex flex-col gap-3 mt-6">
              <h1 className="text-md text-white font-semibold">
                Instruksi Pembayaran
              </h1>
              <div
                className="w-full h-10 bg-fourth/30 backdrop-blur-2xl rounded-lg flex justify-between items-center px-6 hover:cursor-pointer"
                onClick={() => setShowInstruction(!showInstruction)}
              >
                <p className="text-sm text-white font-semibold">
                  Cara Melakukan Pembayaran
                </p>
                <IoIosArrowUp
                  className={`text-xl text-white transition-all duration-300 ${showInstruction && "rotate-180"
                    }`}
                />
              </div>
              {showInstruction && (
                <div className="w-full min-h-14 bg-fourth/30 backdrop-blur-2xl rounded-lg flex items-center px-6">
                  <h1 className="text-sm text-white font-semibold">
                    {purchase.paymentDTO.instructionDetail}
                  </h1>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Payment;
