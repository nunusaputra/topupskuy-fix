import React from "react";
import pattern from "../assets/images/pattern.png";
import { MdHistory } from "react-icons/md";
import { fetchHistory } from "../services";
import { FaRegCreditCard } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const History = () => {
  const { phone } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: history } = useQuery({
    queryKey: ["data", phone],
    queryFn: phone ? () => fetchHistory(phone) : () => Promise.resolve(null),
    staleTime: 21600000,
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((history?.length || 0) / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goto = (id) => {
    window.location.href = `/payment/${id}`
  }

  return (
    <div className="container">
      <section className="">
        <div className="bg-secondary p-4 md:px-8 md:py-6 bg-secondary/80 backdrop-blur-4xl rounded-xl">
          <div className="w-full mb-5 flex items-center gap-2">
            <MdHistory className="text-2xl text-white" />
            <h1 className="text-xl font-bold text-white">Riwayat Pesanan</h1>
          </div>
          {currentItems?.map((item) => (
            <div
              className="relative w-full min-h-[7.5rem] bg-sixth/40 rounded-lg ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:ring-offset-secondary flex flex-col xl:flex-row px-4 py-2 gap-2 mb-8 hover:cursor-pointer overflow-hidden"
              key={item.id}
              onClick={() => goto(item.id)}
            >
              <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-8 z-20">
                <div className="w-full xl:w-[40%] flex items-center justify-between border-b-2 border-white md:border-none pb-2 md:pb-0">
                  <div className="w-[35%] sm:w-[25%] md:w-[45%] lg:w-[35%] h-20 md:h-28 bg-red-500 rounded-lg overflow-hidden">
                    <img
                      src={item.path}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[60%] sm:w-[72%] md:w-[50%] lg:w-[60%] flex flex-col items-start gap-1 md:gap-2 xl:gap-3">
                    <h1 className="text-sm xl:text-lg font-bold text-white">
                      {item.title}
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
                      {item.id}
                    </h1>
                    <h1 className="text-xs xl:text-[16px] text-white">
                      {new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(item.purchaseDate))}
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
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 hover:text-black"}`}
            >
              Previous
            </button>

            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 hover:text-black"}`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
