import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { cortesDePelo } from "../../utils/helpers";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
export default function Inicio() {


  return (
    <main className="bg-black z-50 ">
      <section className="inicio h-screen bg-inicio bg-cover bg-center">
        <article className="w-full h-full bg-gradient-to-b from-black/80 to-black/50  pt-[72px]">
          <div className="flex flex-col justify-center items-center gap-y-8 pt-20">
            <h1 className="font-bold text-[64px] leading-[78px] text-center text-white">Tu estilo, nuestra <br />
              <span className="text-[96px] leading-[117px]">Pasión</span>
            </h1>
            <p className="w-[846px] h-[52px] mx-auto font-light text-white text-base text-center ">Nuestros expertos barberos se apasionan por ayudarte a encontrar el estilo de cabello y barba que mejor te represente. Con nuestra atención personalizada y técnica profesional, te garantizamos un look que reflejará tu personalidad y te hará sentir seguro y atractivo.</p>
            <Link
              to='/turnos'
              className="
                    w-[347px] h-[55px] text-center mt-10
                    py-[10px] px-4 bg-yellow-400 text-lg font-bold uppercase 
                    hover:bg-black hover:text-yellow-400 
                    transition-all duration-300"
            >
              ¡Quiero reservar un turno!
            </Link>
          </div>
        </article>
        {/*
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {  
              cortesDePelo.map( (corte, i) =>
              <SwiperSlide key={i}><img  src={corte.img} alt="/" /></SwiperSlide>
              )
          }         
        </Swiper> */}
      </section>

    </main>
  );
}


