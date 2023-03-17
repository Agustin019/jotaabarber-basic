import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { cortesDePelo } from "../utils/helpers";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
export default function Inicio() {
  

  return (
    <main className="bg-black z-50">
       <section className="inicio h-screen bg-inicio bg-cover bg-center">
        <article className="w-full h-full bg-black bg-opacity-60 ">
        <div className="flex flex-col justify-center items-center gap-y-8 pt-20">
            <img className='w-[15rem]' src='https://i.ibb.co/XX7rF46/image.png' alt="Logo" />
              <div className="flex">
                  <Link 
                    to='/turnos'
                    className="
                    p-3 bg-yellow-400 text-lg font-semibold uppercase rounded-md 
                    hover:bg-black hover:text-yellow-400 hover:shadow-md hover:shadow-yellow-500
                    transition-all duration-300" 
                  >
                    ¡Solicitar Turno!
                  </Link>
              </div>
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


