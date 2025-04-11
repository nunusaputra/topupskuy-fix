import React, { useEffect, useRef, useState } from "react";
import { fetchDataMember } from "../../services/index";
import Modal from "../Modal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../../env";

const DetailContent = ({
  data,
  product,
  attributes,
  myItems,
  payment,
  token,
}) => {
  const paymentRef = useRef(null);
  const promoRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const groupedFields = attributes.reduce((acc, attr) => {
    const fieldId = attr.formField.id;

    let existingField = acc.find((item) => item.id === fieldId);

    if (!existingField) {
      existingField = {
        id: fieldId,
        element: attr.formField.type,
        ffId: attr.id,
        name: "",
        placeholder: "",
        type: "text",
      };
      acc.push(existingField);
    }

    existingField[attr.key_] = attr.value_;

    return acc;
  }, []);

  const [show, setShow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openInstruction, setOpenInstruction] = useState(false);

  const [selected, setSelected] = useState({
    itemId: null,
    item: null,
    price: null,
    feePayment: null,
    payment: null,
    paymentName: null,
    phone: null,
    product: product.title,
    productId: product.id,
    userId: null,
    zoneId: null,
    userInputFF: groupedFields[0].ffId,
    zoneInputFF: groupedFields[1]?.ffId ? groupedFields[1].ffId : null,
  });

  const [nickname, setNickname] = useState(null);
  const [isHidden, setIsHidden] = useState(null);

  let isDisabled = true;
  if (groupedFields.length > 1) {
    isDisabled =
      !selected.price ||
      !selected.itemId ||
      !selected.phone ||
      !selected.paymentName ||
      !selected.userId ||
      !selected.zoneId;
  } else if (groupedFields.length === 1) {
    isDisabled =
      !selected.price ||
      !selected.itemId ||
      !selected.phone ||
      !selected.paymentName ||
      !selected.userId;
  } else {
    isDisabled =
      !selected.price ||
      !selected.itemId ||
      !selected.phone ||
      !selected.paymentName;
  }

  const handleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };

  const handleModalSummary = () => {
    setShowModal(true);
    setNickname("Error");

    let url = `${API_URL}/my-product/check-id/${selected.itemId}/${selected.userId}/${selected.zoneId}`;
    if (selected.zoneId === null) {
      url = `${API_URL}/my-product/check-id/${
        selected.itemId
      }?user_id=${encodeURIComponent(selected.userId)}`;
    }
    axios
      .get(url, {
        headers: { "X-TOKEN-AUTH": token },
      })
      .then((response) => {
        if (response.data.code === "SUCCESS") {
          setIsHidden(false);
          setNickname(response.data.data?.name);
          localStorage.setItem("nickname", response.data.data?.name);
        } else if (response.data.code === "INACTIVE") {
          setIsHidden(true);
          setNickname("Layanan tidak tersedia");
        } else if (response.data.code === "USER_ID_EMPTY") {
          setIsHidden(false);
          setNickname("ID tidak ditemukan");
        } else if (response.data.code === "CATEGORY_NOT_FOUND") {
          setIsHidden(false);
          setNickname("Category tidak ditemukan");
        } else if (response.data.code === "ERROR") {
          setIsHidden(false);
          setNickname("Error");
        } else if (response.data.code === "INVALID_USER_ID_OR_ADDITIONAL_ID") {
          setIsHidden(false);
          setNickname("Error");
        } else if (response.data.code === "URL_NOT_FOUND") {
          setIsHidden(true);
          setNickname("-");
        } else {
          setIsHidden(true);
          setNickname("-");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const order = () => {
    let object = null;
    const phoneNumber = selected.phone
      ? selected.phone.startsWith("62")
        ? `+${selected.phone}`
        : `+62${selected.phone}`
      : "";

    if (selected.zoneInputFF !== null) {
      object = {
        myItem: selected.itemId,
        number: phoneNumber,
        payment: selected.paymentCode,
        user: localStorage.getItem("unique-code")
          ? localStorage.getItem("unique-code")
          : 0,
        formField: [
          {
            value: selected.userId,
            id: selected.userInputFF,
          },
          {
            value: selected.zoneId,
            id: selected.zoneInputFF,
          },
        ],
      };
    } else {
      object = {
        myItem: selected.itemId,
        number: phoneNumber,
        payment: selected.paymentCode,
        user: localStorage.getItem("unique-code")
          ? localStorage.getItem("unique-code")
          : 0,
        formField: [
          {
            value: selected.userId,
            id: selected.userInputFF,
          },
        ],
      };
    }

    axios
      .post(`${API_URL}/order/process-to-app-v2`, JSON.stringify(object), {
        headers: { "X-TOKEN-AUTH": token, "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data !== "goodbye") {
          window.location.href = `/payment/${response.data}`;
        } else {
          window.alert(
            "terjadi kesalahan pada saat order, silahkan kontak admin"
          );
        }
      })
      .catch((error) => {
        window.alert(
          "terjadi kesalahan pada saat order, silahkan kontak admin"
        );
      });
  };

  const setItem = () => {
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setPromo = () => {
    if (promoRef.current) {
      promoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const uniqueCode = localStorage.getItem("unique-code")
    ? localStorage.getItem("unique-code")
    : "";
  const { data: member } = useQuery({
    queryKey: ["uniqueCode", uniqueCode],
    queryFn: () => fetchDataMember(uniqueCode),
    staleTime: 21600000,
    enabled: !!uniqueCode, // Hanya fetch jika uniqueCode tidak null atau undefined
  });

  useEffect(() => {
    if (member && member.phoneNumber) {
      setSelected((prev) => ({
        ...prev,
        phone: member.phoneNumber.startsWith("+62")
          ? member.phoneNumber.slice(3)
          : member.phoneNumber,
      }));
    }
  }, [member]);

  useEffect(() => {
    if (selected.item != null && selected.itemId && selected.price != null) {
      if (paymentRef.current) {
        paymentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selected.item]);

  return (
    <>
      <div className="hidden lg:block lg:w-[35%] lg:min-h-screen">
        <div className="flex flex-col gap-5 lg:overflow-auto lg:sticky lg:top-32">
          <div className="w-full h-20 bg-slate-800 rounded-lg flex items-center px-4 gap-2 overflow-hidden">
            <div className="w-14 h-14 flex items-center justify-center">
              <i class="bi bi-headphones text-4xl text-white" />
            </div>
            <div className="w-full h-14 flex flex-col justify-center">
              <h1 className="text-md text-white font-bold">Butuh Bantuan?</h1>
              <p className="text-sm text-white font-semibold">
                Kamu bisa hubungi admin disini.
              </p>
            </div>
          </div>
          <div
            className="w-full h-10 bg-slate-800 rounded-lg flex items-center justify-between px-4 gap-2 hover:cursor-pointer"
            onClick={() => setOpenInstruction(!openInstruction)}
          >
            <p className="text-sm text-white">Tata cara topup</p>
            <i
              className={`bi bi-chevron-up text-xl text-white transition-all duration-300 ${
                openInstruction ? "rotate-180" : ""
              }`}
            />
          </div>
          {openInstruction && (
            <div className="w-full bg-slate-800 min-h-[7.5rem] flex flex-col gap-2 rounded-lg overflow-hidden">
              <div className="mb-5">
                <div className="w-full h-8 bg-fourth/30 backdrop-blur-xl px-3 py-2">
                  <h1 className="text-white text-sm font-semibold">
                    CARA TOP UP
                  </h1>
                </div>
                <div className="p-4 text-sm bg-white rounded-md">
                  <ol
                    className="list-decimal space-y-2 pl-5 mt-5"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></ol>
                </div>
              </div>
            </div>
          )}
          <div className="w-full min-h-20 bg-slate-800 rounded-lg flex flex-col gap-2 px-4 py-3">
            <div className="w-full h-20 flex gap-4 items-center">
              <div className="w-24 h-14 rounded-md overflow-hidden">
                <img
                  src={product.logo.path}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-14 flex flex-col justify-center">
                <p className="text-white text-sm">
                  {selected.item ? selected.item : "Belum dipilih"}
                </p>
              </div>
            </div>
            {groupedFields.length > 1 ? (
              <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
                <div className="flex justify-between">
                  <h1 className="text-white text-md font-semibold">User</h1>
                  <p className="text-white text-md">
                    {selected.userId ? selected.userId : "-"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-white text-md font-semibold">Zone</h1>
                  <p className="text-white text-md">
                    {selected.zoneId ? selected.zoneId : "-"}
                  </p>
                </div>
                <hr className="text-slate-600/60" />
              </div>
            ) : (
              <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
                <div className="flex justify-between">
                  <h1 className="text-white text-md font-semibold">User</h1>
                  <p className="text-white text-md">
                    {selected.userId ? selected.userId : "-"}
                  </p>
                </div>
                <hr className="text-slate-600/60" />
              </div>
            )}
            <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">Nomor Telp</h1>
                <p className="text-white text-md">
                  {selected.phone ? `+62${selected.phone}` : "-"}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">Harga</h1>
                <p className="text-white text-md">
                  {selected.price
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(selected.price)
                    : "Rp 0"}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">
                  Payment Fee
                </h1>
                <p className="text-white text-md">
                  {selected.feePayment
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(selected.feePayment)
                    : "Rp 0"}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">Pembayaran</h1>
                <p className="text-white text-md">
                  {selected.paymentName
                    ? selected.paymentName
                    : "Belum dipilih"}
                </p>
              </div>
              <hr className="text-slate-600/60" />
            </div>
            <div className="w-full h-14 flex items-center justify-between">
              <h1 className="text-lg text-white font-bold">Total Pembayaran</h1>
              <p className="text-orange-400 text-md font-bold">
                {selected.price !== null || selected.feePayment !== null
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(
                      Number(selected.price) + Number(selected.feePayment)
                    )
                  : "Rp 0"}
              </p>
            </div>
          </div>
          <button
            className={`w-full py-2 ${
              isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-seventh"
            } text-white font-semibold shadow-md shadow-slate-900 rounded-lg flex items-center justify-center gap-2`}
            disabled={isDisabled}
            onClick={() => handleModalSummary()}
          >
            <i class="bi bi-bag-check text-white text-xl" />
            <p>Pesan Sekarang!</p>
          </button>
        </div>
      </div>

      <div className="w-full relative lg:w-[65%] mt-6 lg:mt-0 flex flex-col gap-10">
        {data.length > 0 &&
          data?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="w-full min-h-30 bg-slate-800 rounded-lg ring-2 ring-slate-500 shadow-md shadow-slate-900 p-4 flex flex-col gap-4"
                >
                  {item.userInput.id === 1 && item.label !== "" ? (
                    <div key={index} className="flex items-center gap-2">
                      {index === 0 ? (
                        <i className="bi bi-1-circle-fill text-2xl text-orange-500" />
                      ) : index === 1 ? (
                        <i className="bi bi-2-circle-fill text-2xl text-orange-500" />
                      ) : index === 2 ? (
                        <i className="bi bi-3-circle-fill text-2xl text-orange-500" />
                      ) : index === 3 ? (
                        <i className="bi bi-4-circle-fill text-2xl text-orange-500" />
                      ) : index === 4 ? (
                        <i className="bi bi-5-circle-fill text-2xl text-orange-500" />
                      ) : null}
                      <h1 className="text-xl text-white font-semibold">
                        {item.label}
                      </h1>
                    </div>
                  ) : (
                    <div key={index} className="flex items-center gap-2">
                      {index === 1 ? (
                        <i className="bi bi-1-circle-fill text-2xl text-orange-500" />
                      ) : index === 2 ? (
                        <i className="bi bi-2-circle-fill text-2xl text-orange-500" />
                      ) : index === 3 ? (
                        <i className="bi bi-3-circle-fill text-2xl text-orange-500" />
                      ) : index === 4 ? (
                        <i className="bi bi-4-circle-fill text-2xl text-orange-500" />
                      ) : null}
                      <h1 className="text-xl text-white font-semibold">
                        {item.label}
                      </h1>
                    </div>
                  )}

                  {groupedFields.length >= 1 && item.userInput.id === 1 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {groupedFields?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <label
                            htmlFor={item.name}
                            className="text-sm text-white"
                          >
                            {index === 0 ? "User" : "Zone"}
                          </label>
                          {item.element === "Input" ? (
                            <input
                              type={item.type}
                              name={item.name}
                              className="w-full h-9 border border-white/70 bg-transparent rounded-md px-4 py-1 text-white text-sm"
                              onChange={(e) =>
                                setSelected({
                                  ...selected,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              placeholder={item.placeholder}
                            />
                          ) : (
                            <div className="flex flex-col gap-1">
                              <select
                                name={item.name}
                                className="w-full h-9 border border-white/70 bg-slate-800 text-slate-300 rounded-md p-1 text-sm"
                              >
                                <option key={index} value="">
                                  {item.placeholder}
                                </option>
                                {Array.isArray(item.datas)
                                  ? item.datas.map((option, index) => (
                                      <option key={index} value={option.value}>
                                        {option.text}
                                      </option>
                                    ))
                                  : Array.isArray(JSON.parse(item.datas))
                                  ? JSON.parse(item.datas).map(
                                      (option, index) => (
                                        <option
                                          key={index}
                                          value={option.value}
                                        >
                                          {option.text}
                                        </option>
                                      )
                                    )
                                  : null}
                              </select>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}

                  {item.userInput.id === 2 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5">
                      {myItems?.map((item) => (
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
                              item: item.name,
                              price: item.sellPrice,
                            });
                            setItem();
                          }}
                        >
                          <h1 className="text-white text-xs sm:text-sm font-semibold">
                            {item.name}
                          </h1>
                          <p className="text-white text-xs">
                            Rp. {item.sellPrice.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}

                  {selected.price != null && item.userInput.id === 3 ? (
                    <div>
                      {localStorage.getItem("unique-code") !== null && (
                        <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
                          <div
                            className="flex justify-between items-center px-4 py-2"
                            onClick={() => handleShow(1)}
                          >
                            <h1
                              ref={paymentRef}
                              className="text-sm text-white font-semibold"
                            >
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
                              className={`text-lg text-white transform transition-transform duration-300 ${
                                show === 1 ? "rotate-180" : "rotate-0"
                              }`}
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
                                {payment
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
                                          setPromo();
                                          setSelected({
                                            ...selected,
                                            payment: value.id,
                                            paymentCode: value.code,
                                            paymentName: value.name,
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
                                          src={value.icon.path}
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
                                              (selected.price *
                                                (value.feePercent / 100) +
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
                              {payment
                                .filter((item) => item.category === "Saldo")
                                .map((value) => (
                                  <div
                                    className="w-20 h-8 overflow-hidden"
                                    key={value.id}
                                  >
                                    <img
                                      src={value.icon.path}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-3">
                        <div className="w-full min-h-10 bg-fourth/30 backdrop-blur-xl rounded-lg border border-slate-600 flex flex-col overflow-hidden">
                          <div
                            className="flex justify-between items-center px-4 py-2"
                            onClick={() => handleShow(2)}
                          >
                            <h1 className="text-sm text-white font-semibold">
                              QRIS
                            </h1>
                            <span
                              className={`text-lg text-white transform transition-transform duration-300 ${
                                show === 2 ? "rotate-180" : "rotate-0"
                              }`}
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
                                {payment
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
                                          setPromo();
                                          setSelected({
                                            ...selected,
                                            payment: value.id,
                                            paymentCode: value.code,
                                            paymentName: value.name,
                                            feePayment: (
                                              selected.price *
                                                (value.feePercent / 100) +
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
                                          src={value.icon.path}
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
                                              (selected.price *
                                                (value.feePercent / 100) +
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
                              {payment
                                .filter((item) => item.category === "QRIS")
                                .map((value) => (
                                  <div
                                    className="w-20 h-8 overflow-hidden"
                                    key={value.id}
                                  >
                                    <img
                                      src={value.icon.path}
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
                            <h1 className="text-sm text-white font-semibold">
                              E-Wallet
                            </h1>
                            <span
                              className={`text-lg text-white transform transition-transform duration-300 ${
                                show === 3 ? "rotate-180" : "rotate-0"
                              }`}
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
                                {payment
                                  .filter(
                                    (item) => item.category === "E-Wallet"
                                  )
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
                                          setPromo();
                                          setSelected({
                                            ...selected,
                                            payment: value.id,
                                            paymentCode: value.code,
                                            paymentName: value.name,
                                            feePayment: (
                                              selected.price *
                                                (value.feePercent / 100) +
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
                                          src={value.icon.path}
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
                                              (selected.price *
                                                (value.feePercent / 100) +
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
                              {payment
                                .filter((item) => item.category === "E-Wallet")
                                .map((value) => (
                                  <div
                                    className="w-20 h-8 overflow-hidden"
                                    key={value.id}
                                  >
                                    <img
                                      src={value.icon.path}
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
                              className={`text-lg text-white transform transition-transform duration-300 ${
                                show === 4 ? "rotate-180" : "rotate-0"
                              }`}
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
                                {payment
                                  .filter(
                                    (item) =>
                                      item.category === "Virtual Account"
                                  )
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
                                          setPromo();
                                          setSelected({
                                            ...selected,
                                            payment: value.id,
                                            paymentCode: value.code,
                                            paymentName: value.name,
                                            feePayment: (
                                              selected.price *
                                                (value.feePercent / 100) +
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
                                          src={value.icon.path}
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
                                              (selected.price *
                                                (value.feePercent / 100) +
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
                              {payment
                                .filter(
                                  (item) => item.category === "Virtual Account"
                                )
                                .map((value) => (
                                  <div
                                    className="w-20 h-8 overflow-hidden"
                                    key={value.id}
                                  >
                                    <img
                                      src={value.icon.path}
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
                              className={`text-lg text-white transform transition-transform duration-300 ${
                                show === 5 ? "rotate-180" : "rotate-0"
                              }`}
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
                                {payment
                                  .filter(
                                    (item) =>
                                      item.category === "Convenience Store"
                                  )
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
                                          setPromo();
                                          setSelected({
                                            ...selected,
                                            payment: value.id,
                                            paymentCode: value.code,
                                            paymentName: value.name,
                                            feePayment: (
                                              selected.price *
                                                (value.feePercent / 100) +
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
                                          src={value.icon.path}
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
                                              (selected.price *
                                                (value.feePercent / 100) +
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
                              {payment
                                .filter(
                                  (item) =>
                                    item.category === "Convenience Store"
                                )
                                .map((value) => (
                                  <div
                                    className="w-20 h-8 overflow-hidden"
                                    key={value.id}
                                  >
                                    <img
                                      src={value.icon.path}
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
                            <h1 className="text-sm text-white font-semibold">
                              Bank
                            </h1>
                            <span
                              className={`text-lg text-white transform transition-transform duration-300 ${
                                show === 6 ? "rotate-180" : "rotate-0"
                              }`}
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
                                {payment
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
                                          setPromo();
                                          setSelected({
                                            ...selected,
                                            payment: value.id,
                                            paymentCode: value.code,
                                            paymentName: value.name,
                                            feePayment: (
                                              selected.price *
                                                (value.feePercent / 100) +
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
                                          src={value.icon.path}
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
                                              (selected.price *
                                                (value.feePercent / 100) +
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
                              {payment
                                .filter((item) => item.category === "Bank")
                                .map((value) => (
                                  <div
                                    className="w-20 h-8 overflow-hidden"
                                    key={value.id}
                                  >
                                    <img
                                      src={value.icon.path}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {item.userInput.id === 4 ? (
                    <div ref={promoRef} className="flex flex-col gap-1">
                      <label htmlFor="kode" className="text-sm text-white">
                        Kode Promo
                      </label>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <input
                          type="text"
                          name="kode"
                          className="lg:col-span-2 w-full h-9 border border-white/70 bg-transparent rounded-md px-4 py-1 text-white text-sm"
                          placeholder="Masukan Kode Promo"
                        />
                        <button className=" bg-seventh py-1 lg:py-0 rounded-lg text-white font-semibold shadow-md shadow-slate-900">
                          Apply Code
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {item.userInput.id === 5 ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full overflow-hidden">
                        <span className="text-white mr-2">+62</span>
                        <input
                          type="number"
                          className="outline-none flex-1 bg-transparent text-white text-sm"
                          value={selected.phone || ""}
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              phone: e.target.value,
                            })
                          }
                          placeholder="81234567890"
                          disabled={!!member}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="">
                    <p className="text-xs sm:text-sm text-slate-400">
                      {item.instruction || ""}
                    </p>
                  </div>
                </div>
              </>
            );
          })}

        <Modal
          open={open}
          close={() => setOpen(false)}
          title="Cara Menemukan ID"
        >
          <h1 className="text-sm text-white">
            Untuk mengetahui User ID Kamu, silahkan klik menu profile dibagian
            kiri atas pada menu utama game. User ID akan terlihat dibagian bawah
            Nama karakter game Kamu. Silahkan masukan User ID dan Server ID Kamu
            untuk menyelesaikan transaksi.
          </h1>
        </Modal>
      </div>

      <div className="lg:hidden">
        <div className="flex flex-col gap-5 lg:overflow-auto lg:sticky lg:top-32">
          <div className="w-full h-20 bg-slate-800 rounded-lg flex items-center px-4 gap-2 overflow-hidden">
            <div className="w-14 h-14 flex items-center justify-center">
              <i class="bi bi-headphones text-4xl text-white" />
            </div>
            <div className="w-full h-14 flex flex-col justify-center">
              <h1 className="text-md text-white font-bold">Butuh Bantuan?</h1>
              <p className="text-sm text-white font-semibold">
                Kamu bisa hubungi admin disini.
              </p>
            </div>
          </div>
          <div
            className="w-full h-10 bg-slate-800 rounded-lg flex items-center justify-between px-4 gap-2 hover:cursor-pointer"
            onClick={() => setOpenInstruction(!openInstruction)}
          >
            <p className="text-sm text-white">Tata cara topup</p>
            <i
              className={`bi bi-chevron-up text-xl text-white transition-all duration-300 ${
                openInstruction ? "rotate-180" : ""
              }`}
            />
          </div>
          {openInstruction && (
            <div className="w-full bg-slate-800 min-h-[7.5rem] flex flex-col gap-2 rounded-lg overflow-hidden">
              <div className="mb-5">
                <div className="w-full h-8 bg-fourth/30 backdrop-blur-xl px-3 py-2">
                  <h1 className="text-white text-sm font-semibold">
                    CARA TOP UP
                  </h1>
                </div>
                <div className="p-4 text-sm bg-white rounded-md">
                  <ol
                    className="list-decimal space-y-2 pl-5 mt-5"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></ol>
                </div>
              </div>
            </div>
          )}
          <div className="w-full min-h-20 bg-slate-800 rounded-lg flex flex-col gap-2 px-4 py-3">
            <div className="w-full h-20 flex gap-4 items-center">
              <div className="w-24 h-14 rounded-md overflow-hidden">
                <img
                  src={product.logo.path}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-14 flex flex-col justify-center">
                <p className="text-white text-sm">
                  {selected.item ? selected.item : "Belum dipilih"}
                </p>
              </div>
            </div>
            {groupedFields.length > 1 ? (
              <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
                <div className="flex justify-between">
                  <h1 className="text-white text-md font-semibold">User</h1>
                  <p className="text-white text-md">
                    {selected.userId ? selected.userId : "-"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-white text-md font-semibold">Zone</h1>
                  <p className="text-white text-md">
                    {selected.zoneId ? selected.zoneId : "-"}
                  </p>
                </div>
                <hr className="text-slate-600/60" />
              </div>
            ) : (
              <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
                <div className="flex justify-between">
                  <h1 className="text-white text-md font-semibold">User</h1>
                  <p className="text-white text-md">
                    {selected.userId ? selected.userId : "-"}
                  </p>
                </div>
                <hr className="text-slate-600/60" />
              </div>
            )}
            <div className="w-full min-h-[5.5rem] flex flex-col gap-2">
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">Nomor Telp</h1>
                <p className="text-white text-md">
                  {selected.phone ? `+62${selected.phone}` : "-"}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">Harga</h1>
                <p className="text-white text-md">
                  {selected.price
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(selected.price)
                    : "Rp 0"}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">
                  Payment Fee
                </h1>
                <p className="text-white text-md">
                  {selected.feePayment
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(selected.feePayment)
                    : "Rp 0"}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="text-white text-md font-semibold">Pembayaran</h1>
                <p className="text-white text-md">
                  {selected.paymentName
                    ? selected.paymentName
                    : "Belum dipilih"}
                </p>
              </div>
              <hr className="text-slate-600/60" />
            </div>
            <div className="w-full h-14 flex items-center justify-between">
              <h1 className="text-lg text-white font-bold">Total Pembayaran</h1>
              <p className="text-orange-400 text-md font-bold">
                {selected.price !== null || selected.feePayment !== null
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(
                      Number(selected.price) + Number(selected.feePayment)
                    )
                  : "Rp 0"}
              </p>
            </div>
          </div>
          <button
            className={`w-full py-2 ${
              isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-seventh"
            } text-white font-semibold shadow-md shadow-slate-900 rounded-lg flex items-center justify-center gap-2`}
            disabled={isDisabled}
            onClick={() => handleModalSummary()}
          >
            <i class="bi bi-bag-check text-white text-xl" />
            <p>Pesan Sekarang!</p>
          </button>
        </div>
      </div>

      <Modal open={showModal} close={() => setShowModal(!showModal)}>
        <div className="w-full min-h-96 flex flex-col gap-2">
          <div className="w-full min-h-48 flex flex-col items-center gap-4 justify-center">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center">
              <i className="bi bi-patch-check-fill w-full h-full text-green-500 relative z-10" />
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
            {!isHidden && (
              <div className="flex items-center px-4">
                <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                  <h1 className="text-xs sm:text-sm text-white">Username</h1>
                </div>
                <div className="w-[60%] flex items-center h-7 sm:h-8">
                  <h1 className="text-xs sm:text-sm text-white">{nickname}</h1>
                </div>
              </div>
            )}
            {groupedFields.length > 1 ? (
              <>
                <div className="flex items-center px-4">
                  <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                    <h1 className="text-xs sm:text-sm text-white">User ID</h1>
                  </div>
                  <div className="w-[60%] flex items-center h-7 sm:h-8">
                    <h1 className="text-xs sm:text-sm text-white">
                      {selected.userId}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center px-4">
                  <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                    <h1 className="text-xs sm:text-sm text-white">Zone ID</h1>
                  </div>
                  <div className="w-[60%] flex items-center h-7 sm:h-8">
                    <h1 className="text-xs sm:text-sm text-white">
                      {selected.zoneId}
                    </h1>
                  </div>
                </div>
              </>
            ) : groupedFields.length === 1 ? (
              <>
                <div className="flex items-center px-4">
                  <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                    <h1 className="text-xs sm:text-sm text-white">User ID</h1>
                  </div>
                  <div className="w-[60%] flex items-center h-7 sm:h-8">
                    <h1 className="text-xs sm:text-sm text-white">
                      {selected.userId}
                    </h1>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="flex items-center px-4">
              <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                <h1 className="text-xs sm:text-sm text-white">Item</h1>
              </div>
              <div className="w-[60%] flex items-center h-7 sm:h-8">
                <h1 className="text-xs sm:text-sm text-white">
                  {selected.item}
                </h1>
              </div>
            </div>
            <div className="flex items-center px-4">
              <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                <h1 className="text-xs sm:text-sm text-white">Product</h1>
              </div>
              <div className="w-[60%] flex items-center h-7 sm:h-8">
                <h1 className="text-xs sm:text-sm text-white">
                  {selected.product}
                </h1>
              </div>
            </div>
            <div className="flex items-center px-4">
              <div className="w-[40%] flex items-center h-7 sm:h-8 ">
                <h1 className="text-xs sm:text-sm text-white">Pembayaran</h1>
              </div>
              <div className="w-[60%] flex items-center h-7 sm:h-8">
                <h1 className="text-xs sm:text-sm text-white">
                  {selected.paymentName}
                </h1>
              </div>
            </div>
          </div>
          <h1 className="text-xs sm:text-sm text-white">
            Jika data diatas sudah benar, klik pesan sekarang.
          </h1>
          <div className="flex items-center gap-2 mt-3 sm:mt-7">
            <button
              className="bg-seventh shadow-md shadow-slate-900 w-full py-2 text-sm text-white rounded-lg"
              disabled={
                nickname === "Error" ||
                nickname === "ID tidak ditemukan" ||
                nickname === "Category tidak ditemukan"
              }
              onClick={() => order()}
            >
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
    </>
  );
};

export default DetailContent;
