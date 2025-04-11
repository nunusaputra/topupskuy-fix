import React, { useState } from "react";
import InputForm from "../element/InputForms/InputForm";
import { dataPayment, topup } from "../../services";
import { fetchDataMember, fetchPayment } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../env";

const Topup = () => {
  const [saldo, setSaldo] = useState(false);
  const [show, setShow] = useState(false);
  const [nominal, setNominal] = useState(null);
  const [selected, setSelected] = useState({
    itemId: null,
    paymentId: null,
    nominal: 0
  });

  const handleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };

  const uniqueCode = localStorage.getItem("unique-code")
    ? localStorage.getItem("unique-code")
    : "";

  const { data: member } = useQuery({
    queryKey: ["uniqueCode", uniqueCode],
    queryFn: () => fetchDataMember(uniqueCode),
    staleTime: 21600000,
    enabled: !!uniqueCode,
  });

  const { data: channel } = useQuery({
    queryFn: () => fetchPayment(),
    staleTime: 21600000
  });

  const formatIDR = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  const handleNominalChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, '');
    const parsedValue = parseInt(input, 10) || 0;
    setNominal(parsedValue);
    setSelected((selected) => ({
      ...selected,
      nominal: parsedValue
    }))
  };

  const addAmount = (amount) => {
    setNominal((prev) => prev + amount);
    setSelected((selected) => ({
      ...selected,
      nominal: nominal
    }))
  };

  const submit = async () => {
    try {
      const response = await axios.post(`${API_URL}/topup-member`, {
        paymentMethod: {
          code: selected.paymentCode,
          category: ""
        },
        nominal: nominal,
        user: localStorage.getItem("unique-code")
      });

      if (response && response.data && response.data !== "") {
        window.location.href = `/payment/${response.data}`;
      } else {
        toast.error("Request topup gagal, silahkan hubungi admin");
      }
    } catch (error) {
      toast.error("Request topup gagal, silahkan hubungi admin");
    }
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
                {show
                  ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(member?.saldo)
                  : "*********"}
              </h1>
              {show ? (
                <i
                  className="bi bi-eye-slash text-lg text-white transition-all duration-300 cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <i
                  className="bi bi-eye text-lg text-white transition-all duration-300 cursor-pointer"
                  onClick={() => setShow(!show)}
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
            value={formatIDR(nominal)}
            onChange={handleNominalChange}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5">
            {topup.map((item) => (
              <div
                className={`w-full ring-2 ring-offset-0 ring-offset-secondary/80 min-h-20 shadow-md shadow-slate-900 
                        rounded-lg px-4 py-2 flex flex-col gap-1 justify-center hover:cursor-pointer
                        hover:bg-seventh hover:ring-seventh text-center ${selected.itemId === item.id
                    ? "bg-seventh ring-orange-500 ring-offset-4"
                    : "bg-fourth/30 backdrop-blur-xl ring-0 ring-fourth"
                  }`}
                onClick={() => addAmount(item.price)}
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
          <i className="bi bi-credit-card-2-front-fill text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
            Pilih Metode Pembayaran
          </h1>
        </div>

        {nominal !== 0 && channel && (
          <>
            <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => handleShow(1)}
              >
                <h1 className="text-sm text-white font-semibold">
                  Saldo (Sisa saldo{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(member?.saldo)}
                  )
                </h1>
                <span
                  className={`text-lg text-white transform transition-transform duration-300`}
                >
                  {show === 1 ? (
                    <i className="bi bi-chevron-up text-lg text-white" />
                  ) : (
                    <i className="bi bi-chevron-down text-lg text-white" />
                  )}
                </span>
              </div>
              {show === 1 ? (
                <div className="my-5 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                    {channel
                      .filter((item) => item.category === "Saldo")
                      .map((value) => (
                        <div
                          className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                            } ${nominal > member.saldo
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          key={value.id}
                          onClick={() => {
                            if (nominal < member.saldo) {
                              setSelected({
                                ...selected,
                                payment: value.id,
                                paymentCode: value.code,
                                paymentName: value.category,
                                feePayment: 0,
                              });
                            }
                          }}
                        >
                          <div
                            className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                              }`}
                          >
                            <img
                              src={value.icon.name}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                            <h1
                              className={`text-lg font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {value.name}
                            </h1>
                            {nominal > member.saldo ? (
                              <p
                                className={`text-xs text-red-600 ${selected.payment === value.id
                                  ? "text-red-200"
                                  : ""
                                  }`}
                              >
                                Tidak Tersedia.{" "}
                                <span className="block">
                                  Minimal{" "}
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(nominal)}
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <h1
                              className={`text-sm font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                nominal +
                                (nominal * (value.feePercent / 100) +
                                  value.feeFlat)
                              )}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
                  {channel
                    .filter((item) => item.category === "Saldo")
                    .map((value) => (
                      <div
                        className="w-20 h-8 overflow-hidden"
                        key={value.id}
                      >
                        <img
                          src={value.icon.name}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => handleShow(2)}
              >
                <h1 className="text-sm text-white font-semibold">QRIS</h1>
                <span
                  className={`text-lg text-white transform transition-transform duration-300`}
                >
                  {show === 2 ? (
                    <i className="bi bi-chevron-up text-lg text-white" />
                  ) : (
                    <i className="bi bi-chevron-down text-lg text-white" />
                  )}
                </span>
              </div>
              {show === 2 ? (
                <div className="my-5 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                    {channel
                      .filter((item) => item.category === "QRIS")
                      .map((value) => (
                        <div
                          className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                            } ${nominal < value.minAmount
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          key={value.id}
                          onClick={() => {
                            if (nominal >= value.minAmount) {
                              setSelected({
                                ...selected,
                                payment: value.id,
                                paymentCode: value.code,
                                paymentName: value.category,
                                feePayment: (
                                  nominal * (value.feePercent / 100) +
                                  value.feeFlat
                                ).toFixed(2),
                              });
                            }
                          }}
                        >
                          <div
                            className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                              }`}
                          >
                            <img
                              src={value.icon.name}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                            <h1
                              className={`text-lg font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {value.name}
                            </h1>
                            {nominal < value.minAmount ? (
                              <p
                                className={`text-xs text-red-600 ${selected.payment === value.id
                                  ? "text-red-200"
                                  : ""
                                  }`}
                              >
                                Tidak Tersedia.{" "}
                                <span className="block">
                                  Minimal {value.minAmount}
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <h1
                              className={`text-sm font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                nominal +
                                (nominal * (value.feePercent / 100) +
                                  value.feeFlat)
                              )}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
                  {channel
                    .filter((item) => item.category === "QRIS")
                    .map((value) => (
                      <div
                        className="w-20 h-8 overflow-hidden"
                        key={value.id}
                      >
                        <img
                          src={value.icon.name}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => handleShow(3)}
              >
                <h1 className="text-sm text-white font-semibold">E-Wallet</h1>
                <span
                  className={`text-lg text-white transform transition-transform duration-300`}
                >
                  {show === 3 ? (
                    <i className="bi bi-chevron-up text-lg text-white" />
                  ) : (
                    <i className="bi bi-chevron-down text-lg text-white" />
                  )}
                </span>
              </div>
              {show === 3 ? (
                <div className="my-5 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                    {channel
                      .filter((item) => item.category === "E-Wallet")
                      .map((value) => (
                        <div
                          className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                            } ${nominal < value.minAmount
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          key={value.id}
                          onClick={() => {
                            if (nominal >= value.minAmount) {
                              setSelected({
                                ...selected,
                                payment: value.id,
                                paymentCode: value.code,
                                paymentName: value.category,
                                feePayment: (
                                  nominal * (value.feePercent / 100) +
                                  value.feeFlat
                                ).toFixed(2),
                              });
                            }
                          }}
                        >
                          <div
                            className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                              }`}
                          >
                            <img
                              src={value.icon.name}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                            <h1
                              className={`text-lg font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {value.name}
                            </h1>
                            {nominal < value.minAmount ? (
                              <p
                                className={`text-xs text-red-600 ${selected.payment === value.id
                                  ? "text-red-200"
                                  : ""
                                  }`}
                              >
                                Tidak Tersedia.{" "}
                                <span className="block">
                                  Minimal {value.minAmount}
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <h1
                              className={`text-sm font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                nominal +
                                (nominal * (value.feePercent / 100) +
                                  value.feeFlat)
                              )}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
                  {channel
                    .filter((item) => item.category === "E-Wallet")
                    .map((value) => (
                      <div
                        className="w-20 h-8 overflow-hidden"
                        key={value.id}
                      >
                        <img
                          src={value.icon.name}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => handleShow(4)}
              >
                <h1 className="text-sm text-white font-semibold">
                  Virtual Account
                </h1>
                <span
                  className={`text-lg text-white transform transition-transform duration-300 `}
                >
                  {show === 4 ? (
                    <i className="bi bi-chevron-up text-lg text-white" />
                  ) : (
                    <i className="bi bi-chevron-down text-lg text-white" />
                  )}
                </span>
              </div>
              {show === 4 ? (
                <div className="my-5 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                    {channel
                      .filter((item) => item.category === "Virtual Account")
                      .map((value) => (
                        <div
                          className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                            } ${nominal < value.minAmount
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          key={value.id}
                          onClick={() => {
                            if (nominal >= value.minAmount) {
                              setSelected({
                                ...selected,
                                payment: value.id,
                                paymentCode: value.code,
                                paymentName: value.category,
                                feePayment: (
                                  nominal * (value.feePercent / 100) +
                                  value.feeFlat
                                ).toFixed(2),
                              });
                            }
                          }}
                        >
                          <div
                            className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                              }`}
                          >
                            <img
                              src={value.icon.name}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                            <h1
                              className={`text-lg font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {value.name}
                            </h1>
                            {nominal < value.minAmount ? (
                              <p
                                className={`text-xs text-red-600 ${selected.payment === value.id
                                  ? "text-red-200"
                                  : ""
                                  }`}
                              >
                                Tidak Tersedia.{" "}
                                <span className="block">
                                  Minimal {value.minAmount}
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <h1
                              className={`text-sm font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                nominal +
                                (nominal * (value.feePercent / 100) +
                                  value.feeFlat)
                              )}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
                  {channel
                    .filter((item) => item.category === "Virtual Account")
                    .map((value) => (
                      <div
                        className="w-20 h-8 overflow-hidden"
                        key={value.id}
                      >
                        <img
                          src={value.icon.name}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => handleShow(5)}
              >
                <h1 className="text-sm text-white font-semibold">
                  Convenience Store
                </h1>
                <span
                  className={`text-lg text-white transform transition-transform duration-300 `}
                >
                  {show === 5 ? (
                    <i className="bi bi-chevron-up text-lg text-white" />
                  ) : (
                    <i className="bi bi-chevron-down text-lg text-white" />
                  )}
                </span>
              </div>
              {show === 5 ? (
                <div className="my-5 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                    {channel
                      .filter((item) => item.category === "Convenience Store")
                      .map((value) => (
                        <div
                          className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                            } ${nominal < value.minAmount
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          key={value.id}
                          onClick={() => {
                            if (nominal >= value.minAmount) {
                              setSelected({
                                ...selected,
                                payment: value.id,
                                paymentCode: value.code,
                                paymentName: value.category,
                                feePayment: (
                                  nominal * (value.feePercent / 100) +
                                  value.feeFlat
                                ).toFixed(2),
                              });
                            }
                          }}
                        >
                          <div
                            className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                              }`}
                          >
                            <img
                              src={value.icon.name}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                            <h1
                              className={`text-lg font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {value.name}
                            </h1>
                            {nominal < value.minAmount ? (
                              <p
                                className={`text-xs text-red-600 ${selected.payment === value.id
                                  ? "text-red-200"
                                  : ""
                                  }`}
                              >
                                Tidak Tersedia.{" "}
                                <span className="block">
                                  Minimal {value.minAmount}
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <h1
                              className={`text-sm font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                nominal +
                                (nominal * (value.feePercent / 100) +
                                  value.feeFlat)
                              )}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
                  {channel
                    .filter((item) => item.category === "Convenience Store")
                    .map((value) => (
                      <div
                        className="w-20 h-8 overflow-hidden"
                        key={value.id}
                      >
                        <img
                          src={value.icon.name}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-2"
                onClick={() => handleShow(6)}
              >
                <h1 className="text-sm text-white font-semibold">Bank</h1>
                <span
                  className={`text-lg text-white transform transition-transform duration-300 `}
                >
                  {show === 6 ? (
                    <i className="bi bi-chevron-up text-lg text-white" />
                  ) : (
                    <i className="bi bi-chevron-down text-lg text-white" />
                  )}
                </span>
              </div>
              {show === 6 ? (
                <div className="my-5 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4">
                    {channel
                      .filter((item) => item.category === "Bank")
                      .map((value) => (
                        <div
                          className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${selected.payment === value.id
                            ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                            : "bg-white"
                            } ${nominal < value.minAmount
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          key={value.id}
                          onClick={() => {
                            if (nominal >= value.minAmount) {
                              setSelected({
                                ...selected,
                                payment: value.id,
                                paymentCode: value.code,
                                paymentName: value.category,
                                feePayment: (
                                  nominal * (value.feePercent / 100) +
                                  value.feeFlat
                                ).toFixed(2),
                              });
                            }
                          }}
                        >
                          <div
                            className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${selected.payment === value.id
                              ? "bg-white p-1 rounded-md"
                              : ""
                              }`}
                          >
                            <img
                              src={value.icon.name}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full lg:w-70 flex flex-col justify-center text-center lg:text-left">
                            <h1
                              className={`text-lg font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {value.name}
                            </h1>
                            {nominal < value.minAmount ? (
                              <p
                                className={`text-xs text-red-600 ${selected.payment === value.id
                                  ? "text-red-200"
                                  : ""
                                  }`}
                              >
                                Tidak Tersedia.{" "}
                                <span className="block">
                                  Minimal {value.minAmount}
                                </span>
                              </p>
                            ) : (
                              ""
                            )}
                            <h1
                              className={`text-sm font-semibold ${selected.payment === value.id
                                ? "text-white"
                                : ""
                                }`}
                            >
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                nominal +
                                (nominal * (value.feePercent / 100) +
                                  value.feeFlat)
                              )}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-10 bg-amber-50 px-4 py-2 flex gap-3">
                  {channel
                    .filter((item) => item.category === "Bank")
                    .map((value) => (
                      <div
                        className="w-20 h-8 overflow-hidden"
                        key={value.id}
                      >
                        <img
                          src={value.icon.name}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Informasi Pembayaran */}
      <div className="bg-secondary/80 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-5 border-b-2 pb-4">
          <i className="bi bi-info-circle text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
            Informasi Pembayaran
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">Nominal Topup</h1>
            <p className="text-sm text-white">Rp {nominal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">
              Sistem Pembayaran
            </h1>
            <p className="text-sm text-white">{selected.paymentName ? selected.paymentName : "Belum dipilih"}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">
              Total Pembayaran
            </h1>
            <p className="text-sm text-white">{selected.price !== null || selected.feePayment !== null
              ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(
                Number(nominal) + Number(selected.feePayment)
              )
              : "Rp 0"}</p>
          </div>
        </div>
      </div>

      <button onClick={submit} className="w-full h-10 bg-seventh ring-2 ring-offset-0 ring-seventh text-white hover:ring-offset-secondary hover:ring-offset-2 rounded-lg transition-all duration-300">
        Order Sekarang
      </button>
    </div>
  );
};

export default Topup;
