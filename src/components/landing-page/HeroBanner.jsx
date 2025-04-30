import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import Aurora from "../animation/aurora/Aurora";

const Heroimages = (props) => {
  const colors = JSON.parse(localStorage.getItem("theme-colors"));

  const images =
    props.metadata
      ?.filter((item) => item.id.includes("BANNER"))
      .map((item) => item.value_) || [];

  return (
    <section>
      <div className="">
        <Aurora
          colorStops={[
            colors.aurora_color[0],
            colors.aurora_color[1],
            colors.aurora_color[2],
          ]}
          blend={0.5}
          amplitude={1.3}
          speed={1.5}
        />
      </div>

      <div className="container flex flex-col relative py-4 overflow-hidden">
        {images?.length > 0 ? (
          <div className="p-2 w-full max-h-[28rem] relative ">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[EffectCards, Autoplay]}
              className="w-[90%] h-full object-contain"
            >
              {images?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="rounded-lg overflow-hidden aspect-[3/1]"
                >
                  <button>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      width="400"
                      height="300"
                      className="object-cover w-full h-full"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="mx-auto w-full rounded-lg bg-gray-500 p-4">
            <div className="flex items-center animate-pulse space-x-4">
              <div className="size-56 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-16 rounded-md bg-gray-300"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-16 rounded-md bg-gray-300"></div>
                    <div className="col-span-1 h-16 rounded-md bg-gray-300"></div>
                  </div>
                  <div className="h-32 rounded-md bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Heroimages;
