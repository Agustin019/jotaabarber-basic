import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebaseconfig';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function StepProfesional({ profesionalSeleccionado, setProfesionalSeleccionado }) {

  const [profesionales, setProfesionales] = useState([])
  const consultarProfesionales = async () => {
    const docRef = doc(db, 'utilidades', 'profesionales')
    const serviciosDoc = await getDoc(docRef)
    setProfesionales(serviciosDoc.data().profesionales)
  }
  useEffect(() => {
    consultarProfesionales()
  }, [])

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
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
        {profesionales.map(profesional =>
          <div key={profesional.nombre} className="" >
            <div
              onClick={() => setProfesionalSeleccionado(profesional)}
              className={`
              flex flex-col items-center justify-center cursor-pointer rounded-3xl w-[235px] md:w-[200px] lg:w-[180px] xl:w-[200px] mx-auto
              max-h-[320px] min-h-[320px] py-2  px-1
                `
              }

            >
              <img className={`  w-[235px] h-[235px]  lg:w-[180px] xl:w-[200px]
              rounded-3xl  md:h-[200px]  md:w-[200px] object-fill  hover:outline outline-[#1e1e1e]
              ${profesionalSeleccionado.nombre === profesional.nombre ? 'outline outline-[#1e1e1e]' : ''}`}
                src={profesional.img}
                alt={profesional.nombre}
              />
              <div className='w-full flex flex-col py-3 my-2 justify-center items-center  '>
                <p className='text-gray-800  text-lg font-semibold uppercase text-center'>{profesional.nombre}</p>
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
        className="absolute top-[118px] left-5 md:left-0 lg:top-[100px]">
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
          className="absolute -top-[200px] lg:-top-[225px] xl:-top-[250px] lg:bottom-[177px] xl:bottom-[154px] right-5  md:right-0"
          >
        <ion-icon name="arrow-forward-sharp"></ion-icon>
      </button>
    </div>
  );
};
