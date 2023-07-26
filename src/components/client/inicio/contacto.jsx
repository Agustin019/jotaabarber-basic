import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'

export default function Contacto() {

  const { user } = useAuth()
  return (
    <section className=' '>
      <article className='md:min-h-[95vh] md:flex flex-col justify-center items-center relative'>
        <div className='
            w-[328px] md:w-[720px] lg:w-[970px] xl:w-[1244px]  mx-auto bg-negroSecundario 
            px-2 pb-10 pt-60  md:p-9 xl:py-14 xl:px-16
            rounded-3xl flex flex-col md:flex-row items-center
           '>
          <img
            src="https://i.ibb.co/w0krfkr/2cff81ec-8587-4207-8711-85f4db54800c-min.jpg"
            alt="imagen de herramientas"
            className='
            w-[296px] h-[320px] lg:w-[340px] lg:h-[399px] xl:w-[397px] xl:h-[457px] object-cover rounded-2xl absolute 
            -top-28 md:-top-16 xl:top-10 md:right-12 lg:right-10 xl:right-44 mx-auto'
          />
          <div  className='flex flex-col justify-center items-center gap-y-6 lg:gap-y-10 text-center max-w-sm lg:max-w-xl'>
            <h2 className='font-bold text-2xl lg:text-5xl text-white '>
              ¿Te interesa alguno de nuestros servicios?
            </h2>  
            <p className='font-light text-sm text-white md:w-[90%]'>No pierdas más tiempo, reserva tu turno ahora mismo. En caso de poder asistir cancela tu turno desde la misma pagina con anticipacion.</p>
            <Link
              to={user ? '/nuevoturno' : '/micuenta'}
              className='w-[296px] h-[55px] flex justify-center items-center p-[10px] bg-amarillo font-medium text-lg lg:text-base text-negroPrincipal'
            >
              Reservar turno
            </Link>
          </div>
        </div>
      </article>

     <article id='contacto' className='pt-10 h-auto max-h-full' >
        <div  className='flex flex-col gap-y-5 items-center px-10'>
          <h2 className='text-center font-bold text-[32px] text-blanco'>Contacto</h2>
          <div className='flex flex-col gap-y-5 items-center '>

            <h3  className='font-semobold text-xl py-4 text-blanco'>Encontranos en</h3>

            <div className='flex flex-col md:flex-row md:gap-x-10 lg:gap-x-20 xl:gap-x-40 gap-y-3 mb-5'>
              <div className='text-xl font-light flex items-center gap-x-2 text-amarillo'>
                <ion-icon name="location"></ion-icon>
                <p className='text-base font-medium text-blanco'> Pirán 624</p>
              </div>
              <div className='text-xl font-light flex items-center gap-2 text-amarillo'>
                <ion-icon name="logo-instagram"></ion-icon>
                <a href='https://www.instagram.com/jotaa_barberr/' target='__blank' 
                className='text-base font-medium underline text-blanco'>@jotaa_barberr</a>
              </div>
              <div className='text-xl font-light flex items-center gap-x-2 text-amarillo'>
                <ion-icon name="logo-whatsapp"></ion-icon>
                <a href="https://wa.me/+5492235808853"  target='__blank' 
                className='text-base font-medium underline text-blanco'>2235808853</a>
              </div>
            </div>
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.860914002079!2d-57.58143582458097!3d-37.957033442238924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d9a3d51c6871%3A0xeb6f43680c702e19!2sJos%C3%A9%20Mar%C3%ADa%20Piran%20624%2C%20B7604JCN%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1689360373348!5m2!1sen!2sar"
              className='w-[3w0px] h-[480px] sm:w-[500px]  md:w-[650px] lg:w-[900px] xl:w-[1240px]'
              allowfullscreen="" loading="lazy"
              eferrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </article>

    </section>
  )
}
