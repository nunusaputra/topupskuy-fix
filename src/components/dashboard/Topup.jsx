import React, { useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import { dataPayment, topup } from "../../services";

const Topup = () => {
  const [saldo, setSaldo] = useState(false);
  const [show, setShow] = useState(false);
  const [nominal, setNominal] = useState(null);
  const [selected, setSelected] = useState({
    itemId: null,
    paymentId: null,
  });

  const handleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      {/* Saldo */}
      <div className="bg-secondary/80 p-4 rounded-xl flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-5 border-b-2 pb-4">
          <i className="bi bi-coin text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
            Top Up Saldo
          </h1>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl text-white font-semibold">Saldo Kamu</h1>
          <div className="flex justify-between mt-5">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-white transition-all duration-300">
                {saldo ? "Rp. 100.000" : "*********"}
              </h1>
              {saldo ? (
                <i
                  className="bi bi-eye-slash text-lg text-white transition-all duration-300 cursor-pointer"
                  onClick={() => setSaldo(!saldo)}
                />
              ) : (
                <i
                  className="bi bi-eye text-lg text-white transition-all duration-300 cursor-pointer"
                  onClick={() => setSaldo(!saldo)}
                />
              )}
            </div>
            <div className="px-4 py-1 bg-seventh ring-2 ring-offset-0 rounded-full text-xs font-semibold text-white ring-seventh transition-all duration-300 hover:ring-offset-4 hover:ring-offset-secondary cursor-pointer">
              Riwayat Topup
            </div>
          </div>
        </div>
      </div>

      {/* Nominal Topup */}
      <div className="bg-secondary/80 p-4 rounded-xl flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-5 border-b-2 pb-4">
          <i className="bi bi-cash-coin text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
            Nominal Top Up
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <InputForm
            label=""
            type="text"
            name="nominal"
            id="nominal"
            placeholder="Rp. 10.000"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5">
            {topup.map((item) => (
              <div
                className={`w-full ring-2 ring-offset-0 ring-offset-secondary/80 min-h-20 shadow-md shadow-slate-900 
                        rounded-lg px-4 py-2 flex flex-col gap-1 justify-center hover:cursor-pointer
                        hover:bg-seventh hover:ring-seventh text-center ${
                          selected.itemId === item.id
                            ? "bg-seventh ring-orange-500 ring-offset-4"
                            : "bg-fourth/30 backdrop-blur-xl ring-0 ring-fourth"
                        }`}
                onClick={() => {
                  setSelected({
                    ...selected,
                    itemId: item.id,
                  });
                }}
              >
                <h1 className="text-white text-xs sm:text-sm lg:text-lg font-semibold">
                  Rp. {item.price.toLocaleString()}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div className="w-full min-h-30 bg-secondary/80 rounded-lg p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <i class="bi bi-credit-card-2-front-fill text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
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
              className={`text-lg text-white transform transition-transform duration-300`}
            >
              {show === 1 ? (
                <i class="bi bi-caret-up text-lg text-white" />
              ) : (
                <i class="bi bi-caret-down text-lg text-white" />
              )}
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
                      className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                        selected.paymentId === value.id
                          ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                          : "bg-white"
                      }`}
                      onClick={() => {
                        setSelected({
                          ...selected,
                          paymentId: value.id,
                        });
                      }}
                    >
                      <div
                        className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                          selected.paymentId === value.id
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
                          className={`text-lg font-semibold ${
                            selected.paymentId === value.id ? "text-white" : ""
                          }`}
                        >
                          {value.name}
                        </h1>
                        <p
                          className={`text-xs text-red-600 ${
                            selected.paymentId === value.id
                              ? "text-red-200"
                              : ""
                          }`}
                        >
                          Rp. 10.000
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-10 bg-white px-4 py-2 flex gap-3">
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
              className={`text-lg text-white transform transition-transform duration-300`}
            >
              {show === 2 ? (
                <i class="bi bi-caret-up text-lg text-white" />
              ) : (
                <i class="bi bi-caret-down text-lg text-white" />
              )}
            </span>
          </div>
          {show === 2 ? (
            <div className="my-5 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                {dataPayment
                  .filter((item) => item.type === "convenience-store")
                  .map((value) => (
                    <div
                      className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                        selected.paymentId === value.id
                          ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                          : "bg-white"
                      }`}
                      onClick={() => {
                        setSelected({
                          ...selected,
                          paymentId: value.id,
                        });
                      }}
                    >
                      <div
                        className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                          selected.paymentId === value.id
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
                          className={`text-lg font-semibold ${
                            selected.paymentId === value.id ? "text-white" : ""
                          }`}
                        >
                          {value.name}
                        </h1>
                        <p
                          className={`text-xs text-red-600 ${
                            selected.paymentId === value.id
                              ? "text-red-200"
                              : ""
                          }`}
                        >
                          Rp. 10.000
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-10 bg-white px-4 py-2 flex gap-3">
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
              className={`text-lg text-white transform transition-transform duration-300 `}
            >
              {show === 3 ? (
                <i class="bi bi-caret-up text-lg text-white" />
              ) : (
                <i class="bi bi-caret-down text-lg text-white" />
              )}
            </span>
          </div>
          {show === 3 ? (
            <div className="my-5 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                {dataPayment
                  .filter((item) => item.type === "bank")
                  .map((value) => (
                    <div
                      className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                        selected.paymentId === value.id
                          ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                          : "bg-white"
                      }`}
                      onClick={() => {
                        setSelected({
                          ...selected,
                          paymentId: value.id,
                        });
                      }}
                    >
                      <div
                        className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                          selected.paymentId === value.id
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
                          className={`text-lg font-semibold ${
                            selected.paymentId === value.id ? "text-white" : ""
                          }`}
                        >
                          {value.name}
                        </h1>
                        <p
                          className={`text-xs text-red-600 ${
                            selected.paymentId === value.id
                              ? "text-red-200"
                              : ""
                          }`}
                        >
                          Rp. 10.000
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-10 bg-white px-4 py-2 flex gap-3">
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

      {/* Informasi Pembayaran */}
      <div className="bg-secondary/80 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-5 border-b-2 pb-4">
          <i class="bi bi-info-circle text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
            Informasi Pembayaran
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">Nominal Topup</h1>
            <p className="text-sm text-white">Rp. 10.000</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">
              Sistem Pembayaran
            </h1>
            <p className="text-sm text-white">Gopay</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">
              Total Pembayaran
            </h1>
            <p className="text-sm text-white">Rp. 10.000</p>
          </div>
        </div>
      </div>

      <button className="w-full h-10 bg-seventh ring-2 ring-offset-0 ring-seventh text-white hover:ring-offset-secondary hover:ring-offset-2 rounded-lg transition-all duration-300">
        Order Sekarang
      </button>
    </div>
  );
};

export default Topup;
