import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import Aurora from "../animation/aurora/Aurora";

const HeroBanner = () => {
  const images = [
    "https://sin1.contabostorage.com/b1d79b8bbee7475eab6c15cd3d13cd4d:topupgamestore/p/1737876094r_web_joki.webp",
    "https://sin1.contabostorage.com/b1d79b8bbee7475eab6c15cd3d13cd4d:topupgamestore/p/1731135243187.webp",
    "https://sin1.contabostorage.com/b1d79b8bbee7475eab6c15cd3d13cd4d:topupgamestore/p/1738575586499.webp",
    "https://sin1.contabostorage.com/b1d79b8bbee7475eab6c15cd3d13cd4d:topupgamestore/p/1733896979016.webp",
    "https://sin1.contabostorage.com/b1d79b8bbee7475eab6c15cd3d13cd4d:topupgamestore/p/1739005182r_kishin_densetsu_(2).webp",
    "https://sin1.contabostorage.com/b1d79b8bbee7475eab6c15cd3d13cd4d:topupgamestore/p/1737290126r_web_FF_x_Naruto.webp",
  ];

  return (
    <section>
      <Aurora
        colorStops={["#3A29FF", "#9333ea", "#7e22ce"]}
        blend={0.5}
        amplitude={1.3}
        speed={1.5}
      />

      <div className="flex flex-col relative py-4 overflow-hidden">
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
            {images.map((image, index) => (
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
      </div>
    </section>
  );
};

export default HeroBanner;
