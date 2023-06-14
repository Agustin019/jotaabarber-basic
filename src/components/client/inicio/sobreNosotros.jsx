import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";



export default function SobreNosotros() {
  

  const images = [
    "https://i.ibb.co/xDkCZwm/barbero.jpg",
    "https://i.ibb.co/QJVNxWJ/116458ad3a32cb261cd88428a17058f6.jpg",
    "https://i.ibb.co/2KTNbB5/6c6236144da2821d79b0559a448bcb5e.jpg",

  ];

  return (
    <article className='sm:w-[80%] max-w-full max-h-full mx-auto overflow-x-hidden relative'>
     
      <div className='swiper-button-prev swiper-button'></div>
      <div className='swiper-button-next swiper-button'></div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          ///loop={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
   
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
            >
              <div className='flex flex-col cursor-pointer rounded-3xl max-w-[235px] mx-auto my-2'>
                <img
                  className='rounded-3xl max-h-[235px] min-h-[235px] w-[235px] object-top hover:outline outline-[#1e1e1e]'
                  src={image}
                  alt={`Imagen ${index + 1}`}
                />
                <div className='w-full flex flex-col py-2 my-2 justify-center'>
                  <p className='text-gray-800 text-lg font-semibold uppercase text-center'>Nombre</p>
                  <p className='text-xs text-gray-400 py-2 text-center'>Barbero</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    
    </article>
  );
}
