import React, { useRef, useState } from "react";
import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebaseconfig";

// Import Swiper React components

import { useEffect } from "react";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function StepServicios({ servicioSeleccionado, setServicioSeleccionado }) {


  const [servicios, setServicios] = useState([])

  const consultarServicios = async () => {
    const docRef = doc(db, 'utilidades', 'servicios')
    const serviciosDoc = await getDoc(docRef)
    setServicios(serviciosDoc.data().servicio)
  }
  useEffect(() => {
    consultarServicios()
  }, [])

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]

  };


  return (

    <div className='h-auto relative pt-5 lg:w-[95%] mx-auto'>

      <Slider {...settings}>
        {servicios.map(servicio =>
          <div key={servicio.nombre} className="" >
            <div
              onClick={() => setServicioSeleccionado(servicio)}
              className={`
              flex flex-col cursor-pointer rounded-3xl w-[235px] md:w-[200px] lg:w-[180px] xl:w-[200px] mx-auto
              max-h-[320px] min-h-[330px] py-2  px-1
                `
              }

            >
              <img className={`  w-[235px] h-[235px]  lg:w-[180px] xl:w-[200px]
              rounded-3xl  md:h-[200px]  md:w-[200px] object-cover hover:outline outline-2 outline-[#1e1e1e] hover:shadow-lg hover:shadow-[#1e1e1e]
              ${servicioSeleccionado.nombre === servicio.nombre ? 'outline outline-2 outline-amarillo shadow-lg shadow-[#1e1e1e]' : ''}`}
                src={servicio.img}
                alt={servicio.nombre}
              />
              <div className='w-full flex flex-col py-3 my-2 justify-center items-center text-blanco '>
                <p className='text-base md:text-lg font-semibold uppercase text-center'>{servicio.nombre}</p>
                <p className="text-base font-normal ">${servicio.precio}</p>
              </div>
            </div>

          </div>
        )}
      </Slider>
    </div>


  );
}

const CustomPrevArrow = (props) => {
  const { className, onClick, style } = props;

  return (
    <div className='h-full text-3xl z-10 flex-col content-center justify-end relative flex'>
      <button 
        type="button"
        onClick={onClick} 
        className="absolute text-blanco top-[118px] left-5 md:left-0 lg:top-[100px]">
        <ion-icon name="arrow-back-sharp"></ion-icon>
      </button>
    </div>
  );
};

// Componente de flecha de navegación personalizada para ir hacia adelante
const CustomNextArrow = (props) => {
  const { className, onClick, style } = props;

  return (
    <div className='h-full z-10 text-3xl flex flex-col content-center justify-end relative'>
        <button 
          type="button" 
          onClick={onClick}
          className="absolute text-blanco -top-[215px] lg:-top-[225px] xl:-top-[250px] lg:bottom-[177px] xl:bottom-[154px] right-5  md:right-0"
          >
        <ion-icon name="arrow-forward-sharp"></ion-icon>
      </button>
    </div>
  );
};


