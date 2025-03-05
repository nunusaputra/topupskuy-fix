import React, { useEffect, useState } from "react";
import { dataList } from "../../services";
import ShinyText from "../animation/shiny-text/ShinyText";
import { IoGameController, IoSearchOutline } from "react-icons/io5";

const MainContent = () => {
  const [size, setSize] = useState({
    min: 0,
    max: 0,
    desc: 20,
  });

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 360 && window.innerWidth < 500) {
        setSize({
          min: 15,
          max: 12,
          desc: 15,
        });
      } else if (window.innerWidth >= 500 && window.innerWidth < 768) {
        setSize({
          min: 15,
          max: 13,
        });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setSize({
          min: 15,
          max: 15,
        });
      } else if (window.innerWidth >= 1280) {
        setSize({
          min: 30,
          max: 20,
        });
      } else {
        setSize({
          min: 12,
          max: 10,
          desc: 15,
        });
      }
    };

    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <div className="w-full p-4 md:px-8 md:py-6 bg-slate-900/80 backdrop-blur-4xl rounded-xl flex flex-col gap-20 mb-[10rem]">
      {/* Games */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
          <div className="flex gap-2">
            <IoGameController className="text-2xl md:text-3xl text-purple-300 mt-[0.1rem]" />
            <h1 className="text-lg md:text-2xl text-white font-semibold mb-2">
              Games
            </h1>
          </div>
          <label
            htmlFor=""
            className="relative block w-full sm:w-[50%] lg:w-[30%]"
          >
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoSearchOutline className="w-5 h-5" />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Search for anything..."
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-purple-500 rounded-md py-2 pl-9 pr-3 shadow-custom focus:outline-none sm:text-sm"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-7">
          {dataList.map((item) => (
            <a href={`/order/${item.id}`} key={item.id}>
              <div className="w-[100%] h-[12.5] md:h-[16.5rem] flex flex-col bg-[#060911] rounded-lg ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:rotate-3 hover:ring-offset-[#060911] hover:cursor-pointer overflow-hidden">
                <div className="w-full h-[8.8rem] md:h-[12.5rem] bg-red-500">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-16 bg-purple-500/20 px-2 py-1 flex flex-col">
                  <h1 className="text-white text-md sm:text-lg font-bold">
                    {item.name.length > size.min
                      ? `${item.name.substring(0, size.max)}...`
                      : item.name}
                  </h1>
                  <h1 className="text-white text-sm">
                    {item.publisher.length > size.desc
                      ? `${item.publisher.substring(0, size.desc)}...`
                      : `${item.publisher}`}
                  </h1>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center">
          <ShinyText
            text="Show more"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
