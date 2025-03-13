import React, { useState } from "react";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
} from "react-icons/tb";
import { dataList, dataPayment, diamondPass } from "../../services/index";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdInformationCircle,
} from "react-icons/io";
import Modal from "../Modal";
import { ImHeadphones } from "react-icons/im";
import { FiShoppingBag } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";

const DetailContent = () => {
  const [show, setShow] = useState(null);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    item: null,
    payment: null,
  });
  const { id } = useParams();
  const data = dataList.find((item) => item.id === parseInt(id));

  const handleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className="container relative w-full min-h-screen mx-auto lg:flex lg:gap-10">
      {/* Side Content */}
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
            onClick={() => setOpen(!open)}
          >
            <p className="text-sm text-white">Tata cara topup</p>
            <IoIosArrowUp
              className={`text-xl text-white transition-all duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {open && (
            <div className="w-full bg-slate-800 min-h-[7.5rem] flex flex-col gap-2 rounded-lg overflow-hidden">
              <div className="w-full h-8 bg-fourth/30 backdrop-blur-xl px-3 py-2">
                <h1 className="text-white text-sm font-semibold">
                  CARA TOP UP
                </h1>
              </div>
              <div className="text-white px-4 text-sm">
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Masukkan User ID Kamu</li>
                  <li>Pilih produk yang kamu inginkan</li>
                  <li>Selesaikan pembayaran</li>
                  <li>
                    Top up produk akan ditambahkan ke akun Free Fire kamu{" "}
                  </li>
                </ol>
              </div>
              <div className="mt-5">
                <div className="w-full h-8 bg-fourth/30 backdrop-blur-xl shadow-black px-3 py-1">
                  <h1 className="text-white text-sm font-semibold">
                    INFORMASI PENTING!
                  </h1>
                </div>
                <div className="text-white px-4 text-sm mt-2">
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>
                      Pastikan akun sudah sesuai aplikasi di device
                      masing-masing
                    </li>
                    <li>Proses Topup selama 0-20 Menit</li>
                    <li>Input no whatsapp jangan ada spasi</li>
                  </ol>
                </div>
              </div>
              <div className="mt-5">
                <div className="w-full h-8 bg-fourth/30 backdrop-blur-xl shadow-black px-3 py-1">
                  <h1 className="text-white text-sm font-semibold">NOTE</h1>
                </div>
                <div className="text-white px-4 text-sm py-2">
                  Pembelian weekly maksimal 10x atau 70 hari (lebih dari itu
                  weekly tidak masuk atau hangus)
                </div>
              </div>
            </div>
          )}

          {/* Order Section */}
          <div className="w-full min-h-20 bg-slate-800 rounded-lg flex flex-col gap-2 px-4 py-3">
            <div className="w-full h-20 flex gap-4 items-center">
              <div className="w-28 h-16 rounded-md overflow-hidden">
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
                <h1 className="text-white text-md font-semibold">
                  Payment Fee
                </h1>
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
          <button
            className="w-full py-2 bg-seventh text-white font-semibold shadow-md shadow-slate-900 rounded-lg flex items-center justify-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <FiShoppingBag className="text-white text-xl" />
            <p>Pesan Sekarang!</p>
          </button>
        </div>
      </div>

      {/* Detail Order */}
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
              <select
                name="serverId"
                className="w-full h-9 border border-white/70 bg-slate-800 text-slate-300 rounded-md p-1 text-sm"
              >
                <option value="">Choose your server id</option>
                <option value="">2262</option>
                <option value="">2346</option>
                <option value="">3312</option>
              </select>
            </div>
          </div>
          <div className="">
            <p className="text-xs sm:text-sm text-slate-400">
              Untuk mengetahui User ID kamu, klik menu profile pada menu game.
              User ID terlihat pada bagian bawah nama karakter kamu. Silahkan
              masukan User ID dan Server ID untuk menyelesaikan transaksi.
            </p>
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
                className={`w-full ring-2 ring-offset-0 ring-offset-secondary/80 min-h-20 shadow-md shadow-slate-900 
                rounded-lg px-4 py-2 flex flex-col gap-1 justify-center hover:cursor-pointer
                hover:bg-seventh ${
                  selected.item === item.id
                    ? "bg-seventh ring-orange-500 ring-offset-4"
                    : "bg-fourth/30 backdrop-blur-xl ring-0"
                }`}
                key={item.id}
                onClick={() => setSelected({ ...selected, item: item.id })}
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
          <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
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
                        className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row 
                        items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                          selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                        }`}
                        key={value.id}
                        onClick={() =>
                          setSelected({ ...selected, payment: value.id })
                        }
                      >
                        <div
                          className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center
                          ${
                            selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                          }`}
                        >
                          <img
                            src={value.images}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                          <h1
                            className={`text-lg font-semibold 
                          ${selected.payment === value.id ? "text-white" : ""}`}
                          >
                            {value.name}
                          </h1>
                          <p
                            className={`text-xs text-red-600 
                          ${
                            selected.payment === value.id ? "text-red-200" : ""
                          }`}
                          >
                            Tidak Tersedia.{" "}
                            <span className="block">Minimal Rp. 20.000</span>
                          </p>
                          <h1
                            className={`text-sm font-semibold
                          ${selected.payment === value.id ? "text-white" : ""}`}
                          >
                            Rp. 6.641,00
                          </h1>
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
          <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
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
                        className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row 
                        items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                          selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                        }`}
                        key={value.id}
                        onClick={() =>
                          setSelected({ ...selected, payment: value.id })
                        }
                      >
                        <div
                          className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center
                          ${
                            selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                          }`}
                        >
                          <img
                            src={value.images}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                          <h1
                            className={`text-lg font-semibold 
                          ${selected.payment === value.id ? "text-white" : ""}`}
                          >
                            {value.name}
                          </h1>
                          <p
                            className={`text-xs text-red-600 
                          ${
                            selected.payment === value.id ? "text-red-200" : ""
                          }`}
                          >
                            Tidak Tersedia.{" "}
                            <span className="block">Minimal Rp. 20.000</span>
                          </p>
                          <h1
                            className={`text-sm font-semibold
                          ${selected.payment === value.id ? "text-white" : ""}`}
                          >
                            Rp. 6.641,00
                          </h1>
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
          <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
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
                        className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row 
                        items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                          selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                        }`}
                        key={value.id}
                        onClick={() =>
                          setSelected({ ...selected, payment: value.id })
                        }
                      >
                        <div
                          className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center
                          ${
                            selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                          }`}
                        >
                          <img
                            src={value.images}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                          <h1
                            className={`text-lg font-semibold 
                          ${selected.payment === value.id ? "text-white" : ""}`}
                          >
                            {value.name}
                          </h1>
                          <p
                            className={`text-xs text-red-600 
                          ${
                            selected.payment === value.id ? "text-red-200" : ""
                          }`}
                          >
                            Tidak Tersedia.{" "}
                            <span className="block">Minimal Rp. 20.000</span>
                          </p>
                          <h1
                            className={`text-sm font-semibold
                          ${selected.payment === value.id ? "text-white" : ""}`}
                          >
                            Rp. 6.641,00
                          </h1>
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
              <button className=" bg-seventh py-1 lg:py-0 rounded-lg text-white font-semibold shadow-md shadow-slate-900">
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
        <Modal open={showModal} close={() => setShowModal(!showModal)}>
          <div className="w-full min-h-96 flex flex-col gap-2">
            <div className="w-full min-h-48 flex flex-col items-center gap-4 justify-center">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center">
                <BsFillPatchCheckFill className="w-full h-full text-green-500 relative z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white z-0"></div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <h1 className="text-lg sm:text-xl text-white font-semibold">
                  Buat Pesanan
                </h1>
                <p className="text-zs sm:text-xs text-white">
                  Pastikan data akun kamu dan produk yang kamu pilih valid dan
                  sesuai.
                </p>
              </div>
            </div>
            <div className="bg-slate-800 w-full min-h-52 sm:min-h-60 p-2 rounded-lg shadow-md shadow-slate-900 flex flex-col gap-1">
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">Username</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">P'Star7</h1>
                </div>
              </div>
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">ID</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">76115035</h1>
                </div>
              </div>
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">Zone ID</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">2145</h1>
                </div>
              </div>
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">Item</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">
                    Weekly Diamond Pass
                  </h1>
                </div>
              </div>
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">Product</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">
                    Mobile Legends
                  </h1>
                </div>
              </div>
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">Payment</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">
                    QRIS (All Payment)
                  </h1>
                </div>
              </div>
            </div>
            <h1 className="text-xs sm:text-sm text-white">
              Jika data diatas sudah benar, klik pesan sekarang.
            </h1>
            <div className="flex items-center gap-2 mt-3 sm:mt-7">
              <button className="bg-seventh shadow-md shadow-slate-900 w-full py-2 text-sm text-white rounded-lg">
                Pesan Sekarang
              </button>
              <button
                className="bg-slate-800 shadow-md shadow-slate-900 w-full py-2 text-sm text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Batalkan
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DetailContent;
