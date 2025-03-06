import React, { useEffect, useState } from "react";
import { dataList } from "../../services";
import Marquee from "react-fast-marquee";
import { RiDiscountPercentFill } from "react-icons/ri";
import TrueFocus from "../animation/true-focus/TrueFocus";

const Promo = () => {
  const calculateTime = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);

    const difference = midnight - now;

    return {
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [today, setToday] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-30">
      <div className="w-full p-4 md:px-8 md:py-6 bg-secondary/80 backdrop-blur-4xl rounded-xl">
        {/* Promo Content */}
        <div className="flex items-center gap-7 sm:justify-between">
          <div className="flex items-center gap-5">
            <RiDiscountPercentFill className="text-2xl sm:text-3xl text-purple-300" />
            <TrueFocus
              sentence="PROMO EKSLUSIF"
              manualMode={false}
              blurAmount={5}
              borderColor="#E6D6FF"
              animationDuration={0.5}
              pauseBetweenAnimations={1}
            />
          </div>
          <div className="flex gap-1">
            <div className="w-6 sm:w-10 h-6 sm:h-10 bg-third rounded-md sm:rounded-lg overflow-hidden flex justify-center items-center">
              <h1 className="text-sm sm:text-xl font-bold">{today.hours}</h1>
            </div>
            <div className="text-sm sm:text-xl text-white self-center">:</div>
            <div className="w-6 sm:w-10 h-6 sm:h-10 bg-third rounded-md sm:rounded-lg overflow-hidden flex justify-center items-center">
              <h1 className="text-sm sm:text-xl font-bold">{today.minutes}</h1>
            </div>
            <div className="text-sm sm:text-xl text-white self-center">:</div>
            <div className="w-6 sm:w-10 h-6 sm:h-10 bg-third rounded-md sm:rounded-lg overflow-hidden flex justify-center items-center">
              <h1 className="text-sm sm:text-xl font-bold">{today.seconds}</h1>
            </div>
          </div>
        </div>

        {/* Marquee Content */}
        <div className="w-full flex flex-wrap justify-between items-center gap-2 mt-5">
          <Marquee autoFill pauseOnHover className="">
            {dataList.map((item) => (
              <div
                className="relative w-80 min-h-48 bg-slate-800/40 backdrop-blur-md rounded-xl flex flex-col p-4 gap-2 mr-4 ring-2 ring-purple-300 overflow-hidden"
                key={item.id}
              >
                <div className="flex flex-col">
                  <h1 className="text-white text-md sm:text-lg font-bold">
                    {item.topup_package}
                  </h1>
                  <h1 className="text-white text-xs sm:text-sm font-medium">
                    {item.name}
                  </h1>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="w-[50%] rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-16 object-cover"
                    />
                  </div>
                  <div className="w-[17rem] p-2 flex flex-col gap-1 rounded-lg">
                    <p className="text-white text-md font-bold">
                      Rp. {(item.price * 0.3).toLocaleString()}
                    </p>
                    <p className="text-white text-sm line-through">
                      Rp. {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="absolute flex justify-end items-center px-4 bottom-0 left-0 w-full h-10 bg-slate-950/50 backdrop-blur-xl">
                  <div className="min-w-20 px-2 py-1 bg-purple-200 rounded-lg">
                    <h1 className="text-xs font-semibold">
                      Hemat {(item.price - item.price * 0.3).toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      {/* Neon Design */}
      <div className="absolute -bottom-1 md:-bottom-5 right-5 w-[90%] md:w-[95%] h-[6.5rem] bg-sixth/30 blur-xl rounded-md -z-50"></div>
    </div>
  );
};

export default Promo;
