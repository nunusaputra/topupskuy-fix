import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import Aurora from "../animation/aurora/Aurora";

const Heroimages = (props) => {
  const images = props.metadata?.filter(item => item.id.includes("BANNER")).map(item => item.value_) || [];

  return (
    <section>
      <Aurora
        colorStops={["#3A29FF", "#9333ea", "#7e22ce"]}
        blend={0.5}
        amplitude={1.3}
        speed={1.5}
      />

      <div className="flex flex-col relative py-4 overflow-hidden">
        {images?.length > 0 && (
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
              {images?.map((image, index) => (
                <SwiperSlide key={index} className="rounded-lg overflow-hidden">
                  <button>
                    <img
                      src={image}
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
