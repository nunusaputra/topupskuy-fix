import React, { useState } from "react";
import { fetchUpgradeMembership, fetchDataMember } from "../../services";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../env";

const Membership = () => {
  const [show, setShow] = useState(null);
  const [selected, setSelected] = useState({
    itemId: null,
    price: 0,
    payment: null,
    paymentCode: null,
    paymentName: null,
    feePayment: 0,
  });

  const handleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };

  const { data: upgradeMembership } = useQuery({
    queryKey: ["upgrade"],
    queryFn: () => fetchUpgradeMembership(),
    staleTime: 21600000,
  });

  const uniqueCode = localStorage.getItem("unique-code")
    ? localStorage.getItem("unique-code")
    : "";
  const { data: member } = useQuery({
    queryKey: ["uniqueCode", uniqueCode],
    queryFn: () => fetchDataMember(uniqueCode),
    staleTime: 21600000,
    enabled: !!uniqueCode,
  });

  const upgradeMember = async () => {
    let object = {
      code: selected.paymentCode,
      category: selected.paymentName,
      membershipId: selected.itemId,
      user: uniqueCode,
    };

    axios
      .post(`${API_URL}/membership/upgrade`, JSON.stringify(object), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data !== "") {
          window.location.href = `/payment/${response.data}`;
        } else {
          toast.error("terjadi kesalahan, silahkan kontak admin");
        }
      })
      .catch((error) => {
        toast.info("terjadi kesalahan, silahkan kontak admin");
      });
  };

  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      {/* Upgrade Membership */}
      <div className="bg-secondary/80 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-5 border-b-2 pb-4">
          <i className="bi bi-coin text-lg xl:text-xl text-white" />
          <h1 className="text-sm xl:text-lg text-white font-semibold">
            Membership
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5">
          {upgradeMembership?.memberships.map((item) => (
            <div
              className={`w-full ring-2 ring-offset-0 ring-offset-secondary/80 min-h-20 shadow-md shadow-slate-900 
                    rounded-lg px-4 py-2 flex flex-col gap-1 justify-center hover:cursor-pointer
                    hover:bg-seventh hover:ring-seventh ${
                      selected.itemId === item.id
                        ? "bg-seventh ring-orange-500 ring-offset-4"
                        : "bg-fourth/30 backdrop-blur-xl ring-0 ring-fourth"
                    }`}
              key={item.id}
              onClick={() => {
                setSelected({
                  ...selected,
                  itemId: item.id,
                  price: item.registerPrice,
                });
              }}
            >
              <h1 className="text-white text-xs sm:text-sm font-semibold">
                {item.name}
              </h1>
              <p className="text-white text-xs">
                Rp. {item.registerPrice.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-secondary/80 p-4 rounded-xl">
        <div className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-500 shadow-md shadow-slate-900 p-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-2 border-b-2 pb-4">
            <i className="bi bi-cash-coin text-lg xl:text-xl text-white" />
            <h1 className="text-sm xl:text-lg text-white font-semibold">
              Pilih Metode Pembayaran
            </h1>
          </div>

          {selected.itemId != null && (
            <div>
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
                    }).format(member.saldo)}
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
                      {upgradeMembership?.channels
                        .filter((item) => item.category === "Saldo")
                        .map((value) => (
                          <div
                            className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                              selected.payment === value.id
                                ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                                : "bg-white"
                            } ${
                              selected.price > member.saldo
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            key={value.id}
                            onClick={() => {
                              if (selected.price < member.saldo) {
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
                              className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                                selected.payment === value.id
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
                                className={`text-lg font-semibold ${
                                  selected.payment === value.id
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {value.name}
                              </h1>
                              {selected.price > member.saldo ? (
                                <p
                                  className={`text-xs text-red-600 ${
                                    selected.payment === value.id
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
                                    }).format(selected.price)}
                                  </span>
                                </p>
                              ) : (
                                ""
                              )}
                              <h1
                                className={`text-sm font-semibold ${
                                  selected.payment === value.id
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
                                  selected.price +
                                    (selected.price * (value.feePercent / 100) +
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
                    {upgradeMembership?.channels
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
                      {upgradeMembership?.channels
                        .filter((item) => item.category === "QRIS")
                        .map((value) => (
                          <div
                            className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                              selected.payment === value.id
                                ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                                : "bg-white"
                            } ${
                              selected.price < value.minAmount
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            key={value.id}
                            onClick={() => {
                              if (selected.price >= value.minAmount) {
                                setSelected({
                                  ...selected,
                                  payment: value.id,
                                  paymentCode: value.code,
                                  paymentName: value.category,
                                  feePayment: (
                                    selected.price * (value.feePercent / 100) +
                                    value.feeFlat
                                  ).toFixed(2),
                                });
                              }
                            }}
                          >
                            <div
                              className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                                selected.payment === value.id
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
                                className={`text-lg font-semibold ${
                                  selected.payment === value.id
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {value.name}
                              </h1>
                              {selected.price < value.minAmount ? (
                                <p
                                  className={`text-xs text-red-600 ${
                                    selected.payment === value.id
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
                                className={`text-sm font-semibold ${
                                  selected.payment === value.id
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
                                  selected.price +
                                    (selected.price * (value.feePercent / 100) +
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
                    {upgradeMembership?.channels
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
                      {upgradeMembership?.channels
                        .filter((item) => item.category === "E-Wallet")
                        .map((value) => (
                          <div
                            className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                              selected.payment === value.id
                                ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                                : "bg-white"
                            } ${
                              selected.price < value.minAmount
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            key={value.id}
                            onClick={() => {
                              if (selected.price >= value.minAmount) {
                                setSelected({
                                  ...selected,
                                  payment: value.id,
                                  paymentCode: value.code,
                                  paymentName: value.category,
                                  feePayment: (
                                    selected.price * (value.feePercent / 100) +
                                    value.feeFlat
                                  ).toFixed(2),
                                });
                              }
                            }}
                          >
                            <div
                              className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                                selected.payment === value.id
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
                                className={`text-lg font-semibold ${
                                  selected.payment === value.id
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {value.name}
                              </h1>
                              {selected.price < value.minAmount ? (
                                <p
                                  className={`text-xs text-red-600 ${
                                    selected.payment === value.id
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
                                className={`text-sm font-semibold ${
                                  selected.payment === value.id
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
                                  selected.price +
                                    (selected.price * (value.feePercent / 100) +
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
                    {upgradeMembership?.channels
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
                      {upgradeMembership?.channels
                        .filter((item) => item.category === "Virtual Account")
                        .map((value) => (
                          <div
                            className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                              selected.payment === value.id
                                ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                                : "bg-white"
                            } ${
                              selected.price < value.minAmount
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            key={value.id}
                            onClick={() => {
                              if (selected.price >= value.minAmount) {
                                setSelected({
                                  ...selected,
                                  payment: value.id,
                                  paymentCode: value.code,
                                  paymentName: value.category,
                                  feePayment: (
                                    selected.price * (value.feePercent / 100) +
                                    value.feeFlat
                                  ).toFixed(2),
                                });
                              }
                            }}
                          >
                            <div
                              className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                                selected.payment === value.id
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
                                className={`text-lg font-semibold ${
                                  selected.payment === value.id
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {value.name}
                              </h1>
                              {selected.price < value.minAmount ? (
                                <p
                                  className={`text-xs text-red-600 ${
                                    selected.payment === value.id
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
                                className={`text-sm font-semibold ${
                                  selected.payment === value.id
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
                                  selected.price +
                                    (selected.price * (value.feePercent / 100) +
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
                    {upgradeMembership?.channels
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
                      {upgradeMembership?.channels
                        .filter((item) => item.category === "Convenience Store")
                        .map((value) => (
                          <div
                            className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                              selected.payment === value.id
                                ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                                : "bg-white"
                            } ${
                              selected.price < value.minAmount
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            key={value.id}
                            onClick={() => {
                              if (selected.price >= value.minAmount) {
                                setSelected({
                                  ...selected,
                                  payment: value.id,
                                  paymentCode: value.code,
                                  paymentName: value.category,
                                  feePayment: (
                                    selected.price * (value.feePercent / 100) +
                                    value.feeFlat
                                  ).toFixed(2),
                                });
                              }
                            }}
                          >
                            <div
                              className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                                selected.payment === value.id
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
                                className={`text-lg font-semibold ${
                                  selected.payment === value.id
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {value.name}
                              </h1>
                              {selected.price < value.minAmount ? (
                                <p
                                  className={`text-xs text-red-600 ${
                                    selected.payment === value.id
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
                                className={`text-sm font-semibold ${
                                  selected.payment === value.id
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
                                  selected.price +
                                    (selected.price * (value.feePercent / 100) +
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
                    {upgradeMembership?.channels
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
                      {upgradeMembership?.channels
                        .filter((item) => item.category === "Bank")
                        .map((value) => (
                          <div
                            className={`w-full h-auto ring-offset-secondary/80 rounded-lg flex flex-col lg:flex-row items-center p-4 justify-center gap-4 hover:cursor-pointer ${
                              selected.payment === value.id
                                ? "bg-seventh ring-2 ring-seventh ring-offset-4 "
                                : "bg-white"
                            } ${
                              selected.price < value.minAmount
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            key={value.id}
                            onClick={() => {
                              if (selected.price >= value.minAmount) {
                                setSelected({
                                  ...selected,
                                  payment: value.id,
                                  paymentCode: value.code,
                                  paymentName: value.category,
                                  feePayment: (
                                    selected.price * (value.feePercent / 100) +
                                    value.feeFlat
                                  ).toFixed(2),
                                });
                              }
                            }}
                          >
                            <div
                              className={`w-24 h-16 lg:w-50 lg:h-18 overflow-hidden flex justify-center ${
                                selected.payment === value.id
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
                                className={`text-lg font-semibold ${
                                  selected.payment === value.id
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {value.name}
                              </h1>
                              {selected.price < value.minAmount ? (
                                <p
                                  className={`text-xs text-red-600 ${
                                    selected.payment === value.id
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
                                className={`text-sm font-semibold ${
                                  selected.payment === value.id
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
                                  selected.price +
                                    (selected.price * (value.feePercent / 100) +
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
                    {upgradeMembership?.channels
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
            </div>
          )}
        </div>
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
            <p className="text-sm text-white">
              Rp. {selected.price.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">
              Sistem Pembayaran
            </h1>
            <p className="text-sm text-white">
              {selected.paymentName ? selected.paymentName : "Belum dipilih"}
            </p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-sm text-white font-semibold">
              Total Pembayaran
            </h1>
            <p className="text-sm text-white">
              {selected.price !== null || selected.feePayment !== null
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    Number(selected.price) + Number(selected.feePayment)
                  )
                : "Rp 0"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => upgradeMember()}
        className="w-full h-10 bg-seventh ring-2 ring-offset-0 ring-seventh text-white hover:ring-offset-secondary hover:ring-offset-2 rounded-lg transition-all duration-300"
      >
        Order Sekarang
      </button>
    </div>
  );
};

export default Membership;
