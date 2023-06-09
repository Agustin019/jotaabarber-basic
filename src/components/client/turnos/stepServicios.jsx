import React, { useRef, useState } from "react";
import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebaseconfig";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect } from "react";


export default function StepServicios({ servicioSeleccionado, setServicioSeleccionado }) {


  const [servicios, setServicios] = useState([])
  useEffect(() => {
    const consultarServicios = async () => {
      const docRef = doc(db, 'utilidades', 'servicios')
      const serviciosDoc = await getDoc(docRef)
      setServicios(serviciosDoc.data().servicio)
    }
    return () => consultarServicios()
  }, [])
  return (

    <div className='sm:w-[82%] max-w-[85%] max-h-screen mx-auto  overflow-hidden flex justify-center  '>
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
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        {servicios.map(servicio =>
          <SwiperSlide key={servicio.nombre} className="max-w-[235px] ">

            <div
              onClick={() => setServicioSeleccionado(servicio)}
              className={`
              flex flex-col cursor-pointer rounded-3xl max-w-[235px] p-2 mx-auto
             
                `
              }

            >
              <img className={
                `rounded-3xl min-h-[235px] max-h-[235px] min-w-[235px] max-w-[235px] object-top hover:outline outline-[#1e1e1e]
              ${servicioSeleccionado.nombre === servicio.nombre ? 'outline outline-[#1e1e1e]' : ''}`}
                src={servicio.img}
                alt={servicio.nombre} 
              />
              <div className='w-full flex flex-col py-2 my-2 justify-center '>
                <p className='text-gray-800  text-lg font-semibold uppercase text-center'>{servicio.nombre}</p>
                <p className="text-sm font-bold text-gray-700">${servicio.precio}</p>
              </div>
            </div>

          </SwiperSlide>
        )}
      </Swiper>
    </div>


  );
}

