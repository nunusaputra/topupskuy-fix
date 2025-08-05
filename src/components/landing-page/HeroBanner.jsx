import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import Aurora from "../animation/aurora/Aurora";

const Heroimages = ({ metadata, isLoading }) => {
  const [auroraColors, setAuroraColors] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const storedColors = JSON.parse(localStorage.getItem("theme-colors"));
    if (storedColors != null) {
      setColors(storedColors);
    }
  }, []);

  useEffect(() => {
    if (colors.length > 0) {
      const auroraColors = colors
        .filter((color) => color.id.startsWith("AURORA_ANIMATION_COLOR_"))
        .map((color) => color.value_);

      setAuroraColors(auroraColors);
    }
  }, [colors]);

  const images = (() => {
    const bannerImages =
      metadata?.filter((item) => item.isActive && item.asset?.path) || [];

    const result = [];
    const originalLength = bannerImages.length;

    if (originalLength === 0) return [];

    if (originalLength >= 5) return bannerImages.map((item) => item.asset.path);

    while (result.length < 5) {
      const index = result.length % originalLength;
      result.push(bannerImages[index].asset.path);
    }

    return result;
  })();

  return (
    <section>
      <div className="">
        <Aurora
          colorStops={[auroraColors[0], auroraColors[1], auroraColors[2]]}
          blend={0.5}
          amplitude={1.3}
          speed={1.5}
        />
      </div>

      <div className="container flex flex-col relative py-4 overflow-hidden">
        {isLoading ? (
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
        ) : (
          images?.length > 0 && (
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
          )
        )}
      </div>
    </section>
  );
};

export default Heroimages;
