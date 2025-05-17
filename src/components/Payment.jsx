import React, { useState, useEffect, useRef, useMemo } from "react";
import coverBottom from "../assets/images/cover-bottom.png";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPurchaseDetail, fetchUpgradeTopupDetail } from "../services";
import Canceled from "../assets/images/canceled.png";
import Expired from "../assets/images/expired.png";
import Failed from "../assets/images/failed.png";
import Paid from "../assets/images/paid.png";
import Pending from "../assets/images/pending.png";
import Processing from "../assets/images/processing.png";
import Refunded from "../assets/images/refund.png";
import Success from "../assets/images/success2.png";

const Payment = () => {
  const { orderId } = useParams();
  const qrCodeRef = useRef(null);

  const [expiredDate, setExpiredDate] = useState();
  const [showPayment, setShowPayment] = useState(true);
  const [showInstruction, setShowInstruction] = useState(true);
  const [copied, setCopied] = useState(false);

  const nickname = localStorage.getItem("nickname")
    ? localStorage.getItem("nickname")
    : "-";

  const statusImages = {
    Canceled,
    Expired,
    Failed,
    Paid,
    Pending,
    Processing,
    Refunded,
    Success,
  };

  const result = orderId.split("-")[0];

  const { data: purchase } = useQuery({
    queryKey: ["data", orderId],
    queryFn: orderId
      ? result === "UPGRADE" || result === "TOPUP"
        ? () => fetchUpgradeTopupDetail(orderId)
        : () => fetchPurchaseDetail(orderId)
      : () => Promise.resolve(null),
    enabled: !!orderId,
    select: (data) => {
      if (!data) return null;

      const normalizedData =
        result === "UPGRADE" || result === "TOPUP"
          ? data
          : {
            ...data.paymentDTO,
            trxFFAttributePurchase:
              data.trxFFAttributePurchase?.map((attr) => attr.value_) || [],
          };

      return normalizedData;
    },
  });

  const imageSrc = useMemo(
    () => statusImages[purchase?.status] || null,
    [purchase?.status]
  );

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const expiryTime = new Date(purchase?.expiredDate).getTime();
    const difference = expiryTime - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const handleCopy = (paymentNumber) => {
    if (paymentNumber) {
      navigator.clipboard
        .writeText(paymentNumber)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset setelah 2 detik
        })
        .catch((err) => window.alert(err));
    }
  };

  const download = () => {
    const imageUrl = qrCodeRef.current.src;
    const filename = "qr_code.png";

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => alert("Error downloading the image:", error));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [purchase?.expiredDate]);

  return (
    <div className="min-h-screen">
      {/* Payment Information */}
      {purchase && (
        <div className="container">
          <section className="flex flex-col gap-4">
            <div className="w-full min-h-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="flex flex-col gap-6">
                {/* Informasi Akun */}
                <div className="relative w-full min-h-50 rounded-lg flex flex-col gap-4 group hover:cursor-pointer bg-fourth_opacity_one backdrop-blur-2xl ring-2 ring-slate-700 overflow-hidden">
                  {result !== "UPGRADE" && result !== "TOPUP" ? (
                    <>
                      <div className="w-full h-full flex gap-2 items-center z-20 p-4">
                        <div className="w-[50%] h-28 sm:w-[40%] sm:h-[7.5rem] rounded-xl overflow-hidden flex flex-col ring-2 ring-slate-600 shadow-lg shadow-slate-950">
                          <div className="w-full h-full bg-amber-400 group-hover:scale-110 transition-all duration-200">
                            <img
                              src={purchase?.path}
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
                          ) : (
                            ""
                          )}
                          {purchase?.trxFFAttributePurchase?.[0] ? (
                            <div className="flex items-center">
                              <h1 className="w-[35%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                                User ID
                              </h1>
                              <h1 className="w-[65%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                                : {purchase?.trxFFAttributePurchase?.[0] ?? "-"}
                              </h1>
                            </div>
                          ) : null}

                          {purchase?.trxFFAttributePurchase?.[1] ? (
                            <div className="flex items-center">
                              <h1 className="w-[35%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                                Zone ID
                              </h1>
                              <h1 className="w-[65%] sm:w-[50%] text-xs sm:text-[15px] text-white font-medium">
                                : {purchase?.trxFFAttributePurchase?.[1] ?? "-"}
                              </h1>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

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
                  className="w-full h-10 bg-fourth_opacity_one backdrop-blur-2xl rounded-lg flex justify-between items-center px-4 hover:cursor-pointer"
                  onClick={() => setShowPayment(!showPayment)}
                >
                  <h1 className="text-sm sm:text-[15px] text-white font-semibold">
                    Rincian Pembayaran
                  </h1>
                  <i
                    className={`bi bi-chevron-down text-white ${showPayment && "rotate-180"
                      } transition-all duration-300`}
                  />
                </div>

                {/* Konten Rincian Pembayaran */}
                {showPayment && (
                  <div className="w-full min-h-10 bg-fourth_opacity_one backdrop-blur-2xl rounded-lg flex flex-col p-6 gap-6">
                    {result !== "UPGRADE" && result !== "TOPUP" ? (
                      <>
                        <div className="w-full flex justify-between">
                          <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                            Produk
                          </h1>
                          <h1 className="text-white text-sm sm:text-[15px] font-medium">
                            {purchase?.title}
                          </h1>
                        </div>
                        <div className="w-full flex justify-between">
                          <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                            Item
                          </h1>
                          <h1 className="text-white text-sm sm:text-[15px] font-medium">
                            {purchase?.name}
                          </h1>
                        </div>
                        <div className="w-full flex justify-between">
                          <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                            Harga
                          </h1>
                          <h1 className="text-white text-sm sm:text-[15px] font-medium">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(purchase?.price)}
                          </h1>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full flex justify-between">
                          <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                            Harga
                          </h1>
                          <h1 className="text-white text-sm sm:text-[15px] font-medium">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(purchase?.nominal)}
                          </h1>
                        </div>
                      </>
                    )}

                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Biaya Tambahan
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(purchase?.fee)}
                      </h1>
                    </div>
                    <div className="w-full flex justify-between">
                      <h1 className="text-white text-sm sm:text-[15px] font-semibold">
                        Kode Unik
                      </h1>
                      <h1 className="text-white text-sm sm:text-[15px] font-medium">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(purchase?.uniqueCode)}
                      </h1>
                    </div>
                  </div>
                )}

                {/* Rincian Pembayaran */}
                <div className="w-full h-16 bg-fourth_opacity_one backdrop-blur-2xl rounded-lg flex justify-between items-center px-4">
                  <h1 className="text-sm sm:text-[15px] text-white font-bold">
                    Total Pembayaran
                  </h1>
                  <h1 className="text-sm sm:text-[15px] text-white font-bold">
                    {result !== "UPGRADE" && result !== "TOPUP" ? (
                      <>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(purchase?.totalPrice)}
                      </>
                    ) : (
                      <>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(purchase?.total)}
                      </>
                    )}
                  </h1>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="bg-fourth_opacity_one p-6 backdrop-blur-2xl w-full rounded-lg flex flex-col gap-4">
                <div>
                  <h1 className="text-sm sm:text-[15px] text-white font-semibold">
                    Metode Pembayaran
                  </h1>
                  <h1 className="text-sm sm:text-[15px] text-white font-bold">
                    {purchase?.paymentMethod}
                  </h1>
                </div>

                {/* Informasi Pembayaran */}
                <div className="flex flex-col gap-3 border-b-2 border-white pb-5">
                  <div className="flex flex-col sm:flex-row items-center">
                    <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                      Nomor Pesanan
                    </h1>
                    <h1 className="w-full sm:w-[65%] text-sm sm:text-[15px] text-white font-semibold">
                      {purchase?.id}
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center">
                    <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                      Status Pesanan
                    </h1>
                    <div className="w-full sm:w-[65%]">
                      <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                        {purchase?.status}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center">
                    <h1 className="w-full sm:w-[35%] text-sm sm:text-[15px] text-white">
                      Tanggal Pembelian
                    </h1>
                    <h1 className="w-full sm:w-[65%] text-sm sm:text-[15px] text-white font-semibold">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(purchase?.purchaseDate))}
                    </h1>
                  </div>
                </div>

                {result !== "UPGRADE" && result !== "TOPUP" ? (
                  <>
                    <div className="w-full">
                      {purchase?.status === "Unpaid" ? (
                        <>
                          {(purchase?.categoryPayment === "QRIS" ||
                            purchase?.categoryPayment === "Bank") && (
                              <div className="w-full min-h-[11.5rem] flex flex-col gap-3 items-center overflow-hidden">
                                <div className="w-[40%] p-2 h-full rounded-lg bg-white">
                                  {purchase?.paymentNumber ? (
                                    <img
                                      ref={qrCodeRef}
                                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(purchase.paymentNumber)}`}
                                      alt="QR Code"
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-gray-400">Loading QR Code...</span>
                                  )}
                                </div>
                                <button
                                  className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                                  onClick={() => download()}
                                >
                                  Unduh Kode QR
                                </button>
                              </div>
                            )}

                          {/* E-Wallet Method */}
                          {purchase?.categoryPayment === "E-Wallet" && (
                            <button
                              className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                              onClick={() =>
                                (window.location.href = purchase?.paymentNumber)
                              }
                            >
                              Klik di sini untuk melakukan pembayaran
                            </button>
                          )}

                          {/* VA Method */}
                          {purchase?.categoryPayment === "Virtual Account" && (
                            <div className="w-full flex flex-col items-center justify-center gap-2">
                              <h1 className="text-md font-semibold text-white">
                                {purchase?.paymentNumber}
                              </h1>
                              <button
                                className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                                onClick={() =>
                                  handleCopy(purchase?.paymentNumber)
                                }
                              >
                                {copied ? "Copied!" : "Copy to clipboard"}
                              </button>
                            </div>
                          )}

                          {purchase?.categoryPayment ===
                            "Convenience Store" && (
                              <div className="w-full flex flex-col items-center justify-center gap-2">
                                <h1 className="text-md font-semibold text-white">
                                  {purchase?.paymentNumber}
                                </h1>
                                <button
                                  className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                                  onClick={() =>
                                    handleCopy(purchase?.paymentNumber)
                                  }
                                >
                                  {copied ? "Copied!" : "Copy to clipboard"}
                                </button>
                              </div>
                            )}

                          {purchase?.categoryPayment !== "Saldo" && (
                            <div className="mt-3 w-full h-10 bg-red-500/60 backdrop-opacity-10 ring-2 ring-red-500 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-lg flex items-center justify-center gap-2">
                              <h1 className="text-white text-md font-bold">
                                {String(timeLeft.hours).padStart(2, "0")} Jam
                              </h1>
                              <h1 className="text-white text-md font-bold">
                                {String(timeLeft.minutes).padStart(2, "0")}{" "}
                                Menit
                              </h1>
                              <h1 className="text-white text-md font-bold">
                                {String(timeLeft.seconds).padStart(2, "0")}{" "}
                                Detik
                              </h1>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="w-full min-h-[11.5rem] flex flex-col gap-3 items-center overflow-hidden">
                            <div className="w-[40%] p-2 h-full rounded-lg bg-white">
                              <img
                                src={imageSrc}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full">
                      {purchase?.status === "Unpaid" ? (
                        <>
                          {(purchase?.paymentMethodCategory === "QRIS" ||
                            purchase?.paymentMethodCategory === "Bank") && (
                              <div className="w-full min-h-[11.5rem] flex flex-col gap-3 items-center overflow-hidden">
                                <div className="w-[40%] p-2 h-full rounded-lg bg-white">
                                  <img
                                    ref={qrCodeRef}
                                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${purchase?.paymentNumber}`}
                                    alt=""
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <button
                                  className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                                  onClick={() => download()}
                                >
                                  Unduh Kode QR
                                </button>
                              </div>
                            )}

                          {/* E-Wallet Method */}
                          {purchase?.paymentMethodCategory === "E-Wallet" && (
                            <button
                              className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                              onClick={() =>
                                (window.location.href = purchase?.paymentNumber)
                              }
                            >
                              Klik di sini untuk melakukan pembayaran
                            </button>
                          )}

                          {/* VA Method */}
                          {purchase?.paymentMethodCategory ===
                            "Virtual Account" && (
                              <div className="w-full flex flex-col items-center justify-center gap-2">
                                <h1 className="text-md font-semibold text-white">
                                  {purchase?.paymentNumber}
                                </h1>
                                <button
                                  className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                                  onClick={() =>
                                    handleCopy(purchase?.paymentNumber)
                                  }
                                >
                                  {copied ? "Copied!" : "Copy to clipboard"}
                                </button>
                              </div>
                            )}

                          {purchase?.paymentMethodCategory ===
                            "Convenience Store" && (
                              <div className="w-full flex flex-col items-center justify-center gap-2">
                                <h1 className="text-md font-semibold text-white">
                                  {purchase?.paymentNumber}
                                </h1>
                                <button
                                  className="w-full h-10 py-2 bg-seventh text-sm text-white font-bold shadow-md shadow-slate-900 rounded-lg"
                                  onClick={() =>
                                    handleCopy(purchase?.paymentNumber)
                                  }
                                >
                                  {copied ? "Copied!" : "Copy to clipboard"}
                                </button>
                              </div>
                            )}

                          {purchase?.paymentMethodCategory !== "Saldo" && (
                            <div className="mt-3 w-full h-10 bg-red-500/60 backdrop-opacity-10 ring-2 ring-red-500 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-200 hover:cursor-pointer ring-offset-0 rounded-lg flex items-center justify-center gap-2">
                              <h1 className="text-white text-md font-bold">
                                {String(timeLeft.hours).padStart(2, "0")} Jam
                              </h1>
                              <h1 className="text-white text-md font-bold">
                                {String(timeLeft.minutes).padStart(2, "0")}{" "}
                                Menit
                              </h1>
                              <h1 className="text-white text-md font-bold">
                                {String(timeLeft.seconds).padStart(2, "0")}{" "}
                                Detik
                              </h1>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="w-full min-h-[11.5rem] flex flex-col gap-3 items-center overflow-hidden">
                            <div className="w-[40%] p-2 h-full rounded-lg bg-white">
                              <img
                                src={imageSrc}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Instruction */}
            <div className="flex flex-col gap-3 mt-6">
              <h1 className="text-md text-white font-semibold">
                Instruksi Pembayaran
              </h1>
              <div
                className="w-full h-10 bg-fourth_opacity_one backdrop-blur-2xl rounded-lg flex justify-between items-center px-6 hover:cursor-pointer"
                onClick={() => setShowInstruction(!showInstruction)}
              >
                <p className="text-sm text-white font-semibold">
                  Cara Melakukan Pembayaran
                </p>
                <i
                  className={`bi bi-chevron-up text-xl text-white transition-all duration-300 ${showInstruction && "rotate-180"
                    }`}
                />
              </div>
              {showInstruction && (
                <div className="w-full min-h-14 bg-fourth_opacity_one backdrop-blur-2xl rounded-lg flex items-center px-6">
                  <h1
                    className="text-sm text-white font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: purchase?.instructionDetail,
                    }}
                  ></h1>
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
