import React, { useRef, useState } from "react";
import { SERVICIOS } from "../../utils/servicios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function Servicios() {

  const handleServicio = () => {
    console.log('Seleccionaste este servicio')
  }

  return (

    <div className='w-[70%] sm:w-[90%] mx-auto py-10 overflow-hidden'>
      <div className='swiper-button-prev swiper-button'></div>
      <div className='swiper-button-next swiper-button'></div>
      <Swiper
        //params={swiperOptions}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {SERVICIOS.map(servicio =>
          <SwiperSlide key={servicio.id}>
            <div onClick={handleServicio} className='flex flex-col my-2 mx-2 cursor-pointer shadow-xl rounded-md hover:outline hover:outline-4 outline-blue-500'>
              <img src={servicio.img} alt={servicio.name} />
              <div className='w-full flex flex-col py-2 my-2 justify-center '>
                <p className='text-gray-800  text-lg font-semibold uppercase text-center'>{servicio.name}</p>
                <div className="flex items-center justify-center text-gray-500">
                  <ion-icon name="time-outline"></ion-icon>
                  <p className="">30min.</p>
                </div>
                <p className="text-xs text-gray-400 py-2">({servicio.description})</p>
                <p className="text-sm font-bold text-gray-700">${servicio.price}</p>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>


  );
}

