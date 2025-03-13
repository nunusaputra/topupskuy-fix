import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoChatbubble, IoCheckmarkCircle } from "react-icons/io5";
import cover from "../../assets/images/cover.jpg";
import coverBottom from "../../assets/images/cover-bottom.png";

const CoverHeader = ({ data, features }) => {
  return (
    <div className="relative w-full h-[21rem] xl:h-[35rem] mb-10 flex flex-col overflow-hidden">
      <div className="w-full h-[12.5rem] bg-amber-300 xl:h-[26rem] overflow-hidden">
        <img
          src={cover}
          alt=""
          className="w-full h-full object-cover object-top "
        />
      </div>

      {/* Cover Content */}
      <div className="relative w-full bg-fourth/80 h-[8.5rem] xl:h-40">
        <div className="absolute -bottom-16 left-40 md:left-[10.5rem] lg:left-[13.5rem] xl:-bottom-11 xl:left-[26rem] w-full h-[12.5rem] z-10 py-2 flex flex-col gap-3">
          <div className="">
            <h1 className="text-white text-xl font-bold">{data.title}</h1>
            <h1 className="text-white text-md">{data.sub_title}</h1>
          </div>
<div className="absolute top-[4.5rem] -left-36 sm:top-20 md:static 
                        md:-left-[8.8rem] flex flex-wrap md:flex-nowrap md:justify-start
                        items-center md:text-start w-[90%] md:w-full gap-2 md:gap-3">
            {features?.filter((x) => x.active === true).map((item, index) => (
              <h1 key={index} className="text-mini text-zs xl:text-sm text-white font-semibold">
                {item.feature.name} <span className="mx-2 ml-2 mr-0">{index !== features.length - 1 && " - "}</span>
              </h1>
            ))}
          </div>
        </div>
        <img src={coverBottom} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Profile Image Content */}
      <div className="absolute bottom-20 left-5 md:left-7 w-[7.5rem] h-[7.5rem] lg:w-40 lg:h-40 xl:bottom-10 xl:left-36 bg-red-500 xl:w-60 xl:h-60 rounded-xl overflow-hidden shadow-2xl">
<img src={data.logo.path} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default CoverHeader;
