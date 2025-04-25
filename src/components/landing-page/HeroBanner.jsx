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

      <div className="flex flex-col relative py-4 overflow-hidden">
        {images?.length > 0 && (
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
