import React, { useEffect, useState } from "react";
import pattern from "../../assets/images/pattern.png";
import { dataList } from "../../services";
import { FaFire } from "react-icons/fa";

const Popular = () => {
  const [size, setSize] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 360 && window.innerWidth < 500) {
        setSize({
          min: 17,
          max: 18,
        });
      } else if (window.innerWidth >= 500 && window.innerWidth < 768) {
        setSize({
          min: 17,
          max: 15,
        });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setSize({
          min: 15,
          max: 15,
        });
      } else if (window.innerWidth >= 1280 && window.innerWidth < 1440) {
        setSize({
          min: 17,
          max: 18,
        });
      } else if (window.innerWidth >= 1440) {
        setSize({
          min: 30,
          max: 20,
        });
      } else {
        setSize({
          min: 12,
          max: 10,
        });
      }
    };

    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  return (
    <section className="">
      <div className="w-full p-4 md:px-8 md:py-6 bg-secondary_opacity backdrop-blur-4xl rounded-xl">
        <div className="flex gap-2 mb-5">
          <FaFire className="text-2xl text-purple-300 mt-1" />
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl text-white font-semibold mb-2">
              Popular
            </h1>
            <p className="text-xs font-semibold text-white -mt-2">
              Berikut adalah beberapa produk yang populer saat ini.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataList
            .filter((rank) => rank.count_buy >= 1500)
            .map((item) => (
              <a href={`/order/${item.id}`} key={item.id}>
                <div className="relative w-full h-20 md:h-[6.5rem] bg-sixth/40 rounded-lg flex gap-2 p-2 ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-4 hover:ring-offset-[#060911] group hover:cursor-pointer overflow-hidden">
                  <div className="w-28 sm:w-[6.5rem] h-full bg-red-500 rounded-lg group-hover:scale-95 transition-all duration-300 overflow-hidden z-10">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
                    />
                  </div>
                  <div className="w-[17rem] h-full rounded-lg px-2 flex flex-col justify-center z-10">
                    <h1 className="text-white text-md sm:text-lg font-bold">
                      {item.name.length > size.min
                        ? `${item.name.substring(0, size.max)}...`
                        : item.name}
                    </h1>
                    <h1 className="text-white text-sm sm:text-md font-medium">
                      {item.publisher}
                    </h1>
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
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
