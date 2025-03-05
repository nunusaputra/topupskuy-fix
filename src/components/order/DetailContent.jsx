import React, { useState } from "react";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
} from "react-icons/tb";
import { dataPayment, diamondPass } from "../../services/index";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdInformationCircle,
} from "react-icons/io";
import Modal from "../Modal";

const DetailContent = () => {
  const [show, setShow] = useState(null);
  const [open, setOpen] = useState(false);
  const handleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className="w-full relative lg:w-[65%] mt-6 lg:mt-0 flex flex-col gap-10">
      {/* Lengkapi Data */}
      <div className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-500 shadow-md shadow-slate-900 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TbCircleNumber1Filled className="text-2xl text-orange-500 ring-2 ring-white/70 rounded-full" />
          <h1 className="text-xl text-white font-semibold">Lengkapi Data</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* User ID */}
          <div className="flex flex-col gap-1">
            <label htmlFor="userId" className="text-sm text-white">
              User Id
            </label>
            <input
              type="number"
              name="userId"
              className="w-full h-9 border border-white/70 bg-transparent rounded-md px-4 py-1 text-white text-sm"
              placeholder="Masukan User ID"
            />
          </div>

          {/* Zone ID */}
          <div className="flex flex-col gap-1">
            <label htmlFor="serverId" className="text-sm text-white">
              Server ID
            </label>
            <input
              type="number"
              name="serverId"
              className="w-full h-9 border border-white/70 bg-transparent rounded-md px-4 py-1 text-white text-sm"
              placeholder="Masukan Server ID"
            />
          </div>
        </div>
        <div
          className="w-full h-10 rounded-xl bg-slate-700 flex items-center gap-2 px-4 hover:cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <IoMdInformationCircle className="text-xl text-white" />
          <p className="text-sm text-white">Cara Menemukan ID</p>
        </div>
      </div>

      {/* Nominal Layanan */}
      <div className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-500 shadow-md shadow-slate-900 p-4 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center gap-2">
          <TbCircleNumber2Filled className="text-2xl text-orange-500 ring-2 ring-white/70 rounded-full" />
          <h1 className="text-xl text-white font-semibold">
            Pilih Nominal Layanan
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5">
          {diamondPass.map((item) => (
            <div
              className="w-full min-h-20 bg-slate-600/30 backdrop-blur-xl border border-slate-600 shadow-md shadow-slate-900 rounded-lg px-4 py-2 flex flex-col gap-1 justify-center hover:cursor-pointer hover:bg-orange-500"
              key={item.id}
            >
              <h1 className="text-white text-xs sm:text-sm font-semibold">
                {item.title}
              </h1>
              <p className="text-white text-xs">
                Rp. {item.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-500 shadow-md shadow-slate-900 p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <TbCircleNumber3Filled className="text-2xl text-orange-500 ring-2 ring-white/70 rounded-full" />
          <h1 className="text-xl text-white font-semibold">
            Pilih Metode Pembayaran
          </h1>
        </div>
        {/* E-wallet dan qris */}
        <div className="w-full min-h-10 bg-slate-600/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
          <div
            className="flex justify-between items-center px-4 py-2"
            onClick={() => handleShow(1)}
          >
            <h1 className="text-sm text-white font-semibold">
              E-wallet dan QRIS
            </h1>
            <span
              className={`text-lg text-white transform transition-transform duration-300 ${
                show === 1 ? "rotate-180" : "rotate-0"
              }`}
            >
              {show === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {show === 1 ? (
            <div className="my-5 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                {dataPayment
                  .filter(
                    (item) => item.type === "e-wallet" || item.type === "qris"
                  )
                  .map((value) => (
                    <div
                      className="w-full h-auto bg-white rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4"
                      key={value.id}
                    >
                      <div className="w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center">
                        <img
                          src={value.images}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                        <h1 className="text-lg font-semibold">{value.name}</h1>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
              {dataPayment
                .filter(
                  (item) => item.type === "e-wallet" || item.type === "qris"
                )
                .map((value) => (
                  <div className="w-20 h-8 overflow-hidden" key={value.id}>
                    <img
                      src={value.images}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Convenience Store */}
        <div className="w-full min-h-10 bg-slate-600/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
          <div
            className="flex justify-between items-center px-4 py-2"
            onClick={() => handleShow(2)}
          >
            <h1 className="text-sm text-white font-semibold">
              Convenience Store
            </h1>
            <span
              className={`text-lg text-white transform transition-transform duration-300 ${
                show === 2 ? "rotate-180" : "rotate-0"
              }`}
            >
              {show === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {show === 2 ? (
            <div className="my-5 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                {dataPayment
                  .filter((item) => item.type === "convenience-store")
                  .map((value) => (
                    <div
                      className="w-full h-auto bg-white rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4"
                      key={value.id}
                    >
                      <div className="w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center">
                        <img
                          src={value.images}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                        <h1 className="text-lg font-semibold">{value.name}</h1>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
              {dataPayment
                .filter((item) => item.type === "convenience-store")
                .map((value) => (
                  <div className="w-20 h-8 overflow-hidden" key={value.id}>
                    <img
                      src={value.images}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Bank */}
        <div className="w-full min-h-10 bg-slate-600/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
          <div
            className="flex justify-between items-center px-4 py-2"
            onClick={() => handleShow(3)}
          >
            <h1 className="text-sm text-white font-semibold">Bank</h1>
            <span
              className={`text-lg text-white transform transition-transform duration-300 ${
                show === 3 ? "rotate-180" : "rotate-0"
              }`}
            >
              {show === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {show === 3 ? (
            <div className="my-5 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                {dataPayment
                  .filter((item) => item.type === "bank")
                  .map((value) => (
                    <div
                      className="w-full h-auto bg-white rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4"
                      key={value.id}
                    >
                      <div className="w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center">
                        <img
                          src={value.images}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                        <h1 className="text-lg font-semibold">{value.name}</h1>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
              {dataPayment
                .filter((item) => item.type === "bank")
                .map((value) => (
                  <div className="w-20 h-8 overflow-hidden" key={value.id}>
                    <img
                      src={value.images}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Kode Promo */}
      <div className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-600 shadow-md shadow-slate-900 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TbCircleNumber4Filled className="text-2xl text-orange-500 ring-2 ring-white/70 rounded-full" />
          <h1 className="text-xl text-white font-semibold">Kode Promo</h1>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="kode" className="text-sm text-white">
            Kode Promo
          </label>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <input
              type="number"
              name="kode"
              className="lg:col-span-2 w-full h-9 border border-white/70 bg-transparent rounded-md px-4 py-1 text-white text-sm"
              placeholder="Masukan Kode Promo"
            />
            <button className=" bg-orange-500 py-1 lg:py-0 rounded-lg text-white font-semibold shadow-md shadow-slate-900">
              Apply Code
            </button>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-white">Gunakan kode promo anda</p>
        </div>
      </div>

      {/* Konfirmasi Pesanan */}
      <div className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-600 shadow-md shadow-slate-900 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TbCircleNumber5Filled className="text-2xl text-orange-500 ring-2 ring-white/70 rounded-full" />
          <h1 className="text-xl text-white font-semibold">
            Konfirmasi Pesanan
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="wa" className="text-sm text-white">
            No. Whatsapp
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full overflow-hidden">
            <span className="text-white mr-2">+62</span>
            <input
              type="tel"
              className="outline-none flex-1 bg-transparent text-white text-sm"
              placeholder="81234567890"
            />
          </div>
        </div>
        <div className="">
          <p className="text-sm text-white">
            Dengan membeli otomatis saya menyetujui{" "}
            <span className="text-orange-500">Ketentuan Layanan</span>
          </p>
        </div>
      </div>

      {/* Modal Section */}
      <Modal open={open} close={() => setOpen(false)} title="Cara Menemukan ID">
        <h1 className="text-sm text-white">
          Untuk mengetahui User ID Kamu, silahkan klik menu profile dibagian
          kiri atas pada menu utama game. User ID akan terlihat dibagian bawah
          Nama karakter game Kamu. Silahkan masukan User ID dan Server ID Kamu
          untuk menyelesaikan transaksi.
        </h1>
      </Modal>
    </div>
  );
};

export default DetailContent;
