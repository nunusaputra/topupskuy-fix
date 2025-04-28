import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import Aurora from "../animation/aurora/Aurora";
import { color } from "framer-motion";

const Heroimages = (props) => {
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

  const minMetadata = (() => {
    const original = props.metadata || [];
    if (original.length >= 5) return original;
    const result = [];
    while (result.length < 5) {
      result.push(original[result.length % original.length]);
    }
    return result;
  })();

  return (
    <section>
      <Aurora
        colorStops={[
          auroraColors[0],
          auroraColors[1],
          auroraColors[2],
        ]}
        blend={0.5}
        amplitude={1.3}
        speed={1.5}
      />

      <div className="container flex flex-col relative py-4 overflow-hidden">
        {minMetadata?.length > 0 && (
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
              {minMetadata?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="rounded-lg overflow-hidden aspect-[3/1]"
                >
                  <button>
                    <img
                      src={image?.asset.path}
                      alt={`Image ${index + 1}`}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Heroimages;
