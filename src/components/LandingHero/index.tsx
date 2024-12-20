import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const LandingHero = () => {
  const slides = [
    "hero-greenify-1.png",
    "hero-greenfy-2.png",
  ];

  return (
    <section className="w-full bg-gray-50 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {slides.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <img
                src={image}
                alt={`slide-${index}`}
                className="w-full h-auto rounded-lg shadow-lg object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LandingHero;