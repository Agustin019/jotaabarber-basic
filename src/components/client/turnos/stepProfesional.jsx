import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
const profesionales = [
  {
    id:1,
    nombre: 'Lean',
    img: 'https://i.ibb.co/ZWZzjsT/lean.jpg'
  },
  {
    id:2,
    nombre: 'Juan',
    img: 'https://i.ibb.co/r40w27x/juan.jpg'
  },
  {
    id:3,
    nombre: 'Tomas',
    img: 'https://i.ibb.co/3TGg9M4/tomas.jpg'
  }
]

export default function StepProfesional() {
  return (

    <div className='sm:w-[90%] mx-auto overflow-x-hidden'>
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
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 2,
          },
        }}
      >
        {profesionales.map((profesional) =>
          <SwiperSlide key={profesional.id}>

            <div
              //onClick={() => handleServicio(profesional.name)}
              className={`
                flex flex-col  cursor-pointer rounded-xl 
                `
              }

            >
              <img className="rounded-3xl h-[235px] w-[235px]" src={profesional.img} alt={profesional.nombre} />
              <div className='w-full flex flex-col py-2 my-2 justify-center '>
                <p className='text-gray-800  text-lg font-semibold uppercase text-center'>{profesional.nombre}</p>
                {/* <p className="text-xs text-gray-400 py-2">({profesional.description})</p> */}
          
              </div>
            </div>

          </SwiperSlide>
        )}
      </Swiper>
    </div>


  );
}
