import React from "react";
import payment from "../assets/images/payment.gif";
import ml from "../assets/images/ml.jpeg";
import coverBottom from "../assets/images/cover-bottom.png";
import { IoIosArrowUp } from "react-icons/io";
import qr from "../assets/images/qrCode.jpg";

const Payment = () => {
  return (
    <div className="min-h-screen">
      {/* Timer */}
      <div className="w-full h-110 bg-[#f0e0cf] flex flex-col items-center gap-2">
        <div className="w-[80%] h-80 px-4 py-2">
          <img src={payment} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="w-[80%] h-40">
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold text-purple-900/90">
              Menunggu Pembayaran
            </h1>
            <p className="text-md text-purple-900/80 font-medium">
              Silahkan untuk melakukan pembayaran dengan metode yang kamu pilih.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="container">
        <section className="flex flex-col gap-4">
          <div className="w-60 h-10 bg-red-500/60 backdrop-opacity-10 ring-2 ring-red-500 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-lg flex items-center justify-center gap-2">
            <h1 className="text-white text-md font-bold">02 Jam</h1>
            <h1 className="text-white text-md font-bold">30 Menit</h1>
            <h1 className="text-white text-md font-bold">12 Detik</h1>
          </div>
          <div className="w-full min-h-30 grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              {/* Informasi Akun */}
              <div className="relative w-full min-h-50 rounded-lg flex flex-col gap-4 group hover:cursor-pointer bg-fourth/30 backdrop-blur-2xl ring-2 ring-slate-700 overflow-hidden">
                <div className="w-full h-full flex gap-2 items-center z-20 p-4">
                  <div className="w-[40%] h-40 rounded-xl overflow-hidden flex flex-col ring-2 ring-slate-600 shadow-lg shadow-slate-950">
                    <div className="w-full h-27 bg-amber-400 group-hover:scale-110 transition-all duration-200">
                      <img
                        src={ml}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full h-13 bg-secondary px-2 flex flex-col justify-center">
                      <h1 className="text-sm text-white font-semibold">
                        Mobile Legends
                      </h1>
                      <p className="text-xs text-white">Weekly Diamond Pass</p>
                    </div>
                  </div>
                  <div className="w-full h-full rounded-lg flex flex-col gap-1 px-2">
                    <h1 className="text-lg text-white font-bold mb-2">
                      Informasi Akun
                    </h1>
                    <div className="flex gap-14">
                      <h1 className="text-md text-white font-medium">
                        Nickname
                      </h1>
                      <h1 className="text-md text-white font-medium">
                        : P'Star7
                      </h1>
                    </div>
                    <div className="flex gap-29">
                      <h1 className="text-md text-white font-medium">ID</h1>
                      <h1 className="text-md text-white font-medium">
                        : 270862646
                      </h1>
                    </div>
                    <div className="flex gap-20">
                      <h1 className="text-md text-white font-medium">Server</h1>
                      <h1 className="text-md text-white font-medium">: 2262</h1>
                    </div>
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
              <div className="w-full h-10 bg-fourth/30 backdrop-blur-2xl rounded-lg flex justify-between items-center px-4">
                <h1 className="text-sm text-white font-semibold">
                  Rincian Pembayaran
                </h1>
                <IoIosArrowUp className="text-white" />
              </div>

              {/* Konten Rincian Pembayaran */}
              <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-2xl rounded-lg flex flex-col p-6 gap-6">
                <div className="w-full flex justify-between">
                  <h1 className="text-white text-md font-semibold">Harga</h1>
                  <h1 className="text-white text-md font-medium">Rp. 15.000</h1>
                </div>
                <div className="w-full flex justify-between">
                  <h1 className="text-white text-md font-semibold">Diskon</h1>
                  <h1 className="text-white text-md font-medium">30%</h1>
                </div>
                <div className="w-full flex justify-between">
                  <h1 className="text-white text-md font-semibold">Subtotal</h1>
                  <h1 className="text-white text-md font-medium">Rp. 10.500</h1>
                </div>
                <div className="w-full flex justify-between">
                  <h1 className="text-white text-md font-semibold">
                    Payment Fee
                  </h1>
                  <h1 className="text-white text-md font-medium">Rp. 111</h1>
                </div>
              </div>

              {/* Rincian Pembayaran */}
              <div className="w-full h-15 bg-fourth/30 backdrop-blur-2xl rounded-lg flex justify-between items-center px-6">
                <h1 className="text-lg text-white font-medium">
                  Total Pembayaran
                </h1>
                <h1 className="text-lg text-white font-bold">Rp. 11.611</h1>
              </div>
            </div>
            <div className="w-full min-h-50 rounded-lg flex flex-col gap-4">
              <div>
                <h1 className="text-md text-white font-semibold">
                  Metode Pembayaran
                </h1>
                <h1 className="text-md text-white font-bold">
                  QRIS (All Payment)
                </h1>
              </div>

              {/* Informasi Pembayaran */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-22">
                  <h1 className="text-md text-white">Nomor Invoice</h1>
                  <h1 className="text-md text-white font-semibold">
                    BJO7C17E758B8333A24788080
                  </h1>
                </div>
                <div className="flex gap-12">
                  <h1 className="text-md text-white">Status Pembayaran</h1>
                  <span className="px-6 py-1 bg-pink-300 rounded-full text-xs text-red-600 font-bold tracking-wider">
                    UNPAID
                  </span>
                </div>
                <div className="flex gap-19">
                  <h1 className="text-md text-white">Status Transaksi</h1>
                  <span className="px-6 py-1 bg-yellow-300 rounded-full text-xs text-orange-500 font-bold tracking-wider">
                    PENDING
                  </span>
                </div>
                <div className="flex gap-38">
                  <h1 className="text-md text-white">Pesan</h1>
                  <h1 className="text-md text-white font-semibold">
                    Silakan untuk melakukan pembayaran dengan metode yang kamu
                    pilih.
                  </h1>
                </div>
              </div>

              {/* QRIS */}
              <div className="flex flex-col gap-2">
                <div className="w-[40%] h-60 bg-white rounded-xl mt-5 overflow-hidden">
                  <img
                    src={qr}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <button className="w-[40%] h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-2xl">
                  Unduh Kode QR
                </button>
                <p className="w-[40%] text-center text-xs text-white">
                  Screenshot jika QR Code tidak bisa di download.
                </p>
              </div>
            </div>
          </div>
          {/* Payment Instruction */}
          <div className="flex flex-col gap-3 mt-6">
            <h1 className="text-md text-white font-semibold">
              Instruksi Pembayaran
            </h1>
            <div className="w-full h-10 bg-fourth/30 backdrop-blur-2xl rounded-lg flex justify-between items-center px-6 hover:cursor-pointer">
              <p className="text-sm text-white font-semibold">
                Cara Melakukan Pembayaran
              </p>
              <IoIosArrowUp className="text-xl text-white" />
            </div>
            <div className="w-full h-15 bg-fourth/30 backdrop-blur-2xl rounded-lg flex items-center px-6">
              <h1 className="text-md text-white font-semibold">
                Gunakan Ewallet atau aplikasi mobile banking yang tersedia scan
                QRIS
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;
