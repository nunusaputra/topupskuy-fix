import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import Aurora from "../animation/aurora/Aurora";

const Heroimages = (props) => {
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
        colorStops={["#3A29FF", "#9333ea", "#7e22ce"]}
        blend={0.5}
        amplitude={1.3}
        speed={1.5}
      />

      <div className="flex flex-col relative py-4 overflow-hidden">
        {minMetadata?.length > 0 && (
          <div className="aspect-[3.3/1] relative ">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[EffectCards, Autoplay]}
              className="w-[85%] xl:w-[80%] h-full"
            >
              {minMetadata?.map((item, index) => (
                <SwiperSlide key={index} className="rounded-lg overflow-hidden">
                  <button>
                    <img
                      src={item?.asset.path}
                      alt={`Image ${index + 1}`}
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
