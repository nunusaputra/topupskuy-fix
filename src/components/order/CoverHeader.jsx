import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoChatbubble, IoCheckmarkCircle } from "react-icons/io5";
import cover from "../../assets/images/cover.jpg";
import coverBottom from "../../assets/images/cover-bottom.png";

const CoverHeader = ({ data }) => {
  return (
    <div className="relative w-full h-80 xl:h-[35rem] mb-10 flex flex-col overflow-hidden">
      {/* Cover Background */}
      <div className="w-full h-[12.5rem] bg-amber-300 xl:h-[26rem] overflow-hidden">
        <img
          src={cover}
          alt=""
          className="w-full h-full object-cover object-top "
        />
      </div>

      {/* Cover Content */}
      <div className="relative w-full bg-slate-600/80 h-[7.5rem] xl:h-40">
        <div className="absolute -bottom-20 left-40 md:left-[10.5rem] lg:left-[13.5rem] xl:-bottom-11 xl:left-[26rem] w-full h-[12.5rem] z-10 py-2 flex flex-col gap-3">
          <div className="">
            <h1 className="text-white text-xl font-bold">{data.name}</h1>
            <h1 className="text-white text-md">{data.publisher}</h1>
          </div>
          <div className="absolute sm:static top-20 -left-[8.8rem] flex items-center gap-3">
            <div className="flex items-center gap-1">
              <AiFillThunderbolt className="text-sm xl:text-md text-amber-300" />
              <h1 className="text-mini text-xs xl:text-sm text-white font-semibold">
                Proses Instant
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <IoChatbubble className="text-sm xl:text-md text-purple-400" />
              <h1 className="text-mini text-xs xl:text-sm text-white font-semibold">
                Layanan 24/7
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <IoCheckmarkCircle className="text-sm xl:text-md text-blue-400" />
              <h1 className="text-mini text-xs xl:text-sm text-white font-semibold">
                Pembayaran Aman
              </h1>
            </div>
          </div>
        </div>
        <img src={coverBottom} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Profile Image Content */}
      <div className="absolute bottom-14 left-5 md:left-7 w-[7.5rem] h-[7.5rem] lg:w-40 lg:h-40 xl:bottom-10 xl:left-36 bg-red-500 xl:w-60 xl:h-60 rounded-xl overflow-hidden shadow-2xl">
        <img src={data.image} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default CoverHeader;
