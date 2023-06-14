import React, { useRef, useState } from "react";
import Navbar from '../../components/layout/navbar'
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
import SobreNosotros from "../../components/client/inicio/sobreNosotros";
export default function Inicio() {


  return (
   <>
   <Navbar/>
     <main className="z-50 ">
       <section className="inicio h-screen bg-inicio bg-cover bg-center">
         <article className="w-full h-full bg-gradient-to-b from-black/80 to-black/50  pt-[72px]">
           <div className="flex flex-col justify-center items-center gap-y-8 pt-20">
             <h1 className="font-bold text-[64px] leading-[78px] text-center text-white">Tu estilo, nuestra <br />
               <span className="text-[96px] leading-[117px]">Pasión</span>
             </h1>
             <p className="w-[328px] md:w-[550px] lg:w-[846px] h-[52px] mx-auto font-light text-white text-base text-center ">¡Bienvenido a nuestra barbería, donde el estilo y la elegancia se unen en un solo lugar!</p>
             <Link
               to='/nuevoturno'
               className="
                     w-[327px] h-[55px] flex justify-center items-center mt-20 md:mt-10
                     py-[10px] px-4 bg-black text-[#FDFFFC] text-base text-center font-semibold uppercase 
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
     <section className="w-full">
       <SobreNosotros/>
     </section>
    
     </main>
   </>
  );
}


