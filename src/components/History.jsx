import React from "react";
import pattern from "../assets/images/pattern.png";
import { MdHistory } from "react-icons/md";
import { historyPayment } from "../services";
import { FaRegCreditCard } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const History = () => {
  return (
    <div className="container">
      <section className="">
        <div className="bg-secondary p-4 md:px-8 md:py-6 bg-secondary/80 backdrop-blur-4xl rounded-xl">
          <div className="w-full mb-5 flex items-center gap-2">
            <MdHistory className="text-2xl text-white" />
            <h1 className="text-xl font-bold text-white">Riwayat Pesanan</h1>
          </div>
          {historyPayment.map((item) => (
            <div
              className="relative w-full min-h-[7.5rem] bg-sixth/40 rounded-lg ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:ring-offset-secondary flex flex-col xl:flex-row px-4 py-2 gap-2 mb-8 hover:cursor-pointer overflow-hidden"
              key={item.id}
            >
              <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-8 z-20">
                <div className="w-full xl:w-[40%] flex items-center justify-between border-b-2 border-white md:border-none pb-2 md:pb-0">
                  <div className="w-[35%] sm:w-[25%] md:w-[45%] lg:w-[35%] h-20 md:h-28 bg-red-500 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[60%] sm:w-[72%] md:w-[50%] lg:w-[60%] flex flex-col items-start gap-1 md:gap-2 xl:gap-3">
                    <h1 className="text-sm xl:text-lg font-bold text-white">
                      {item.paket}
                    </h1>
                    <h1 className="text-sm xl:text-lg text-white">
                      {item.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <FaRegCreditCard className="text-sm xl:text-lg text-white" />
                      <h1 className="text-sm text-white">
                        {item.paymentMethod}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-[60%] h-full">
                  <div className="flex flex-col items-end gap-2 xl:gap-3 xl:pt-2">
                    <h1 className="text-xs font-semibold xl:text-lg text-white">
                      ML-0000000367-X16ENPDZGG4OGUC
                    </h1>
                    <h1 className="text-xs xl:text-[16px] text-white">
                      {item.date}
                    </h1>
                    <div
                      className="px-4 py-1 text-sm rounded-md font-semibold"
                      style={{ backgroundColor: `${item.color}` }}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern Background */}
              <div className="absolute w-full h-full top-0 left-0 opacity-40">
                <img
                  src={pattern}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-400 bg-slate-800 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <BiChevronLeft aria-hidden="true" className="size-5" />
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <BiChevronRight aria-hidden="true" className="size-5" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
