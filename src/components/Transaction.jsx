import React from "react";
import { useState } from "react";

const Transaction = () => {
  const [data, setData] = useState({
    phone: null,
  });

  const submit = () => {
    window.location.href = `/history/${
      data.phone.startsWith("+62") ? data.phone : "+62" + data.phone
    }`;
  };

  return (
    <div className="container">
      <section className="">
        <div className="w-full min-h-30 bg-secondary/80 backdrop-blur-4xl px-4 py-10 rounded-2xl flex items-center justify-center overflow-hidden">
          <div className="w-full min-h-20 flex flex-col items-center gap-10 z-20">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl text-center xl:text-left xl:text-3xl text-white font-bold">
                Cek Invoice Kamu dengan Mudah dan Cepat.
              </h1>
              <p className="text-xs text-center xl:text-left xl:text-md text-white">
                Lihat detail pembelian kamu menggunakan nomor handphone.
              </p>
            </div>
            <div className="w-[100%] md:w-[80%] xl:w-[55%] min-h-30 bg-secondary/60 ring-2 ring-slate-400 shadow-xl shadow-slate-900 rounded-lg p-6 flex flex-col gap-4">
              <h1 className="text-md text-white font-semibold">
                Cari detail pembelian kamu disini
              </h1>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="wa" className="text-sm text-white">
                    No. Whatsapp
                  </label>
                  <div className="flex items-center border bg-white border-gray-300 rounded-lg p-2 w-full overflow-hidden">
                    <span className="mr-2">+62</span>
                    <input
                      type="tel"
                      className="outline-none flex-1 bg-transparent text-sm"
                      placeholder="81234567890"
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => submit()}
                  className="w-full py-2 bg-seventh text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <i class="bi bi-clipboard-check-fill text-white t"></i>
                  <p>Cari Pesanan</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transaction;
