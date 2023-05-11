import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {

  const [nav, setNav] = useState(false)
  const location = useLocation()

  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <>
      <div className='flex px-5 md:px-2  justify-between md:justify-around items-center bg-[#111111] '>
        <img className='w-[3.9rem]' src='https://i.ibb.co/XX7rF46/image.png' alt="Logo" />

        <div className='hidden md:flex justify-center items-center'>
          <ul className='flex gap-x-7 uppercase text-white font-normal'>
            {
              location.pathname === '/' || location.pathname === '/turnos' || location.pathname === '/usuario' || location.pathname === '/nosotros'
                ? (
                  <>
                    <Link to={'/'}>
                      <li className='py-4 text-sm text-white'>Inicio</li>
                    </Link>
                    <Link to={'/turnos'}>
                      <li className='py-4 text-sm text-white'>Nuevo Turno</li>
                    </Link>
                    <Link to={'/nosotros'}>
                      <li className='py-4 text-sm text-white'>Nosotros</li>
                    </Link>

                  </>
                )
                :
                (
                  <>
                    <Link to={'/admin'}>
                      <li className='py-4 text-sm text-white'>Inicio</li>
                    </Link>
                    <Link to={'/admin/agenda'}>
                      <li className='py-4 text-sm text-white'>Agenda</li>
                    </Link>
                    <Link to={'/admin/administrarturnos'}>
                      <li className='py-4 text-sm text-white'>Admninistrar Turnos</li>
                    </Link>
                  </>
                )
            }
          </ul>
        </div>
        <div className='relative py-5'>
          <div onClick={handleNav} className='bars__menu absolute top-1 right-5 z-50 md:hidden'>
            <span className={nav ? 'line1__bars-menu' : ''}></span>
            <span className={nav ? 'line2__bars-menu' : ''}></span>
            <span className={nav ? 'line3__bars-menu' : ''}></span>
          </div>
          <Link
            to='/micuenta'
            className='py-1 px-2 rounded-xl bg-yellow-400 font-semibold hidden md:block cursor-pointer'
          >Mi Cuenta
          </Link>
        </div>
      </div>
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen transition-colors duration-300 bg-black/70 z-20' : 'z-30'}>
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-[#111111] p-10 ease-in duration-500 z-20'
              : 'fixed left-[-100%] top-0 p-10 ease-in transition-all duration-500 z-20' 
          }
        >
          <div >
            <div className='flex justify-center items-center  w-full'>
              <img className='w-[10rem]' src='https://i.ibb.co/XX7rF46/image.png' alt="Logo" />
            </div>
            <div className='border-b w-full border-gray-300 my-2 text-center'>
              <p className='w-[75%] md:w-[90%] py-2 mx-auto text-white tracking-widest'>MDPCUTS 2022</p>
            </div>
          </div>
          <div className='py-4 dlex flex-col'>
            <ul className='uppercase ' onClick={handleNav}>
              <Link to={'/'}> <li className='py-4 text-sm text-white'>Inicio</li> </Link>
              <Link to={'/turnos'}> <li className='py-4 text-sm text-white'>Nuevo Turno</li> </Link>
              <Link to={'/nosotros'}> <li className='py-4 text-sm text-white'>Nosotros</li> </Link>
            </ul>
            <Link
            to='/micuenta'
            className='py-1 px-2 rounded-xl bg-yellow-400 font-semibold hidden md:block cursor-pointer'
          >Mi Cuenta
          </Link>
            <div className="pt-12">
              <p className='text-sm sm:text-lg uppercase tracking-widest text-yellow-200'>¡Sigamos conectados!</p>
              <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'>
                <div className='icons__menu'>
                  <ion-icon name="logo-whatsapp"></ion-icon>
                </div>
                <div className='icons__menu'>
                  <ion-icon name="logo-instagram"></ion-icon>
                </div>
                <div className='icons__menu'>
                  <ion-icon name="mail-outline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
