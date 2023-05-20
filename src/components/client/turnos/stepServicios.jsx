import React, { useRef, useState } from "react";
import { SERVICIOS } from "../../../utils/servicios";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";


export default function StepServicios({ }) {

  // const handleServicio = (servicio) => {
  //   console.log('Seleccionaste este servicio')
  //   setServicioSeleccionado(servicio)
  //   setTimeout( () => {
  //     nextStep()
  //   },300)
  // }

  return (

    <div className='sm:w-[83%] w-full max-w-full max-h-screen mx-auto overflow-x-hidden '>
      <div className='swiper-button-prev swiper-button'></div>
      <div className='swiper-button-next swiper-button'></div>

      <Swiper
        //params={swiperOptions}
        slidesPerView={1}
        spaceBetween={2}
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
            slidesPerView: 1,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
      >
        {SERVICIOS.map(servicio =>
          <SwiperSlide key={servicio.id}>

            <div
              //onClick={() => handleServicio(servicio.name)}
              className={`
                flex flex-col  cursor-pointer rounded-xl  max-w-[235px] mx-auto
                `
              }

            >
              <img className="rounded-3xl h-[235px] w-[235px]" src={servicio.img} alt={servicio.name} />
              <div className='w-full flex flex-col py-2 my-2 justify-center '>
                <p className='text-gray-800  text-lg font-semibold uppercase text-center'>{servicio.name}</p>
                {/* <p className="text-xs text-gray-400 py-2">({servicio.description})</p> */}
                <p className="text-sm font-bold text-gray-700">${servicio.price}</p>
              </div>
            </div>

          </SwiperSlide>
        )}
      </Swiper>
    </div>


  );
}

